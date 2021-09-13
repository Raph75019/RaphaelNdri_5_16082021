displayOrderIdAndPrice();


function displayOrderIdAndPrice() {

    // On relie le container a une const
    const position = document.querySelector(".container-confirmation")

    // on recupere les données du LocalStorage
    const prix = localStorage.getItem("total");
    const id = localStorage.getItem("orderId");

    //Creation du texte recap
    const recap = `<div class="container-confirmation-details">
        <div class="container-confirmation-details-prix">
            Votre panier d'un montant de ${prix} a bien etait pris en compte.
        </div>
        <div class="container-confirmation-details-id">
            Votre numero de commande est : ${id}
        </div>

    </div>
`
    // on  charge les données reçus et le texte recap dans le container
    position.innerHTML = recap;

    // On vide le localStorage pour recommencer plus tard le processus d'achat
    localStorage.clear();
}