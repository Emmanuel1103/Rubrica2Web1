// Cargar productos desde la API
const productGrid = document.getElementById('productGrid');
const productFilter = document.getElementById('productFilter');

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
        // Limitar los productos a los primeros 16
        const limitedProducts = products.slice(0, 16);
        renderProducts(limitedProducts);
        populateFilter(limitedProducts);
    });

// Función para renderizar las tarjetas
function renderProducts(products) {
    productGrid.innerHTML = ''; // Limpiar el grid
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Precio: $${product.price}</p>
        `;
        productGrid.appendChild(card);
    });
}

// Función para llenar el filtro con los nombres de productos
function populateFilter(products) {
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.title;
        productFilter.appendChild(option);
    });
}

// Función de filtrado de productos
productFilter.addEventListener('change', function () {
    const selectedValue = this.value;

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            // Limitar los productos a los primeros 16
            const limitedProducts = products.slice(0, 16);

            if (selectedValue === 'all') {
                renderProducts(limitedProducts);
            } else {
                const filteredProduct = limitedProducts.filter(product => product.id == selectedValue);
                renderProducts(filteredProduct);
            }
        });
});
