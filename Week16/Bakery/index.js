document.addEventListener("DOMContentLoaded", function () {
    // Load header
    fetch("header.html")
        .then((response) => response.text())
        .then((data) => {
            const headerElement = document.getElementById("header");
            if (headerElement) {
                headerElement.innerHTML = data;
            }
        })
        .catch((error) => console.error("Error loading the header:", error));

    // Fetching the data from the JSON file
    // and displaying it in the product page
    if (
        document.getElementById("cupcakesContainer") ||
        document.getElementById("weddingCakesContainer")
    ) {
        fetch("products.json")
            .then((response) => response.json())
            .then((products) => {
                const cupcakes = products.filter(
                    (product) => product.type === "cupcake"
                );
                const weddingCakes = products.filter(
                    (product) => product.type === "wedding-cake"
                );

                const displayProducts = (products, containerId) => {
                    const container = document.getElementById(containerId);
                    const html = products
                        .map(
                            (product) => `
                        <div class="product">
                            <img src="${product.img}" alt="Image of ${product.title}">
                            <h3>${product.title}</h3>
                            <p>${product.description}</p>
                            <p>Price: ${product.price}$</p>
                        </div>
                    `
                        )
                        .join("");
                    container.innerHTML = html;
                };

                displayProducts(cupcakes, "cupcakesContainer");
                displayProducts(weddingCakes, "weddingCakesContainer");
            })
            .catch((error) =>
                console.error("Failed to load product data:", error)
            );
    }
});
