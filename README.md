# 🎬 Festival Lumière — Application Web de Planification sur Mesure

Une application web interactive conçue pour planifier son festival de cinéma, filtrer les séances enviseageables à la volée et générer un agenda personnalisé au format iCal (`.ics`).

Une fois votre agenda personnalisé importer sur votre calendrier, vous n'avez plus qu'à choisir les séances qui conviennent le mieux à votre emploi du temps.

> Créé par **Laurent Gouttesoulard** 
🔗 **Démo en ligne :** [Accéder au site](https://laurentg9661.github.io/Festival_Lumiere_2026/)

---

## 💡 Guide d'utilisation

L'application a été pensée pour être intuitive et rapide d'utilisation, que vous soyez sur ordinateur ou sur smartphone. Voici comment naviguer et utiliser les différentes options :

### 1. La barre de recherche textuelle
- **Recherche par titre :** Tapez simplement quelques lettres ou le titre d'une séance dans la barre de recherche pour filtrer instantanément la liste des séances à la volée. Il peut s'agir d'un film, comme d'une rencontre ou bien d'une masterclass.

### 2. Les filtres croisés et menus déroulants
L'interface met à votre disposition plusieurs menus déroulants avec cases à cocher pour affiner votre sélection :
- **🎬 Séance :** Permet de sélectionner une ou plusieurs séances en particulier.
- **🏷️ Catégories :** Pour filtrer selon la thématique ou le type de séance (*ex: Frères Coen, Du Muet au Parlant, Masterclass, Rencontres et signatures, etc.*).
- **📍 Lieux :** Pour n'afficher que les séances se déroulant dans une ou plusieurs salles ou cinémas spécifiques (*ex: Institut Lumière hangar, Comœdia, Lumière Terreaux, etc.*).
- **🗣️ Langues :** Permet de filtrer selon la version (*ex : VOST par défaut, VFSTA, ST-SME, etc.*).

*Note : Le libellé du bouton de chaque filtre s'actualise dynamiquement (ex: "1 date sélectionnée", "3 films sélectionnés") pour vous permettre de voir en un coup d'œil vos critères actifs.*

### 3. Gestion de la sélection
- **Sélectionner une séance :** Cochez la case située à droite de chaque carte de séance pour l'ajouter à votre programme sur mesure. Un compteur en temps réel s'actualise en bas de page.
- **Bouton "Tout sélectionner / désélectionner" :** Permet de cocher ou décocher d'un seul clic l'ensemble des séances filtrées.
- **Filtre "Ma sélection" (bouton dédié) :** En l'activant, l'interface masque tout le reste pour ne vous afficher que vos séances favorites sélectionnées, et réinitialise les filtres. Idéal pour faire le point sur votre planning final. 

### 4. Export et génération du fichier iCal (`.ics`)
- Une fois votre programme validé, cliquez sur le bouton "télécharger mon .ICS" pour télécharger instantanément votre fichier au format `.ics`.
- Vous pourrez ensuite l'importer dans votre calendrier (voir l'astuce ci-dessus pour l'intégrer dans un agenda dédié).

### 5. Importer le programme dans un agenda dédié
Une fois votre fichier `.ICS` téléchargé :
1. **Créez un agenda dédié** dans Google Agenda (ou votre application de calendrier préférée) nommé par exemple *"Mon Festival Lumière 2026"*. Cela vous évitera de polluer ou surcharger votre agenda personnel avec toutes les séances du festival.
Important: Vous ne pouvez créer des agendas qu'à partir d'un navigateur (donc depuis un ordinateur ou en ouvrant google agenda en version web depuis votre smartphone).
Une fois l'agenda créé, il est visible à la fois dans un navigateur et dans l'application du smartphone.
- Ouvrez donc [Google Agenda](https://calendar.google.com/calendar/u/0/r/settings/createcalendar) (sur ordinateur ou version web sur smartphone) en vous connectant à votre compte et créez un agenda.
- Attribuez un nom à votre agenda.
- Cliquez sur Créer l'agenda.
2. **Importez le fichier `.ics`** directement dans ce nouvel agenda.
- Depuis un smartphone, il suffit de cliquer sur le fichier .ICS alors téléchargé et de l'ouvrir dans votre application, puis de le lier à l'agenda que vous venez de créer.
- Depuis un ordinateur, aller dans Paramètres -> Importer et Exporter -> Sélectionnez votre fichier et importez le dans l'agenda dédié.

Vous pourrez ainsi l'afficher ou le masquer en un clic selon vos besoins !

<img width="1900" height="1061" alt="Capture2" src="https://github.com/user-attachments/assets/4d03cee5-886a-425f-b0b2-4ca5eb48c3ed" />

<img width="1920" height="1070" alt="Capture" src="https://github.com/user-attachments/assets/e0ca09cf-bea8-416f-9ee4-0dd3b646f74d" />

---

## ✨ Fonctionnalités principales

- **Synchronisation dynamique :** Chargement et parsing en temps réel d'un flux de données CSV (issu de Google Sheets) avec gestion des en-têtes et des caractères spéciaux.
- **Filtres croisés avancés :** Recherche textuelle instantanée et menus déroulants dynamiques à cases à cocher (par films, catégories, lieux et langues/VOST).
- **Gestion de la sélection :** Sélection personnalisée de séances avec compteur en temps réel, mode "Ma sélection" pour n'afficher que ses coups de cœur, et bouton "Tout sélectionner / désélectionner".
- **Export iCal natif (`.ics`) :** Génération instantanée d'un fichier d'agenda compatible avec tous les calendriers (Google Calendar, Apple Calendar, Outlook).
- **Design Responsive (UI/UX) :** Interface fluide et épurée optimisée pour bureau et mobile, structurée avec CSS Flexbox.

---

## 🛠️ Stack technique

* **HTML5** — Structure sémantique.
* **CSS3** — Mise en page moderne (Flexbox, Grid, composants sticky).
* **JavaScript (ES6+)** — Logique applicative, manipulation du DOM, gestion d'état et parsing CSV personnalisé.
* **Hébergement & Déploiement** — GitHub Pages.

---

## 🚀 Structure du projet

```text
├── index.html     # Structure de la page et interface utilisateur
├── style.css      # Feuille de styles et design system de l'application
└── script.js      # Logique, fetch des données, gestion des filtres et export ICS
