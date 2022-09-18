let productsArray = [];

let id_productos = localStorage.getItem("catID")            //se llama al id de la categoría seleccionada guardado en el localStorage
let btnAsc = document.getElementById("sortAsc")        
let btnDesc = document.getElementById("sortDesc")       
let btnRel = document.getElementById("sortByCount")     

let btnClean = document.getElementById("clearRangeFilter")
let btnFilter = document.getElementById("rangeFilterPrice")
let buscador = document.getElementById("buscador")

let inputMin = document.getElementById("rangeFilterPriceMin")
let inputMax = document.getElementById("rangeFilterPriceMax")
let product = []

function showProductsList(array){
    let htmlContentToAppend = "";

    let min;
    if (inputMin.value !== "" && inputMin.value !== undefined){     //si el valor escrito en mínimo no está vacío
        min = inputMin.value;                                       //se lo asignamos a la variable min
    } else {                                                        //sino
        min = 0;                                                    //no hay mínimo, osea el mínimo es 0
    };

    let max;
    if (inputMax.value !== "" && inputMax.value !== undefined){
        max = inputMax.value;
    } else {
        max = Infinity;
    };

    for(let i = 0; i < array.length; i++){ 
        let product = array[i];
        let nombre = product.name.toLowerCase();
        let descripcion = product.description.toLowerCase();
        const texto_buscador = buscador.value.toLowerCase();

        if(nombre.indexOf(texto_buscador) !== -1 || buscador.value == "" || descripcion.indexOf(texto_buscador) !== -1 ){       //si coincide con el buscador o si el buscador está vacío
        if (product.cost >= min && product.cost <= max){            //si el costo del producto es mayor al mínimo y menor al máximo, mostramos el producto
            htmlContentToAppend += `                                    
        <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action")>         
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + " - $ " + product.cost + `</h4> 
                        <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; 
    }  }
    }
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

document.addEventListener("DOMContentLoaded", function(e){
        let link = "https://japceibal.github.io/emercado-api/cats_products/" + id_productos + ".json"       //añadir el ID de la categoria a la URL del json
        getJSONData(link).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data.products;
            showProductsList(productsArray);
            console.log(productsArray)
        }
        
    });

});

btnDesc.addEventListener("click", function(){
    productsArray.sort((a, b) => {                  //ordenamos el array original
        if(a.cost < b.cost) {return -1;}            //segun los criterios de ordenamiento
        if(a.cost > b.cost) {return 1;}
        return 0;
    });
    showProductsList(productsArray)                 //y luego lo mostramos ordenado
});

btnAsc.addEventListener("click", function(){
    productsArray.sort((a, b) => {
        if(a.cost > b.cost) {return -1;}
        if(a.cost < b.cost) {return 1;}
        return 0;
    });
    showProductsList(productsArray)
});

btnRel.addEventListener("click", function(){
    productsArray.sort((a, b) => {
        if(a.soldCount > b.soldCount) {return -1;}
        if(a.soldCount < b.soldCount) {return 1;}
        return 0;
    });
    showProductsList(productsArray)
});

buscador.addEventListener("keyup", function(){    
    showProductsList(productsArray)
});

btnFilter.addEventListener("click", function(){     //con el botón Filtrar se actualiza la página con los datos filtrados pero manteniendo el orden previamente elegido
    showProductsList(productsArray)
});

btnClean.addEventListener("click", function(){      //el botón limpiar reestablece los filtros de precio en 0 y luego vuelve a mostrar los productos sin filtrar
    inputMin.value = ""
    inputMax.value = ""
    showProductsList(productsArray)
});
