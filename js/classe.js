/* Meshkanau : mode Classe
   ----------------------------------------------------------------------------
   Fichier partagé par le jeu (index.html) et la page de l'enseignant (classe.html).

   Le mode Classe tient entièrement dans l'adresse :
     index.html?classe&themes=cuisine,fruits&act=find,choose&mode=oral&sans=trad,lex
   Aucun compte, aucun serveur : l'enseignant prépare l'adresse dans classe.html,
   affiche le code QR, et les élèves le scannent avec l'appareil photo de l'iPad.

   AJOUTER UN RÉGLAGE (singulier/pluriel, possessifs…)
   1. Ajouter une entrée dans CLASSE_REGLAGES ci-dessous. Elle apparaît alors
      automatiquement dans classe.html, dans l'adresse, dans le code QR et dans
      le résumé affiché aux élèves.
   2. Dans index.html, lire la valeur avec CL.<id> (ex. CL.nombre) là où le jeu
      doit en tenir compte. Pour une aide à masquer (type « sans »), il suffit
      souvent d'une règle CSS : body.sans-<option> .element{display:none}.

   Types de réglages
   - themes : choix de thématiques (cartes illustrées), valeurs séparées par des virgules
   - cases  : plusieurs choix possibles, valeurs séparées par des virgules
   - choix  : un seul choix parmi des options (boutons segmentés)
   - sans   : aides que l'enseignant retire; tout est affiché par défaut

   Propriétés utiles
   - param    : nom du paramètre dans l'adresse (court et lisible)
   - defaut   : valeur quand le paramètre est absent (pour « choix »)
   - initial  : valeur proposée au départ dans classe.html (sinon : defaut)
   - pour     : 'oral' ou 'ecrit' si l'option ne sert que dans ce mode
   - pret     : false pour préparer un réglage sans l'afficher encore
   Un paramètre inconnu ou une valeur invalide est simplement ignoré.
   ---------------------------------------------------------------------------- */

const CLASSE_SESSION_MAX = 3 * 60 * 60 * 1000; // le réglage tient 3 h dans l'onglet
const CLASSE_CLE = 'meshkanau.classe';

const CLASSE_REGLAGES = [
  { id: 'themes', param: 'themes', type: 'themes', titre: 'Thématiques',
    aide: 'Une seule thématique ouvre directement l’activité. Plusieurs : l’élève choisit parmi elles. Aucune cochée : toutes.' },

  { id: 'act', param: 'act', type: 'cases', titre: 'Activités',
    aide: 'Seules les activités cochées sont offertes. Aucune cochée : toutes. Une seule activité avec une seule thématique : l’élève arrive directement dans l’exercice.',
    options: () => [
      ...ACTIVITES.map(a => ({ id: a.id, label: a.label, note: a.note })),
      ...Object.entries(DEFIS).flatMap(([t, ds]) => ds.map(d => ({ id: d[0], label: d[0] === 'tray' ? '🍽️ Plateau / 🧺 Panier' : d[1], note: d[2], themes: d[0] === 'tray' ? ['cuisine', 'fruits'] : [t], pour: WRITTEN_ONLY.includes(d[0]) ? 'ecrit' : '' })))
    ].filter((o, i, a) => a.findIndex(x => x.id === o.id) === i) },

  { id: 'mode', param: 'mode', type: 'choix', titre: 'Mode de jeu', defaut: 'libre', initial: 'oral',
    aide: 'Oral : écouter et répéter, sans mots écrits. Écrit : lire les mots en innu-aimun. Le sélecteur Oral | Écrit est caché aux élèves, sauf avec « Au choix ».',
    options: [
      { id: 'oral', label: '👂 Oral' },
      { id: 'ecrit', label: '📖 Écrit' },
      { id: 'libre', label: 'Au choix de l’élève' }
    ] },

  { id: 'sans', param: 'sans', type: 'sans', titre: 'Aides affichées',
    aide: 'Décoche une aide pour la retirer pendant l’activité.',
    options: [
      { id: 'trad', label: '🇫🇷 Traductions en français', note: 'Interrupteur « Aide en français » et bouton « Afficher la traduction »', pour: 'ecrit', resume: 'traductions' },
      { id: 'consignes', label: '💬 Consignes en français', note: 'Textes d’aide sous l’image et sous les mots, « Comment jouer ? »', resume: 'consignes' },
      { id: 'lex', label: '📖 Lexique de la thématique', note: 'Le tableau des mots, avec le français, en bas de page', resume: 'lexique' },
      { id: 'gram', label: '🏷️ Indices grammaticaux', note: 'Étiquettes Animé / Inanimé (NA, NI…) et encadré « Comment reconnaître le genre ? »', resume: 'indices grammaticaux' },
      { id: 'mot', label: '🔤 « Afficher ce mot » en mode oral', note: 'Pour les images dont le son est à venir', pour: 'oral', resume: 'mot écrit' }
    ] }

  /* Réglages à venir : décommenter et adapter quand le jeu les prendra en charge.
  ,{ id: 'nombre', param: 'nombre', type: 'choix', titre: 'Singulier ou pluriel', defaut: 'tous', pret: false,
     options: [ { id: 'sg', label: 'Singulier' }, { id: 'pl', label: 'Pluriel' }, { id: 'tous', label: 'Les deux' } ] }
  ,{ id: 'poss', param: 'poss', type: 'choix', titre: 'Possessifs', defaut: 'non', pret: false,
     options: [ { id: 'non', label: 'Sans possessifs' }, { id: 'oui', label: 'Avec possessifs' } ] }
  */
];

const Classe = {
  reglages: () => CLASSE_REGLAGES.filter(r => r.pret !== false),

  options(r) {
    if (r.type === 'themes') return THEMES.map(t => ({ id: t.id, label: t.name }));
    return typeof r.options === 'function' ? r.options() : (r.options || []);
  },

  /* Lit une adresse (URLSearchParams) et renvoie un objet de configuration complet */
  lire(params) {
    const cfg = {};
    for (const r of Classe.reglages()) {
      const ids = Classe.options(r).map(o => o.id);
      const brut = (params.get(r.param) || '').trim();
      if (r.type === 'choix') cfg[r.id] = ids.includes(brut) ? brut : r.defaut;
      else cfg[r.id] = [...new Set(brut.split(',').map(s => s.trim()).filter(v => ids.includes(v)))];
    }
    return cfg;
  },

  /* Valeur de départ dans classe.html */
  initial() {
    const cfg = {};
    for (const r of Classe.reglages()) cfg[r.id] = r.type === 'choix' ? (r.initial || r.defaut) : [];
    return cfg;
  },

  /* Construit la partie « ?… » de l'adresse. Les virgules restent lisibles. */
  ecrire(cfg) {
    const parts = ['classe'];
    for (const r of Classe.reglages()) {
      const v = cfg[r.id];
      if (r.type === 'choix') { if (v && v !== r.defaut) parts.push(r.param + '=' + encodeURIComponent(v)); }
      else if (v && v.length) parts.push(r.param + '=' + v.map(encodeURIComponent).join(','));
    }
    return '?' + parts.join('&');
  },

  /* Résumé lisible, affiché sous le code QR et dans le bandeau des élèves */
  resume(cfg, court) {
    const out = [];
    for (const r of Classe.reglages()) {
      const v = cfg[r.id], opts = Classe.options(r), lab = id => (opts.find(o => o.id === id) || {}).label || id;
      if (r.type === 'themes') out.push(v.length ? v.map(id => { const t = THEMES.find(x => x.id === id); return t ? t.name : id; }).join(', ') : 'Toutes les thématiques');
      else if (r.type === 'cases') { if (v.length) out.push(v.map(lab).join(', ')); else if (!court) out.push('Toutes les activités'); }
      else if (r.type === 'choix') { if (v !== r.defaut || !court) out.push(v === 'libre' && r.id === 'mode' ? 'Oral ou écrit au choix' : lab(v)); }
      else if (r.type === 'sans') {
        const utiles = v.filter(id => { const o = opts.find(x => x.id === id); return o && Classe.utile(o, cfg); });
        if (utiles.length) out.push('Sans ' + utiles.map(id => opts.find(o => o.id === id).resume || lab(id)).join(', '));
      }
    }
    return out.join(' · ');
  },

  /* Une option liée au mode oral ou écrit ne sert que dans ce mode */
  utile(o, cfg) { return !o.pour || cfg.mode === 'libre' || cfg.mode === o.pour; },

  /* Au chargement du jeu : réglage de l'adresse, sinon réglage récent de l'onglet */
  depuisPage() {
    const p = new URLSearchParams(location.search);
    try {
      if (p.has('classe')) {
        sessionStorage.setItem(CLASSE_CLE, JSON.stringify({ q: location.search, t: Date.now() }));
        return Classe.lire(p);
      }
      const s = JSON.parse(sessionStorage.getItem(CLASSE_CLE) || 'null');
      if (s && Date.now() - s.t < CLASSE_SESSION_MAX) return Classe.lire(new URLSearchParams(s.q));
      sessionStorage.removeItem(CLASSE_CLE);
    } catch (e) {
      if (p.has('classe')) return Classe.lire(p);
    }
    return null;
  },

  quitter() { try { sessionStorage.removeItem(CLASSE_CLE); } catch (e) {} }
};
