// 1. Définition de l'interface (Contrat de données)
// On utilise les noms exacts de ta base SQL : id_article, nom, prix, description
interface Article {
  id_article: number;
  nom: string;
  prix: string; // Le type DECIMAL SQL arrive en string via le JSON
  description: string;
}

//  sélection de la zone d'affichage dans le HTML (index.html)
const app = document.querySelector<HTMLDivElement>('#app');

/**
 * Fonction principale pour charger les données depuis l'API PHP
 * Utilise l'asynchronisme (async/await) pour ne pas bloquer le navigateur
 */
async function chargerCatalogue() {
  try {
    // Appel à l'API (Assure-toi que WAMP est lancé et le dossier bien nommé)
// On utilise l'adresse configurée dans le VHost et le hosts Windows
const response = await fetch('http://eatsmart-back.local/index.php?page=articles');    
    // Vérification si la réponse est correcte (Statut 200)
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut: ${response.status}`);
    }

    // Conversion du JSON reçu en tableau d'Articles
    const catalogue: Article[] = await response.json();

    // BESOIN N°1 : Validation pour le client (Console)
    console.log("--- Données reçues du Backend ---");
    console.table(catalogue);

    // BESOIN N°2 : Construction dynamique du HTML
    if (app) {
      app.innerHTML = `
        <h1>EatSmart - Carte du Restaurant (V2)</h1>
        <p style="text-align:center">Données chargées en direct de la base de données.</p>
        
        <div class="menu-grid">
          ${catalogue.map(item => `
            <div class="pizza-card">
              <h2>${item.nom}</h2>
              <p>${item.description}</p>
              <p class="price">
                <strong>${parseFloat(item.prix).toFixed(2)} €</strong>
              </p>
            </div>
          `).join('')}
        </div>
      `;
    }

  } catch (error) {
    // Gestion des erreurs (CORS, serveur éteint, faute de frappe URL)
    console.error("Erreur de chargement :", error);
    if (app) {
      app.innerHTML = `
        <div style="color: red; text-align: center; padding: 20px;">
          <h2>Oups ! Connexion impossible</h2>
          <p>Vérifiez que WAMP est bien lancé et que l'URL de l'API est correcte.</p>
          <small>${error}</small>
        </div>
      `;
    }
  }
}

// Lancement automatique au chargement du script
chargerCatalogue();