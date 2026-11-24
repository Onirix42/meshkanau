# Meshkanau

Apprendre la langue innu-aimun avec les sons de Uashat Mak Mani-utenam.


Outil web gratuit et non commercial pour apprendre le vocabulaire et les bases de l'**innu-aimun**, à l'école et à la maison. Il s'adresse aux élèves, à leurs familles, aux parents et à toute personne qui veut apprendre la langue ou la transmettre. Les sons proviennent du dialecte de **Uashat mak Mani-utenam**.

**Ouvrir l'application : [onirix42.github.io/missions-innu-aimun](https://onirix42.github.io/missions-innu-aimun/)**

Le projet est développé au secteur de l'éducation d'Innu Takuaikan Uashat mak Mani-utenam (ITUM). La langue est validée avec des personnes locutrices de la communauté. Les couleurs et la police (Inter) suivent le guide d'identification visuelle d'ITUM 2026.

## Pour qui

- **En classe** : sur tablette, sur ordinateur ou au tableau interactif, au primaire comme au secondaire. Au primaire, on mise sur l'oral (écouter, répéter). Au secondaire, on passe à la lecture et à l'écrit.
- **À la maison** : les parents et les familles, même sans parler l'innu, peuvent explorer les mots avec les enfants, les écouter et relever les défis ensemble.
- **Pour les adultes qui apprennent** : un accès simple au vocabulaire courant, avec des sons de Uashat.

## Activités

- **🔎 Explorer** : toucher les repères ou les mots pour les découvrir et les écouter.
- **🎯 Trouver le repère** : l'application donne un mot innu; on touche le bon endroit sur l'illustration.
- **🧩 Choisir le son / le mot** : un repère est en orange; on choisit le son (mode oral) ou le mot écrit (mode écrit) correspondant.

Les **défis** propres à certaines thématiques sont regroupés sous « Défis » et nommés à l'impératif :

- **🍽️ Prépare le plateau** (cuisine) : on dépose sur son plateau les aliments ou les objets demandés en innu-aimun.
- **🧺 Remplis le panier** (fruits et légumes) : on met dans le panier les fruits et les légumes demandés.
- **🧁 Prépare les muffins** (cuisine) : on reçoit une commande de muffins avec un petit fruit, on rassemble les ingrédients et le matériel de la recette « Pakueshikanissat », puis on remet les étapes dans l'ordre.
- **🔢 Construis le nombre** (chiffres) : on choisit 2, 3 ou 4 chiffres, puis on écrit le nombre en mots avec ses parties reliées par « ashu ».
- **🎨 Nomme la forme et la couleur** (formes et couleurs) : une forme colorée s'affiche, on choisit le mot de la forme, puis celui de la couleur.
- **📅 La date d'aujourd'hui** (calendrier) : on écrit la date du jour en trois parties, jour de la semaine, nombre (relié par « ashu ») et mois, par exemple « Ushkat-atushkan, nishunnu ashu nishtᵘ takuatshi-pishimᵘ » (lundi 23 novembre), puis cinq autres dates.
- **🗂️ Trie les noms** (animé ou inanimé ?) : on range chaque nom dans la bonne catégorie grammaticale.

### 🔍 Derrière le mot

Sur les fiches des couleurs, des mois et des jours, un petit dessin au trait et le bouton « Derrière le mot » ouvrent une courte explication sur la provenance du mot : le vert et la mer (*shipekᵘ*), l'orange et le feu (*ishkuteu*), avril et le canard, août et l'envol, lundi « premier jour de travail », vendredi « on mange du poisson »…

- C'est facultatif : rien ne s'ouvre ni ne joue tout seul. La pastille de couleur reste intacte; le dessin est à côté du bouton, jamais dans la pastille.
- Le volet n'apparaît jamais pendant une question de défi, seulement après la correction (🎯 Trouver le repère, 🧩 Choisir le son / le mot, 🎨 Nomme la forme et la couleur).
- En mode oral, l'explication est en français, sans mot innu écrit; en mode écrit, elle montre les mots innus apparentés.
- Les explications viennent des fiches de langue innue d'Yvette Mollen (2017) et de la liste « Months of the Year » d'innu-aimun.ca. Les sources sont citées dans la page À propos, pas dans le volet; les explications restent « à valider » tant qu'une personne locutrice de Uashat ne les a pas confirmées.
- Certains mots n'ont volontairement pas de dessin (jaune, rouge vin, brun, rose, noir, février, mars, juillet, novembre, dimanche) : l'explication suffit.
- Le mode Classe permet de retirer le volet (`sans=derriere`).

**Ajouter une explication** (pour d'autres thématiques) : ajouter une entrée dans `DM_MOTS` (`js/derriere.js`) avec l'identifiant du mot, le texte écrit (`t`), le texte oral (`o`), la source et, au besoin, un dessin de `DM_PICS`. Rien d'autre à modifier.

### Mode oral (par défaut)

Au primaire, on travaille la langue parlée; l'écrit arrive au secondaire. Par défaut, Meshkanau masque donc les mots écrits en innu-aimun, la traduction française et les indications grammaticales (NA, NI…) : l'élève regarde, écoute, répète et reconnaît.

- En exploration, toucher une image fait entendre le mot, sans le révéler à l'écrit.
- Les défis se jouent à l'oreille : « Trouver le repère » fait entendre le mot à trouver, « Choisir le son », « Nomme la forme et la couleur » et « Remplis le panier / Prépare le plateau » proposent des choix sonores, et « Animé ou inanimé ? » fait entendre le nom à ranger. Seuls les mots enregistrés à Uashat y sont utilisés.
- Les défis de lecture (🧁 Prépare les muffins, 🔢 Construis le nombre, 📅 La date d'aujourd'hui) n'apparaissent qu'en mode 📖 Écrit.
- Le sélecteur « 👂 Oral | 📖 Écrit » s'applique à toute l'application et le choix est conservé sur l'appareil. En mode écrit, « 🇫🇷 Aide en français » affiche ou cache la traduction.
- En mode oral, 🔇 marque les images dont le son de Uashat est à venir.
- Pour ouvrir l'application directement en mode écrit (au secondaire, par exemple), ajouter `?ecrit` à l'adresse, éventuellement suivi d'une thématique : `?ecrit#cuisine`. `?oral` force le mode oral.
- Le lexique reste toujours écrit : c'est l'outil de référence.

Chaque mot enregistré peut être écouté à vitesse normale ou ralentie.

### Mode Classe (pour les enseignants)

La page [`classe.html`](https://onirix42.github.io/meshkanau/classe.html) prépare une activité pour toute la classe, sans compte ni serveur. L'enseignant choisit :

- les **thématiques** (une seule ouvre directement l'activité; plusieurs : l'élève choisit parmi elles);
- les **activités** offertes (une seule activité avec une seule thématique : l'élève arrive directement dans l'exercice);
- le **mode** : 👂 Oral, 📖 Écrit ou au choix de l'élève;
- les **aides** à retirer : traductions et bouton « Afficher la traduction », consignes en français, lexique, indices grammaticaux, « Afficher ce mot » en mode oral.

La page affiche un code QR (créé dans le navigateur, sans service externe) à projeter au tableau; les élèves le scannent avec l'appareil photo de l'iPad. Tout le réglage tient dans l'adresse, par exemple :

```
?classe&themes=cuisine,fruits&act=find,tray&mode=oral&sans=consignes,lex
```

Un bandeau « 🏫 Mode Classe » rappelle le réglage. Le réglage tient 3 heures dans l'onglet, même si l'élève recharge la page; pour le quitter avant, garder le doigt appuyé 3 secondes sur « 🔒 Quitter ». Le mode Classe ne modifie pas les réglages enregistrés sur l'iPad. Un paramètre inconnu est ignoré.

**Ajouter un réglage** (singulier/pluriel, possessifs…) : ajouter une entrée dans `CLASSE_REGLAGES` (`js/classe.js`). Elle apparaît alors automatiquement dans `classe.html`, dans l'adresse, dans le code QR et dans le résumé; il reste à en tenir compte dans le jeu (`CL.<id>` dans `index.html`).

## Thématiques

Le corps (Uiau), les formes et les couleurs (Eshinakunihk tshekuana mak Atishauiana), les chiffres (Atshitashuna), les animaux (Aueshishat), les poissons (Nameshat : eau douce et eau salée), les bestioles (Manitushat : insectes, araignées, grenouilles et couleuvres), le calendrier (Tshishtekaikan), les pronoms, animé ou inanimé, les moyens de transport (Utapana), les vêtements (Matshunisha), la cuisine (Mitshim : aliments, vaisselle et chaudrons) et les fruits et les légumes (Mina mak patshitinaun-mitshim, avec les petits fruits). Au total, 13 thématiques et 338 fiches de mots, dont 262 avec un enregistrement.

On peut ouvrir directement une thématique avec l'adresse `index.html#corps`, `#couleurs`, `#chiffres`, `#animaux`, `#poissons`, `#bestioles`, `#calendrier`, `#pronoms`, `#genre`, `#transport`, `#vetements`, `#cuisine` ou `#fruits`.

Une page **À propos** (`index.html#apropos`), accessible depuis l'accueil et le bas de page, regroupe le mode d'emploi, les sources, les notes par thématique, la liste des points à valider avec une personne locutrice (dont les mots sans enregistrement) et les crédits. Les pages d'activités n'affichent que le lexique de la thématique ouverte.

## Prochaines étapes

Le détail est dans la [feuille de route](ROADMAP.md). En bref :

- genre (animé ou inanimé) et noms dépendants : pastilles NA, NI, NAD, NID ajoutées là où le dictionnaire innu-aimun.ca a été consulté (en cours), puis pluriels et possessifs;
- verbes, mots de liaison et phrases courtes, avec le son du mot puis une phrase d'exemple;
- nouveaux mots et nouvelles thématiques tirés du matériel de l'équipe de Virginie Michel (ITUM);
- achat des domaines meshkanau.ca et meshkanau.com;
- photos d'objets culturels innus et capsules sur l'innu-aitun;
- enregistrements faits à Uashat, avec le consentement des personnes enregistrées;
- plus tard, un jeu de dés coopératif pour la classe et la famille.

## Utilisation

L'application tient dans le fichier `index.html`, accompagné des dossiers `img/`, `fonts/` et `js/`. Le dossier `js/` contient le catalogue des thématiques et des défis (`catalogue.js`), partagé par le jeu et la page du mode Classe, le registre des réglages du mode Classe (`classe.js`), les explications de « Derrière le mot » (`derriere.js`) et la bibliothèque de codes QR [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) de Kazuhiko Arase (licence MIT, `qrcode.js`). Il n'y a rien à installer : on ouvre `index.html` dans un navigateur, ou on publie le dépôt avec GitHub Pages. Une connexion Internet est nécessaire pour les sons, qui sont lus depuis leurs sites d'origine.

Aucun compte, aucun classement, aucune donnée recueillie : la progression s'efface à la fermeture de la page. Seul le choix d'affichage des mots est conservé dans le navigateur de l'appareil.

## Sources

- [Leçons d'innu (innu-aimun.ca)](https://lessons.innu.atlas-ling.ca/) : enregistrements du dialecte de Uashat mak Mani-utenam, genre des noms.
- [Atlas linguistique algonquien](https://www.atlas-ling.ca/) : phrases enregistrées par Doris Vollant (Uashat mak Mani-utenam) pour les pronoms.
- [Dictionnaire innu-aimun.ca](https://dictionary.innu-aimun.ca/) : genre et catégorie des mots, consultés mot par mot.
- [Grammaire d'innu-aimun.ca](https://www.innu-aimun.ca/francais/grammaire/) : pronoms personnels, genre et pluriel des noms.
- [Fiches de langue innue d'Yvette Mollen (2017)](https://www.innu-aimun.ca/fiches-a-telecharger/) : « Les couleurs » (V6-f), « Mois de l'année » (V4-f) et « Jour de la semaine » (V3-f), pour « Derrière le mot ».
- [Liste « Months of the Year »](https://www.innu-aimun.ca/english/dictionaries/vocabulary-lists/months-of-the-year/) d'innu-aimun.ca : sens littéral des mois.
- Fiches papier de vocabulaire, dont la recette « Pakueshikanissat » (muffins) et la fiche des fruits et des légumes.

## Droits

- Les enregistrements appartiennent à leurs auteurs et à leurs producteurs. Ils ne sont pas copiés dans ce dépôt. Une autorisation écrite est en cours de demande.
- Aucune image trouvée sur le Web n'est utilisée. Les illustrations des animaux, des poissons, des bestioles, des moyens de transport, des vêtements, de la cuisine, des fruits et légumes l'illustration des yeux et les scènes des tuiles de l'accueil (`img/themes/`) ont été générées par IA dans le style de l'application. Les objets culturels innus seront photographiés par Eric Boily, avec l'accord des personnes qui les prêtent.
- Les photos de la thématique du corps montrent Maïté et Ezechiel Michel-Fontaine (enfants de Virginie Michel) ainsi que les mains de Stéphane Fontaine. Elles sont publiées avec leur accord.

## Avertissement

Les formes, traductions et explications sont une transcription de travail. Elles sont validées progressivement avec des personnes locutrices de Uashat mak Mani-utenam. Seules les formes validées sont destinées à être présentées en classe.

## Crédits

Application conçue par Eric Boily, conseiller pédagogique en technopédagogie à ITUM, avec l'aide de l'IA générative.

Validation et collaboration : Hubert Lessart (école Manikanetish), Virginie Michel (coordonnatrice des programmes, recherche et développement, ITUM) et Noëlla Mckenzie, traductrice.
