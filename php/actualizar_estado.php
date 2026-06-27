<?php
header("Content-Type: application/json; charset=utf-8");
require_once "conexion.php";

$datos = json_decode(file_get_contents("php://input"), true);

$idPedido = intval($datos["id"] ?? 0);
$nuevoEstado = trim($datos["estado"] ?? "");

$estadosPermitidos = ["Pendiente", "En proceso", "Listo", "Entregado", "Cancelado"];

if ($idPedido <= 0 || !in_array($nuevoEstado, $estadosPermitidos)) {
    echo json_encode([
        "success" => false,
        "mensaje" => "Datos inválidos para actualizar el estado."
    ]);
    exit;
}

$sql = "UPDATE pedidos SET estado = ? WHERE id_pedido = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("si", $nuevoEstado, $idPedido);
$stmt->execute();

echo json_encode([
    "success" => true,
    "mensaje" => "El estado del pedido fue actualizado correctamente."
]);
?>
