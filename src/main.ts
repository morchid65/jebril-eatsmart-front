import './style.css'

// Définition des données (Besoin n°1)
interface Plat {
  id: number;
  nom: string;
  prix: number;
  description: string;
  disponible: boolean;
}

const plats: Plat[] = [
  { id: 1, nom: "Pizza Margherita", prix: 10.50, description: "Tomate, mozza, basilic", disponible: true },
  { id: 2, nom: "Pizza Reine", prix: 12.00, description: "Jambon, champignons", disponible: true },
  { id: 3, nom: "Pizza 4 Fromages", prix: 14.50, description: "Chèvre, reblochon, gorgonzola", disponible: false }
];

// BESOIN N°1 : Affichage en console sous forme de tableau
console.log("--- EatSmart V1 : Données Hardcodées ---");
console.table(plats);

// BESOIN N°2 & 3 : Organisation de la page et présentation visuelle
const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  app.innerHTML = `
    <header>
      <h1>EatSmart - Carte du Restaurant</h1>
    </header>
    <main class="menu-container">
      ${plats.map(plat => `
        <div class="card">
          <h2>${plat.nom}</h2>
          <p>${plat.description}</p>
          <p><strong>Prix : ${plat.prix.toFixed(2)} €</strong></p>
          ${plat.disponible 
            ? `<button class="btn-order">Commander</button>` 
            : `<span class="sold-out">Victime de son succès</span>`
          }
        </div>
      `).join('')}
    </main>
  `;
}