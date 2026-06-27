<?php
$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "la_foresta_db";

$conexion = new mysqli($servidor, $usuario, $password, $base_datos);

if ($conexion->connect_error) {
    die(json_encode([
        "estado" => "error",
        "mensaje" => "Error de conexión con MySQL: " . $conexion->connect_error
    ]));
}

$conexion->set_charset("utf8mb4");
?>
