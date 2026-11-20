// Données de test (plus tard, elles viendront de Supabase)
const espaces = [
  { id: 1, nom: "Salle de Réception Élégance", ville: "Chicoutimi", type: "mariage", capacite: 200, prix: 150, image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80" },
  { id: 2, nom: "Espace Design & Conférence", ville: "Jonquière", type: "conference", capacite: 50, prix: 85, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" },
  { id: 3, nom: "Lounge & Terrasse Panoramique", ville: "La Baie", type: "anniversaire", capacite: 80, prix: 200, image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80" }
];

// Éléments de la page
const liste = document.getElementById("liste-espaces");
const nbResultats = document.getElementById("nb-resultats");
const aucunResultat = document.getElementById("aucun-resultat");
const formFiltres = document.getElementById("form-filtres");
const filtrePrix = document.getElementById("filtre-prix");
const valeurPrix = document.getElementById("valeur-prix");
const tri = document.getElementById("tri");

// Crée les cartes à partir d'une liste d'espaces
function afficherEspaces(liste_a_afficher) {
  liste.innerHTML = "";
  nbResultats.textContent = liste_a_afficher.length;
  aucunResultat.classList.toggle("d-none", liste_a_afficher.length > 0);

  liste_a_afficher.forEach(espace => {
    liste.innerHTML += `
      <div class="col-md-6 col-xl-4">
        <div class="card h-100 border-0 shadow-sm">
          <img src="${espace.image}" class="card-img-top" alt="${espace.nom}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">${espace.nom}</h5>
            <p class="text-muted small mb-1"><i class="fa-solid fa-location-dot me-1"></i>${espace.ville}</p>
            <p class="text-muted small"><i class="fa-solid fa-users me-1"></i>${espace.capacite} personnes</p>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <span class="fw-bold text-primary fs-5">${espace.prix} $ <small class="text-muted fs-6">/ heure</small></span>
              <a href="venue.html?id=${espace.id}" class="btn btn-sm btn-outline-primary">Voir détails</a>
            </div>
          </div>
        </div>
      </div>`;
  });
}

// Applique les filtres et le tri
function filtrer() {
  const ville = document.getElementById("filtre-ville").value.trim().toLowerCase();
  const type = document.getElementById("filtre-type").value;
  const capacite = Number(document.getElementById("filtre-capacite").value) || 0;
  const prixMax = Number(filtrePrix.value);

  let resultat = espaces.filter(e =>
    e.ville.toLowerCase().includes(ville) &&
    (type === "" || e.type === type) &&
    e.capacite >= capacite &&
    e.prix <= prixMax
  );

  if (tri.value === "prix-croissant") resultat.sort((a, b) => a.prix - b.prix);
  if (tri.value === "prix-decroissant") resultat.sort((a, b) => b.prix - a.prix);
  if (tri.value === "capacite") resultat.sort((a, b) => b.capacite - a.capacite);

  afficherEspaces(resultat);
}

// Événements
formFiltres.addEventListener("submit", e => { e.preventDefault(); filtrer(); });
formFiltres.addEventListener("reset", () => setTimeout(() => { valeurPrix.textContent = filtrePrix.value; filtrer(); }, 0));
filtrePrix.addEventListener("input", () => valeurPrix.textContent = filtrePrix.value);
tri.addEventListener("change", filtrer);

// Au chargement : tout afficher
filtrer();