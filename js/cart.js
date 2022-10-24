let prod_img = document.getElementById("imagen")
let prod_nombre = document.getElementById("nombre")
let prod_costo = document.getElementById("costo")
let prod_cantidad = document.getElementById("cantidad")

function showCartProducts(array){

let item_carrito = ""
item_carrito +=       //cargo el codigo del producto del carrito en item_carrito
`   <tr>
        <td id="imagen"> <img src="` + cartProduct1.image + `" alt="product image" class="img-thumbnail" height="70" width="70"> </td>
        <td id="nombre"> ${cartProduct1.name} </td>
        <td id="costo"> ` + cartProduct1.currency + ` ` + cartProduct1.unitCost + `</td>
        <td> <input type="text" size="2" id="cantidad" value="${cartProduct1.count}" onkeyup="cambiarSubtotal()"></td>
        <td id="subtotal"> ` + cartProduct1.currency + ` ` + cartProduct1.count * cartProduct1.unitCost  + ` </td>
    </tr>   `

let primer_item = localStorage.getItem("item_inicial");     //llamo al item_inicial del localstorage

let nuevo_item = localStorage.getItem("nuevo_item");      //llamo al nuevo_item del localstorage (se carga al presionar en COMPRAR en un artículo)

if(primer_item == null){                //si no se había cargado previamente el primer item en el localstorage
  localStorage.setItem("item_inicial", item_carrito);           //se carga
} else {
  let primer_item = localStorage.getItem("item_inicial");       //si ya se había cargado, se obtiene el item que ya se había cargado
  localStorage.setItem("item_inicial", primer_item + nuevo_item)      //y a éste item se le suma el nuevo, el añadido al presionar en COMPRAR
}

let codigo = localStorage.getItem("item_inicial");

let htmlContentToAppend3 = "";
htmlContentToAppend3 += ` <div>
<table class="table table-striped">
  <tr>
    <th> </th>
    <th>Nombre</th>
    <th>Costo</th>
    <th>Cantidad</th>
    <th>Subtotal</th>
  </tr> ` 
+ codigo +        //luego se añade el total de los articulos al codigo que los muestra
  `
</table>
</div>`
    ;

localStorage.setItem("code_to_append",htmlContentToAppend3);

document.getElementById("prod_carrito").innerHTML = localStorage.getItem("code_to_append");
    }  



document.addEventListener("DOMContentLoaded", function(e){
    let link_comentario = CART_INFO_URL + 25801 + ".json"       
    getJSONData(link_comentario).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        cartProduct1 = resultObj.data.articles[0];
        console.log(cartProduct1)
        showCartProducts();
    }
})})


function cambiarSubtotal(numero_articulo){
input_cantidad = document.getElementById("cantidad"+numero_articulo);
subtotal = input_cantidad.value * cartProduct1.unitCost;
input_subtotal = document.getElementById("subtotal"+numero_articulo)
input_subtotal.innerHTML = cartProduct1.currency + " " + subtotal;
}


let opc_tarjeta = document.getElementById("tarjeta");
let opc_transferencia = document.getElementById("transferencia");
let input1_tarjeta = document.getElementById("input1_tarjeta");
let input2_tarjeta = document.getElementById("input2_tarjeta");
let input3_tarjeta = document.getElementById("input3_tarjeta");
let input1_transferencia = document.getElementById("input1_transferencia");

opc_tarjeta.addEventListener("change", function(h){
  if (opc_tarjeta.checked){
    input1_tarjeta.disabled = true;
    input2_tarjeta.disabled = true;
    input3_tarjeta.disabled = true;
    input1_transferencia.removeAttribute(disabled);
  }
})

opc_transferencia.addEventListener("change", function(h){
  if (opc_transferencia.checked){
    input1_tarjeta.removeAttribute(disabled);
    input2_tarjeta.removeAttribute(disabled);
    input3_tarjeta.removeAttribute(disabled);
    input1_transferencia.disabled = true;
  }
})