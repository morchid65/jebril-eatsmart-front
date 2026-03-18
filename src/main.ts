 

import './style.css';


interface Article {
  id_article: number;
  nom: string;
  prix: number;
  description: string;
}

const appDiv = document.querySelector<HTMLDivElement>('#app');

async function chargerArticles() {
  try {
    const response = await fetch('index.php?page=articles');
    
    if (!response.ok) throw new Error("Erreur de communication avec le serveur");

    const articles: Article[] = await response.json();

    console.log("Données reçues :");
    console.table(articles);

    render(articles);

  } catch (error) {
    console.error("Erreur lors du chargement :", error);
    if (appDiv) appDiv.innerHTML = "<p>Erreur de connexion au menu.</p>";
  }
}

function render(liste: Article[]) {
  if (!appDiv) return;

  appDiv.innerHTML = `
    <h1>La Carte EatSmart</h1>
    <div class="menu-container">
      ${liste.map(art => `
        <div class="card">
          <h2>${art.nom}</h2>
          <p>${art.description}</p>
          <p><strong>Prix : ${art.prix} €</strong></p>
        </div>
      `).join('')}
    </div>
  `;
}

chargerArticles();

 