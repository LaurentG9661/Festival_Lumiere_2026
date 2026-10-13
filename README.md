# 🎬 Festival Lumière — Application Web de Planification sur Mesure

Une application web interactive conçue pour planifier son festival de cinéma, filtrer les séances à la volée et générer un agenda personnalisé au format iCal (`.ics`).

🔗 **Démo en ligne :** [Accéder au site](https://laurentg9661.github.io/Festival_Lumiere_2026/)

---

## ✨ Fonctionnalités principales

- **Synchronisation dynamique :** Chargement et parsing en temps réel d'un flux de données CSV (issu de Google Sheets) avec gestion des en-têtes et des caractères spéciaux.
- **Filtres croisés avancés :** Recherche textuelle instantanée et menus déroulants dynamiques à cases à cocher (par films, catégories, lieux et langues/VOST).
- **Gestion de la sélection :** Sélection personnalisée de séances avec compteur en temps réel, mode "Ma sélection" pour n'afficher que ses coups de cœur, et bouton "Tout sélectionner / désélectionner".
- **Export iCal natif (`.ics`) :** Génération instantanée d'un fichier d'agenda compatible avec tous les calendriers (Google Calendar, Apple Calendar, Outlook).
- **Design Responsive (UI/UX) :** Interface fluide et épurée optimisée pour bureau et mobile, structurée avec CSS Flexbox.

---

## 💡 Astuce d'utilisation (Importation propre)

Une fois votre fichier `.ICS` téléchargé depuis l'application :
1. **Créez un agenda dédié** dans Google Agenda (ou votre application de calendrier préférée) nommé par exemple *"Festival Lumière 2026"*. Cela vous évitera de polluer ou surcharger votre agenda personnel avec toutes les séances du festival.
2. **Importez le fichier `.ics`** directement dans ce nouvel agenda. Vous pourrez ainsi l'afficher ou le masquer en un clic selon vos besoins !

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
