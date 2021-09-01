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

    //fonction fenetre pop up
    const popupConfirmation = () => {
        if (window.confirm(`${article.name} produit : ${article.description} à bien été ajouté au panier
        Consultez le panier OK ou revenir à l'accueil ANNULER`)) {
            window.location.href = "panier.html";
        } else {
            window.location.href = "index.html";
        }
    }

    //local storage
    let produitlocalstorage = JSON.parse(localStorage.getItem("produit"));
    if (!produitlocalstorage) {
        produitlocalstorage = [];
        popupConfirmation();
    }
    if (!produitlocalstorage.includes(article._id)) {
        produitlocalstorage.push(article._id);
        popupConfirmation();
    }

    localStorage.setItem("produit", JSON.stringify(produitlocalstorage));

});
