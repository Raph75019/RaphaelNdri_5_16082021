
fetch("http://localhost:3000/api/teddies")
    .then(function (response) {
        return response.json()
    })
    .then(function (resApi) {
        displayallproduct(resApi);
    })
    .catch(function (erreur) {
        alert(erreur)
    })

function displayallproduct(articles) {
    console.log(articles)

    articles.forEach(function (article) {
        const main = document.querySelector("#main");

        const product = document.createElement("article");
        product.classList.add("description");

        const linkUrl = `/front-end/html/produit.html?id=${article._id}`;

        const lien = document.createElement("a");
        lien.setAttribute("href", linkUrl);
        lien.appendChild(product);
        main.appendChild(lien);



        const image = document.createElement("img");
        image.src = article.imageUrl;
        product.appendChild(image);
        image.classList.add("imageourson");

        const nom = document.createElement("div");
        nom.innerHTML = article.name;
        product.appendChild(nom);
        nom.classList.add("nom-ourson")

        const prix = document.createElement("div")
        prix.innerHTML = article.price / 100 + `€`;
        product.appendChild(prix);



    })
}





