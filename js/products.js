let productsArray = [];
let id_productos = localStorage.getItem("catID")
let btnAsc = document.getElementById("sortAsc")
let btnDesc = document.getElementById("sortDesc")
let btnRel = document.getElementById("sortByCount")

let btnClean = document.getElementById("clearRangeFilter")
let btnFilter = document.getElementById("rangeFilterPrice")

let inputMin = document.getElementById("rangeFilterPriceMin")
let inputMax = document.getElementById("rangeFilterPriceMax")

function showProductsList(array){
    let htmlContentToAppend = "";

    let min;
    if (inputMin.value !== "" && inputMin.value !== undefined){
        min = inputMin.value;
    } else {
        min = 0;
    };

    let max;
    if (inputMax.value !== "" && inputMax.value !== undefined){
        max = inputMax.value;
    } else {
        max = Infinity;
    };

    for(let i = 0; i < array.length; i++){ 
        let product = array[i];

        if (product.cost >= min && product.cost <= max){
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + " - U$S " + product.cost + `</h4> 
                        <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; 
    }
    }
}

document.addEventListener("DOMContentLoaded", function(e){
        let link = "https://japceibal.github.io/emercado-api/cats_products/" + id_productos + ".json"
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
    productsArray.sort((a, b) => {
        if(a.cost < b.cost) {return -1;}
        if(a.cost > b.cost) {return 1;}
        return 0;
    });
    showProductsList(productsArray)
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

btnFilter.addEventListener("click", function(){
    showProductsList(productsArray)
});

btnClean.addEventListener("click", function(){
    inputMin.value = ""
    inputMax.value = ""
    showProductsList(productsArray)
});
