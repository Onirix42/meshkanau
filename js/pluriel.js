/* Meshkanau : le pluriel des noms (phase 2)
   ----------------------------------------------------------------------------
   Fichier lu par le jeu (index.html). Aucune donnée n'est tirée du dictionnaire
   par script : la règle et les exemples viennent des pages de grammaire
   d'innu-aimun.ca, des fiches G5-f et G6-f d'Yvette Mollen (2017) et de la
   leçon 3 des Leçons d'innu. Chaque forme garde sa source et son statut.

   La règle (innu-aimun.ca, « Le nombre des noms ») :
   - nom animé (NA, NAD)  : on ajoute -at    minush → minushat
   - nom inanimé (NI, NID): on ajoute -a     utapan → utapana
   - le petit u final (ᵘ) se prononce et s'écrit u devant la marque du pluriel :
     atikᵘ → atikuat (animé), mishtikᵘ → mishtikua (inanimé)
   - forme irrégulière connue : ush → uta (embarcation), d'où Utapana / Uta.

   Types renvoyés par Pluriel.info(w)
   - regle    : pluriel calculé avec la règle (statut « à valider »)
   - fiche    : pluriel donné tel quel par une fiche ou une source
   - toujours : le mot s'emploie au pluriel (des lunettes, les ancêtres…)
   - obv      : nom animé possédé par « il, elle » (son, sa) : marque de
                l'obviatif -a, même forme au singulier et au pluriel (fiche G5-f)
   - nc       : nom non comptable (sucre, lait, beurre…) : pas de pluriel
   - sens     : une seule chose par personne (sa tête, ma mère…) : pas de pluriel
                proposé dans le jeu
   - attente  : pluriel à confirmer avec l'équipe avant de l'afficher
   - aucun    : mot qui n'est pas un nom (verbe, particule, nombre, couleur…)
   ---------------------------------------------------------------------------- */

const PLURIEL_SRC = {
  regle: 'Règle d’innu-aimun.ca : -at pour un nom animé, -a pour un nom inanimé (fiches G5-f et G6-f d’Yvette Mollen, 2017; Leçons d’innu, leçon 3)',
  url: 'https://innu-aimun.ca/francais/grammaire/noms/le-nombre-des-noms/',
  G5: 'Exemple de la fiche G5-f « Le singulier et le pluriel : noms animés » (Yvette Mollen, 2017)',
  G6: 'Exemple de la fiche G6-f « Le singulier et le pluriel : noms inanimés » (Yvette Mollen, 2017)',
  grammaire: 'Exemple de la page « Le nombre des noms » d’innu-aimun.ca',
  lecon3: 'Leçons d’innu, leçon 3 : ush → uta (forme irrégulière)',
  fiche: 'Forme plurielle de la fiche de la thématique (affichée dans le jeu avant le 25 nov. 2026)'
};

/* Thématiques où le sélecteur Singulier | Pluriel est offert */
/* PLURIEL_THEMES (thématiques où le pluriel est offert) est dans js/catalogue.js */

/* Pluriels donnés tels quels par une source (priorité sur la règle).
   audio : enregistrement de la forme plurielle, s'il existe. */
const PLURIEL_FORMES = {
  /* Exemples des fiches de grammaire : la règle est confirmée mot pour mot */
  a_caribou: { pl: 'Atikuat', src: 'grammaire' },
  a_moose: { pl: 'Mushat', src: 'G5' },
  a_fox: { pl: 'Matsheshuat', src: 'G5' },
  g_g1_0: { pl: 'Minushat', src: 'grammaire' },
  g_g1_1: { pl: 'Atimuat', src: 'grammaire' },
  g_g1_8: { pl: 'Mitshuapa', src: 'G6' },
  g_g1_11: { pl: 'Utapana', src: 'grammaire' },
  t_car: { pl: 'Utapana', src: 'grammaire' },
  t_plane: { pl: 'Upashtamakanat', src: 'G5' },
  g_g2_3: { pl: 'Upashtamakanat', src: 'G5' },
  fl_apple: { pl: 'Uapiminat', src: 'G5' },
  fl_orange: { pl: 'Mishta-mina', src: 'G6' },
  cu_tablespoon: { pl: 'Emikuanat', src: 'G5', genre: 'A' },
  fa_obrother: { pl: 'Nishteshat', src: 'grammaire' },
  fa_ysibling: { pl: 'Nishimat', src: 'G5' },

  /* Embarcations : ush → uta (Leçons d'innu, leçon 3; titre « Utapana / Uta ») */
  t_canoe: { pl: 'Innu-uta', src: 'lecon3' },
  t_birchcanoe: { pl: 'Ushkuai-uta', src: 'lecon3' },

  /* Formes plurielles qui étaient affichées dans le jeu (fiches), avant le passage
     au singulier du 25 nov. 2026 */
  hair: { pl: 'Pishkueuna', src: 'fiche' },
  t_train: { pl: 'Ishkuteutapana', src: 'G6' },
  g_g1_12: { pl: 'Ishkuteutapana', src: 'G6' },
  fa_child: { pl: 'Nitauassimat', src: 'fiche', audio: 'https://www.atlas-ling.ca/sounds/Uashat-DVollant/family/These%20are%20my%20children-Uashat-DVollant.mp3', audioNote: 'Phrase enregistrée à Uashat : « Nitauassimat utshenat. » (Ce sont mes enfants.)', phrase: true },
  ve_gloves: { pl: 'Ninikashtishat', src: 'fiche' },
  ve_mittens: { pl: 'Ashtishat', src: 'fiche' },
  ve_socks: { pl: 'Mitashiapiu-mitasha', src: 'fiche' },
  ve_pishakan: { pl: 'Pishakanassina', src: 'fiche' },
  ve_mushuian: { pl: 'Mushuianassina', src: 'fiche' },
  ve_atikuian: { pl: 'Atikuianassina', src: 'fiche' },
  ve_atshikuian: { pl: 'Atshikuianassina', src: 'fiche' },
  ve_minauatshikuian: { pl: 'Minau-atshikuianassina', src: 'fiche' },
  ve_moccasin: { pl: 'Uakunassina', src: 'fiche' },
  ve_kamik: { pl: 'Katshekuashueussina', src: 'fiche' },
  ve_manituian: { pl: 'Manituianassina', src: 'fiche' },
  ve_uashkakun: { pl: 'Uashkakunassina', src: 'fiche' },
  ve_winterboot: { pl: 'Pipunassina', src: 'fiche' },
  ve_safety: { pl: 'Atusseussina', src: 'fiche' },
  ve_rubber: { pl: 'Pakupeutasha', src: 'fiche' },
  ve_boots: { pl: 'Kuekuatsheutasha', src: 'fiche' },
  ve_sneakers: { pl: 'Patshuianassina', src: 'fiche' },
  ve_dressshoes: { pl: 'Mishtikushiussina', src: 'fiche' },
  ve_slippers: { pl: 'Tshetshishepaussina', src: 'fiche' },
  ve_sandals: { pl: 'Tshishashteussina', src: 'fiche' },
  ve_clogs: { pl: 'Mishtikussina', src: 'fiche' },
  ve_overshoes: { pl: 'Shashapiussina', src: 'fiche' },
  cu_blueberries: { pl: 'Inniminana', src: 'fiche' },
  cu_strawberries: { pl: 'Uteiminana', src: 'fiche' },
  cu_lingonberries: { pl: 'Uishatshimina', src: 'fiche' },
  cu_cloudberries: { pl: 'Shikuteua', src: 'fiche' },
  cu_raspberries: { pl: 'Anushkanat', src: 'fiche' }
};

/* Mots qui s'emploient au pluriel (exceptions au passage au singulier) */
const PLURIEL_TOUJOURS = {
  glasses: 'Comme en français, on dit des lunettes : le mot est au pluriel (-a, nom inanimé).',
  ve_suspenders: 'Comme en français, on dit des bretelles : le mot est au pluriel (-a, nom inanimé).',
  fa_ancestors: 'Les ancêtres : le mot est au pluriel (-at, nom animé).',
  fa_twins: 'Les jumeaux : le mot est au pluriel.',
  fa_children: 'Mes enfants : pluriel de Nitauassim (mon enfant), avec -at.',
  fa_relatives: 'Ma parenté, mes proches : le mot est au pluriel (-at, nom animé).',
  cu_flour: 'Nushkuauat (la farine) a la forme d’un pluriel animé (-at), mais il désigne une matière : il ne se compte pas.',
  cu_tea: 'Nipisha (le thé) est le pluriel de nipish (une feuille) : le thé, ce sont des feuilles.'
};
/* Partie du mot qui porte la marque du pluriel, pour la mettre en évidence */
const PLURIEL_MARQUE = { glasses: 'a', ve_suspenders: 'a', fa_ancestors: 'at', fa_children: 'at', fa_relatives: 'at', cu_flour: 'at', cu_tea: 'a' };

/* Noms non comptables : pas de pluriel */
const PLURIEL_NC = ['cu_sugar', 'cu_bakingpowder', 'cu_bakingsoda', 'cu_yeast', 'cu_salt', 'cu_milk', 'cu_butter', 'cu_lard', 'cu_honey', 'cu_jam', 'cu_molasses', 'cu_coffee', 'cu_saltshaker', 'cu_pepper', 'cu_butterdish'];

/* Une seule chose ou une seule personne : le pluriel n'est pas proposé dans le jeu */
const PLURIEL_SENS = ['head', 'face', 'chest', 'body_all', 'neck', 'back', 'lower_back', 'forehead', 'nose', 'mouth', 'tongue', 'chin', 'left_hand', 'right_hand',
  'fa_mother', 'fa_father', 'fa_husband', 'fa_wife', 'fa_sweetheart', 'fa_eldest', 'fa_youngest',
  'g_g2_6', 'g_g2_7', 'g_g2_8', 'g_g2_9', 'g_g2_10'];

/* Pluriels à confirmer avant de les afficher (raison donnée à l'équipe) */
/* Pluriel montré selon le genre du jeu, mais retiré du défi « Le bon pluriel » tant que l'équipe n'a pas tranché */
const PLURIEL_DOUTE = {};
const PLURIEL_ATTENTE = {
  calf: 'Utashtan est animé ou inanimé selon la phrase : -at ou -a ?',
  t_ship: 'Ishkuteu-ush est animé (NA) : garde-t-il ush → uta comme les canots, ou prend-il -at ?',
  fa_ggmother: 'Le mot se termine déjà par -a : quel est son pluriel ?',
  fa_ggfather: 'Le mot se termine déjà par -a : quel est son pluriel ?',
  fa_grandchild: 'Nussima se termine déjà par -a : quel est son pluriel ?',
  fa_godfather: 'Le mot se termine déjà par -a : quel est son pluriel ?',
  fa_godmother: 'Le mot se termine déjà par -a : quel est son pluriel ?',
  fa_brotherinlaw: 'Genre à confirmer avant le pluriel.',
  fa_sisterinlaw: 'Genre à confirmer avant le pluriel.'
};

/* Traductions françaises au pluriel, quand la règle simple ne suffit pas */
const PLURIEL_FR = {
  eye: 'Ses yeux', g_g2_11: 'Ses yeux', eye_white: 'Blancs des yeux', eye_skin: 'Peau qui entoure les yeux',
  hair: 'Des cheveux', lashes: 'Des cils', tears: 'Des larmes', glasses: 'Des lunettes',
  brows: 'Ses sourcils', g_g2_5: 'Ses sourcils', nostril: 'Ses narines', nail: 'Ses ongles',
  femur: 'Têtes de fémur', hock: 'Ses jarrets (arrière du genou)', ankle: 'Chevilles (ses poignets)',
  palm: 'Paumes des mains', big_toe: 'Gros orteils',
  a_lynx: 'Loups-cervier, lynx', a_muskrat: 'Rats musqués', a_porcupine: 'Porcs-épics',
  f_brooktrout2: 'Truites mouchetées, ombles de fontaine', f_laketrout: 'Touladis, truites grises',
  f_sucker: 'Carpes noires, meuniers noirs', f_burbot: 'Lottes', f_eel: 'Anguilles d’Amérique', f_whitefish: 'Corégones',
  f_salmon: 'Saumons atlantiques', f_seatrout: 'Truites de mer', f_cod: 'Morues franches',
  f_tomcod: 'Des poissons des chenaux, poulamons atlantiques', f_flounder: 'Plies ou flétans', f_pike: 'Grands brochets',
  b_mosquito: 'Moustiques (insectes qui piquent)', b_wasp: 'Guêpes des conifères', b_horsefly: 'Taons, bourdons',
  b_firefly: 'Lucioles, mouches à feu', b_snake: 'Couleuvres, serpents',
  t_police: 'Voitures de police', t_firetruck: 'Camions de pompier', t_atv: 'Véhicules tout terrain',
  t_birchcanoe: 'Canots en écorce', t_sailship: 'Navires à voiles', t_ship: 'Bateaux à moteur, à vapeur',
  ve_wintercap: 'Tuques, chapeaux d’hiver', ve_beanie: 'Tuques de laine', ve_parka: 'Vestes d’hiver',
  ve_sweater: 'Chandails, vestes de laine', ve_vest: 'Vestes sans manches', ve_shirt: 'Chemises, t-shirts',
  ve_socks: 'Bas de laine', ve_longjohns: 'Caleçons longs, caleçons', ve_blouse: 'Blouses, chemisiers',
  ve_mittens: 'Mitaines ou gants', ve_gloves: 'Gants',
  ve_pishakan: 'Mocassins en peau', ve_mushuian: 'Mocassins en peau d’orignal', ve_atikuian: 'Mocassins en peau de caribou',
  ve_atshikuian: 'Bottes ou mocassins en peau de phoque', ve_minauatshikuian: 'Mocassins en fourrure de phoque',
  ve_moccasin: 'Mocassins ou bottes couvrant la cheville', ve_kamik: 'Bottes inuites', ve_manituian: 'Bottillons de feutre',
  ve_uashkakun: 'Bottes montant à la cheville', ve_winterboot: 'Bottes d’hiver', ve_safety: 'Bottes de sécurité',
  ve_rubber: 'Bottes de caoutchouc', ve_boots: 'Bottes', ve_sneakers: 'Espadrilles, souliers de toile',
  ve_dressshoes: 'Souliers chics du dimanche', ve_slippers: 'Pantoufles', ve_sandals: 'Sandales', ve_clogs: 'Sabots',
  ve_overshoes: 'Couvre-chaussures, claques',
  cu_egg: 'Œufs', cu_bannockpan: 'Banniques cuites sur le poêlon', cu_grandperes: 'Grands-pères, pâtes molles',
  cu_soupbowl: 'Bols à soupe', cu_cup: 'Verres, tasses', cu_tablespoon: 'Cuillères à soupe', cu_knife: 'Couteaux',
  cu_pot: 'Casseroles', cu_waterpail: 'Seaux pour puiser l’eau', cu_fryingpan: 'Poêlons', cu_breadpan: 'Moules à pain',
  cu_dutchoven: 'Chaudrons de fonte', cu_teapot: 'Théières',
  cu_blueberries: 'Bleuets', cu_strawberries: 'Fraises', cu_lingonberries: 'Graines rouges, airelles vigne d’Ida',
  cu_cloudberries: 'Plaquebières', cu_raspberries: 'Framboises',
  fl_potato: 'Pommes de terre (patates)', fl_cabbage: 'Choux', fl_grapes: 'Raisins', fl_plum: 'Prunes',
  fa_child: 'Mes enfants', fa_cousin: 'Mes cousins, mes cousines', fa_ysibling: 'Mes petits frères ou mes petites sœurs',
  fa_obrother: 'Mes grands frères', fa_osister: 'Mes grandes sœurs', fa_grandmother: 'Mes grands-mères', fa_grandfather: 'Mes grands-pères',
  fa_baby: 'Des bébés',
  g_g1_5: 'Des grenouilles, des crapauds', g_g1_6: 'Des truites mouchetées', g_g1_13: 'Des chapeaux, des tuques',
  g_g1_14: 'Des robes; des manteaux', g_g2_1: 'Des mitaines, des gants', g_g2_2: 'Des foulards, des écharpes',
  g_g2_12: 'Des manteaux, des blousons', g_g2_13: 'Des robes de nuit'
};

const Pluriel = (() => {
  const SUP = 'ᵘ';
  const TAGS_A = ['NA', 'NAD'], TAGS_I = ['NI', 'NID'];
  const genreDe = w => {
    const f = PLURIEL_FORMES[w.id];
    if (f && f.genre) return f.genre;
    if (TAGS_A.includes(w.tag)) return 'A';
    if (TAGS_I.includes(w.tag)) return 'I';
    return '';
  };
  /* Nom animé dépendant possédé par « il, elle » : Umamama (son sourcil) */
  const obviatif = w => w.tag === 'NAD' && /^(son|sa|ses)\b/i.test(w.fr);

  /* Pluriel régulier d'un nom selon son genre */
  function regle(innu, g) {
    if (!innu || !g) return '';
    const s = g === 'A' ? 'at' : 'a';
    return innu.endsWith(SUP) ? innu.slice(0, -1) + 'u' + s : innu + s;
  }

  /* Découpe deux formes en parties : base commune, u qui se déploie, marque ajoutée.
     Sert à l'animation (js/morpho.js). Générique : marche aussi pour un préfixe. */
  function decoupe(sg, pl, g) {
    const marque = g === 'A' ? 'at' : g === 'I' ? 'a' : '';
    if (sg.endsWith(SUP) && pl === sg.slice(0, -1) + 'u' + pl.slice(sg.length)) {
      const base = sg.slice(0, -1), fin = pl.slice(base.length + 1);
      return {
        sg: [{ t: base, k: 'base' }, { t: SUP, k: 'u' }],
        pl: [{ t: base, k: 'base' }, { t: 'u', k: 'u' }, { t: fin, k: 'sfx', g, regle: fin === marque }]
      };
    }
    if (pl.startsWith(sg)) {
      const fin = pl.slice(sg.length);
      return { sg: [{ t: sg, k: 'base' }], pl: [{ t: sg, k: 'base' }, { t: fin, k: 'sfx', g, regle: fin === marque }] };
    }
    /* Changement à l'intérieur du mot (ex. ush → uta) : on garde le début commun */
    let i = 0;
    while (i < sg.length && i < pl.length && sg[i].toLowerCase() === pl[i].toLowerCase()) i++;
    let j = 0;
    while (j < sg.length - i && j < pl.length - i && sg[sg.length - 1 - j] === pl[pl.length - 1 - j]) j++;
    /* On coupe au début de la partie qui change (après un trait d'union : Innu-ush → Innu-uta) */
    const h = sg.lastIndexOf('-', i - 1);
    if (h >= 0) i = h + 1; else if (i > 0) i--;
    const P = sg.slice(0, i), S = j ? sg.slice(sg.length - j) : '';
    const part = (x, mid) => [P && { t: P, k: 'base' }, mid && { t: mid, k: 'chg' }, S && { t: S, k: 'fin' }].filter(Boolean);
    return { sg: part(sg, sg.slice(i, sg.length - j)), pl: part(pl, pl.slice(i, pl.length - j)), irr: true };
  }

  /* Traduction française au pluriel (règle simple, corrigée par PLURIEL_FR) */
  const DET = { un: 'des', une: 'des', son: 'ses', sa: 'ses', mon: 'mes', ma: 'mes', ton: 'tes', ta: 'tes', le: 'les', la: 'les' };
  const STOP = /^(de|d’|d'|du|des|à|au|aux|en|pour|sur|avec|sans|qui|que|dans|par|l’|l')$/i;
  const INV = /^(ou|et|ses|mes|tes|les|des|vos|nos)$/i;
  function motPluriel(m) {
    const low = m.toLowerCase();
    if (/[sxz]$/i.test(m)) return m;
    if (/^(bijou|caillou|chou|genou|hibou|joujou|pou)$/.test(low)) return m + 'x';
    if (low === 'œil') return m[0] === 'Œ' ? 'Yeux' : 'yeux';
    if (/(eau|au|eu)$/i.test(m) && !/^(bleu|pneu)$/i.test(low)) return m + 'x';
    if (/al$/i.test(m) && !/^(bal|festival|chacal|régal)$/i.test(low)) return m.slice(0, -2) + 'aux';
    return m + 's';
  }
  function groupe(txt) {
    let out = [], stop = false;
    for (const tok of txt.split(/(\s+)/)) {
      if (!tok.trim()) { out.push(tok); continue; }
      const low = tok.toLowerCase();
      if (DET[low] && !stop) { const d = DET[low]; out.push(tok[0] === tok[0].toUpperCase() ? d[0].toUpperCase() + d.slice(1) : d); continue; }
      if (STOP.test(tok) || /^(l’|l'|d’|d')/i.test(tok)) { stop = true; out.push(tok); continue; }
      if (stop || INV.test(tok)) { out.push(tok); continue; }
      out.push(tok.split('-').map((p, i, a) => (a.length > 1 && /^(couvre|porte|tire)$/i.test(a[0]) && i === 0) ? p : motPluriel(p)).join('-'));
    }
    return out.join('');
  }
  function frPluriel(w) {
    if (PLURIEL_FR[w.id]) return PLURIEL_FR[w.id];
    return w.fr.split(/(\s*[,;]\s*|\s*\(|\)\s*)/).map(seg => /^[\s,;()]*$/.test(seg) ? seg : groupe(seg)).join('');
  }

  const cache = new Map();
  function info(w) {
    if (!w) return { type: 'aucun' };
    if (cache.has(w.id)) return cache.get(w.id);
    const r = calcule(w);
    cache.set(w.id, r);
    return r;
  }
  function calcule(w) {
    const g = genreDe(w), id = w.id;
    if (PLURIEL_TOUJOURS[id]) {
      const m = PLURIEL_MARQUE[id] || '', base = m && w.innu.endsWith(m) ? w.innu.slice(0, -m.length) : w.innu;
      return { type: 'toujours', g, expl: PLURIEL_TOUJOURS[id], parts: m ? [{ t: base, k: 'base' }, { t: m, k: 'sfx', g, regle: true }] : [{ t: w.innu, k: 'base' }] };
    }
    if (PLURIEL_NC.includes(id)) return { type: 'nc', g, expl: 'Ce nom désigne une matière qui ne se compte pas : on ne le met pas au pluriel.' };
    if (PLURIEL_SENS.includes(id)) return { type: 'sens', g, expl: 'Une seule par personne : le jeu ne propose pas de pluriel pour ce mot.' };
    if (PLURIEL_ATTENTE[id]) return { type: 'attente', g, expl: 'Pluriel à confirmer avec l’équipe : ' + PLURIEL_ATTENTE[id] };
    if (obviatif(w)) return {
      type: 'obv', g, pl: { innu: w.innu, fr: frPluriel(w), src: PLURIEL_SRC.G5, status: 'à valider', audio: w.audio || '', audioNote: w.audioNote || '' },
      expl: 'Son, sa, ses : un nom animé possédé par « il » ou « elle » porte la marque de l’obviatif (-a). La même forme sert pour un ou plusieurs (fiche G5-f : peikᵘ atikua, mitshet atikua).',
      parts: w.innu.endsWith('a') ? [{ t: w.innu.slice(0, -1), k: 'base' }, { t: 'a', k: 'obv' }] : [{ t: w.innu, k: 'base' }]
    };
    const f = PLURIEL_FORMES[id];
    if (f) {
      const d = decoupe(w.innu, f.pl, g);
      return { type: 'fiche', g, d, pl: { innu: f.pl, fr: frPluriel(w), src: PLURIEL_SRC[f.src] || f.src, status: 'à valider', audio: f.audio || '', audioNote: f.audioNote || '', phrase: !!f.phrase }, cle: f.src };
    }
    const ok = g && ['NA', 'NI', 'NAD', 'NID'].includes(w.tag) && !/\s/.test(w.innu) && !/a$/i.test(w.innu);
    if (!ok) return { type: g ? 'attente' : 'aucun', g, expl: g ? 'Pluriel à confirmer avec l’équipe.' : '' };
    const pl = regle(w.innu, g);
    return { type: 'regle', g, doute: PLURIEL_DOUTE[id] || '', d: decoupe(w.innu, pl, g), pl: { innu: pl, fr: frPluriel(w), src: PLURIEL_SRC.regle, status: 'à valider', audio: '', audioNote: '' } };
  }

  /* Le mot a-t-il une forme à montrer au pluriel ? */
  const aPluriel = w => ['regle', 'fiche', 'toujours', 'obv'].includes(info(w).type);
  /* Peut-on demander de former le pluriel (défi « Le bon pluriel ») ? */
  const formable = w => { const i = info(w); return !PLURIEL_DOUTE[w.id] && (i.type === 'regle' || i.type === 'fiche') && i.d && !i.d.irr && i.d.pl.some(p => p.k === 'sfx' && p.regle); };

  return { info, regle, decoupe, frPluriel, aPluriel, formable, genreDe, applicable: t => PLURIEL_THEMES.includes(t), SRC: PLURIEL_SRC };
})();
