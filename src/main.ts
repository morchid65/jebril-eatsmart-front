// --- VERSION 1 : AFFICHAGE STATIQUE ---
const app = document.querySelector<HTMLDivElement>('#app');

const catalogueV1 = [
  { id_article: 1, nom: "Pizza Margherita", prix: "10.00", description: "Tomate, mozza, basilic frais" },
  { id_article: 2, nom: "Pizza Reine", prix: "12.50", description: "Tomate, mozza, jambon, champignons" },
  { id_article: 3, nom: "Pizza 4 Fromages", prix: "14.00", description: "Tomate, mozza, chèvre, reblochon, gorgonzola" }
];

if (app) {
  app.innerHTML = `
    <h1>EatSmart - V1 (Maquette Statique)</h1>
    <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
      ${catalogueV1.map(item => `
        <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; width: 200px;">
          <h2>${item.nom}</h2>
          <p>${item.description}</p>
          <p><strong>${item.prix} €</strong></p>
        </div>
      `).join('')}
    </div>
  `;
}