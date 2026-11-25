/* Meshkanau : visualiser la construction d'un mot (préfixes, suffixes, changements)
   ----------------------------------------------------------------------------
   Module générique, sans données linguistiques. Il reçoit des « parties » :
     { t: 'Atik', k: 'base' }              partie qui ne bouge pas
     { t: 'ᵘ' ou 'u', k: 'u' }             petit u en exposant qui se prononce (ou non)
     { t: 'at', k: 'sfx', g: 'A'|'I' }     marque ajoutée (suffixe)
     { t: 'ni', k: 'pfx', g: ... }         marque ajoutée au début (préfixe, à venir)
     { t: 'uta', k: 'chg' }                partie du mot qui change
     { t: 'a', k: 'obv' }                  marque déjà présente (ex. obviatif)
   Morpho.html(parts) dessine le mot; Morpho.anime(el, de, vers) passe d'une
   forme à l'autre : ce qui est commun reste en place, ce qui s'ajoute entre en
   couleur, ce qui disparaît se retire. Pensé pour le pluriel (phase 2), puis
   les possessifs (ni-, tshi-, u-) et les verbes.
   ---------------------------------------------------------------------------- */
const Morpho = (() => {
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const SUP = 'ᵘ';
  const calme = () => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };

  function span(p, etat) {
    const cls = ['mp', 'mp-' + p.k];
    if (p.g) cls.push('mp-' + p.g);
    if (p.k === 'u' && p.t === SUP) cls.push('mp-sup');
    if (etat) cls.push(etat);
    /* Le petit u est toujours écrit « u » : c'est le style qui le met en exposant,
       pour qu'il puisse grandir pendant l'animation. */
    const t = p.k === 'u' ? 'u' : p.t;
    return `<span class="${cls.join(' ')}">${esc(t)}</span>`;
  }
  const texte = parts => parts.map(p => p.t).join('');
  const html = parts => parts.map(p => span(p)).join('');

  /* Alignement des deux listes (plus longue sous-suite commune).
     Le petit u compte comme une même partie, qu'il soit en exposant ou non. */
  const meme = (a, b) => a.k === b.k && (a.k === 'u' || a.t === b.t);
  function aligne(A, B) {
    const n = A.length, m = B.length, L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = meme(A[i], B[j]) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const out = [];
    let i = 0, j = 0;
    while (i < n || j < m) {
      if (i < n && j < m && meme(A[i], B[j])) { out.push({ de: A[i], vers: B[j] }); i++; j++; }
      else if (i < n && (j >= m || L[i + 1][j] >= L[i][j + 1])) { out.push({ de: A[i] }); i++; }
      else { out.push({ vers: B[j] }); j++; }
    }
    return out;
  }

  /* Passe de la forme « de » à la forme « vers » dans l'élément el */
  function anime(el, de, vers) {
    if (!el) return;
    el.setAttribute('aria-label', texte(vers).replace(/ᵘ/g, 'u'));
    if (calme() || !de || !de.length) { el.innerHTML = html(vers); el.classList.add('mp-flash'); setTimeout(() => el.classList.remove('mp-flash'), 900); return; }
    const pas = aligne(de, vers);
    el.innerHTML = pas.map(s => s.de && s.vers ? span(s.de, s.vers.k === 'u' && s.de.t !== s.vers.t ? 'mp-pret' : '') : s.de ? span(s.de, 'mp-sort') : span(s.vers, 'mp-entre')).join('');
    const spans = [...el.children];
    /* État de départ : les parties qui entrent sont fermées */
    spans.forEach((sp, i) => { const s = pas[i]; if (s.vers && !s.de) { sp.style.maxWidth = '0px'; sp.style.opacity = '0'; } });
    void el.offsetWidth;
    requestAnimationFrame(() => {
      spans.forEach((sp, i) => {
        const s = pas[i];
        if (s.de && s.vers && s.de.k === 'u') sp.classList.toggle('mp-sup', s.vers.t === SUP);
        if (s.vers && !s.de) { sp.style.maxWidth = sp.scrollWidth + 40 + 'px'; sp.style.opacity = '1'; sp.classList.add('mp-new'); }
        if (s.de && !s.vers) { sp.style.maxWidth = sp.offsetWidth + 'px'; void sp.offsetWidth; sp.style.maxWidth = '0px'; sp.style.opacity = '0'; }
        if (s.de && s.vers && s.de.k === 'u' && s.de.t !== s.vers.t) sp.classList.add('mp-new');
      });
      /* À la fin, on remet un mot propre (sans les parties sorties) */
      setTimeout(() => { if (el.isConnected) { el.innerHTML = html(vers); el.querySelectorAll('.mp-sfx,.mp-pfx,.mp-chg').forEach(x => x.classList.add('mp-vu')); } }, 1300);
    });
  }

  return { html, anime, texte, aligne };
})();
