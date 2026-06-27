<?php
$servidor = "localhost";
$usuario = "root";
$clave = "root";
$base_datos = "la_foresta_db";

$conexion = new mysqli($servidor, $usuario, $clave, $base_datos);

if ($conexion->connect_error) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "mensaje" => "Error de conexión con la base de datos."
    ]);
    exit;
}

$conexion->set_charset("utf8mb4");
?>
