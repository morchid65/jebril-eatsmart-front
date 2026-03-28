import './style.css'

// 1. Interface alignée sur ton dump SQL
interface Article {
  id_article: number;
  nom: string;
  prix: string; // decimal(19,4) arrive souvent en string via JSON
  description: string;
  id_categorie: number;
}

let panier: Article[] = [];
const appDiv = document.querySelector<HTMLDivElement>('#app');

async function initV4() {
  try {
    // 2. Appel vers ton API (Vérifie que ton PHP pointe bien vers la table 'article')
    const response = await fetch('http://eatsmart-back.local/index.php?page=articles');
    const articles: Article[] = await response.json();

    if (appDiv) {
      appDiv.innerHTML = `
        <header>
          <h1>EatSmart - V4 (Commandes)</h1>
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

      // Ecouteurs pour le panier
      document.querySelectorAll('.menu-container .btn-order').forEach((btn, index) => {
        btn.addEventListener('click', () => ajouterAuPanier(articles[index]));
      });

      // BESOIN N°1 : Clic sur Valider
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
 * BESOIN N°2 & 3 : Envoi vers la table `commande`
 */
async function envoyerCommande() {
  if (panier.length === 0) return alert("Panier vide !");

  // Formatage de la date (Besoin n°2)
  const maintenant = new Date();
  const dateMySQL = maintenant.toISOString().slice(0, 19).replace('T', ' ');
  
  const total = panier.reduce((acc, item) => acc + parseFloat(item.prix), 0);

  // Objet JSON (Payload) - Besoin n°2
  const commandePayload = {
    id_commande: null, // Sera auto-incrémenté en BDD
    date_commande: dateMySQL,
    prix_total: total.toFixed(2),
    etat: "en cours" // Optionnel, car présent dans ton dump
  };

  console.log("Objet Commande (Payload) :", commandePayload);

  // BESOIN N°3 : Envoi (POST)
  try {
    const response = await fetch('http://eatsmart-back.local/index.php?page=commandes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commandePayload)
    });

    if (response.ok) {
      alert("Commande enregistrée avec succès !");
      panier = [];
      actualiserPanierUI();
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