let tarjeta = document.getElementById("tarjeta");
let transferencia = document.getElementById("transferencia");
let boton_seleccionar = document.getElementById("btnSeleccionar");

function showCartProducts(array) {        //función que muestra el producto del carrito en la página
  let htmlContentToAppend3 = "";
  htmlContentToAppend3 += ` <div>
<table class="table table-striped">
  <tr>
    <th> </th>
    <th>Nombre</th>
    <th>Costo</th>
    <th>Cantidad</th>
    <th>Subtotal</th>

  </tr>
  <tr>
    <td id="imagen"> <img src="` + cartProduct1.image + `" alt="product image" class="img-thumbnail" height="70" width="70"> </td>
    <td id="nombre"> ${cartProduct1.name} </td>
    <td id="costo"> ` + cartProduct1.currency + ` ` + cartProduct1.unitCost + `</td>
    <td> <input type="text" size="2" id="cantidad" value="${cartProduct1.count}" onkeyup="cambiarSubtotal()"> </td>
    <td id="subtotal"> ` + cartProduct1.currency + ` ` + cartProduct1.count * cartProduct1.unitCost + ` </td>
  </tr>
</table>
</div>`
    ;
  document.getElementById("prod_carrito").innerHTML = htmlContentToAppend3;
  input_cantidad = document.getElementById("cantidad");
  cambiarSubtotal()     //carga los subtotales predeterminados al ejecutarse por primera vez
}


document.addEventListener("DOMContentLoaded", function (e) {
  let link_comentario = CART_INFO_URL + 25801 + ".json"
  getJSONData(link_comentario).then(function (resultObj) {
    if (resultObj.status === "ok") {
      cartProduct1 = resultObj.data.articles[0];
      console.log(cartProduct1)
      showCartProducts();    //obtiene la información del artículo del carrito 25801 y la muestra      
    }
  })
})



function subtotal_tipoEnvio(porcentaje) {         //calcula el subtotal del envío según la opción de envío seleccionada
  let comision = + subtotal * porcentaje;         //toma la comisión del envío como parámetro, ya que varía según el tipo de envío seleccionado
  let costo_envio = document.getElementById("costo_envio");
  costo_envio.innerHTML = `Costo de envío: ` +          //y luego lo muestra en pantalla
    cartProduct1.currency + " " + comision + `
<p><small>Según el tipo de envío.</small></p> `;

  let costo_total = document.getElementById("costo_total");
  costo_total.innerHTML = `Total ($): ` +
    cartProduct1.currency + " " + (subtotal + comision) + `
<br><br> `;
}


function cambiarSubtotal() {          //actualiza los subtotales según cantidad de artículos, costo y tipo de envío
  subtotal = input_cantidad.value * cartProduct1.unitCost;
  input_subtotal = document.getElementById("subtotal")
  input_subtotal.innerHTML = cartProduct1.currency + " " + subtotal;

  let subtotal_general = document.getElementById("subtotal_general");
  subtotal_general.innerHTML = `Subtotal: ` +
    cartProduct1.currency + " " + subtotal + `
<p><small>Costo unitario del producto por cantidad</small></p> `;

  let opc_premium = document.getElementById("opc_premium");
  let opc_express = document.getElementById("opc_express");
  let opc_standard = document.getElementById("opc_standard");

  if (opc_premium.checked) {
    subtotal_tipoEnvio(0.15)
  }

  if (opc_express.checked) {
    subtotal_tipoEnvio(0.07)
  }

  if (opc_standard.checked) {
    subtotal_tipoEnvio(0.05)
  }
}



function esValido(opcion) {             //funcion para asignar la clase "es válido"
  opcion.classList.remove("is-valid")
  opcion.classList.remove("is-invalid")
  opcion.classList.add("is-valid")
}

function esInvalido(opcion) {           //funcion para asignar la clase "es INválido"
  opcion.classList.remove("is-valid")
  opcion.classList.remove("is-invalid")
  opcion.classList.add("is-invalid")
}


function validacion_vacio(campo) {          //función para verificar si un campo está vacío
  if (campo.value.length == 0) {
    esInvalido(campo);
  }
  else {
    esValido(campo);
  }
}


function validacion_cantidad() {          //función para verificar si la cantidad de algún artículo es 0
  if (input_cantidad.value > 0) {
    esValido(input_cantidad);
  } else {
    showAlertError();
    esInvalido(input_cantidad);
  }
}


function validacion_pago() {            //función para verificar que haya un medio de pago seleccionado y no tenga campos vacíos
  if (tarjeta.checked) {
    validacion_vacio(input1_tarjeta);
    validacion_vacio(input2_tarjeta);
    validacion_vacio(input3_tarjeta);
    if (input1_tarjeta.classList.contains("is-valid") && input2_tarjeta.classList.contains("is-valid") && input3_tarjeta.classList.contains("is-valid")) {
      esValido(boton_seleccionar);
      boton_seleccionar.style.color = "green";
    } else {     
      esInvalido(boton_seleccionar);
      boton_seleccionar.style.color = "red";
    }

  } else if (transferencia.checked) {
    validacion_vacio(input1_transferencia);
    if (input1_transferencia.classList.contains("is-valid")) {
      esValido(boton_seleccionar);
      boton_seleccionar.style.color = "green";
    } else {     
      esInvalido(boton_seleccionar);
      boton_seleccionar.style.color = "red";
    }
    
  } else {
    esInvalido(boton_seleccionar);
    boton_seleccionar.style.color = "red";
  }
}

function showAlertSuccess() {
  document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
  document.getElementById("alert-warning").classList.add("show");
}


function validacion() {

  let nombre_calle = document.getElementById("nombre_calle");
  let numero_calle = document.getElementById("numero_calle");
  let esquina_calle = document.getElementById("esquina_calle");

  validacion_cantidad();
  validacion_pago();
  validacion_vacio(nombre_calle);
  validacion_vacio(numero_calle);
  validacion_vacio(esquina_calle);

  if (nombre_calle.classList.contains("is-valid") && numero_calle.classList.contains("is-valid") && esquina_calle.classList.contains("is-valid") && boton_seleccionar.classList.contains("is-valid") && input_cantidad.classList.contains("is-valid")) {
    showAlertSuccess()
  } 





}



let opc_tarjeta = document.getElementById("tarjeta");
let opc_transferencia = document.getElementById("transferencia");
let input1_tarjeta = document.getElementById("input1_tarjeta");
let input2_tarjeta = document.getElementById("input2_tarjeta");
let input3_tarjeta = document.getElementById("input3_tarjeta");
let input1_transferencia = document.getElementById("input1_transferencia");

opc_tarjeta.addEventListener("change", function (h) {     //función que verifica el medio de pago seleccionado y deshabilita los campos del que NO fue seleccionado
  if (opc_tarjeta.checked) {
    input1_tarjeta.disabled = false;
    input2_tarjeta.disabled = false;
    input3_tarjeta.disabled = false;
    input1_transferencia.disabled = true;
    document.getElementById("medio_pago");
    medio_pago.innerHTML = "Tarjeta de crédito";
  }
})

opc_transferencia.addEventListener("change", function (h) {     //función que verifica el medio de pago seleccionado y deshabilita los campos del que NO fue seleccionado
  if (opc_transferencia.checked) {
    input1_tarjeta.disabled = true;
    input2_tarjeta.disabled = true;
    input3_tarjeta.disabled = true;
    input1_transferencia.disabled = false;
    let medio_pago = document.getElementById("medio_pago");
    medio_pago.innerHTML = "Transferencia bancaria";
  }
})