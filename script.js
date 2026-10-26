// Données de départ fournies. Aucun comportement n’est encore implémenté.
let produits = [
  { id: 1, nom: "Jus d’orange", prix: 12 },
  { id: 2, nom: "Biscuits", prix: 8 }
];
let prochainId = 3;

// À vous de jouer :
// 1. Afficher les produits du tableau au chargement.
// 2. Gérer l’ajout depuis le formulaire.
// 3. Gérer le retrait du produit cliqué.
// 4. Bonus : compteur, état vide et total.


const formProduit = document.getElementById("form-produit");
const nomProduit = document.getElementById("nom");
const prixProduit = document.getElementById("prix");
const produitListe = document.getElementById("liste-produits");
const message = document.getElementById("message");
const compteur = document.getElementById("compteur");
const etatVide = document.getElementById("etat-vide");
const total = document.getElementById("total");

function createElement(balise, className, contenu) {
  const element = document.createElement(balise);
  if (className)
	element.className = className;
  if (contenu)
	element.textContent = contenu;
  return element;
}

function createProduit(produit) {
  const li = createElement("li", "produit");
  const infos = document.createElement("div");
  infos.append(
    createElement("strong", "nom-produit", produit.nom),
    createElement("span", "prix-produit", produit.prix + " MAD")
  );

  const btn = createElement("button", "supprimer", "Retirer");
  btn.type = "button";

  li.append(infos, btn);
  return li;
}

function afficherProduits() {
  produitListe.replaceChildren(...produits.map(createProduit));

  compteur.textContent = produits.length;
  etatVide.hidden = produits.length > 0;
}

formProduit.addEventListener("submit", function (event) {
  event.preventDefault();

  produits.push({
	id: prochainId++,
	nom: nomProduit.value.trim(),
	prix: prixProduit.value
	});

  formProduit.reset();
  nomProduit.focus();
  afficherProduits();
});

produitListe.addEventListener("click", function (event) {
  const btn = event.target.closest(".supprimer");

  const id = Number(btn.dataset.id);
  produits = produits.filter((produit) => produit.id != id);
  message.textContent = "Produit supprimer";
  afficherProduits();
});

afficherProduits();