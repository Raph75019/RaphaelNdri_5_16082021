const params = new URL(document.location).searchParams;
const id = params.get("id");

const produitImg = document.querySelector(".produit-img");
const produitName = document.querySelector(".produit-titre");
const produitDescription = document.querySelector(
    ".produit-description"
);
const produitPrice = document.querySelector(".produit-prix");
const bearNumber = document.querySelector("#bearNum");
const colorSelect = document.querySelector("#color-select");






fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (response) {
        return response.json();
    })
    .catch((error) => {
        error
    })
    .then(function (resApi) {
        article = resApi;
        produitName.innerHTML = article.name;
        produitImg.src = article.imageUrl;
        produitDescription.innerText = article.description;
        produitPrice.innerHTML = article.price / 100 + '€';

        const colorSelect = document.querySelector(".produit-choix-couleur");
        for (let i = 0; i < article.colors.length; i++) {
            const option = document.createElement("option");
            option.innerText = article.colors[i];
            colorSelect.appendChild(option);



        }

        const popupConfirmation = () => {
            if (window.confirm(`${produitName.innerHTML = article.name} option : ${article.description} a bien été ajouté au panier consultez le 
            panier OK ou revenir à l'accueil ANNULER`)) {
                window.location.href = "panier.html";
            } else {
                window.location.href = "index.html";
            }
        }

    });

const btn = document.querySelector(".produit-btn");
btn.addEventListener("click", (event) => {
    event.preventDefault();
    let optionProduit = {
        name: produitName.innerHTML,
        prix: produitPrice.innerHTML,
        _id: id,
    }
    //Declaration de la variable dans laquelle on met les key qui sont dans le localStorage
    let produitlocalstorage = JSON.parse(localStorage.getItem("produit"));
    //fonction fenetre pop up
    const popupConfirmation = () => {
        if (window.confirm(`${article.name} produit : ${article.description} à bien été ajouté au panier
        Consultez le panier OK ou revenir à l'accueil ANNULER`)) {
            window.location.href = "panier.html";
        } else {
            window.location.href = "index.html";
        }
    }

    //--------------------------------------Fonction pour ajouter un objet dans le localStorage-------------------

    function ajoutLocalStorage() {
        //ajout dans le tableau de l'objet 
        produitlocalstorage.push(optionProduit);

        //transformation en format JSON et envoi dans la Key "produit" du LocalStorage
        localStorage.setItem('produit', JSON.stringify(produitlocalstorage))

    }



    //---------------------------------------LOCAL STORAGE --------------------------------

    //S'il y a deja des objet dans le localStorage
    if (produitlocalstorage) {
        ajoutLocalStorage();
        popupConfirmation();
    }
    //S'il y a pas d'objet dans le localStorage
    else {
        produitlocalstorage = [];
        ajoutLocalStorage();
        popupConfirmation();


    }

});
