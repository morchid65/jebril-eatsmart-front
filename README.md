# 🍕 EatSmart - API Back-End (Historique V2-V4)

Ce dépôt contient l'API REST en PHP développée avec une architecture MVC.

## 📜 Historique des Versions
* **V2 : Architecture MVC** 🏗️
    * Mise en place de la structure `Controllers/` et `Models/`.
    * Connexion à la base de données `jebril_eatsmart`.
    * Première route fonctionnelle pour tester la connexion.
* **V3 : Route Articles** 🥗
    * Création du `ArticleModel` et `ArticleController`.
    * Récupération dynamique des pizzas (ID, Nom, Prix, Description).
    * Formatage de la sortie en JSON pur pour le Front-end.
* **V4 : Gestion des Commandes & Tests** 🛒
    * Ajout de la route `?page=commandes` (Méthode POST).
    * Traitement du JSON entrant pour l'enregistrement des paniers.
    * **Postman** : Ajout de scripts de tests automatisés (Status 200, JSON check).

## 🛠️ Configuration
- **VirtualHost** : `http://eatsmart-back.local`
- **Dossier WAMP** : `www/projet-eatsmart-jebril/jebril-eatsmart-back/`

## 🧪 Tests
Importer le fichier dans `/postman` pour tester l'intégralité des routes.
