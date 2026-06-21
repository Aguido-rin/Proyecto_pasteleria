console.log("Página de Pastelería La Foresta cargada correctamente.");

/*CATALOGO*/
function mostrarCategoria(categoriaId) {
    const categorias = document.querySelectorAll(".categoria-contenido");
    const botones = document.querySelectorAll(".categoria-btn");

    categorias.forEach(categoria => {
        categoria.classList.remove("activo");
    });

    botones.forEach(boton => {
        boton.classList.remove("activo");
    });

    document.getElementById(categoriaId).classList.add("activo");

    event.target.classList.add("activo");
}

/*PEDIDO*/
const formPedido = document.getElementById("formPedido");

if (formPedido) {
    formPedido.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const producto = document.getElementById("producto").value;
        const fecha = document.getElementById("fecha").value;
        const descripcion = document.getElementById("descripcion").value.trim();
        const sabor = document.getElementById("sabor").value;
        const mensaje = document.getElementById("mensajePedido");

if (nombre === "" || telefono === "" || producto === "" || sabor === "" || fecha === "" || descripcion === "") {            mensaje.textContent = "Por favor, completa los campos obligatorios del pedido.";
            mensaje.style.color = "#c9184a";
            return;
        }

        mensaje.textContent = "Tu pedido fue registrado correctamente. La pastelería se comunicará contigo pronto.";
        mensaje.style.color = "#2e7d32";

        formPedido.reset();
    });
}

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
