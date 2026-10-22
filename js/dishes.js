/* ============================================================
   Chicken Republic — house catalogue
   Single kitchen. Single menu. Rendered by js/callnchop.js into
   index.html (the grid) and dish.html (the detail page).

   price  — kobo, integer. Never a float, never recomputed client-side.
   photo  — Unsplash id, no prefix. URLs are built in callnchop.js so
            the same id serves a 520px card and a 1200px hero.
   heat   — 0 none · 1 mild · 2 hot · 3 very hot
   ============================================================ */

window.DISHES = {

  /* ---------------- RICE & JOLLOF ---------------- */
  'party-jollof': {
    name: 'Party jollof, 1.5kg',
    group: 'rice',
    price: 950000,
    serves: 'Serves 3',
    prep: '45 min',
    heat: 1,
    photo: '1604329760661-e71dc83f8f26',
    blurb: 'Long grain, washed four times, cooked in the pot it was washed in.',
    flags: ['picks'],
    long: 'We opened as a chicken shop and this is the dish people order when they come to share. Long grain washed four times, not three, with the tomato and pepper base started in the pot before any rice touches water. It comes out with fried plantain scattered on top instead of egg, which the regulars asked for in 2024 and nobody has been brave enough to change back. Order it on its own if you are the sort of person who adds chicken separately. We will not judge, we will just note it.',
    parts: [
      '1.5kg long-grain rice, washed four times',
      '6 ripe plum tomatoes, blended',
      '2 red bell peppers, 1 Scotch bonnet (seeded)',
      'Bay leaf, thyme, curry powder, ginger',
      'Grated plantain, fried and scattered on top',
      'Groundnut oil, for the base and the plantain'
    ],
    method: 'Base goes in first and reduces for 22 minutes — until the oil splits and turns red. Then the washed rice, one ladle of hot water at a time, lid down, no stirring for the last 20 minutes. If you stir after that you release starch and you have made glue.',
    allergens: [],
    pairs: ['jollof-chicken', 'suya-chicken', 'chapman'],
    available: true
  },

  'jollof-chicken': {
    name: 'Jollof + 3 pcs chicken',
    group: 'rice',
    price: 420000,
    serves: 'Serves 1–2',
    prep: '30 min',
    heat: 1,
    photo: '1565557623262-b51c2513a641',
    blurb: 'Two thighs and a drumstick, fried twice. Most places give you two sad nuggets.',
    long: 'The order we sell more of than anything else, and the one we get complaints about least. Two thighs and a drumstick, brined overnight in ginger and vinegar, then fried twice — once at 180 to cook it through, once at 200 to get the skin going. The second fry is the whole point and it is why this takes 30 minutes instead of 20.',
    parts: [
      '1kg jollof, from the party pot',
      '2 chicken thighs, 1 drumstick',
      'Ginger, vinegar, Scotch bonnet brine',
      'Salt, dried thyme, groundnut oil'
    ],
    method: 'Brine overnight, drain hard, fry at 180 until the thickest part hits 75°C, rest four minutes, then fry again at 200 for 90 seconds. The rest is not optional — it is the difference between chicken that stays juicy and chicken that goes to rubber.',
    allergens: [],
    pairs: ['party-jollof', 'wings-8', 'chapman'],
    available: true
  },

  'jollof-plantain': {
    name: 'Jollof + 3 pcs plantain',
    group: 'rice',
    price: 340000,
    serves: 'Serves 1–2',
    prep: '28 min',
    heat: 0,
    photo: '1512058564366-18510be2db19',
    blurb: 'For the people who came for the rice and did not want chicken. We do not judge that either.',
    long: 'Ripe plantain, not green, cut three-quarters of an inch thick and soaked in salted water for ten minutes so the centres cook at the same rate as the outsides. Fried in groundnut oil rather than vegetable, which is why it tastes like something instead of tasting like oil. Squeezed with lime on request, which nobody asks for and everybody who tries it comes back for.',
    parts: [
      '3 ripe plantain, cut thick',
      'Salted water, for the soak',
      'Groundnut oil, 170°C',
      'Lime, on request'
    ],
    method: 'Soak, drain, dry completely. Wet plantain in hot oil spits across the pass and the cook swears at you. Fry 4 minutes a side, salt the second it leaves the oil, because salted on the outside keeps the middle sweet.',
    allergens: [],
    pairs: ['party-jollof', 'zobo', 'suya-chicken'],
    available: true
  },

  'fried-rice-chicken': {
    name: 'Fried rice + chicken strips',
    group: 'rice',
    price: 510000,
    serves: 'Serves 2',
    prep: '32 min',
    heat: 2,
    photo: '1603133872878-684f208fb84b',
    blurb: 'Wok-charred, with garden egg and Scotch bonnet. Mild unless you say otherwise.',
    long: 'Chicken thigh meat, sliced and seared hard before it ever sees the rice, which is the only way to get strips that taste like chicken and not like warm rubber. Day-old rice only, which is why it is not on the board before 12:00 — we have not finished yesterday\'s yet. Heat level is a genuine choice, not a slider: mild means no bonnet at all, and "it proper" means the cook decides based on how the afternoon is going.',
    parts: [
      '1.2kg day-old fried rice base',
      'Thigh meat, 180g, sliced and seared',
      'Garden egg, green pepper, onion',
      '0 or 1 Scotch bonnet — your call',
      'Oyster sauce, soy, white pepper'
    ],
    method: 'Wok at 400°C. Chicken seared in batches first so it does not stew, vegetables after, rice last so it fries rather than steams. If the wok smokes when the rice goes in, that is the correct smoke.',
    allergens: ['soy', 'shellfish (oyster sauce)'],
    pairs: ['scotch-wings-10', 'guinness', 'whole-fried'],
    available: true
  },

  'ofada': {
    name: 'Ofada rice + 2 pcs chicken',
    group: 'rice',
    price: 740000,
    serves: 'Serves 2',
    prep: '90 min',
    heat: 1,
    photo: '1585032226651-759b368d7246',
    blurb: '90 minutes, wrapped and steamed. We stop taking it at 18:00 and we mean it.',
    flags: ['slow'],
    long: 'The most expensive thing on this menu and the hardest to run, because ofada is not a 90-minute dish you speed up. The rice is wrapped individually in leaves, steamed for 70, then fried hard. We stop taking it at 18:00 because an ofada that arrives at 20:00 has been in a bag for two hours and there is no fixing that. If you want it, order by 17:00, and we will tell you honestly at the gate if we are going to miss.',
    parts: [
      '1kg ofada rice, washed and seasoned',
      'Individual leaves, wrapped and steamed 70 min',
      '2 pcs fried chicken, thigh and breast',
      'Tomato and pepper stew',
      'Groundnut oil, for the final fry'
    ],
    method: 'Steamed in the leaf, never boiled, which is the whole point and the whole wait. Fried 6 minutes at the end only, so the outside chars and the inside stays separate grains. The stew is made the same morning and is the only part we can be slightly late on.',
    allergens: [],
    pairs: ['zobo', 'rotisserie-half', 'jollof-chicken'],
    available: true
  },

  /* ---------------- THE WHOLE BIRD ---------------- */
  'whole-fried': {
    name: 'Whole fried chicken, 1.4kg',
    group: 'bird',
    price: 980000,
    serves: 'Feeds 4',
    prep: '55 min',
    heat: 1,
    photo: '1532550907401-a500c9a57435',
    blurb: 'The dish the place is named after. Dipped in malt, fried twice, bone in.',
    flags: ['picks', 'bone-in'],
    long: 'This is the reason the door is where it is. A whole bird at 1.4kg, marinated overnight in malted drink, vinegar, garlic and ginger, then dipped in seasoned flour and fried twice. It comes out with the skin like a shell. It is bone-in and it is not deconstructed for you — we have been asked to serve it in pieces and we have declined every time, because the whole bird is the point and a plate of chicken nuggets is a different business.',
    parts: [
      '1.4kg whole chicken, bone in',
      'Overnight marinade: malt, vinegar, garlic, ginger',
      'Seasoned flour, twice dipped',
      'Fried at 190°C, then rested and fried at 205°C',
      'Coleslaw and plantain, on the house'
    ],
    method: 'Marinated 14 hours, minimum. First fry at 190 for 22 minutes, rested uncovered for 10, second fry at 205 for 6. The rest between is what gives you the second-crisp skin. We cook two at a time and there are usually a waitlist at 13:00 on Saturdays.',
    allergens: ['gluten'],
    pairs: ['party-jollof', 'fried-plantain', 'chapman'],
    available: true
  },

  'rotisserie-half': {
    name: 'Rotisserie half chicken',
    group: 'bird',
    price: 640000,
    serves: 'Feeds 2',
    prep: '40 min',
    heat: 1,
    photo: '1544025162-d76694265947',
    blurb: 'Turns all afternoon on the spit, skin saltier than you expect. Pepper sauce on the side.',
    flags: ['bone-in'],
    long: 'Two birds on the spit from 11:00 and they turn until they are gone, which on a good day is around 15:00. Salted 14 hours before with a dry rub — no marinade, because you cannot marinate something that has to sit over heat for six hours. The skin comes out saltier than people expect and that is intentional. The pepper sauce travels in a separate cup for the same reason it does with the fried: it is sharp, and sharp things belong on the chicken.',
    parts: [
      'Half a spit-roasted chicken',
      'Dry rub: coarse salt, paprika, garlic powder',
      'Sharp pepper sauce, separate cup',
      'Two slices of agege bread',
      'Basting every 20 min from 11:00'
    ],
    method: 'Dry-brined overnight. On the spit at 11:00, basted every 20 minutes, pulled at 15:00 or when the internal temperature says so. Sold until it is gone, and we take it off the board rather than sell you the last of the afternoon batch.',
    allergens: ['gluten'],
    pairs: ['ofada', 'coleslaw', 'guinness'],
    available: true
  },

  'grilled-half': {
    name: 'Grilled half chicken, quartered',
    group: 'bird',
    price: 560000,
    serves: 'Feeds 2',
    prep: '35 min',
    heat: 1,
    photo: '1562967916-eb82221dfb92',
    blurb: 'Charcoal, no marinade, just salt and time. The skin is the point.',
    flags: ['gluten-free'],
    long: 'Quartered, salted, straight onto the charcoal. No marinade and no butter — a half chicken that has been marinated for six hours is a half chicken that has been steamed. This one gets salt, lemon, and 35 minutes over a fire we keep at 300°C by hand. It is the least dressed thing on this menu and it is the one the cooks argue we should put in the window.',
    parts: [
      'Half a chicken, quartered',
      'Salt, lemon, nothing else',
      'Charcoal, held at 300°C by hand',
      'Turned 4 times, 35 min',
      'Yoghurt and pepper sauce, on the house'
    ],
    method: 'Salted one hour before, not marinated. Onto the charcoal at 300°C, quartered flat so the skin faces down and crisps. Turned every 8 minutes. The yoghurt dip is made at 9am and that is why it is on the house — it costs us almost nothing and it makes the heat manageable.',
    allergens: ['dairy'],
    pairs: ['suya-skewers', 'guinness', 'fried-rice-chicken'],
    available: true
  },

  'butter-chicken': {
    name: 'Butter chicken, 8 pcs',
    group: 'bird',
    price: 690000,
    serves: 'Serves 2',
    prep: '35 min',
    heat: 1,
    photo: '1555939594-58d7cb561ad1',
    blurb: 'Tomato, cream, fenugreek, and a charcoal finish on top. Mild, and properly rich.',
    long: 'The one non-Nigerian thing on the board and the third most ordered, which surprised everyone including us. Thigh meat simmered in tomato, cream, ginger and dried fenugreek for 25 minutes, then finished under the charcoal for four minutes so it tastes like it came off a fire and not out of a pot. It is mild. People order it, eat it, and then order the suya chicken next time, which is the correct arc.',
    parts: [
      '8 pcs boneless thigh, 240g',
      'Tomato, cream, ginger, garlic',
      'Dried fenugreek, 1 tsp, not more',
      'Charcoal finish, 4 min',
      'Naan or jollof, your call'
    ],
    method: 'Simmered 25 minutes in the masala, never boiled hard — cream splits if you push it. Fenugreek is measured with a teaspoon because it will take over the dish if you let it. Finished under the grill for 4 minutes, which is the part that makes people say "this is different".',
    allergens: ['dairy'],
    pairs: ['party-jollof', 'mango', 'whole-fried'],
    available: true
  },

  'suya-chicken': {
    name: 'Suya chicken, 6 pcs',
    group: 'bird',
    price: 550000,
    serves: 'Serves 2',
    prep: '30 min',
    heat: 2,
    photo: '1546069901-ba9599a7e63c',
    blurb: 'Groundnut, ginger, uda, Scotch bonnet, then charcoal. You will need the napkins.',
    long: 'Six pieces of thigh, rolled in groundnut, ginger, uda and suya spice, then finished over charcoal so the nut catches and goes dark. This is the hottest thing we sell and it is not close — the suya spice has a real quantity of Scotch bonnet in it and we do not water it down for anyone. The groundnut goes soft in a bag, so it travels in a pot with the chicken in it rather than dusted on top, which is a slower and more expensive pack and the reason this costs what it does.',
    parts: [
      '6 pcs boneless thigh',
      'Groundnut, roasted and blended',
      'Ginger, uda, suya spice, Scotch bonnet',
      'Charcoal finish, 6 min',
      'Packed wet, because dry suya does not survive'
    ],
    method: 'Rolled in the nut mix off-heat, then straight onto the charcoal. Never marinated overnight — the nut goes rancid by morning. Packed in a pot rather than a box, which adds four minutes to the pack and is non-negotiable.',
    allergens: ['peanut'],
    pairs: ['zobo', 'jollof-plantain', 'grilled-half'],
    available: true
  },

  /* ---------------- WINGS & TENDERS ---------------- */
  'wings-8': {
    name: 'Chicken wings, 8 pcs',
    group: 'wings',
    price: 480000,
    serves: 'Serves 2',
    prep: '30 min',
    heat: 1,
    photo: '1519690889869-e705e59f72e1',
    blurb: 'Overnight in ginger and vinegar, baked then grilled. Backs only on request.',
    long: 'Marinated 14 hours in ginger, vinegar and a little sugar, baked at 200°C for 32 minutes and finished under the grill for the skin. Wing backs are a real request we get weekly and they are a different price, so put it in the notes rather than assuming we will notice. Honey and chilli glaze is an option and it is not on the price.',
    parts: [
      '8 pcs chicken wings',
      'Overnight marinade: ginger, vinegar, sugar',
      'Backs instead of flats, on request',
      'Honey and chilli glaze, optional',
      '30 min from acceptance'
    ],
    method: 'Marinated 14 hours minimum. Baked 32 minutes at 200°C, then 8 minutes under the grill for skin. Backs take 6 minutes less, which is why they are not just a swap — ask in the notes and we will time it properly.',
    allergens: [],
    pairs: ['fried-rice-chicken', 'guinness', 'jollof-chicken'],
    available: true
  },

  'scotch-wings-10': {
    name: 'Scotch bonnet wings, 10 pcs',
    group: 'wings',
    price: 520000,
    serves: 'Serves 2',
    prep: '30 min',
    heat: 3,
    photo: '1562967916-eb82221dfb92',
    blurb: 'Heat 3 of 3. There is no mild version of this and we will not make one.',
    long: 'Wings tossed in a marinade with a genuinely unreasonable amount of Scotch bonnet, then fried. This is the only item on the menu we put a heat rating of 3 on. People finish it and drink a litre of water and order it again two weeks later. If you want hot, order the wings. If you want hot but survivable, order suya chicken and stand near the fan.',
    parts: [
      '10 pcs chicken wings',
      'Scotch bonnet, 12 per wing-bowl',
      'Vinegar, garlic, ginger, brown sugar',
      'No cooling dip provided, on purpose',
      '30 min from acceptance'
    ],
    method: 'Tossed raw in the marinade, which means the heat is in the oil and it does not cook off. Fried at 180, not 200, so the skin is not bitter. The number of peppers is a decision the cook makes twice a day and he has never once made it milder for a complaint.',
    allergens: [],
    pairs: ['zobo', 'suya-chicken', 'whole-fried'],
    available: true
  },

  'tenders-8': {
    name: 'Chicken tenders, 8 pcs',
    group: 'wings',
    price: 420000,
    serves: 'Serves 2',
    prep: '28 min',
    heat: 1,
    photo: '1540189549336-e6e99c3679fe',
    blurb: 'Buttermilk and breadcrumb, three of them plain. The plain ones are the ones you finish.',
    flags: ['kids'],
    long: 'Eight strips of thigh, brined in buttermilk and a little lemon overnight, crumbed, fried. This is the item the children order and the one that quietly disappears before the wings do. Three of the eight come out plain, because we have never been able to work out why putting sauce on a tender makes it worse. Four dips come with it and you will use two.',
    parts: [
      '8 strips thigh, 240g total',
      'Buttermilk brine, overnight',
      'Crumb, fried 5 min at 180',
      '3 pcs plain, by default',
      'Four dips: mayo, honey mustard, suya, BBQ'
    ],
    method: 'Brined overnight in buttermilk with lemon. Crumbed and dropped at 180 for 5 minutes so the crumb sets before it colours. Dips made fresh at 10:00 and replaced at 15:00, which is the only thing on this menu with a hard expiry time.',
    allergens: ['gluten', 'dairy'],
    pairs: ['coleslaw', 'fried-plantain', 'chapman'],
    available: true
  },

  'nuggets-8': {
    name: 'Nuggets, 8 pcs',
    group: 'wings',
    price: 320000,
    serves: 'Serves 1',
    prep: '20 min',
    heat: 0,
    photo: '1626645738196-c2a7c87a8f58',
    blurb: 'You missed the 12:00 tray. We press another at 16:00 and we cannot promise.',
    long: 'We make these in two trays a day and that is the entire supply, because we are a chicken shop and this is the item we are least proud of, sold at a price that is close to rude. It is on the menu because people ask for it, not because we think it is good. Tray one at 12:00, tray two at 16:00, and when both are gone the page updates on its own and the item disappears.',
    parts: [
      '8 pcs, from the 12:00 or 16:00 tray',
      'Chicken thigh, processed, honestly',
      'Standard breadcrumb',
      'No dips, the tray is already a lot',
      'Two trays a day, no more'
    ],
    method: 'Pressed raw, crumbed, fried at 180 for 4 minutes. Made twice a day in trays of 60 and not a piece more, because we are not a chicken shop that makes nuggets, we are a chicken shop that has them on the menu so that somebody at a table with a child gets to say yes to something.',
    allergens: ['gluten'],
    pairs: ['mango', 'chapman', 'egg-roll'],
    available: false
  },

  'platter-4': {
    name: 'Wings platter for 4, 20 pcs + 2 dips',
    group: 'wings',
    price: 1150000,
    serves: 'Feeds 4',
    prep: '45 min',
    heat: 2,
    blurb: 'Ten plain, ten Scotch bonnet, laid out on a tray so you can see what you are agreeing to.',
    flags: ['sharing'],
    long: 'Ten plain wings and ten Scotch bonnet wings on one tray, with four dips instead of two, because at this point the argument about who gets what has already happened. The two kinds are laid out in separate rows on purpose — we have served this mixed at a table and it does not end well. Add a large tub of coleslaw for ₦1,800 and you have a table.',
    parts: [
      '10 pcs plain wings',
      '10 pcs Scotch bonnet wings',
      '4 dips, 2 of them the hot ones',
      'Tray, napkins, wet wipes',
      'Coleslaw tub ₦1,800 extra'
    ],
    method: 'Both batches fried in the same window, ten minutes apart, and plated in rows. The dip pots are filled at the pass, not in the kitchen, so that we can see the order leave with four lids on. 45 minutes is the honest number for the whole tray, not per batch.',
    allergens: ['gluten'],
    pairs: ['coleslaw', 'fried-plantain', 'guinness'],
    available: true
  },

  /* ---------------- SIDES ---------------- */
  'coleslaw': {
    name: 'Coleslaw, large tub',
    group: 'sides',
    price: 180000,
    serves: 'Shareable',
    prep: '10 min',
    heat: 0,
    photo: '1512621776951-a57141f2eefd',
    blurb: 'Cabbage, carrot, chukka. No pineapple. We have arguments about this internally.',
    flags: ['gluten-free'],
    long: 'Shredded cabbage, carrot, chukka, a little onion, and a mayo and vinegar dressing made at 9am. Nothing else. There is a version with pineapple in it and it is a different dish, it is sweeter, and it does not belong next to chicken. This is the tub that comes with the whole bird free, and it keeps three days in a fridge, which we mention because people buy two.',
    parts: [
      'Cabbage, shredded fine',
      'Carrot, grated',
      'Chukka, pounded',
      'Mayo, vinegar, a little sugar',
      'No pineapple. Genuinely none.'
    ],
    method: 'Dressed at 9am and not again until it is gone, so it does not go watery. Shaved, not chopped — a knife is for onions, a peeler is for this.',
    allergens: [],
    pairs: ['whole-fried', 'platter-4', 'tenders-8'],
    available: true
  },

  'fried-plantain': {
    name: 'Fried plantain, 6 pcs',
    group: 'sides',
    price: 160000,
    serves: 'Shareable',
    prep: '18 min',
    heat: 0,
    photo: '1476224203421-9ac39bcb3327',
    blurb: 'The obligatory one. Groundnut oil, salted the second it leaves the pot.',
    flags: ['vegan', 'gluten-free', 'dairy-free'],
    long: 'Six pieces of ripe plantain, cut thick, soaked in salted water, fried in groundnut oil and salted while still too hot to handle. This comes free with the whole fried chicken because a whole bird with nothing next to it is a sad plate, and it is the single most ordered add-on, which tells you what people actually want. We fry in batches all day so it is almost never a wait.',
    parts: [
      '6 pcs ripe plantain',
      'Salted water soak, 10 min',
      'Groundnut oil, 170°C',
      'Salted on removal',
      'Free with the whole fried chicken'
    ],
    method: 'Batches all day, every 40 minutes, so there is a warm one whenever you order. Soaked, dried, 4 minutes a side. We salt after and not before, because salted before it goes into the water and pulls the sweetness out of the middle.',
    allergens: [],
    pairs: ['whole-fried', 'grilled-half', 'guinness'],
    available: true
  },

  'suya-skewers': {
    name: 'Suya skewers, 6 pcs',
    group: 'sides',
    price: 440000,
    serves: 'Shareable',
    prep: '25 min',
    heat: 2,
    photo: '1563245372-f21724e3856d',
    blurb: 'Beef, because we are a chicken shop and this is the one thing on the board that is not chicken.',
    long: 'Thin-sliced beef rolled in groundnut, ginger, uda and suya spice and grilled over open flame. We are a chicken shop and this is here because someone will always ask, and because the grill is already lit. Six skewers, not twelve — this is a side plate, not a meal, and we have stopped pretending otherwise. Travels badly, so the nut comes in a separate cup and you roll them yourself at the gate.',
    parts: [
      '6 skewers, thin-sliced beef',
      'Groundnut, roasted and blended',
      'Ginger, uda, suya spice',
      'Nut in a separate pot, on purpose',
      'Red onion, lime, tomato'
    ],
    method: 'Sliced against the grain by hand. Rolled off-heat so the nut does not burn before it hits the fire, then 3-minute turns over open flame, 9 minutes total. The nut travels separate because groundnut goes soft in a bag and flat.',
    allergens: ['peanut'],
    pairs: ['grilled-half', 'zobo', 'chapman'],
    available: true
  },

  'egg-roll': {
    name: 'Egg roll, 2 pcs',
    group: 'sides',
    price: 160000,
    serves: 'Serves 1',
    prep: '22 min',
    heat: 0,
    photo: '1504674900247-0877df9cc836',
    blurb: 'Sardine, egg, pastry. The cheapest thing here and the first thing to go.',
    long: 'Puff pastry, sardine and egg, baked to order because pastry that sits is pastry that is not crisp. It is the cheapest item on this menu and the first to sell out every day, because by 13:00 the office crowd from Allen Avenue comes down expecting exactly this. We bake 12 an hour and when they go the page says so.',
    parts: [
      'Puff pastry',
      'Tinned sardine in tomato',
      '2 eggs, boiled and sliced',
      'Chives, a little chilli',
      'Baked 18 min at 200°C'
    ],
    method: 'Filled raw, baked to order, 18 minutes at 200°C. The only item here that is genuinely ready-to-serve in a bag, which is also why it is usually gone by 13:15.',
    allergens: ['gluten', 'fish', 'egg'],
    pairs: ['chapman', 'zobo', 'mango'],
    available: true
  },

  /* ---------------- COLD DRINKS ---------------- */
  'chapman': {
    name: 'Chapman, 500ml',
    group: 'drinks',
    price: 120000,
    serves: 'Serves 1',
    prep: '2 min',
    heat: 0,
    photo: '1546173159-315724a31696',
    blurb: 'Mixed in-house, not from a factory bottle. Tastes different every batch.',
    flags: ['vegan'],
    long: 'Mixed at the back of the kitchen, two hours a day, in a jug that is not wiped down between batches because the recipe is a ratio and not a formula. Pineapple, grapefruit, ginger, and a small amount of something that makes the grapefruit bitter enough to notice. It tastes slightly different every time and always slightly different from last week, and we have decided that is a feature and not a supply problem.',
    parts: [
      'Pineapple, blended',
      'Grapefruit, not orange',
      'Ginger, grated',
      'A small amount of something bitter',
      '500ml, filled cold'
    ],
    method: 'Three batches through the afternoon. Never chilled ingredients, because cold fruit tastes flat — everything goes in at room temperature and the jug goes in the fridge afterwards. Two hours of shelf life in the jug, after that it separates and we bin it.',
    allergens: [],
    pairs: ['suya-chicken', 'jollof-chicken', 'whole-fried'],
    available: true
  },

  'zobo': {
    name: 'Zobo hibiscus, 1L',
    group: 'drinks',
    price: 150000,
    serves: 'Serves 3–4',
    prep: '2 min',
    heat: 0,
    photo: '1497534446932-c925b458314e',
    blurb: 'Brewed at 5am from dried hibiscus and ginger. The refill is free, ask the rider.',
    flags: ['vegan', 'sugar-free'],
    long: 'Dried hibiscus and ginger root, brewed at 05:00 and left until 18:00, which is a long steep and the reason it is dark and slightly tart rather than pink and sweet. No sugar added — the sweetness is dried pineapple and ginger and nothing else. Every litre includes a refill and the rider is instructed to hand it over on the gate, not to wait around and take a plastic bottle back.',
    parts: [
      'Dried hibiscus roselle, steeped 13 hrs',
      'Ginger root, bruised',
      'Dried pineapple',
      'No added sugar, ever',
      '1L with a refill'
    ],
    method: 'Steeped cold overnight, never boiled — boiling kills the colour and leaves a woody taste that you cannot mask. Strained at 18:00 and that is the whole day\'s batch. The refill is why it is ₦1,500 for a litre and not ₦2,500.',
    allergens: [],
    pairs: ['suya-chicken', 'suya-skewers', 'ofada'],
    available: true
  },

  'guinness': {
    name: 'Guinness, 500ml',
    group: 'drinks',
    price: 130000,
    serves: 'Serves 1',
    prep: '1 min',
    heat: 0,
    photo: '1437418747212-8d9709afab22',
    blurb: 'From the fridge out back, which is warmer than it should be. We say 11°C because that is true.',
    flags: ['vegan'],
    long: 'A 500ml bottle of stout from the fridge behind the kitchen. The fridge is behind the kitchen because the kitchen is 41°C by 19:00 and nobody has found a way to move it. We will serve it at 11°C if you wait, and we say 11°C because a fridge in Ikeja in March is not going to give you 6°C and we would rather be honest than promise a temperature we cannot hit.',
    parts: [
      '500ml bottle, stout',
      'From one fridge, behind the kitchen',
      'Serve at 11°C, realistically',
      'No ice, because ice costs ₦200'
    ],
    method: 'Nothing happens. We open it and hand it to the rider. The only thing worth knowing is the temperature, and the only thing we control is how long it sits out before the bag closes.',
    allergens: ['gluten'],
    pairs: ['scotch-wings-10', 'grilled-half', 'platter-4'],
    available: true
  },

  'mango': {
    name: 'Mango smooth, 400ml',
    group: 'drinks',
    price: 220000,
    serves: 'Serves 1',
    prep: '3 min',
    heat: 0,
    photo: '1600271886742-f049cd451bba',
    blurb: 'Real mango, blended this morning. Thick enough that the straw complains.',
    flags: ['vegan', 'sugar-free'],
    long: 'Mango bought at Oyingbo on Tuesday, blended with a little banana for body and ice for thickness. No sugar, no concentrate, no powder — which is why the price moves with the fruit and why we take it off the board for a few days when the mango gets expensive. A 400ml cup is heavy. It will not sit next to rice in a bag without becoming a problem, and we will tell you that at checkout rather than after.',
    parts: [
      '400ml, real mango',
      '1 small banana, for body',
      'Ice, no sugar',
      'Blended on order, not from a jug'
    ],
    method: 'Blended per order, not batched, because it separates in five minutes. Served in a lid tested against a bag lying flat. The banana is not on the board because it is not the point, but it is why it is not gritty.',
    allergens: [],
    pairs: ['suya-chicken', 'nuggets-8', 'tenders-8'],
    available: true
  }

};

window.DISH_GROUPS = [
  { id: 'rice',  name: 'Rice & Jollof',  note: 'Every bowl comes with chicken. There is no plain rice here.' },
  { id: 'bird',  name: 'The Whole Bird', note: 'The reason the sign out front says what it says' },
  { id: 'wings', name: 'Wings & Tenders', note: 'Fried twice, because once is not enough' },
  { id: 'sides', name: 'Sides',        note: 'Made in the same kitchen, the same afternoon' },
  { id: 'drinks', name: 'Cold Drinks',  note: 'No soft drinks from a bottle shop' }
];
