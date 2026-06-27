<?php
header("Content-Type: application/json; charset=utf-8");
require_once "conexion.php";

$datos = json_decode(file_get_contents("php://input"), true);

$nombre = trim($datos["nombre"] ?? "");
$telefono = trim($datos["telefono"] ?? "");
$correo = trim($datos["correo"] ?? "");
$producto = trim($datos["producto"] ?? "");
$sabor = trim($datos["sabor"] ?? "");
$tamano = trim($datos["tamano"] ?? "");
$cantidad = intval($datos["cantidad"] ?? 0);
$fecha = trim($datos["fecha"] ?? "");
$descripcion = trim($datos["descripcion"] ?? "");
$comentarios = trim($datos["comentarios"] ?? "");

if ($nombre === "" || $telefono === "" || $correo === "" || $producto === "" || $sabor === "" || $tamano === "" || $cantidad <= 0 || $fecha === "" || $descripcion === "") {
    echo json_encode([
        "success" => false,
        "mensaje" => "Por favor, completa los campos obligatorios del pedido."
    ]);
    exit;
}

$conexion->begin_transaction();

try {
    $sqlCliente = "INSERT INTO clientes (nombre, telefono, correo) VALUES (?, ?, ?)";
    $stmtCliente = $conexion->prepare($sqlCliente);
    $stmtCliente->bind_param("sss", $nombre, $telefono, $correo);
    $stmtCliente->execute();
    $idCliente = $conexion->insert_id;

    $sqlProducto = "
        SELECT p.id_producto
        FROM productos p
        INNER JOIN categorias c ON p.id_categoria = c.id_categoria
        WHERE c.nombre = ? AND p.nombre = ?
        LIMIT 1
    ";
    $stmtProducto = $conexion->prepare($sqlProducto);
    $stmtProducto->bind_param("ss", $producto, $sabor);
    $stmtProducto->execute();
    $resultadoProducto = $stmtProducto->get_result();

    if ($resultadoProducto->num_rows === 0) {
        throw new Exception("El producto seleccionado no existe en la base de datos.");
    }

    $filaProducto = $resultadoProducto->fetch_assoc();
    $idProducto = $filaProducto["id_producto"];

    $sqlPedido = "INSERT INTO pedidos (id_cliente, fecha_entrega, descripcion, comentarios, estado) VALUES (?, ?, ?, ?, 'Pendiente')";
    $stmtPedido = $conexion->prepare($sqlPedido);
    $stmtPedido->bind_param("isss", $idCliente, $fecha, $descripcion, $comentarios);
    $stmtPedido->execute();
    $idPedido = $conexion->insert_id;

    $sqlDetalle = "INSERT INTO detalle_pedido (id_pedido, id_producto, tamano, cantidad) VALUES (?, ?, ?, ?)";
    $stmtDetalle = $conexion->prepare($sqlDetalle);
    $stmtDetalle->bind_param("iisi", $idPedido, $idProducto, $tamano, $cantidad);
    $stmtDetalle->execute();

    $conexion->commit();

    echo json_encode([
        "success" => true,
        "mensaje" => "Tu pedido fue registrado correctamente. La pastelería se comunicará contigo pronto."
    ]);
} catch (Exception $e) {
    $conexion->rollback();

    echo json_encode([
        "success" => false,
        "mensaje" => $e->getMessage()
    ]);
}
?>
