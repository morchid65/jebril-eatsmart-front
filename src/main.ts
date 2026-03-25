import './style.css'

interface Article {
  id_article: number;
  nom: string;
  prix: string;
  description: string;
}

// Tableau pour stocker les choix de l'utilisateur (Besoin n°3)
let panier: Article[] = [];
const appDiv = document.querySelector<HTMLDivElement>('#app');

async function initV3() {
  try {
    const response = await fetch('http://eatsmart-back.local/index.php?page=articles');
    const articles: Article[] = await response.json();

    if (appDiv) {
      // Besoin n°4 & 5 : Structure avec Header, Content-Wrapper, Menu et Aside
      appDiv.innerHTML = `
        <header>
          <h1>EatSmart - Carte du restaurant</h1>
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
              <div id="cart-items">
                <p>Votre panier est vide</p>
              </div>
              <hr>
              <div class="cart-total">
                <strong>Total : <span id="total-prix">0.00</span>€</strong>
              </div>
          </aside>
        </div>
      `;

      // Besoin n°2 : Ecouteurs d'événements sur chaque bouton
      const boutons = document.querySelectorAll('.btn-order');
      
      boutons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          const platSelectionne = articles[index];
          
          // Affichage console demandé (Besoin n°2)
          console.log(`Bouton n°${index + 1} cliqué`);
          console.log(`Plat ajouté : ${platSelectionne.nom}`);

          ajouterAuPanier(platSelectionne);
        });
      });
    }
  } catch (err) {
    console.error("Erreur V3:", err);
  }
}

/**
 * Gère l'ajout d'un plat et la mise à jour de l'interface (Besoin n°6 & 7)
 */
function ajouterAuPanier(plat: Article) {
  panier.push(plat);

  // Besoin n°3 : État du panier en console
  console.log("État du panier :", panier);

  const cartItemsDiv = document.getElementById('cart-items');
  const totalSpan = document.getElementById('total-prix');

  if (cartItemsDiv && totalSpan) {
    // Besoin n°6 : Mise à jour dynamique de la liste
    cartItemsDiv.innerHTML = panier.map(item => `
      <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
        <span>${item.nom}</span>
        <span>${parseFloat(item.prix).toFixed(2)}€</span>
      </div>
    `).join('');

    // Besoin n°7 : Calcul et affichage du total avec toFixed(2)
    const total = panier.reduce((acc, item) => acc + parseFloat(item.prix), 0);
    totalSpan.innerText = total.toFixed(2);
  }
}

initV3();