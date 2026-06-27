<?php
header("Content-Type: application/json; charset=utf-8");
require_once "conexion.php";

$busqueda = trim($_GET["busqueda"] ?? "");
$orden = trim($_GET["orden"] ?? "");

$sql = "
    SELECT 
        pe.id_pedido AS id,
        cl.nombre,
        cl.telefono,
        cl.correo,
        ca.nombre AS producto,
        pr.nombre AS sabor,
        de.tamano,
        de.cantidad,
        pe.fecha_entrega AS fecha,
        pe.descripcion,
        pe.comentarios,
        pe.estado
    FROM pedidos pe
    INNER JOIN clientes cl ON pe.id_cliente = cl.id_cliente
    INNER JOIN detalle_pedido de ON pe.id_pedido = de.id_pedido
    INNER JOIN productos pr ON de.id_producto = pr.id_producto
    INNER JOIN categorias ca ON pr.id_categoria = ca.id_categoria
";

$parametros = [];
$tipos = "";

if ($busqueda !== "") {
    $sql .= " WHERE cl.nombre LIKE ? OR cl.telefono LIKE ? ";
    $textoBusqueda = "%" . $busqueda . "%";
    $parametros[] = $textoBusqueda;
    $parametros[] = $textoBusqueda;
    $tipos .= "ss";
}

if ($orden === "proxima") {
    $sql .= " ORDER BY pe.fecha_entrega ASC, pe.id_pedido DESC";
} elseif ($orden === "lejana") {
    $sql .= " ORDER BY pe.fecha_entrega DESC, pe.id_pedido DESC";
} else {
    $sql .= " ORDER BY pe.id_pedido DESC";
}

$stmt = $conexion->prepare($sql);

if (!empty($parametros)) {
    $stmt->bind_param($tipos, ...$parametros);
}

$stmt->execute();
$resultado = $stmt->get_result();

$pedidos = [];

while ($fila = $resultado->fetch_assoc()) {
    $pedidos[] = $fila;
}

$sqlContadores = "
    SELECT 
        SUM(estado = 'Pendiente') AS pendientes,
        SUM(estado = 'En proceso') AS enProceso,
        SUM(estado = 'Listo') AS listos
    FROM pedidos
";

$resultadoContadores = $conexion->query($sqlContadores);
$contadores = $resultadoContadores->fetch_assoc();

echo json_encode([
    "success" => true,
    "pedidos" => $pedidos,
    "contadores" => [
        "pendientes" => intval($contadores["pendientes"] ?? 0),
        "enProceso" => intval($contadores["enProceso"] ?? 0),
        "listos" => intval($contadores["listos"] ?? 0)
    ]
]);
?>
