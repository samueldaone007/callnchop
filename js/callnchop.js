/* ============================================================
   CHICKEN REPUBLIC — behaviour (ordering by CallnChop)
   - menu grid + dish detail page rendered from js/dishes.js
   - a real basket: quantities, running total, pickup/delivery, checkout
   - kitchen board ticket flow
   Money is kobo, integer, never recomputed from a float.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- money ---------- */
  var NGN = new Intl.NumberFormat('en-NG', {
    style: 'currency', currency: 'NGN', maximumFractionDigits: 0
  });
  function money(kobo) { return NGN.format((kobo || 0) / 100); }

  /* ---------- fulfilment rules ---------- */
  var RULES = {
    delivery: { label: 'Delivery', fee: 150000, freeOver: 850000, eta: '34 min door to door, median' },
    pickup:   { label: 'Pickup',   fee: 0,       freeOver: Infinity, eta: '25 min at the counter' }
  };
  var ZONE_NOTE = 'Ikeja, Allen & Ogundipe';

  /* ---------- dietary + allergen flag vocabulary ---------- */
  var FLAGS = {
    picks:        { label: "Chef's pick", cls: 'chip--picks' },
    sharing:      { label: 'For sharing', cls: 'chip--picks' },
    kids:         { label: 'Kids order',  cls: 'chip--picks' },
    'bone-in':    { label: 'Bone-in',     cls: 'chip--n' },
    slow:         { label: '90 min',      cls: 'chip--n' },
    vegan:        { label: 'Vegan',       cls: 'chip--ok' },
    'gluten-free':{ label: 'No gluten',   cls: 'chip--ok' },
    'dairy-free': { label: 'No dairy',    cls: 'chip--ok' },
    'sugar-free': { label: 'No added sugar', cls: 'chip--ok' }
  };
  var ALLERGEN_CODE = {
    dairy: 'Dairy', gluten: 'Gluten', peanut: 'Groundnut', soy: 'Soy',
    fish: 'Fish', egg: 'Egg', shellfish: 'Shellfish'
  };

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function photoUrl(id, w) {
    if (!id) return null;
    return 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=' + w + '&q=70';
  }
  function byGroup(g) {
    return Object.keys(window.DISHES).filter(function (k) { return window.DISHES[k].group === g; });
  }
  function tagChips(d) {
    var out = '';
    (d.flags || []).forEach(function (f) {
      var m = FLAGS[f];
      if (m) out += '<span class="' + m.cls + '">' + esc(m.label) + '</span>';
    });
    (d.allergens || []).forEach(function (a) {
      if (ALLERGEN_CODE[a]) out += '<span class="chip--n">Contains ' + esc(ALLERGEN_CODE[a]) + '</span>';
    });
    if (d.heat >= 3) out += '<span class="chip--hot">Very hot</span>';
    return out;
  }

  /* failed images fall back to the colour plate, everywhere, forever */
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG' && !t.dataset.failed) { t.dataset.failed = '1'; t.remove(); }
  }, true);

  /* ---------- toast ---------- */
  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.remove('on');
    void toastEl.offsetWidth;
    toastEl.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('on'); }, 2400);
  }

  /* ============================================================
     BASKET
     ============================================================ */
  var cart = { items: {}, mode: 'delivery' };

  function loadCart() {
    try {
      var raw = localStorage.getItem('cc.cart');
      if (raw) {
        var p = JSON.parse(raw) || {};
        cart.items = p.items || {};
        if (RULES[p.mode]) cart.mode = p.mode;
      }
    } catch (e) { /* private mode, or someone edited it by hand */ }
  }
  function saveCart() {
    try { localStorage.setItem('cc.cart', JSON.stringify({ items: cart.items, mode: cart.mode })); } catch (e) {}
  }
  function cartCount() {
    return Object.keys(cart.items).reduce(function (n, k) { return n + cart.items[k].n; }, 0);
  }
  function cartSubtotal() {
    return Object.keys(cart.items).reduce(function (t, k) { return t + cart.items[k].n * cart.items[k].price; }, 0);
  }
  function deliveryFee() {
    var r = RULES[cart.mode], sub = cartSubtotal();
    if (cart.mode === 'delivery' && sub >= r.freeOver) return 0;
    return r.fee;
  }
  function addToCart(id, qty, opts) {
    var d = window.DISHES[id];
    if (!d) return;
    if (!d.available) { toast(d.name + ' is sold out'); return; }
    qty = qty || 1;
    if (!cart.items[id]) cart.items[id] = { n: 0, price: d.price, name: d.name, photo: d.photo };
    cart.items[id].n = Math.min(50, cart.items[id].n + qty);
    saveCart();
    renderDrawer(); syncHeader();
    toast(qty > 1 ? qty + ' × ' + d.name : d.name + ' added');
    if (opts && opts.open) openDrawer();
  }
  function setQty(id, n) {
    if (!cart.items[id]) return;
    if (n < 1) { delete cart.items[id]; } else { cart.items[id].n = Math.min(50, n); }
    saveCart(); renderDrawer(); syncHeader();
  }
  function setMode(m) {
    if (!RULES[m]) return;
    cart.mode = m; saveCart(); renderDrawer(); syncModeButtons();
  }
  function syncHeader() {
    var c = cartCount(), t = cartSubtotal() + deliveryFee();
    $$('[data-cart-count]').forEach(function (el) { el.textContent = c; });
    $$('[data-cart-total]').forEach(function (el) { el.textContent = money(t); });
  }
  function syncModeButtons() {
    $$('[data-mode]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-mode') === cart.mode));
    });
  }

  /* ============================================================
     ORDER DRAWER
     ============================================================ */
  var drawer, scrim, placed = null;

  function buildDrawer() {
    if (drawer) return;
    scrim = document.createElement('div');
    scrim.className = 'scrim';
    scrim.setAttribute('data-close', '');
    document.body.appendChild(scrim);

    drawer = document.createElement('aside');
    drawer.className = 'drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-label', 'Your order');
    drawer.innerHTML =
      '<div class="drawer__hd">' +
        '<div><h2>Your order</h2><p data-drawer-sub>Nothing in it yet</p></div>' +
        '<button class="drawer__x" type="button" data-close aria-label="Close the order">&times;</button>' +
      '</div>' +
      '<div class="drawer__body" data-drawer-body></div>' +
      '<div class="drawer__ft" data-drawer-ft hidden></div>';
    document.body.appendChild(drawer);
  }

  function openDrawer() {
    buildDrawer();
    placed = null;
    renderDrawer();
    drawer.classList.add('on');
    scrim.classList.add('on');
    document.body.classList.add('locked');
    var x = $('.drawer__x', drawer);
    if (x) x.focus();
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('on');
    scrim.classList.remove('on');
    document.body.classList.remove('locked');
  }

  function renderDrawer() {
    if (!drawer) return;
    var body = $('[data-drawer-body]', drawer), ft = $('[data-drawer-ft]', drawer);
    var sub = $('[data-drawer-sub]', drawer);
    var ids = Object.keys(cart.items);

    /* confirmation state */
    if (placed) {
      sub.textContent = 'Order placed';
      body.innerHTML =
        '<div class="done">' +
          '<div class="done__tick">&#10003;</div>' +
          '<h3>That is in the kitchen</h3>' +
          '<div class="done__no">' + esc(placed.no) + '</div>' +
          '<p>' + (cart.mode === 'pickup' ? 'Come to the counter on 14 Allen Avenue. ' : 'A rider has been matched. ') +
          esc(placed.eta) + ' &middot; ' + esc(placed.when) + '.</p>' +
          '<p style="margin-top:1rem"><button class="btn btn--ghost btn--sm" type="button" data-neworder>Start another order</button></p>' +
        '</div>';
      ft.hidden = true;
      return;
    }

    if (!ids.length) {
      sub.textContent = 'Nothing in it yet';
      body.innerHTML =
        '<div class="drawer__empty">' +
          '<h3 style="font-family:var(--slab);margin-bottom:.6rem">The bag is empty</h3>' +
          '<p>Pick something off the board. The whole bird is the reason for the door, ' +
          'if you were looking for permission.</p>' +
          '<p style="margin-top:1.2rem"><a class="btn btn--sm" href="index.html#menu">See tonight&rsquo;s menu</a></p>' +
        '</div>';
      ft.hidden = true;
      return;
    }

    var n = cartCount();
    sub.textContent = n + (n === 1 ? ' item' : ' items');

    body.innerHTML = ids.map(function (id) {
      var it = cart.items[id];
      var src = photoUrl(it.photo, 140);
      return '<div class="line">' +
        '<div class="line__img">' + (src ? '<img src="' + src + '" alt="">' : '') + '</div>' +
        '<div>' +
          '<div class="line__t"><b>' + esc(it.name) + '</b><span>' + money(it.price * it.n) + '</span></div>' +
          '<div class="line__c">' +
            '<div class="stepper">' +
              '<button type="button" data-q="-1" data-id="' + esc(id) + '" aria-label="One fewer">&minus;</button>' +
              '<output>' + it.n + '</output>' +
              '<button type="button" data-q="1" data-id="' + esc(id) + '" aria-label="One more">+</button>' +
            '</div>' +
            '<span class="mono" style="color:var(--faint)">' + money(it.price) + ' ea</span>' +
            '<button class="line__rm" type="button" data-rm="' + esc(id) + '">Remove</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('') + fulfilmentBlock();

    var fee = deliveryFee(), sub_ = cartSubtotal(), free = cart.mode === 'delivery' && fee === 0;
    ft.hidden = false;
    ft.innerHTML =
      '<dl class="sums">' +
        '<div><dt>Subtotal</dt><dd>' + money(sub_) + '</dd></div>' +
        '<div class="' + (free ? 'sums--free' : '') + '"><dt>' + esc(RULES[cart.mode].label) +
          (free ? ' &mdash; free over ' + money(RULES.delivery.freeOver) : '') +
          '</dt><dd>' + (fee === 0 && !free ? 'Free' : money(fee)) + '</dd></div>' +
        '<div class="sums--total"><dt>Total</dt><dd>' + money(sub_ + fee) + '</dd></div>' +
      '</dl>' +
      '<button class="btn" type="button" data-checkout>Place the order</button>' +
      '<p class="drawer__fine">Card, transfer, USSD or cash on the door.<br>Riders carry up to &#8358;20,000 in change.</p>';
  }

  function fulfilmentBlock() {
    return '<div class="fulfil" style="margin-top:1.2rem">' +
      '<p class="fulfil__t">How do you want it</p>' +
      '<div class="fulfil__opts">' +
        '<button type="button" data-mode="delivery" aria-pressed="' + (cart.mode === 'delivery') + '">Delivery</button>' +
        '<button type="button" data-mode="pickup" aria-pressed="' + (cart.mode === 'pickup') + '">Pickup</button>' +
      '</div>' +
      '<p class="fulfil__eta">' + esc(RULES[cart.mode].eta) + '. ' +
      (cart.mode === 'delivery'
        ? 'Covering ' + ZONE_NOTE + '. Free over ' + money(RULES.delivery.freeOver) + '.'
        : '14 Allen Avenue, Ikeja. We text you when it is up and hold it 20 minutes.') +
      '</p></div>';
  }

  /* ============================================================
     DISH CARD
     ============================================================ */
  /* a card is an <article>: the link and the add button are siblings,
     not a button nested inside an anchor, which is not valid HTML. */
  function card(id) {
    var d = window.DISHES[id];
    var href = 'dish.html?id=' + encodeURIComponent(id);
    var src = photoUrl(d.photo, 520);
    var plate = src
      ? '<img src="' + src + '" alt="' + esc(d.name) + '" loading="lazy">'
      : '<span class="dish__initial" aria-hidden="true">' + esc(d.name.charAt(0)) + '</span>';

    if (!d.available) {
      return '<article class="dish dish--out">' +
        '<a class="dish__link" href="' + href + '">' +
          '<span class="dish__stamp"><span>Sold out</span></span>' +
          '<div class="dish__media"><div class="frame">' + plate + '</div></div>' +
          '<div class="dish__bar"><span class="dish__name">' + esc(d.name) + '</span></div>' +
          '<div class="dish__tags"><span class="chip--n">Next tray 16:00</span></div>' +
          '<p class="dish__sub">Sold out &middot; still worth reading</p>' +
        '</a></article>';
    }

    return '<article class="dish">' +
      '<a class="dish__link" href="' + href + '">' +
        '<span class="dish__tag">' + money(d.price) + '</span>' +
        '<div class="dish__media"><div class="frame">' + plate + '</div>' +
        '<div class="dish__hover"><div class="dish__hover-in">' +
        '<p class="dish__hover-name">' + esc(d.name) + '</p>' +
        '<p>' + esc(d.blurb) + '</p>' +
        '<span class="dish__cta">See the whole dish &rarr;</span>' +
        '</div></div></div>' +
        '<div class="dish__bar"><span class="dish__name">' + esc(d.name) + '</span></div>' +
        '<div class="dish__tags">' + tagChips(d) + '</div>' +
        '<p class="dish__sub">' + esc(d.serves) + ' &middot; ' + esc(d.prep) + '</p>' +
      '</a>' +
      '<button class="dish__add" type="button" data-add="' + esc(id) + '" ' +
      'aria-label="Add one ' + esc(d.name) + ' to your order">Add</button>' +
      '</article>';
  }

  /* ============================================================
     MENU GRID + SCROLL SPY
     ============================================================ */
  function renderMenu() {
    var grid = $('#menuGroups'), index = $('#menuIndex');
    if (!grid || !index) return;

    index.innerHTML = window.DISH_GROUPS.map(function (g) {
      var n = byGroup(g.id).length;
      return '<a href="#' + g.id + '">' + esc(g.name) + ' <b>' + (n < 10 ? '0' + n : n) + '</b></a>';
    }).join('');

    grid.innerHTML = window.DISH_GROUPS.map(function (g) {
      return '<div class="menu__group" id="' + g.id + '">' +
        '<h3>' + esc(g.name) + ' <em>' + esc(g.note) + '</em></h3>' +
        '<div class="dishgrid">' + byGroup(g.id).map(card).join('') + '</div>' +
        '</div>';
    }).join('');
  }

  function scrollSpy() {
    var links = $$('.menu__index a');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var groups = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
    if (!groups.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        var active = links.filter(function (a) { return a.getAttribute('href') === '#' + e.target.id; })[0];
        if (active) active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-120px 0px -65% 0px', threshold: 0 });
    groups.forEach(function (g) { io.observe(g); });
  }

  /* ============================================================
     DISH DETAIL PAGE
     ============================================================ */
  function renderDetail() {
    var root = $('#dishRoot');
    if (!root) return;

    var id = (location.search.match(/[?&]id=([^&]+)/) || [])[1];
    var d = id ? window.DISHES[decodeURIComponent(id)] : null;

    if (!d) {
      document.title = 'No such dish — Chicken Republic';
      root.innerHTML = '<div class="nosuch wrap"><p class="eyebrow eyebrow--plain">404</p>' +
        '<h1>No such dish on this board</h1>' +
        '<p class="lede" style="margin-inline:auto">The link is wrong, or we took it off at 15:00 and the ' +
        '16:00 tray is not back yet. The full board is one click away.</p>' +
        '<p style="margin-top:2rem"><a class="btn" href="index.html#menu">Back to the menu</a></p></div>';
      return;
    }

    document.title = d.name + ' — Chicken Republic, Ikeja';
    var group = window.DISH_GROUPS.filter(function (g) { return g.id === d.group; })[0] || { name: '' };
    var big = photoUrl(d.photo, 1200);
    var kitchen = '1414235077428-338989a2e8c0';

    var media =
      '<div class="frame">' + (big
        ? '<img src="' + big + '" alt="' + esc(d.name) + '">'
        : '<span class="dish__initial" aria-hidden="true">' + esc(d.name.charAt(0)) + '</span>') +
      '<span class="frame__tag">' + esc(group.name) + ' &middot; Chicken Republic</span></div>' +
      '<div class="frame"><img src="' + photoUrl(kitchen, 900) +
      '" alt="The back kitchen at Chicken Republic, Ikeja" loading="lazy">' +
      '<span class="frame__tag">Fig. 02 &mdash; the back kitchen, Allen Avenue</span></div>';

    var heatTxt = ['No heat at all', 'Mild', 'Hot', 'Very hot'][d.heat] || 'No heat at all';
    var heatBars = '<span class="heat" data-heat="' + d.heat + '" aria-label="' + heatTxt + '">' +
      '<i></i><i></i><i></i></span> <span class="mono" style="color:var(--muted)">' + heatTxt + '</span>';

    var specs =
      '<dl class="specs">' +
      '<div><dt>Fire time</dt><dd>' + esc(d.prep) + ' from acceptance, not from ordering</dd></div>' +
      '<div><dt>Portion</dt><dd>' + esc(d.serves) + '</dd></div>' +
      '<div><dt>Heat</dt><dd>' + heatBars + '</dd></div>' +
      '<div><dt>Tags</dt><dd>' + (tagChips(d) || 'None declared') + '</dd></div>' +
      '<div><dt>Allergens</dt><dd>' + ((d.allergens || []).length
        ? esc((d.allergens || []).map(function (a) {
            return ALLERGEN_CODE[a] || a;
          }).join(', ')) + ' &mdash; tell us in the notes and the cook will work round it'
        : 'None declared. Ask the kitchen if you are severe, we will not guess') + '</dd></div>' +
      '<div><dt>Kitchen</dt><dd>Chicken Republic, 14 Allen Avenue, Ikeja</dd></div>' +
      '</dl>';

    var buy = d.available
      ? '<div class="buyrow">' +
        '<div class="stepper">' +
          '<button type="button" data-step="-1" aria-label="One fewer">&minus;</button>' +
          '<output id="qty" aria-live="polite">1</output>' +
          '<button type="button" data-step="1" aria-label="One more">+</button>' +
        '</div>' +
        '<button class="btn" type="button" data-add="' + esc(id) + '" data-qty="1" id="addBtn">Add to the order</button>' +
        '</div>' +
        '<p class="dd__assure"><b>26 min</b> to Ikeja, <b>34 min</b> to Yaba, at the median. ' +
        'Or collect from the counter in <b>25 min</b> and skip the rider entirely. ' +
        'Pay by card, transfer, USSD or cash on the door. If it arrives cold, one tap refunds the whole thing ' +
        'and we do not ask for a photo first.</p>'
      : '<div class="buyrow"><button class="btn" type="button" disabled style="width:100%">Sold out &mdash; next tray 16:00</button></div>' +
        '<p class="dd__assure">We press two trays a day, 12:00 and 16:00, and we take it off the board ' +
        'the moment both are gone rather than promising a third. This page updates on its own.</p>';

    var pairs = (d.pairs || []).map(function (pid) {
      return window.DISHES[pid] ? card(pid) : '';
    }).join('');

    root.innerHTML =
      '<section class="section section--tight">' +
      '<div class="wrap">' +
      '<a class="backlink" href="index.html#menu">&larr; Back to tonight&rsquo;s board</a>' +
      '<div class="dd">' +
      '<div class="dd__media">' + media + '</div>' +
      '<div class="dd__body">' +
      '<p class="eyebrow">' + esc(group.name) + ' &middot; Chicken Republic, Ikeja</p>' +
      '<h1>' + esc(d.name) + '</h1>' +
      '<div class="dd__pricerow"><span class="dd__price">' + money(d.price) + '</span>' +
      '<span class="dd__unit">' + esc(d.serves) + ' &middot; ' + esc(d.prep) + ' in the fryer</span></div>' +
      '<p class="dd__long">' + esc(d.long) + '</p>' +
      buy + specs +
      '</div></div></div></section>' +

      '<section class="section section--paper2 section--tight">' +
      '<div class="wrap twocol">' +
      '<div><p class="eyebrow">What goes in it</p><h2 style="margin-top:.7rem">Everything, including the boring parts</h2>' +
      '<ol class="parts" style="margin-top:1.3rem">' +
      (d.parts || []).map(function (p) { return '<li><span>' + esc(p) + '</span></li>'; }).join('') +
      '</ol></div>' +
      '<div class="method"><p class="eyebrow">How the kitchen makes it</p>' +
      '<h2 style="margin-top:.7rem">The part that is not written down</h2>' +
      '<p style="margin-top:1.3rem">' + esc(d.method) + '</p>' +
      '<p class="fineprint" style="margin-top:1.1rem">Ada would rather tell you this on the page ' +
      'than have you discover it at the gate. Anything we have got wrong, the WhatsApp number ' +
      'in the footer is a real person.</p></div>' +
      '</div></section>' +

      (pairs ? '<section class="section section--tight">' +
      '<div class="wrap">' +
      '<div class="sec__head"><div><p class="eyebrow">Goes with</p>' +
      '<h2>What the bag usually contains</h2></div></div>' +
      '<div class="goeswith">' + pairs + '</div>' +
      '</div></section>' : '');

    var qty = 1, qtyOut = $('#qty'), addBtn = $('#addBtn');
    $$('[data-step]').forEach(function (b) {
      b.addEventListener('click', function () {
        qty = Math.max(1, Math.min(50, qty + parseInt(b.getAttribute('data-step'), 10)));
        qtyOut.textContent = qty;
        addBtn.setAttribute('data-qty', qty);
        addBtn.textContent = 'Add ' + qty + ' to the order';
      });
    });
  }

  /* ============================================================
     HOURS — mark today from the machine clock
     ============================================================ */
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function markToday() {
    var today = DAYS[new Date().getDay()];
    $$('.hours__row').forEach(function (r) {
      if ((r.getAttribute('data-day') || '') === today) {
        r.classList.add('hours__row--today');
        r.setAttribute('aria-current', 'true');
        var lbl = $('b', r);
        if (lbl && lbl.textContent.trim().toLowerCase() === 'closed') lbl.textContent = 'Closed — today';
      }
    });
  }

  /* ============================================================
     KITCHEN BOARD
     ============================================================ */
  var FLOW = ['new', 'prep', 'ready', 'done'];

  function initKitchen() {
    var board = $('[data-board]');
    if (!board) return;

    function recount() {
      FLOW.forEach(function (stage) {
        var col = board.querySelector('[data-col="' + stage + '"]');
        if (!col) return;
        var b = col.querySelector('.kcol__hd b');
        if (b) b.textContent = col.querySelectorAll('.ticket').length;
      });
    }

    $$('[data-advance]', board).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var ticket = btn.closest('.ticket');
        var to = FLOW[FLOW.indexOf(ticket.getAttribute('data-stage')) + 1];
        if (!to) return;

        ticket.setAttribute('data-stage', to);
        ticket.classList.remove('ticket--hot');

        var next = board.querySelector('[data-col="' + to + '"] .kcol__body');
        if (next) next.insertBefore(ticket, next.firstChild);

        if (to === 'ready') $$('[data-advance]', ticket).forEach(function (b) { b.textContent = 'Hand to rider'; });
        if (to === 'done') {
          var age = ticket.querySelector('.ticket__age');
          if (age) age.textContent = 'closed ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
          ticket.style.opacity = '.45';
          $$('[data-advance]', ticket).forEach(function (b) { b.disabled = true; });
        }
        recount();
        toast('Moved to ' + to);
      });
    });

    $$('[data-86]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var row = btn.closest('[data-menu-item]');
        if (!row) return;
        var out = row.classList.toggle('item--out');
        btn.textContent = out ? 'Back on' : '86 it';
        btn.classList.toggle('btn--ghost', !out);
        toast(out ? 'Marked sold out' : 'Back on the menu');
      });
    });
  }

  /* ============================================================
     GLOBAL EVENTS
     ============================================================ */

  /* add to order — delegated so it works on cards and the detail page */
  document.addEventListener('click', function (e) {
    var add = e.target.closest('[data-add]');
    if (add) {
      e.preventDefault();
      e.stopPropagation();
      addToCart(add.getAttribute('data-add'), parseInt(add.getAttribute('data-qty'), 10) || 1,
        { open: !!add.id });
      return;
    }

    var open = e.target.closest('[data-open-drawer]');
    if (open) { e.preventDefault(); openDrawer(); return; }

    var close = e.target.closest('[data-close]');
    if (close) { closeDrawer(); return; }

    var q = e.target.closest('[data-q]');
    if (q) {
      var id = q.getAttribute('data-id');
      setQty(id, (cart.items[id] ? cart.items[id].n : 0) + parseInt(q.getAttribute('data-q'), 10));
      return;
    }

    var rm = e.target.closest('[data-rm]');
    if (rm) { setQty(rm.getAttribute('data-rm'), 0); return; }

    var mode = e.target.closest('[data-mode]');
    if (mode) { setMode(mode.getAttribute('data-mode')); return; }

    if (e.target.closest('[data-checkout]')) {
      var ids = Object.keys(cart.items);
      if (!ids.length) return;
      var seq = 4400 + Math.floor(Math.random() * 90);
      placed = {
        no: '#CR-' + seq,
        eta: RULES[cart.mode].eta,
        when: cart.mode === 'pickup' ? 'collect from 25 minutes' : 'arriving in 34 minutes'
      };
      cart.items = {};
      saveCart(); renderDrawer(); syncHeader();
      toast('Order ' + placed.no + ' placed');
      return;
    }

    if (e.target.closest('[data-neworder]')) { placed = null; renderDrawer(); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });

  /* ============================================================
     BOOT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    loadCart();
    renderMenu();
    renderDetail();
    scrollSpy();
    markToday();
    initKitchen();
    buildDrawer();
    renderDrawer();
    syncHeader();
    syncModeButtons();
  });

  window.CC = {
    toast: toast, money: money, cart: cart,
    photoUrl: photoUrl, openDrawer: openDrawer, setMode: setMode, RULES: RULES
  };
})();
