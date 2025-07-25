let cart = [];

function addToCart(productId) {
    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (product) {
                cart.push(product);
                alert(`${product.name} ajouté au panier !`);
                updateCart();
            }
        });
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    cart.forEach(product => {
        let item = document.createElement("li");
        item.textContent = `${product.name} - ${product.price}€`;
        cartItems.appendChild(item);
    });
}

document.getElementById('hamburgerMenu').addEventListener('click', function () {
    this.classList.toggle('active');
    document.getElementById('navLinks').classList.toggle('active');
});
