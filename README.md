# 🥗 EatSmart - Front-End (Historique V1-V4)

Application Web moderne développée avec **Vite** et **TypeScript**.

![Schéma Architecture](Creation-MCD-MLD-EatSmart.PNG)

## 📜 Historique des Versions
* **V1 : Maquette Statique** 🎨
    * Structure HTML/CSS de base.
    * Affichage "en dur" des premiers produits.
* **V2 : Dynamisation TypeScript** 🛠️
    * Mise en place des interfaces (Article, Panier).
    * Logique de calcul du total du panier.
* **V3 : Connexion API (Articles)** 🔌
    * Remplacement des données statiques par un `fetch` vers l'API PHP.
    * Génération dynamique des cartes de pizzas via `.map()`.
* **V4 : Validation de Commande** 🚀
    * Création de la fonction `envoyerCommande()`.
    * Envoi du payload JSON complet (Date, Total, IDs) vers le Back-end.

## 🛠️ Installation & Run
1. `npm install`
2. `npm run dev` (URL : `http://localhost:5173`)

## 🔗 Liaison API
L'application communique avec `http://eatsmart-back.local/index.php`.
