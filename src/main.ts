// 1. Définition du modèle de données (Besoin n°1)
interface Article {
  nom: string;
  prix: number;
  description: string;
}

// 2. Le catalogue de pizzas (Données hardcodées)
const catalogue: Article[] = [
  { nom: "Anchois 23cm", prix: 7.9, description: "Sauce tomate, anchois, olives" },
  { nom: "Anchois 33cm", prix: 11.9, description: "Sauce tomate, anchois, olives" },
  { nom: "Emmental 23cm", prix: 7.9, description: "Sauce tomate, emmental, basilic" }
];

// 3. Affichage sur la page (Besoin n°3)
const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  app.innerHTML = `
    <h1>EatSmart - Carte du Restaurant</h1>
    <div class="menu-grid">
      ${catalogue.map(pizza => `
        <div class="pizza-card">
          <h2>${pizza.nom}</h2>
          <p>${pizza.description}</p>
          <p><strong>${pizza.prix.toFixed(2)} €</strong></p>
        </div>
      `).join('')}
    </div>
  `;
}

// 4. Log pour le prof (Preuve que le tableau existe)
console.table(catalogue);