//Creo la lista de productos

const carrito = [{ id: 1, nombre: "Playo", precio: 450 , descripcion:"", cantidad:1},
{ id: 2, nombre: "Hondo", precio: 400, descripcion:"", cantidad:1},
{ id: 3, nombre: "Cuenco" , precio: 150, descripcion:"", cantidad:1},
{ id: 4, nombre: "Aceitero" , precio: 250, descripcion:"", cantidad:1},
{ id: 5, nombre: "Servilletero" , precio: 150, descripcion:"", cantidad:1},
{ id: 6, nombre: "Posacuenco" , precio: 100, descripcion:"", cantidad:1}];

//Los agrego al HTML con Jquery

for (const producto of carrito) {
$("#app").append(`<div>
    <div class="Item">
    <h3> Producto N°: ${producto.id}</h3>
    <p> Producto: ${producto.nombre}</p>
    <b> $ ${producto.precio}</b>
    <button id="boton${producto.id}"> Agregar al carrito </button>  
    </div>
</div>`
);

//Creo la funcion asociada al boton de compra para sumarlos a la lista de productos en el carrito

$(`#boton${producto.id}`).click(function () {
    $("#carrito").append(
    `<div><h3> Agregaste ${producto.nombre} </h3>`)
    });
}

//Agrego un boton al final para simular el pago 

let boton = document.getElementById("pagar")

boton.addEventListener("click", (e) => {
    pagar()
})

//Agrego una funcion a este boton llamando a la API de mercado pago para simular el funcionamiento de pago real en una aplicacion

async function pagar() {
    const productosAMP = carrito.map((element)=>{
        let nuevoElementoMP  = {
            title: element.nombre,
            description: element.descripcion,
            picture_url: element.img,
            category_id: element.id,
            quantity: Number(element.cantidad),
            currency_id :"ARS",
            unit_price: Number(element.precio),
        };
        return nuevoElementoMP;
    });

    console.log(productosAMP)

    const response = await fetch(
        "https://api.mercadopago.com/checkout/preferences",
        {
            method: "POST",
            headers: {
                Authorization: 
                "Bearer TEST-346121138486028-012006-f0e272f4565185581c1b8aebbf2a1477-348512335",
            },
            body: JSON.stringify({
                items: productosAMP,
            }),
        }
    );

    const data = await response.json();
    window.open(data.init_point, "_blank");
}
