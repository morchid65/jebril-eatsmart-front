<?php
require_once __DIR__ . '/../Models/ArticleModel.php';

class ArticleController {
    private $model;

    public function __construct() {
        $this->model = new ArticleModel();
    }

    public function getAllArticles() {
        $articles = $this->model->getDBAllArticles();
        header('Content-Type: application/json');
        echo json_encode($articles);
    }

    public function getArticleById($id) {
        $article = $this->model->getDBArticleById($id);
        header('Content-Type: application/json');
        echo json_encode($article);
    }

    public function createArticle($data) {
        $result = $this->model->createDBArticle($data);
        http_response_code(201);
        header('Content-Type: application/json');
        echo json_encode($result);
    }

    public function updateArticle($id, $data) {
        $this->model->updateDBArticle($id, $data);
        header('Content-Type: application/json');
        echo json_encode(["message" => "Article mis à jour"]);
    }
}