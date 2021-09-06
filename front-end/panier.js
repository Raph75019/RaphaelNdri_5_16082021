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
    for (k = 0; k < produitlocalstorage.length; k++) {
        fetch(`http://localhost:3000/api/teddies/${produitlocalstorage[k]}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let structureproduitpanier = `
        <div class="container-recapitulatif">
                        <div class="espace">${data.name}</div>
                        <div>${data.price / 100} € - supprimer article</div>
                    </div>`;
                positionelement.innerHTML += structureproduitpanier;
            })
            .catch((error) => {
                console.log(error)
            })
    }
};

