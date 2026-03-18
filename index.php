<?php
require_once __DIR__ . '/Controllers/ArticleController.php';

$articleController = new ArticleController();

if (empty($_GET["page"])) {
    http_response_code(404);
    echo json_encode(["error" => "Page non trouvée"]);
} else {
    $url = explode("/", $_GET['page']);
    $method = $_SERVER['REQUEST_METHOD'];

    switch($url[0]) {
        case "articles":
            switch ($method) {
                case "GET":
                    if (isset($url[1])) {
                        $articleController->getArticleById($url[1]);
                    } else {
                        $articleController->getAllArticles();
                    }
                    break;
                case "POST":
                    $data = json_decode(file_get_contents("php://input"), true);
                    $articleController->createArticle($data);
                    break;
                case "PUT":
                    if (isset($url[1])) {
                        $data = json_decode(file_get_contents("php://input"), true);
                        $articleController->updateArticle($url[1], $data);
                    }
                    break;
                case "DELETE":
                    if (isset($url[1])) {
                        $articleController->deleteArticle($url[1]);
                    }
                    break;
            }
            break;
    }
}