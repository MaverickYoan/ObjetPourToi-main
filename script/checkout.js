
let stripe, elements, card;

// Initialisation Stripe et Elements
fetch('/stripe-public-key')
  .then(res => res.json())
  .then(data => {
    stripe = Stripe(data.publicKey);
    elements = stripe.elements();
    card = elements.create('card');
    card.mount('#card-element');
  });

const form = document.getElementById('payment-form');
const paymentMessage = document.getElementById('payment-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  paymentMessage.textContent = '';

  // À adapter selon le montant réel et la devise
  const response = await fetch('/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 1000, currency: 'eur' }) // 10€
  });
  const data = await response.json();
  const clientSecret = data.clientSecret;

  const {error, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: card,
    }
  });

  if (error) {
    paymentMessage.textContent = error.message;
  } else if (paymentIntent && paymentIntent.status === 'succeeded') {
    paymentMessage.textContent = 'Paiement réussi !';
  }

const stripe = Stripe("VOTRE_CLE_PUBLIQUE_STRIPE");
const checkoutButton = document.getElementById("checkout-button");

checkoutButton.addEventListener("click", () => {
    fetch("/create-checkout-session", { method: "POST" })
        .then(response => response.json())
        .then(session => {
            return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .catch(error => console.error("Erreur lors du paiement :", error));
});

});