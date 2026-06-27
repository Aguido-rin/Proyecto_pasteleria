console.log("Página de Pastelería La Foresta cargada correctamente.");

/*CATALOGO*/
function mostrarCategoria(categoriaId, botonSeleccionado) {
    const categorias = document.querySelectorAll(".categoria-contenido");
    const botones = document.querySelectorAll(".categoria-btn");

    categorias.forEach(categoria => {
        categoria.classList.remove("activo");
    });

    botones.forEach(boton => {
        boton.classList.remove("activo");
    });

    document.getElementById(categoriaId).classList.add("activo");
    botonSeleccionado.classList.add("activo");
}

/*PEDIDO*/
const productoSelect = document.getElementById("producto");
const saborSelect = document.getElementById("sabor");

const opcionesPorProducto = {
    "Torta": [
        "Torta de chocolate",
        "Torta tres leches",
        "Torta de fresa"
    ],
    "Torta personalizada": [
        "Torta de cumpleaños",
        "Torta infantil",
        "Torta para eventos"
    ],
    "Bocaditos": [
        "Bocaditos dulces",
        "Bocaditos salados"
    ],
    "Desayuno": [
        "Desayuno clásico",
        "Desayuno sorpresa",
        "Empanadas"
    ],
    "Queque": [
        "Queque de vainilla",
        "Queque de naranja"
    ],
    "Postre": [
        "Cheesecake",
        "Tres leches en vaso",
        "Pie de limón"
    ],
    "Helado artesanal": [
        "Helado de fresa",
        "Helado de chocolate"
    ]
};

if (productoSelect && saborSelect) {
    productoSelect.addEventListener("change", function () {
        const productoSeleccionado = productoSelect.value;

        saborSelect.innerHTML = "";

        const opcionInicial = document.createElement("option");
        opcionInicial.value = "";
        opcionInicial.textContent = "Selecciona una opción";
        saborSelect.appendChild(opcionInicial);

        if (opcionesPorProducto[productoSeleccionado]) {
            opcionesPorProducto[productoSeleccionado].forEach(function (opcion) {
                const nuevaOpcion = document.createElement("option");
                nuevaOpcion.value = opcion;
                nuevaOpcion.textContent = opcion;
                saborSelect.appendChild(nuevaOpcion);
            });
        } else {
            const opcionVacia = document.createElement("option");
            opcionVacia.value = "";
            opcionVacia.textContent = "Primero selecciona un producto";
            saborSelect.appendChild(opcionVacia);
        }
    });
}

/*CONTACTO*/
const formContacto = document.getElementById("formContacto");

if (formContacto) {
    formContacto.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombreContacto = document.getElementById("nombreContacto").value.trim();
        const correoContacto = document.getElementById("correoContacto").value.trim();
        const mensajeContacto = document.getElementById("mensajeContacto").value.trim();
        const mensajeContactoTexto = document.getElementById("mensajeContactoTexto");

        if (nombreContacto === "" || correoContacto === "" || mensajeContacto === "") {
            mensajeContactoTexto.textContent = "Por favor, completa todos los campos.";
            mensajeContactoTexto.style.color = "#c9184a";
            return;
        }

        mensajeContactoTexto.textContent = "Tu mensaje fue enviado correctamente. Te responderemos pronto.";
        mensajeContactoTexto.style.color = "#2e7d32";

        formContacto.reset();
    });
}

/* ========================= */
/* REGISTRO REAL DE PEDIDOS */
/* PHP + MYSQL */
/* ========================= */

const formularioPedido = document.getElementById("formPedido");

if (formularioPedido) {
    formularioPedido.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const producto = document.getElementById("producto").value;
        const sabor = document.getElementById("sabor").value;
        const tamano = document.getElementById("tamano").value;
        const cantidad = document.getElementById("cantidad").value;
        const fecha = document.getElementById("fecha").value;
        const descripcion = document.getElementById("descripcion").value.trim();
        const comentarios = document.getElementById("comentarios").value.trim();
        const mensaje = document.getElementById("mensajePedido");

        if (
            nombre === "" ||
            telefono === "" ||
            correo === "" ||
            producto === "" ||
            sabor === "" ||
            tamano === "" ||
            cantidad === "" ||
            fecha === "" ||
            descripcion === ""
        ) {
            mensaje.textContent = "Por favor, completa los campos obligatorios del pedido.";
            mensaje.style.color = "#c9184a";
            return;
        }

        const nuevoPedido = {
            nombre: nombre,
            telefono: telefono,
            correo: correo,
            producto: producto,
            sabor: sabor,
            tamano: tamano,
            cantidad: cantidad,
            fecha: fecha,
            descripcion: descripcion,
            comentarios: comentarios
        };

        try {
            const respuesta = await fetch("php/guardar_pedido.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoPedido)
            });

            const resultado = await respuesta.json();

            if (resultado.success) {
                mensaje.textContent = resultado.mensaje;
                mensaje.style.color = "#2e7d32";

                formularioPedido.reset();

                const saborSelect = document.getElementById("sabor");
                saborSelect.innerHTML = `<option value="">Primero selecciona un producto</option>`;
            } else {
                mensaje.textContent = resultado.mensaje;
                mensaje.style.color = "#c9184a";
            }

        } catch (error) {
            mensaje.textContent = "No se pudo registrar el pedido. Verifica que Apache y MySQL estén activos.";
            mensaje.style.color = "#c9184a";
        }
    });
}

/* ========================= */
/* MOSTRAR PEDIDOS REALES EN ADMIN */
/* ========================= */

const tablaPedidos = document.getElementById("tablaPedidos");
let pedidosAdmin = [];

if (tablaPedidos) {
    mostrarPedidosAdmin();
}

const buscarCliente = document.getElementById("buscarCliente");

if (buscarCliente) {
    buscarCliente.addEventListener("input", function() {
        mostrarPedidosAdmin();
    });
}

const ordenFecha = document.getElementById("ordenFecha");

if (ordenFecha) {
    ordenFecha.addEventListener("change", function() {
        mostrarPedidosAdmin();
    });
}

async function mostrarPedidosAdmin() {
    const contadorPendientes = document.getElementById("contadorPendientes");
    const contadorEnProceso = document.getElementById("contadorEnProceso");
    const contadorListos = document.getElementById("contadorListos");
    const buscarCliente = document.getElementById("buscarCliente");
    const ordenFecha = document.getElementById("ordenFecha");

    tablaPedidos.innerHTML = "";

    let textoBusqueda = "";
    let tipoOrden = "";

    if (buscarCliente) {
        textoBusqueda = buscarCliente.value.trim();
    }

    if (ordenFecha) {
        tipoOrden = ordenFecha.value;
    }

    try {
        const respuesta = await fetch(
            `php/listar_pedidos.php?busqueda=${encodeURIComponent(textoBusqueda)}&orden=${encodeURIComponent(tipoOrden)}`
        );

        const resultado = await respuesta.json();

        if (!resultado.success) {
            tablaPedidos.innerHTML = `
                <tr>
                    <td colspan="10">No se pudieron cargar los pedidos.</td>
                </tr>
            `;
            return;
        }

        pedidosAdmin = resultado.pedidos;

        contadorPendientes.textContent = resultado.contadores.pendientes;
        contadorEnProceso.textContent = resultado.contadores.enProceso;
        contadorListos.textContent = resultado.contadores.listos;

        if (pedidosAdmin.length === 0) {
            tablaPedidos.innerHTML = `
                <tr>
                    <td colspan="10">Todavía no hay pedidos registrados.</td>
                </tr>
            `;
            return;
        }

        pedidosAdmin.forEach((pedido, index) => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${pedido.id}</td>
                <td>${pedido.nombre}</td>
                <td>${pedido.telefono}</td>
                <td>${pedido.producto}</td>
                <td>${pedido.sabor}</td>
                <td>${pedido.tamano}</td>
                <td>${pedido.cantidad}</td>
                <td>${pedido.fecha}</td>
                <td>
                    <select class="select-estado" onchange="cambiarEstadoPedido(${pedido.id}, this.value)">
                        <option value="Pendiente" ${pedido.estado === "Pendiente" ? "selected" : ""}>Pendiente</option>
                        <option value="En proceso" ${pedido.estado === "En proceso" ? "selected" : ""}>En proceso</option>
                        <option value="Listo" ${pedido.estado === "Listo" ? "selected" : ""}>Listo</option>
                        <option value="Entregado" ${pedido.estado === "Entregado" ? "selected" : ""}>Entregado</option>
                        <option value="Cancelado" ${pedido.estado === "Cancelado" ? "selected" : ""}>Cancelado</option>
                    </select>
                </td>
                <td>
                    <button class="btn-ver" onclick="verDetallePedido(${index})">Ver</button>
                </td>
            `;

            tablaPedidos.appendChild(fila);
        });

    } catch (error) {
        tablaPedidos.innerHTML = `
            <tr>
                <td colspan="10">Error al conectar con PHP. Verifica que el proyecto esté en htdocs y Apache esté activo.</td>
            </tr>
        `;
    }
}

/* ========================= */
/* VER DETALLE DEL PEDIDO */
/* ========================= */

function verDetallePedido(index) {
    const pedido = pedidosAdmin[index];
    const contenidoDetalle = document.getElementById("contenidoDetalle");

    if (!pedido) {
        contenidoDetalle.innerHTML = `<p>No se encontró información del pedido.</p>`;
        return;
    }

    contenidoDetalle.innerHTML = `
        <div class="detalle-card">
            <p><strong>Cliente:</strong> ${pedido.nombre}</p>
            <p><strong>Celular:</strong> ${pedido.telefono}</p>
            <p><strong>Correo:</strong> ${pedido.correo || "No registrado"}</p>
            <p><strong>Producto:</strong> ${pedido.producto}</p>
            <p><strong>Sabor o variedad:</strong> ${pedido.sabor}</p>
            <p><strong>Tamaño:</strong> ${pedido.tamano}</p>
            <p><strong>Cantidad:</strong> ${pedido.cantidad}</p>
            <p><strong>Fecha de entrega:</strong> ${pedido.fecha}</p>
            <p><strong>Descripción:</strong> ${pedido.descripcion}</p>
            <p><strong>Comentarios:</strong> ${pedido.comentarios || "Sin comentarios"}</p>
            <p><strong>Estado:</strong> ${pedido.estado}</p>
        </div>
    `;
}

/* ========================= */
/* CAMBIAR ESTADO DEL PEDIDO */
/* ========================= */

async function cambiarEstadoPedido(idPedido, nuevoEstado) {
    const contenidoDetalle = document.getElementById("contenidoDetalle");

    try {
        const respuesta = await fetch("php/actualizar_estado.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: idPedido,
                estado: nuevoEstado
            })
        });

        const resultado = await respuesta.json();

        if (resultado.success) {
            await mostrarPedidosAdmin();

            if (contenidoDetalle) {
                contenidoDetalle.innerHTML = `
                    <p>El estado del pedido fue actualizado a <strong>${nuevoEstado}</strong>.</p>
                `;
            }
        } else {
            if (contenidoDetalle) {
                contenidoDetalle.innerHTML = `<p>${resultado.mensaje}</p>`;
            }
        }

    } catch (error) {
        if (contenidoDetalle) {
            contenidoDetalle.innerHTML = `<p>No se pudo actualizar el estado del pedido.</p>`;
        }
    }
}

/* ========================= */
/* LOGIN ADMIN */
/* ========================= */

const formLogin = document.getElementById("formLogin");

if (formLogin) {
    formLogin.addEventListener("submit", function(event) {
        event.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const clave = document.getElementById("clave").value.trim();
        const mensajeLogin = document.getElementById("mensajeLogin");

        if (usuario === "admin" && clave === "123456") {
            localStorage.setItem("adminLogueado", "true");
            window.location.href = "admin.html";
        } else {
            mensajeLogin.textContent = "Usuario o contraseña incorrectos.";
            mensajeLogin.style.color = "#c9184a";
        }
    });
}

/* ========================= */
/* PROTEGER VISTA ADMIN */
/* ========================= */

if (window.location.pathname.includes("admin.html")) {
    const adminLogueado = localStorage.getItem("adminLogueado");

    if (adminLogueado !== "true") {
        window.location.href = "login.html";
    }
}

/* ========================= */
/* CERRAR SESIÓN */
/* ========================= */

function cerrarSesion() {
    localStorage.removeItem("adminLogueado");
    window.location.href = "login.html";
}
