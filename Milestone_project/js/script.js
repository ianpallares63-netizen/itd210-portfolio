async function loadData() {
    const loadingMessage = document.getElementById("loadingMessage");
    const errorMessage = document.getElementById("errorMessage");
    const dataContainer = document.getElementById("dataContainer");
    const loadBtn = document.getElementById("loadBtn");

    loadingMessage.style.display = "block";
    errorMessage.textContent = "";
    dataContainer.innerHTML = "";
    loadBtn.disabled = true;

    try {
        const response = await fetch("https://dummyjson.com/products/category/groceries?limit=3");

        if (!response.ok) {
            throw new Error("Failed to fetch data.");
        }

        const data = await response.json();

        console.log(data);

        data.products.forEach(product => {
            const card = document.createElement("div");
            card.className = "special-card";

            card.innerHTML = `
                <div class="special-card-image">
                    <span class="special-badge">Today's Special</span>
                    <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
                </div>
                <div class="special-card-content">
                    <h3>${product.title}</h3>
                    <p class="special-desc">${product.description}</p>
                    <p class="special-price">$${parseFloat(product.price).toFixed(2)}</p>
                </div>
            `;

            dataContainer.appendChild(card);
        });

    } catch (error) {
        errorMessage.textContent = "Something went wrong. Please try again.";
        console.log(error);
        loadBtn.disabled = false;
    } finally {
        loadingMessage.style.display = "none";
    }
}

document.getElementById("loadBtn").addEventListener("click", loadData);