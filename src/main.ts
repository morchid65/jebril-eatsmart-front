import './style.css'

interface Article {
  id_article: number;
  nom: string;
  prix: string;
  description: string;
  id_categorie: number;
}

let panier: Article[] = [];
const appDiv = document.querySelector<HTMLDivElement>('#app');

// --- Centralisation des URLs (Pour éviter les erreurs 404) ---
const BASE_URL = "http://eatsmart-back.local/index.php";
async function initV4() {
  try {
    // Appel pour charger les articles
    const response = await fetch(`${BASE_URL}?page=articles`);
    const articles: Article[] = await response.json();

    if (appDiv) {
      appDiv.innerHTML = `
        <header>
          <h1>EatSmart - V4</h1>
        </header>
        <div class="content-wrapper">
          <main class="menu-container">
            ${articles.map(plat => `
              <div class="card">
                <h2>${plat.nom}</h2>
                <p>${plat.description}</p>
                <p><strong>${parseFloat(plat.prix).toFixed(2)}€</strong></p>
                <button class="btn-order">Ajouter</button>
              </div>
            `).join('')}
          </main>

          <aside class="cart-container">
              <h2>Votre Panier</h2>
              <div id="cart-items"><p>Votre panier est vide</p></div>
              <hr>
              <div class="cart-total">
                <strong>Total : <span id="total-prix">0.00</span>€</strong>
              </div>
              <button id="btn-valider" class="btn-order" style="margin-top:20px; background-color:#2980b9;">
                Valider la commande
              </button>
          </aside>
        </div>
      `;

      document.querySelectorAll('.menu-container .btn-order').forEach((btn, index) => {
        btn.addEventListener('click', () => ajouterAuPanier(articles[index]));
      });

      document.getElementById('btn-valider')?.addEventListener('click', () => {
        console.log("Bouton Valider commande cliqué");
        envoyerCommande();
      });
    }
  } catch (err) {
    console.error("Erreur V4:", err);
  }
}

/**
 * BESOIN N°2 & 3 : Envoi des données (POST)
 */
async function envoyerCommande() {
  if (panier.length === 0) return alert("Panier vide !");

  const maintenant = new Date();
  const dateMySQL = maintenant.toISOString().slice(0, 19).replace('T', ' ');
  const total = panier.reduce((acc, item) => acc + parseFloat(item.prix), 0);

  // Objet JSON (Payload) - Besoin n°2
  const commandePayload = {
    id_commande: null,
    date_commande: dateMySQL,
    prix_total: total.toFixed(2),
    etat: "en cours",
    articles: panier.map(a => a.id_article) // Optionnel : IDs pour la table assoc
  };

  console.log("Objet Commande (Payload) :", commandePayload);

  // BESOIN N°3 : Envoi effectif
  try {
    const response = await fetch(`${BASE_URL}?page=commandes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commandePayload)
    });

    if (response.ok) {
      alert("Commande enregistrée avec succès !");
      panier = [];
      actualiserPanierUI();
    } else {
      alert("Erreur serveur lors de l'enregistrement.");
    }
  } catch (error) {
    console.error("Erreur d'envoi :", error);
  }
}

function ajouterAuPanier(plat: Article) {
  panier.push(plat);
  actualiserPanierUI();
}

function actualiserPanierUI() {
  const itemsDiv = document.getElementById('cart-items');
  const totalSpan = document.getElementById('total-prix');
  if (itemsDiv && totalSpan) {
    itemsDiv.innerHTML = panier.length > 0 
      ? panier.map(i => `<div>${i.nom} - ${parseFloat(i.prix).toFixed(2)}€</div>`).join('')
      : "<p>Votre panier est vide</p>";
    
    const total = panier.reduce((acc, item) => acc + parseFloat(item.prix), 0);
    totalSpan.innerText = total.toFixed(2);
  }
}

initV4();