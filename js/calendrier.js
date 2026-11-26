// Thématique Tshishtekaikan · Le calendrier
// Fonds illustrés : la semaine sur une ligne (calendrier mural du mois courant)
// et l’année en douze petits calendriers mensuels, colorés selon la saison.
// Les tuiles des mots (WORDS, scènes « days » et « months ») se posent sur
// les en-têtes de colonnes ou de cartes; leurs positions x/y y correspondent.
(function(){
const SAISON=['#cfe2f3','#cfe2f3','#d5ead0','#d5ead0','#d5ead0','#f5e5b5','#f5e5b5','#f5e5b5','#f3d4bf','#f3d4bf','#f3d4bf','#cfe2f3'];
const TEINTE=['#edf4fb','#edf4fb','#eef7eb','#eef7eb','#eef7eb','#fdf6e2','#fdf6e2','#fdf6e2','#fcefe5','#fcefe5','#fcefe5','#edf4fb'];
const MOIS_FR=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
const e=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const moisInnu=m=>{const w=(typeof WORDS!=='undefined'?WORDS:[]).find(x=>x.id==='m'+String(m+1).padStart(2,'0'));return w?w.innu:MOIS_FR[m]};

// La semaine : sept colonnes, dimanche en premier, dates du mois courant.
window.calDaysSVG=function(){
  const now=new Date(),Y=now.getFullYear(),M=now.getMonth(),D=now.getDate();
  const first=new Date(Y,M,1).getDay(),nb=new Date(Y,M+1,0).getDate(),rows=Math.ceil((first+nb)/7);
  const L=20,W=660,cw=W/7,gy=196,gh=380,rh=gh/rows;
  let s=`<svg viewBox="0 0 700 600" aria-hidden="true"><rect x="6" y="6" width="688" height="588" rx="26" fill="#eaedea"/>`;
  s+=`<rect x="${L}" y="34" width="${W}" height="548" rx="18" fill="#fff" stroke="#d3d8d3" stroke-width="2"/>`;
  s+=`<path d="M${L} 52a18 18 0 0 1 18-18h${W-36}a18 18 0 0 1 18 18v52H${L}z" fill="#2a5a2a"/>`;
  for(let i=0;i<6;i++){const x=L+70+i*((W-140)/5);s+=`<rect x="${x-5}" y="20" width="10" height="30" rx="5" fill="#8a948a"/><circle cx="${x}" cy="46" r="5" fill="#173d17"/>`}
  s+=`<text x="350" y="88" text-anchor="middle" font-size="28" font-weight="800" fill="#fff" font-family="inherit">${e(moisInnu(M))} ${Y}</text>`;
  // Fin de semaine en teinte douce
  s+=`<rect x="${L}" y="104" width="${cw}" height="470" fill="#fbeee6"/><rect x="${L+6*cw}" y="104" width="${cw}" height="${470}" fill="#fbeee6"/>`;
  s+=`<path d="M${L} 192H${L+W}" stroke="#d3d8d3" stroke-width="2"/>`;
  for(let c=1;c<7;c++)s+=`<path d="M${L+c*cw} 196V574" stroke="#eceeec" stroke-width="2"/>`;
  for(let r=1;r<rows;r++)s+=`<path d="M${L} ${gy+r*rh}H${L+W}" stroke="#eceeec" stroke-width="2"/>`;
  for(let d=1;d<=nb;d++){
    const i=first+d-1,c=i%7,r=Math.floor(i/7),x=L+c*cw+cw-12,y=gy+r*rh+28;
    if(d===D)s+=`<circle cx="${x-10}" cy="${y-9}" r="19" fill="#e9b949"/>`;
    s+=`<text x="${x-10}" y="${y}" text-anchor="middle" font-size="22" font-weight="${d===D?800:600}" fill="${d===D?'#173d17':(c===0||c===6?'#a0573a':'#5a645a')}" font-family="inherit">${d}</text>`;
  }
  return s+`</svg>`;
};

// L’année : douze petits calendriers (3 × 4), bandeau couleur de saison.
window.calMonthsSVG=function(){
  const now=new Date(),Y=now.getFullYear(),MC=now.getMonth(),D=now.getDate();
  const L=14,T=14,G=10,cw=(400-2*L-2*G)/3,ch=(500-2*T-3*G)/4;
  let s=`<svg viewBox="0 0 400 500" aria-hidden="true"><rect x="6" y="6" width="388" height="488" rx="26" fill="#eaedea"/>`;
  for(let m=0;m<12;m++){
    const x=L+(m%3)*(cw+G),y=T+Math.floor(m/3)*(ch+G),cur=m===MC;
    s+=`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="12" fill="${TEINTE[m]}" stroke="${cur?'#e9b949':'#d3d8d3'}" stroke-width="${cur?4:1.5}"/>`;
    s+=`<path d="M${x} ${y+12}a12 12 0 0 1 12-12h${cw-24}a12 12 0 0 1 12 12v24H${x}z" fill="${SAISON[m]}"/>`;
    const first=new Date(Y,m,1).getDay(),nb=new Date(Y,m+1,0).getDate(),gx=x+8,gw=cw-16,gy=y+48,rh=(ch-54)/6,dw=gw/7;
    for(let d=1;d<=nb;d++){
      const i=first+d-1,c=i%7,r=Math.floor(i/7),cx=gx+c*dw+dw/2,cy=gy+r*rh+rh/2;
      if(cur&&d===D)s+=`<circle cx="${cx}" cy="${cy-0.5}" r="6" fill="#e9b949"/>`;
      s+=`<text x="${cx}" y="${cy+2.5}" text-anchor="middle" font-size="7" fill="${cur&&d===D?'#173d17':(c===0||c===6?'#b06b4d':'#7a837a')}" font-family="inherit">${d}</text>`;
    }
  }
  return s+`</svg>`;
};
})();
