const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRVdaa2KecQUjQiiFpHUJs-zylt95WNg7MfLuYzt9PMp2Z8xmeXe0d8aiGD9QAV7CSHwTwVzJxz5z0y/pub?output=csv';

let seances = [];
let selection = new Set();
let modeSelectionActif = false;

// Découpage propre du CSV en tenant compte des guillemets
function parseCSVLine(text) {
  const regex = /(?:,|\n|^)("(?:(?:"")*|[^"]*)*"|[^,\n]*)/g;
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    let val = match[1];
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.substring(1, val.length - 1).replace(/""/g, '"');
    }
    matches.push(val.trim());
  }
  return matches;
}

async function chargerDonnees() {
  try {
    // Téléchargement du fichier CSV depuis l'URL Google Sheets
    const response = await fetch(SHEET_CSV_URL);
    const data = await response.text();

    // Découpage du texte brut en lignes (en gérant les retours ligne) et suppression des lignes vides
    const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');
    
    if (lines.length === 0) return; // Si le fichier est vide, on s'arrête

    const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase()); // Lecture de la première ligne (les en-têtes) et mise en minuscules

    // Identification dynamique des colonnes par leurs noms
    const idxId = headers.findIndex(h => h.includes('id'));
    const idxTitre = headers.findIndex(h => h.includes('titre') || h.includes('film'));
    const idxDebut = headers.findIndex(h => h.includes('debut') || h.includes('début'));
    const idxFin = headers.findIndex(h => h.includes('fin'));
    const idxLieu = headers.findIndex(h => h.includes('lieu'));
    const idxLangue = headers.findIndex(h => h.includes('langue') || h.includes('vost'));
    const idxCategorie = headers.findIndex(h => h.includes('categorie') || h.includes('catégorie'));

    // Transformation de chaque ligne du CSV (sauf la 1ère) en un objet JavaScript structuré
    seances = lines.slice(1).map((line, i) => {
      const row = parseCSVLine(line);
      return {
        id: (idxId !== -1 && row[idxId]) ? row[idxId] : `seance-${i}`,  // ID unique ou généré automatiquement
        titre: idxTitre !== -1 ? row[idxTitre] : '',                    // Titre du film
        debut: idxDebut !== -1 ? row[idxDebut] : '',                    // Heure de début
        fin: idxFin !== -1 ? row[idxFin] : '',                          // Heure de fin
        lieu: idxLieu !== -1 ? row[idxLieu] : '',                       // Lieu de projection
        langue: idxLangue !== -1 ? row[idxLangue] : '',                 // Récupération de la langue
        categorie: idxCategorie !== -1 ? row[idxCategorie] : ''         // Récupération de la catégorie
      };
    }).filter(s => s.titre && s.lieu); // On ne garde que les lignes avec au moins un titre et un lieu

    remplirFiltreLieux();
    remplirFiltreFilms();
    remplirFiltreLangues();
    remplirFiltreCategories();

    afficher(seances); // Affichage initial de toutes les séances sur la page

  } catch (e) {
    // En cas de problème de réseau ou de lien Google Sheets invalide
    document.getElementById('list').innerHTML = "Erreur de chargement des données. Vérifiez la publication CSV.";
  }
}


function remplirFiltreFilms() {
  const filmsUniques = [...new Set(seances.map(s => s.titre))]
    .filter(titre => titre && titre.trim() !== '')
    .sort((a, b) => a.localeCompare(b, 'fr'));
  const container = document.getElementById('films-checkboxes');
  container.innerHTML = '';
  filmsUniques.forEach(film => {
    container.innerHTML += `
      <label>
        <input type="checkbox" class="film-checkbox" value="${film}" onchange="mettreAJourLabelFilms(); filtrer();" style="width: auto; margin-right: 6px;">
        ${film}
      </label>
    `;
  });
}

// Met à jour le texte affiché sur le bouton principal
function mettreAJourLabelFilms() {
  const coches = document.querySelectorAll('.film-checkbox:checked');
  const label = document.getElementById('dropdown-label');
  if (coches.length === 0) {
    label.innerText = "🎬 Tous les films";
  } else if (coches.length === 1) {
    label.innerText = `🎬 ${coches[0].value}`;
  } else {
    label.innerText = `🎬 ${coches.length} films sélectionnés`;
  }
}


function remplirFiltreCategories() {
  const categoriesUniques = [...new Set(seances.map(s => s.categorie))]
    .filter(cat => cat && cat.trim() !== '')
    .sort((a, b) => a.localeCompare(b, 'fr'));
  const container = document.getElementById('categories-checkboxes');
  container.innerHTML = '';
  categoriesUniques.forEach(cat => {
    container.innerHTML += `
      <label>
        <input type="checkbox" class="categorie-checkbox" value="${cat}" onchange="mettreAJourLabelCategories(); filtrer();">
        ${cat}
      </label>
    `;
  });
}

function mettreAJourLabelCategories() {
  const coches = document.querySelectorAll('.categorie-checkbox:checked');
  const label = document.getElementById('dropdown-label-categorie');
  if (coches.length === 0) {
    label.innerText = "🎟️ Toutes les catégories";
  } else if (coches.length === 1) {
    label.innerText = `🎟️ ${coches[0].value}`;
  } else {
    label.innerText = `🎟️ ${coches.length} catégories sélectionnées`;
  }
}


function remplirFiltreLieux() {
  const lieuxUniques = [...new Set(seances.map(s => s.lieu))]
    .filter(lieu => lieu && lieu.trim() !== '')
    .sort((a, b) => a.localeCompare(b, 'fr'));
  const container = document.getElementById('lieux-checkboxes');
  container.innerHTML = '';
  lieuxUniques.forEach(lieu => {
    container.innerHTML += `
      <label>
        <input type="checkbox" class="lieu-checkbox" value="${lieu}" onchange="mettreAJourLabelLieux(); filtrer();" style="width: auto; margin-right: 6px;">
        ${lieu}
      </label>
    `;
  });
}

function mettreAJourLabelLieux() {
  const coches = document.querySelectorAll('.lieu-checkbox:checked');
  const label = document.getElementById('dropdown-label-lieu');
  if (coches.length === 0) {
    label.innerText = "📍 Tous les lieux";
  } else if (coches.length === 1) {
    label.innerText = `📍 ${coches[0].value}`;
  } else {
    label.innerText = `📍 ${coches.length} lieux sélectionnés`;
  }
}


function remplirFiltreLangues() {
  const languesUniques = [...new Set(seances.map(s => s.langue))]
    .filter(langue => langue && langue.trim() !== '')
    .sort((a, b) => a.localeCompare(b, 'fr'));
  const container = document.getElementById('langues-checkboxes');
  container.innerHTML = '';
  languesUniques.forEach(langue => {
    container.innerHTML += `
      <label>
        <input type="checkbox" class="langue-checkbox" value="${langue}" onchange="mettreAJourLabelLangues(); filtrer();" style="width: auto; margin-right: 6px;">
        ${langue}
      </label>
    `;
  });
}

function mettreAJourLabelLangues() {
  const coches = document.querySelectorAll('.langue-checkbox:checked');
  const label = document.getElementById('dropdown-label-langue');
  if (coches.length === 0) {
    label.innerText = "🗣️ Toutes les langues";
  } else if (coches.length === 1) {
    label.innerText = `🗣️ ${coches[0].value}`;
  } else {
    label.innerText = `🗣️ ${coches.length} langues sélectionnées`;
  }
}


function toggleDropdown(event) {
  event.stopPropagation();
  document.getElementById('lieux-checkboxes').classList.remove('show');
  document.getElementById('langues-checkboxes').classList.remove('show');
  document.getElementById('categories-checkboxes').classList.remove('show');
  document.getElementById('films-checkboxes').classList.toggle('show');
}

function toggleDropdownLieux(event) {
  event.stopPropagation();
  document.getElementById('films-checkboxes').classList.remove('show');
  document.getElementById('langues-checkboxes').classList.remove('show');
  document.getElementById('categories-checkboxes').classList.remove('show');
  document.getElementById('lieux-checkboxes').classList.toggle('show');
}

function toggleDropdownLangues(event) {
  event.stopPropagation();
  document.getElementById('films-checkboxes').classList.remove('show');
  document.getElementById('lieux-checkboxes').classList.remove('show');
  document.getElementById('categories-checkboxes').classList.remove('show');
  document.getElementById('langues-checkboxes').classList.toggle('show');
}

function toggleDropdownCategories(event) {
  event.stopPropagation();
  document.getElementById('films-checkboxes').classList.remove('show');
  document.getElementById('lieux-checkboxes').classList.remove('show');
  document.getElementById('langues-checkboxes').classList.remove('show');
  document.getElementById('categories-checkboxes').classList.toggle('show');
}

// Fermer les menus si on clique en dehors
window.onclick = function(event) {
  if (!event.target.closest('.dropdown-filter')) {
    document.getElementById('films-checkboxes').classList.remove('show');
    document.getElementById('langues-checkboxes').classList.remove('show');
    document.getElementById('lieux-checkboxes').classList.remove('show');
    document.getElementById('categories-checkboxes').classList.remove('show');
  }
}

// Permet de cocher ou décocher toutes les séances actuellement visibles/filtrées
function toggleToutSelectionner(masterCheckbox) {
  // Détermine si on doit tout cocher ou tout décocher
  const estCoche = masterCheckbox.checked;
  // On parcourt le tableau des séances actuellement filtrées/affichées (variable 'res' globale ou locale de votre filtre)
  // Si 'res' n'est pas globale, on peut utiliser directement les éléments du DOM :
  const checkboxesIndividuelles = document.querySelectorAll('.seance-card input[type="checkbox"]');

  checkboxesIndividuelles.forEach(checkbox => {
    if (checkbox.checked !== estCoche) {
      checkbox.checked = estCoche;
      // Déclenche l'événement 'change' pour que votre code existant enregistre la sélection (ex: dans un Set)
      checkbox.dispatchEvent(new Event('change'));
    }
  });
}


function afficher(liste) {
  const container = document.getElementById('list');
  if (liste.length === 0) {
    container.innerHTML = "<p style='text-align:center; color:#888;'>Aucune séance ne correspond à votre recherche.</p>";
    return;
  }
  container.innerHTML = liste.map(s => `
    <div class="seance-card">
      <div class="seance-info">
        <h3>${s.titre} ${s.categorie ? `[${s.categorie}]` : ''}</h3>
        <p>📅 ${s.debut} ${s.fin ? '➔ ' + s.fin : ''}</p>
        <p>📍 ${s.lieu}</p>
      </div>
      <input type="checkbox" ${selection.has(s.id) ? 'checked' : ''} onchange="toggle('${s.id}')" style="transform: scale(1.5); cursor:pointer;">
    </div>
  `).join('');
}

function filtrer() {
  const search = document.getElementById('search').value.toLowerCase(); // Récupérer le texte tapé dans la barre de recherche
  // Récupérer tous les films cochés dans la liste
  const lieuxCoches = Array.from(document.querySelectorAll('.lieu-checkbox:checked')).map(cb => cb.value);
  const filmsCoches = Array.from(document.querySelectorAll('.film-checkbox:checked')).map(cb => cb.value);
  const languesCoches = Array.from(document.querySelectorAll('.langue-checkbox:checked')).map(cb => cb.value); // Récupération des langues cochées
  const categoriesCoches = Array.from(document.querySelectorAll('.categorie-checkbox:checked')).map(cb => cb.value); // Récupération des catégories cochées
  // État de la case à cocher "Masquer non-sélectionnés"
  const uniquementSelection = document.getElementById('filter-selection').checked;
  
  // Filtrer le tableau global "seances" pour ne garder que celles qui respectent TOUTES les conditions
  const res = seances.filter(s => {
    const matchSearch = s.titre.toLowerCase().includes(search); // Le titre du film correspond-il à la recherche textuelle ?
    const matchFilm = (filmsCoches.length === 0 || filmsCoches.includes(s.titre)); // Si aucun film n'est coché, on les prend tous. Sinon, le film doit être dans les cochés.
    const matchLieu = (lieuxCoches.length === 0 || lieuxCoches.includes(s.lieu)); 
    const matchLangue = (languesCoches.length === 0 || languesCoches.includes(s.langue));
    const matchCategorie = (categoriesCoches.length === 0 || categoriesCoches.includes(s.categorie));

    const matchSelection = (!uniquementSelection && !modeSelectionActif) || selection.has(s.id); // La séance fait-elle partie de la sélection (si le mode ou la case est actif) ?

    // Le film doit valider TOUTES les conditions en même temps pour être affich
    return matchSearch && matchLieu && matchFilm && matchLangue && matchCategorie && matchSelection;
  });

  afficher(res);
}

function mettreAJourCompteurSelection() {
  const compteurEl = document.getElementById('compteur-selection');
  if (compteurEl) {
    compteurEl.innerText = selection.size;
  }
  const btn = document.getElementById('btn-filtre-selection');
  if (btn && !modeSelectionActif) {
    btn.innerText = `Ma sélection (${selection.size})`;
  } else if (btn && modeSelectionActif) {
    btn.innerText = `Voir tout (Sélection: ${selection.size})`;
  }
}

function basculerFiltreSelection() {
  modeSelectionActif = !modeSelectionActif;
  const btn = document.getElementById('btn-filtre-selection');

  if (modeSelectionActif) {
    document.getElementById('search').value = '';
    document.querySelectorAll('.lieu-checkbox, .film-checkbox, .langue-checkbox, .categorie-checkbox').forEach(cb => {
      cb.checked = false;
      cb.dispatchEvent(new Event('change')); // force la mise à jour des textes des dropdowns
    });
    btn.style.background = "#28a745"; // Passe en vert pour indiquer qu'il est actif
    btn.innerText = `Voir tout (Sélection: ${selection.size})`;
  } else {
    btn.style.background = "#e50914"; // Repasse en rouge d'origine
    btn.innerText = `Ma sélection (${selection.size})`;
  }
  filtrer(); // Relance le filtrage avec cette nouvelle condition
}


function toggle(id) {
  if (selection.has(id)) selection.delete(id);
  else selection.add(id);
  document.getElementById('count').innerText = selection.size;
  document.getElementById('btn-export').disabled = selection.size === 0;
  if (document.getElementById('filter-selection').checked) {
    filtrer();
  }
  mettreAJourCompteurSelection();
}


function genererICS() {
  let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Festival Lumiere//FR\nX-WR-CALNAME:Mon Festival Lumiere 2026\n";

  seances.filter(s => selection.has(s.id)).forEach(s => {
    const formatICSDate = (str) => {
      if (!str) return '';
      // Nettoie tous les caractères non numériques (gardant uniquement les chiffres)
      const clean = str.replace(/\D/g, '');
      // Si la chaîne contient bien au moins l'année, mois, jour, heure, minute (ex: 101020261700 ou 202610101700)
      // On s'assure d'obtenir le format strict AAMMJJTHHMMSS ou AAAAMMJJTHHMMSS sans le 'Z'
      if (clean.length >= 12) {
        // Si le format d'origine est JJMMAAAA... ou AAAAMMJJ..., A adapter selon les données brutes.
        // En reprenant le format "10/10/2026 17:00" ->  : "101020261700" (Jour-Mois-Année-Heure-Minute)
        if (clean.length === 12 || clean.length === 14) {
          // Si c'est JJMMAAAA(JJ)HHMM
          const jour = clean.slice(0, 2);
          const mois = clean.slice(2, 4);
          const annee = clean.slice(4, 8);
          const heure = clean.slice(8, 10);
          const minute = clean.slice(10, 12);
          return `${annee}${mois}${jour}T${heure}${minute}00`;
        }
      }
      // Fallback de secours si le format est déjà proche
      return clean.slice(0, 12);
    };

    ics += `BEGIN:VEVENT\n`;
    ics += `SUMMARY:${s.titre}\n`;
    ics += `LOCATION:${s.lieu}\n`;
    if (s.debut) ics += `DTSTART:${formatICSDate(s.debut)}\n`;
    if (s.fin) ics += `DTEND:${formatICSDate(s.fin)}\n`;
    ics += `END:VEVENT\n`;
  });

  ics += "END:VCALENDAR";

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'mon_programme_lumiere_2026.ics';
  link.click();
}

chargerDonnees();
