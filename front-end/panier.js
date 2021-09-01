let produitlocalstorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitlocalstorage)


//affichage des produits du panier
const positionelement = document.querySelector("#container-produit-panier");
console.log(positionelement);


// si le panier est vide
if (produitlocalstorage === null) {
    const paniervide = `<div class="container-panier-vide">
    <div> le panier est vide </div>
    </div>`;
    positionelement.innerHTML = paniervide;
} else {
    let structureproduitpanier = [];
    for (k = 0; k < produitlocalstorage.length; k++) {

        structureproduitpanier = structureproduitpanier + `
        <div class="container-recapitulatif">
                        <div class="espace">${produitlocalstorage[k].produitName}</div>
                        <div>${produitlocalstorage[k].produitPrice} € - supprimer article</div>
                    </div>`;
    }

    if (k === produitlocalstorage.length) {


        positionelement.innerHTML = structureproduitpanier;
    }
}
