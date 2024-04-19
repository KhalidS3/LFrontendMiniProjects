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

    // Display a message when the page loads
    if (!localStorage.getItem("introShown")) {
        showModal(
            "Welcome to Munamii Cakery! We're excited to have you here. Our website is still baking in the oven," +
                " so to speak, and your feedback is invaluable in helping us" +
                " fine-tune the recipe. Thanks for being part of our" +
                " journey to create the perfect online cakery experience!"
        );
        localStorage.setItem("introShown", true);
    }

    // Loading Footer
    fetch("footer.html")
        .then((response) => response.text())
        .then((data) => {
            const footerElement = document.getElementById("footer");
            if (footerElement) {
                footerElement.innerHTML = data;
            }
        })
        .catch((error) => console.error("Error loading the footer:", error));
});

function showModal(message) {
    // Code to create and display your modal
    const modal = document.createElement("div");
    modal.setAttribute("id", "introModal");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>${message}</p>
        </div>
    `;

    // Append the modal to the body
    document.body.appendChild(modal);

    // Show the modal by changing the display or adding a class
    modal.style.display = "block";

    // Close button functionality
    const closeButton = modal.querySelector(".close");
    closeButton.onclick = function () {
        modal.remove(); // This will remove the modal from the DOM completely
    };

    // Close the modal if the user clicks anywhere outside the modal content
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.remove();
        }
    };
}
