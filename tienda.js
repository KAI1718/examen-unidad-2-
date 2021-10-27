var productos = pedirDatos();

let opc;

do {
    opc = parseInt(prompt(
        "Bienvenido\n\n"
        + "Que desea hacer?\n"
        + "1. Comprar\n"
        + "2. Consultar inventario\n"
        + "3. Salir"));

    if (opc == 1) {
        let carrito = agregarAlCarrito(productos.slice());

        console.log(mostrarInformacion(carrito));
        console.log(realizarVenta(carrito));
    } else if (opc == 2) {
        console.log(inventario(productos));
    }
} while (opc != 3);


function pedirDatos() {
    let cantProductos = parseInt(prompt("Cuantos productos desea registrar?"));
    let productos = [];

    for (let i = 0; i < cantProductos; i++) {
        let info = {};

        info["Nombre"] = prompt("Ingrese el nombre del producto " + (i + 1));
        info["Precio"] = parseFloat(prompt("Ingrese el precio de " + info["Nombre"]));
        info["Cantidad"] = parseInt(prompt("Ingrese la cantidad existente de " + info["Nombre"]));

        productos.push(info);
    }

    return productos;
}


function inventario(productos) {
    let texto = "Inventario:\n\n";

    for (let i = 0; i < productos.length; i++) {
        texto += "Producto: " + productos[i]["Nombre"] + "\n";
        texto += "  - Precio: " + productos[i]["Precio"] + "\n";
        texto += "  - Cantidad: " + productos[i]["Cantidad"] + "\n";
    }

    texto += "\n";

    alert(texto);

    return texto;
}


function agregarAlCarrito(productosDisponibles) {
    let carrito = [];
    let nombre = "";

    do {
        nombre = prompt("Ingrese el nombre del producto que desea agregar al carrito\n"
            + "Si no desea agregar mas, continue con el espacio vacio");

        if (nombre == "") { 
            break;
        }

        let existe = false;

        for (let i = 0; i < productosDisponibles.length; i++) {
            let disponible = productosDisponibles[i];

            if (disponible["Nombre"] == nombre) {
                carrito.push({
                    "Nombre": disponible["Nombre"],
                    "Precio": disponible["Precio"],
                    "Cantidad": disponible["Cantidad"]
                });
                existe = true;
            }
        }

        if (existe) {
            let valido;
            let cantidad; 
            let disponible = carrito[carrito.length - 1]["Cantidad"]; 

            do {
                valido = false;
                cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));

                if (cantidad < 0) {
                    alert("La cantidad debe ser al menos 0");
                } else if(cantidad > disponible) {
                    alert("Solo hay " + disponible + " unidades disponibles");
                } else {
                    valido = true;
                }
            } while (!valido); 

            carrito[carrito.length - 1]["Cantidad"] = cantidad;
            alert(carrito[carrito.length - 1]["Cantidad"] + " " + carrito[carrito.length - 1]["Nombre"] + " agregado al carrito");
        } else {
            alert("El producto no existe");
        }
    } while (nombre != "");

    return carrito;
}


function mostrarInformacion(productos) {
    let texto = "";

    for (let i = 0; i < productos.length; i++) {
        texto += "Producto: " + productos[i]["Nombre"] + "\n";
        texto += "  - Cantidad: " + productos[i]["Cantidad"] + "\n";
        texto += "  - Precio unitario: " + productos[i]["Precio"] + "\n";
        texto += "  - Subtotal: " + (productos[i]["Precio"] * productos[i]["Cantidad"]) + "\n\n";
    }

    alert(texto);

    return texto;
}


function realizarVenta(carrito) {
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        total += (carrito[i]["Precio"] * carrito[i]["Cantidad"]);

        for (let j = 0; j < productos.length; j++) { 
            if (productos[j]["Nombre"] == carrito[i]["Nombre"]) { 
                productos[j]["Cantidad"] = productos[j]["Cantidad"] - carrito[i]["Cantidad"]; 
            }
        }
    }

    let texto = "El total a pagar es de " + total + "\n";

    alert(texto);

    return texto;
}
