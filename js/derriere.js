/* Meshkanau : « Derrière le mot »
   ----------------------------------------------------------------------------
   Volet facultatif des fiches : un petit dessin au trait et une courte
   explication sur la provenance d'un mot. Il s'ouvre seulement si on le touche,
   ne joue aucun son tout seul et n'apparaît jamais pendant une question de défi
   (seulement après la correction).

   AJOUTER UNE FICHE
   - Ajouter une entrée dans DM_MOTS, avec l'id du mot (WORDS dans index.html).
   - t : texte du mode 📖 Écrit (mots innus en <i>…</i>).
   - o : texte du mode 👂 Oral, sans mot innu écrit (on l'entend ou on le lit
         à l'enfant).
   - pic : dessin facultatif (clé de DM_PICS). Sans dessin approprié, on
         n'en met pas : l'explication suffit.
   - src : clés de DM_SOURCES.
   - groupe : texte commun à une thématique (clé de DM_GROUPES), facultatif.
   - statut : 'à valider' tant qu'une personne locutrice de Uashat n'a pas
         confirmé l'explication; 'validé' ensuite (avec vsrc).
   Une explication « possible » reste présentée comme une piste, jamais comme
   une certitude. Ne rien ajouter qui ne vient pas d'une source ou d'une
   personne de la communauté.
   ---------------------------------------------------------------------------- */

const DM_SOURCES = {
  V6: { label: 'Yvette Mollen, « Les couleurs » (fiche V6-f), 2017', url: 'https://www.innu-aimun.ca/wp-content/uploads/2017/07/V6-f.pdf' },
  V4: { label: 'Yvette Mollen, « Mois de l’année » (fiche V4-f), 2017', url: 'https://www.innu-aimun.ca/wp-content/uploads/2017/07/V4-f.pdf' },
  V3: { label: 'Yvette Mollen, « Jour de la semaine » (fiche V3-f), 2017', url: 'https://www.innu-aimun.ca/wp-content/uploads/2017/07/V3-f.pdf' },
  ML: { label: 'Liste « Months of the Year », innu-aimun.ca', url: 'https://www.innu-aimun.ca/english/dictionaries/vocabulary-lists/months-of-the-year/' }
};

const DM_GROUPES = {
  mois: { t: '<i>Pishimᵘ</i> veut dire le soleil ou la lune, et aussi un mois.', o: 'Dans les noms des mois, on entend le mot qui veut dire le soleil ou la lune, et aussi un mois.' }
};

/* Dessins au trait (viewBox 0 0 40 40, ou 0 0 60 40 pour les jours). Couleur : currentColor. */
const DM_PICS = {
  ciel: '<circle cx="27" cy="12" r="4.5"/><path d="M27 4.5v1.5M27 18v1.5M19.5 12H21M33 12h1.5M21.7 6.7l1 1M31.3 16.3l1 1M32.3 6.7l-1 1M22.7 16.3l-1 1"/><path d="M4 32h32"/>',
  aurore: '<path d="M4 29h32"/><path d="M13 29a7 7 0 0 1 14 0"/><path d="M20 15v4M10.5 19l2.6 2.6M29.5 19l-2.6 2.6M6 25h3M31 25h3"/>',
  goutte: '<path d="M20 7c-5 7-8 11.5-8 16a8 8 0 0 0 16 0c0-4.5-3-9-8-16z"/><path d="M16.5 24.5a3.6 3.6 0 0 0 2.4 3.3"/>',
  perdrix: '<path d="M9 25c0-6 5-9.5 11-9.5 2 0 3.4-3.6 6-3.6 2.4 0 3.6 1.8 3.6 3.6l3 .9-3 .9c-.4 6.4-5.4 11.2-12.6 11.2C12 28.5 9 27 9 25z"/><path d="M9 25l-4-2.5M16 28.5v3M21 28.5v3"/><circle cx="26.6" cy="14.4" r=".9" fill="currentColor" stroke="none"/>',
  vagues: '<path d="M4 19c4-4 8-4 12 0s8 4 12 0 6-3 8-1"/><path d="M4 27c4-4 8-4 12 0s8 4 12 0 6-3 8-1"/>',
  vagues_aurore: '<path d="M14 15a6 6 0 0 1 12 0"/><path d="M5 15h30" stroke-dasharray="2 3"/><path d="M4 23c4-4 8-4 12 0s8 4 12 0 6-3 8-1"/><path d="M4 31c4-4 8-4 12 0s8 4 12 0 6-3 8-1"/>',
  flamme: '<path d="M20 6c1 6 8 9 8 17a8 8 0 0 1-16 0c0-4 2-6 4-8 0 3 1.5 4.5 3 5 0-5-1-9 1-14z"/>',
  baies: '<circle cx="15" cy="25" r="5"/><circle cx="25" cy="25" r="5"/><circle cx="20" cy="17" r="5"/><path d="M20 12c0-3 2-5 5-6"/>',
  pleine_lune: '<circle cx="20" cy="20" r="13"/>',
  croissant: '<path d="M24 11a8 8 0 1 0 5 13 6.4 6.4 0 1 1-5-13z"/>',
  canard: '<path d="M4 31h32"/><path d="M10 25c0-4 4-6 9-6h3c0-3 2-6 5-6s4.5 2 4.5 4l3.5 1-3.5 1c0 4-2 6-6 7.5-4 1.5-15 1.5-15.5-1.5z"/><circle cx="28" cy="16" r=".9" fill="currentColor" stroke="none"/>',
  oies: '<path d="M5 19c3-1 5 0 7 2 2-2 4-3 7-2"/><path d="M19 11c3-1 5 0 7 2 2-2 4-3 7-2"/><path d="M20 29c3-1 5 0 7 2 2-2 4-3 7-2"/>',
  fleur: '<circle cx="20" cy="9" r="3.6"/><circle cx="25.2" cy="12.8" r="3.6"/><circle cx="23.2" cy="18.9" r="3.6"/><circle cx="16.8" cy="18.9" r="3.6"/><circle cx="14.8" cy="12.8" r="3.6"/><circle cx="20" cy="14.4" r="1.6" fill="currentColor" stroke="none"/><path d="M20 22.5V36M20 31c-2-3-5-4-7-3.5 1 3 4 4 7 3.5"/>',
  envol: '<path d="M8 20c3-6 7-7 12-2 5-5 9-4 12 2"/><path d="M20 18v2"/><path d="M4 34h32" stroke-dasharray="3 3"/><path d="M14 30l1.5-3M20 30v-3.5M26 30l-1.5-3"/>',
  panache: '<path d="M18 33V22c-4-1-7-5-7-10M11 12l-3-4M11 12l4-4M18 22c-2-3-1-6 1-8M22 33V22c4-1 7-5 7-10M29 12l3-4M29 12l-4-4M22 22c2-3 1-6-1-8"/>',
  feuille: '<path d="M10 30C9 18 17 9 31 8c1 13-7 22-21 22z"/><path d="M10 30l13-14M15 25h6M19 21l1-5"/>',
  poisson: '<path d="M6 20c5-7 15-8 22 0-7 8-17 7-22 0z" fill="currentColor"/><path d="M28 20l7-5v10z" fill="currentColor"/>'
};

/* Les jours : six points pour les jours de travail (lundi à samedi), le jour du mot en plein. */
function dmSemaine(i) {
  let s = '';
  for (let k = 0; k < 6; k++) {
    const x = 7 + k * 9.2;
    s += k === i ? '<circle cx="' + x + '" cy="20" r="4.6" fill="currentColor"/>' : '<circle cx="' + x + '" cy="20" r="2.6"/>';
  }
  return s;
}

const DM_MOTS = {
  /* ---------- Les couleurs (fiche V6-f) ---------- */
  c_blue: { pic: 'ciel', src: ['V6'],
    t: 'Ce mot est rapproché de <i>uasheshkuan</i> : « le ciel est clair, dégagé ».',
    o: 'Ce mot ressemble au mot innu qui veut dire « le ciel est clair, dégagé ».' },
  c_white: { pic: 'aurore', src: ['V6'],
    t: 'Ce mot est rapproché de <i>uapan</i> : « c’est l’aurore ». On le retrouve aussi dans le vert pâle, <i>Kauapi-shipekut</i>.',
    o: 'Ce mot ressemble au mot innu qui veut dire « c’est l’aurore », la première lueur du jour. On l’entend aussi dans le mot du vert pâle.' },
  c_red: { pic: 'goutte', src: ['V6'],
    t: 'Ce mot est rapproché de <i>umikᵘ</i> : « du sang ». On le retrouve aussi dans le rouge vin, <i>Kaututshi-mikuat</i>.',
    o: 'Ce mot ressemble au mot innu qui veut dire « du sang ». On l’entend aussi dans le mot du rouge vin.' },
  c_wine: { src: ['V6'],
    t: 'Ce mot est rapproché de <i>utukau</i>, « quelque chose a un bleu, une ecchymose », et de <i>umikᵘ</i>, « du sang ».',
    o: 'Ce mot réunit deux idées : un bleu sur la peau (une ecchymose) et le sang, comme dans le mot du rouge.' },
  c_yellow: { src: ['V6'],
    t: 'Ce mot est rapproché de <i>uishupui</i> : la vésicule biliaire, un petit organe du corps.',
    o: 'Ce mot ressemble au mot innu qui désigne la vésicule biliaire, un petit organe du corps.' },
  c_grey: { pic: 'perdrix', src: ['V6'],
    t: 'Ce mot est rapproché de <i>uapineu</i> : la perdrix blanche.',
    o: 'Ce mot ressemble au mot innu qui désigne la perdrix blanche.' },
  c_black: { src: ['V6'],
    t: 'Ce mot vient de <i>kashteuau</i> : « quelque chose est noir ». On le retrouve dans le bleu marin, <i>kakashteu-uasheshkunat</i> : noir + ciel clair. Une autre façon de dire noir, <i>kauinipat</i>, est rapprochée de <i>uinnakuan</i> : « quelque chose est sale ».',
    o: 'Ce mot veut dire « quelque chose est noir ». On l’entend aussi dans le bleu marin, qui réunit « noir » et « ciel clair ».' },
  c_green: { pic: 'vagues', src: ['V6'],
    t: 'Ce mot est rapproché de <i>shipekᵘ</i> : « la mer, l’océan ».',
    o: 'Ce mot ressemble au mot innu qui veut dire « la mer, l’océan ».' },
  c_lgreen: { pic: 'vagues_aurore', src: ['V6'],
    t: 'Ce mot réunit <i>uapan</i>, « c’est l’aurore » (comme le blanc), et <i>shipekᵘ</i>, « la mer, l’océan » (comme le vert).',
    o: 'Ce mot réunit deux idées : l’aurore, comme dans le mot du blanc, et la mer, comme dans le mot du vert.' },
  c_orange: { pic: 'flamme', src: ['V6'],
    t: 'Ce mot est rapproché de <i>ishkuteu</i> : « du feu ».',
    o: 'Ce mot ressemble au mot innu qui veut dire « du feu ».' },
  c_brown: { src: ['V6'],
    t: 'Ce mot est rapproché de <i>tshishtemau</i> : « du tabac ».',
    o: 'Ce mot ressemble au mot innu qui veut dire « du tabac ».' },
  c_violet: { pic: 'baies', src: ['V6'],
    t: 'Ce mot est rapproché de <i>pitshi</i>, « quelque chose est gommeux », et de <i>min</i>, « un petit fruit, une baie ». Une autre façon de dire mauve, <i>kaminapushit</i>, est rapprochée de <i>minapui</i> : de la confiture, ici aux bleuets.',
    o: 'Ce mot réunit deux idées : quelque chose de gommeux et un petit fruit, une baie. Un autre mot pour le mauve fait penser à la confiture de bleuets.' },
  c_pink: { src: ['V6'],
    t: 'Ce mot est rapproché de <i>mitshinanu</i> : « quelque chose se mange, est comestible; on mange quelque chose ».',
    o: 'Ce mot ressemble au mot innu qui veut dire « quelque chose se mange, est bon à manger ».' },

  /* ---------- Les mois (fiche V4-f et liste de vocabulaire) ---------- */
  m01: { pic: 'pleine_lune', groupe: 'mois', src: ['V4', 'ML'],
    t: '<i>Tshishe-</i> donne un sens de grandeur, de maturité. Une liste de vocabulaire l’appelle le grand mois, celui des grands froids.',
    o: 'Le début du mot donne une idée de grandeur. C’est le grand mois, celui des grands froids.' },
  m02: { groupe: 'mois', src: ['V4'],
    t: 'Février a aussi un autre nom, <i>katakuapetshishishit</i>, rapproché de <i>takuapetshishishu</i> : « quelque chose est court ».',
    o: 'Février a aussi un autre nom en innu-aimun, qui ressemble au mot qui veut dire « quelque chose est court ».' },
  m03: { groupe: 'mois', src: ['V4', 'ML'],
    t: '<i>Uinashkᵘ</i> : un siffleux, une marmotte commune. C’est le mois du siffleux.',
    o: 'Le début du mot désigne le siffleux, la marmotte. C’est le mois du siffleux.' },
  m04: { pic: 'canard', groupe: 'mois', src: ['V4', 'ML'],
    t: '<i>Shiship</i> : un gibier d’eau, le canard. C’est le mois du canard.',
    o: 'Le début du mot désigne le canard. C’est le mois du canard.' },
  m05: { pic: 'oies', groupe: 'mois', src: ['V4', 'ML'],
    t: '<i>Nishk</i> : une oie, une outarde, une bernache du Canada. C’est le mois de l’oie.',
    o: 'Le début du mot fait penser à l’oie, à l’outarde. C’est le mois de l’oie.' },
  m06: { pic: 'fleur', groupe: 'mois', src: ['V4', 'ML'],
    t: '<i>Uapikun</i> : une fleur. C’est le mois des fleurs.',
    o: 'Le début du mot veut dire « une fleur ». C’est le mois des fleurs.' },
  m07: { groupe: 'mois', src: ['V4', 'ML'],
    t: '<i>Shetan</i> : la fête de Sainte-Anne, célébrée en juillet.',
    o: 'Le début du mot rappelle la fête de Sainte-Anne, en juillet.' },
  m08: { pic: 'envol', groupe: 'mois', src: ['V4', 'ML'],
    t: '<i>Upau</i> : « il s’envole ». Une liste de vocabulaire précise : le mois où les jeunes canards prennent leur envol pour la première fois.',
    o: 'Le début du mot veut dire « il s’envole » : le mois où les jeunes canards s’envolent pour la première fois.' },
  m09: { pic: 'panache', groupe: 'mois', src: ['V4', 'ML'],
    t: '<i>Ushkau</i> : « il (le caribou) a un nouveau panache, de nouveaux bois ». Une liste de vocabulaire parle plutôt des caribous mâles qui frottent leurs bois pour en retirer le velours.',
    o: 'Le début du mot parle du caribou et de son nouveau panache, ses nouveaux bois.' },
  m10: { pic: 'feuille', groupe: 'mois', src: ['V4', 'ML'],
    t: '<i>Uashtessiu</i> : « quelque chose jaunit (à l’automne) », comme les feuilles.',
    o: 'Le début du mot veut dire « quelque chose jaunit », comme les feuilles à l’automne.' },
  m11: { groupe: 'mois', src: ['V4', 'ML'],
    t: '<i>Takuatshin</i> : « c’est l’automne ». C’est le mois de l’automne.',
    o: 'Le début du mot veut dire « c’est l’automne ». C’est le mois de l’automne.' },
  m12: { pic: 'croissant', groupe: 'mois', src: ['V4', 'ML'],
    t: '<i>Pishimuss</i> : le petit mois. Une liste de vocabulaire précise : le mois où les jours sont plus courts.',
    o: 'Ce mot veut dire « le petit mois » : le mois où les jours sont plus courts.' },

  /* ---------- Les jours (fiche V3-f) ---------- */
  d_mon: { sem: 0, src: ['V3'],
    t: '<i>Ushkat</i> : « en premier, d’abord », et <i>atushkan</i> : « travail ». Le premier jour de travail.',
    o: 'Ce mot réunit « en premier » et « travail » : le premier jour de travail.' },
  d_tue: { sem: 1, src: ['V3'],
    t: '<i>Nishᵘ</i> : « deux », et <i>tshishikᵘ</i> : « jour ». Le deuxième jour.',
    o: 'Ce mot réunit « deux » et « jour » : le deuxième jour.' },
  d_wed: { sem: 2, src: ['V3'],
    t: '<i>Tetaut</i> : « au milieu, la moitié ». Mercredi a aussi un autre nom, <i>nishtu-tshishikau</i>, avec <i>nishtᵘ</i> : « trois ».',
    o: 'Ce mot veut dire « le jour du milieu ». Mercredi a aussi un autre nom, qui veut dire « le troisième jour ».' },
  d_thu: { sem: 3, src: ['V3'],
    t: '<i>Neu</i> : « quatre », et <i>tshishikᵘ</i> : « jour ». Le quatrième jour.',
    o: 'Ce mot réunit « quatre » et « jour » : le quatrième jour.' },
  d_fri: { pic: 'poisson', src: ['V3'],
    t: '<i>Namesh</i> : « un poisson », et <i>mueu</i> : « il mange quelque chose ». <i>Namesh-muakanu</i> veut dire, mot à mot, « on mange du poisson ».',
    o: 'Mot à mot, ce nom veut dire « on mange du poisson ».' },
  d_sat: { sem: 5, src: ['V3'],
    t: '<i>Mashten</i> : « le dernier, en dernier », et <i>atushkan</i> : « travail ». Le dernier jour de travail.',
    o: 'Ce mot réunit « en dernier » et « travail » : le dernier jour de travail.' },
  d_sun: { src: ['V3'],
    t: 'La fiche cite <i>minashtau</i> : « il fait son dimanche, ne travaille pas un jour férié ».',
    o: 'Ce mot fait penser à « faire son dimanche » : un jour sans travail.' }
};

/* Rendu d'un volet. ctx = 'fiche' (exploration) ou 'apres' (après la correction d'un défi). */
function derriereHTML(w, oral, ctx) {
  const d = w && DM_MOTS[w.id];
  if (!d) return '';
  const vb = d.sem !== undefined ? '0 4 60 32' : '0 0 40 40';
  const dessin = d.sem !== undefined ? dmSemaine(d.sem) : (d.pic ? DM_PICS[d.pic] : '');
  const pic = dessin ? '<svg class="dmpic" viewBox="' + vb + '" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' + dessin + '</svg>' : '';
  const g = d.groupe && DM_GROUPES[d.groupe];
  const srcs = (d.src || []).map(k => DM_SOURCES[k]).filter(Boolean)
    .map(s => '<a href="' + s.url + '" target="_blank" rel="noopener">' + s.label + '</a>').join(' · ');
  const statut = d.statut === 'validé'
    ? (d.vsrc || 'Validé')
    : 'Origine possible, à valider avec une personne locutrice de Uashat.';
  const typo = x => x.replace(/ ([:;»])/g, '\u00a0$1').replace(/« /g, '«\u00a0');
  return '<details class="dm dm-' + ctx + '"><summary>' + pic + '<span class="dmlabel">Derrière le mot</span></summary>'
    + '<div class="dmbody"><p>' + typo(oral ? d.o : d.t) + '</p>'
    + (g ? '<p class="dmgroupe">' + typo(oral ? g.o : g.t) + '</p>' : '')
    + '<p class="dmsrc">' + statut + (srcs ? ' Source' + (d.src.length > 1 ? 's' : '') + '\u00a0: ' + srcs + '.' : '') + '</p></div></details>';
}
