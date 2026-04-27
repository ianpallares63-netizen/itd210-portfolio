// Step 1: Verify fetch with console.log()
async function loadData() {
    const loadingMessage = document.getElementById("loadingMessage");
    const errorMessage = document.getElementById("errorMessage");
    const dataContainer = document.getElementById("dataContainer");

    loadingMessage.style.display = "block";
    errorMessage.textContent = "";
    dataContainer.innerHTML = "";

    try {
        
        const response = await fetch("https://dummyjson.com/products/category/groceries?limit=3");

        if (!response.ok) {
            throw new Error("Failed to fetch data.");
        }

        const data = await response.json();

        // Step 1
        console.log(data);

        // Step 2
        data.products.forEach(product => {
            const item = document.createElement("div");
            item.innerHTML = `
                <h3>${product.title}</h3>
                <img src="${product.thumbnail}" alt="${product.title}" style="width:100px;">
                <p>${product.description}</p>
                <p><strong>Price: $${product.price}</strong></p>
            `;
            dataContainer.appendChild(item);
        });

    } catch (error) {
        // Step 4
        errorMessage.textContent = "Something went wrong. Please try again.";
        console.log(error);
    } finally {
        loadingMessage.style.display = "none";
    }
}

// Step 5
document.getElementById("loadBtn").addEventListener("click", loadData);