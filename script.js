
class Producto {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}


class Comida extends Producto {
    constructor(name, price, tiempoEstimadoSeg) {
        super(name, price);
        this.tiempoEstimadoSegundos = tiempoEstimadoSeg;
    }
}


class Bebida extends Producto { }


class Pedido {
    constructor(producto, cantidad, apellido) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.apellido = apellido;
        this.estado = "En cocina";
    }

    getTotal() {
        return this.producto.price * this.cantidad;
    }

    setEstado(estado) {
        this.estado = estado;
    }
}


class Cocina {
    constructor() {
        this.pedidos = [];
    }

    agregarPedido(pedido) {
        this.pedidos.push(pedido);
    }

    actualizarEstado() {
        const orderStatus = document.getElementById("orderStatus");
        orderStatus.innerHTML = "";
        this.pedidos.forEach(pedido => {
            const row = orderStatus.insertRow();
            row.insertCell(0).innerHTML = pedido.producto.name;
            row.insertCell(1).innerHTML = pedido.cantidad;
            row.insertCell(2).innerHTML = pedido.estado;
            if (pedido.estado === "En cocina") {
                setTimeout(() => {
                    pedido.setEstado("Listo");
                    this.actualizarEstado();
                }, pedido.producto.tiempoEstimadoSegundos * 1000);
            }
        });
        console.log("dentro de actualizar estado")
    }
}


const cocina = new Cocina();


const menuItems = [
    new Comida("Tacos de Birria", 8, 10),
    new Comida("Hamburguesas con Papas", 10, 12),
    new Comida("Nachos", 5, 8),
    new Bebida("Coca-cola", 2),
    new Bebida("Pepsi", 2),
    new Bebida("Fanta", 2),
    new Bebida("7up", 2)
];


function calcularTotal() {
    const productName = document.getElementById("productName").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const drinkName = document.getElementById("drinkName").value;
    const drinkQuantity = parseInt(document.getElementById("drinkQuantity").value);

    let total = 0;

    
    const selectedMenuItem = menuItems.find(item => item.name === productName);
    if (selectedMenuItem) {
        total += selectedMenuItem.price * quantity;
    }

    const selectedDrink = menuItems.find(item => item.name === drinkName);
    if (selectedDrink) {
        total += selectedDrink.price * drinkQuantity;
    }

   
    document.getElementById("productTotal").textContent = total;
}

function realizarPedido() {
    const productName = document.getElementById("productName").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const selectedMenuItem = menuItems.find(item => item.name === productName);
    const apellido = document.getElementById("apellido").value;
    const pedido = new Pedido(selectedMenuItem, quantity, apellido);
    const $apellidoOrden = document.getElementById("apellidoOrden");

    cocina.agregarPedido(pedido);
    $apellidoOrden.textContent = `Orden para: ${apellido}`;
    cocina.actualizarEstado();
}

