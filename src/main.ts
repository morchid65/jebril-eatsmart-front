import './style.css'

// Interface correspondant à la structure de la base de données
interface Article {
  id_article: number;
  nom: string;
  prix: string; // Le JSON renvoie souvent le DECIMAL en string
  description: string;
}

const app = document.querySelector<HTMLDivElement>('#app');

/**
 * Fonction principale pour récupérer et afficher les articles depuis l'API
 */
async function chargerArticles() {
  try {
    // Appel à l'API PHP via le VirtualHost (Besoin n°1)
    const response = await fetch('http://eatsmart-back.local/index.php?page=articles');
    
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }

    const articles: Article[] = await response.json();

    // BESOIN N°1 : Affichage des données brutes en console pour validation client
    console.log("--- EatSmart V2 : Données reçues de l'API ---");
    console.table(articles);

    // BESOIN N°2 : Rendre la carte autonome (Affichage dynamique de TOUS les articles)
    if (app) {
      app.innerHTML = `
        <header>
          <h1>EatSmart - Carte du Restaurant</h1>
        </header>
        <main class="menu-container">
          ${articles.map(article => `
            <div class="card">
              <h2>${article.nom}</h2>
              <p>${article.description}</p>
              <p><strong>Prix : ${parseFloat(article.prix).toFixed(2)} €</strong></p>
              <button class="btn-order">Commander</button>
            </div>
          `).join('')}
        </main>
      `;
    }

  } catch (error) {
    console.error("Erreur technique :", error);
    if (app) {
      app.innerHTML = `<h1>Erreur de connexion à l'API</h1><p>Vérifiez que Wamp et le VirtualHost sont actifs.</p>`;
    }
  }
}

// Lancement du chargement au démarrage de la page
chargerArticles();