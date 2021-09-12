let produitlocalstorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitlocalstorage);


//affichage des produits du panier
const positionElement = document.querySelector(".container");


// si le panier est vide
if (produitlocalstorage == null) {
    const panierVide = `<div class="panier-vide">Le panier est vide retourner a vos achats!! </div>`;
    positionElement.innerHTML = panierVide;
}
else {//si le panier n'est pas vide il faut afficher les produits
    produitlocalstorage.forEach(function (produit) {
        console.log(produit);

        const nom = document.createElement("div");
        nom.classList.add("panier-produit-nom");
        document.querySelector(".panier-produit").appendChild(nom);
        nom.innerHTML = produit.name;

        const prix = document.createElement("div");
        prix.classList.add("panier-produit-prix");
        document.querySelector(".panier-produit").appendChild(prix);
        prix.innerHTML = produit.prix;


    })
}
//---------------------------------------------------Le panier Bouton Pour Vider Le Panier----------------------------------

const btn = document.querySelector(".recap-panier-btn");
//supression de la key produit du localStorage
btn.addEventListener("click", (e) => {
    e.preventDefault();

    //.removeItem pour vider le localStorage
    localStorage.removeItem("produit");

    //alerte le panier est vide
    alert("Le panier est vide");

    //recharge la page afin de voir le panier vide
    window.location.href = "panier.html"
})

//
//-----------------------------------Le Montant Total du panier--------------------------
//-------------------------------Declaration de ka variable pour pouvoir mettre les prix
let prixTotal = [];

//Chercher les prix dans le panier
for (let i = 0; i < produitlocalstorage.length; i++) {
    let prixProduitPanier = produitlocalstorage[i].prix;
    //Mettre les prix dans la variable "prixTotal"
    prixTotal.push(prixProduitPanier);
    //console.log(prixTotal);
}
// Transforme une chaîne de caractères en un nombre flottant

prixTotal = prixTotal.map((x) => parseFloat(x));

//Additionner les prix dans le tableau"prixTotal" avec la method .reduce

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const prixToto = prixTotal.reduce(reducer);
console.log(prixToto);

//Faire apparaitre les prix total sur la page 

document.querySelector(".recap-panier-montant-prix").innerHTML = prixToto + "€";

envoie();
function envoie() {
    // On récupère les inputs depuis le DOM.
    const submit = document.querySelector(".commande");
    let inputName = document.querySelector("#name");
    let inputLastName = document.querySelector("#lastname");
    let inputPostal = document.querySelector("#postal");
    let inputCity = document.querySelector("#city");
    let inputAdress = document.querySelector("#adress");
    let inputMail = document.querySelector("#mail");
    let inputPhone = document.querySelector("#phone");
    let erreur = document.querySelector(".erreur");

    // Lors d'un clic, si l'un des champs n'est pas rempli, on affiche une erreur, on empêche l'envoi du formulaire. On vérifie aussi que le numéro est un nombre, sinon même chose.

    submit.addEventListener("click", (e) => {
        e.preventDefault();
        if (
            !inputName.value ||
            !inputLastName.value ||
            !inputPostal.value ||
            !inputCity.value ||
            !inputAdress.value ||
            !inputMail.value ||
            !inputPhone.value
        ) {
            erreur.innerHTML = "Vous devez renseigner tous les champs !";

        }
        else if (isNaN(inputPhone.value)) {

            erreur.innerText = "Votre numéro de téléphone n'est pas valide";
        }
        else {

            // Si le formulaire est valide, le tableau productsBought contiendra un tableau d'objet qui sont les produits acheté, et order contiendra ce tableau ainsi que l'objet qui contient les infos de l'acheteur
            let productsBought = [];
            //On récupère seulement les Id des produits afin de les envoyer au back-end
            produitlocalstorage.forEach(item => {
                productsBought.push(item._id)
            });



            const order = {
                contact: {
                    firstName: inputName.value,
                    lastName: inputLastName.value,
                    address: inputAdress.value,
                    city: inputCity.value,
                    email: inputMail.value,


                },
                products: productsBought,
            };
            console.log(order);
            // -------  Envoi de la requête POST au back-end --------
            // Création de l'entête de la requête
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json" },
            };
            console.log(options);
            //Préparation du prix pour l'afficher sur la prochaine page
            let priceConfirmation = document.querySelector(".recap-panier-montant-prix").innerHTML;


            // Envoie de la requête. On changera de page avec un localStorage avecl'order id et le prix.
            fetch("http://localhost:3000/api/teddies/order", options)
                .then((response) => { return response.json(); })
                .then((r) => {
                    localStorage.clear();
                    localStorage.setItem("orderId", r.orderId);
                    console.log(r);

                    localStorage.setItem("total", priceConfirmation);
                    document.location.href = "confirmation.html";
                })
                .catch((err) => {
                    alert("Il y a eu une erreur : " + err);
                });
        }
    });
}