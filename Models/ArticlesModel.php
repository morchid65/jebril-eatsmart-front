<?php
class ArticleModel {
    private $pdo;

    public function __construct() {
        try {
            // Connexion à la BDD bruno_uber sur localhost
            $this->pdo = new PDO("mysql:host=localhost;dbname=bruno_uber;charset=utf8", "root", "");
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Erreur de connexion : " . $e->getMessage());
        }
    }

    public function getDBAllArticles() {
        $stmt = $this->pdo->query("SELECT * FROM article");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getDBArticleById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM article WHERE id_article = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createDBArticle($data) {
        $req = "INSERT INTO article (nom, prix, description) VALUES (:nom, :prix, :description)";
        $stmt = $this->pdo->prepare($req);
        $stmt->execute([
            ":nom" => $data['nom'],
            ":prix" => $data['prix'],
            ":description" => $data['description']
        ]);
        return ["id" => $this->pdo->lastInsertId()];
    }

    public function updateDBArticle($id, $data) {
        $req = "UPDATE article SET nom = :nom, prix = :prix, description = :desc WHERE id_article = :id";
        $stmt = $this->pdo->prepare($req);
        $stmt->execute([
            ":nom" => $data['nom'],
            ":prix" => $data['prix'],
            ":desc" => $data['description'],
            ":id" => $id
        ]);
    }
}