const id_producto = localStorage.getItem("prodID")
const nuevoComentario = document.getElementById("nuevoComentario")
const puntuacion = document.getElementById("puntuacion")
const btnComentar = document.getElementById("comentar")

function showProductInfo(array){

    let htmlContentToAppend = "";
    
    htmlContentToAppend += `                                    
  
            <div id=div_producto>

                        <h2> `+ productInfo.name + `</h2> 
                        <hr> 

                        <h5> Precio </h5> 
                        <p> `+ productInfo.currency + " " + productInfo.cost +`</p> 

                        <h5> Descripción </h5> 
                        <p> `+ productInfo.description +`</p> 

                        <h5> Categoría </h5> 
                        <p> `+ productInfo.category +`</p> 

                        <h5> Cantidad de vendidos </h5> 
                        <p> `+ productInfo.soldCount +`</p> 

                        <br> 

                <h5> Imagenes ilustrativas </h5> 
                <hr> 
                <br>

                <div id="carouselExampleControls" class="carousel carousel-dark slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="` + productInfo.images[0] + `" class="d-block w-100" alt="product image 1">
                  </div>
                  <div class="carousel-item">
                    <img src="` + productInfo.images[1] + `" class="d-block w-100" alt="product image 2" >
                  </div>
                  <div class="carousel-item">
                    <img src="` + productInfo.images[2] + `" class="d-block w-100" alt="product image 3" >
                  </div>
                  <div class="carousel-item">
                    <img src="` + productInfo.images[3] + `" class="d-block w-100" alt="product image 4" >
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              <br><br>

                <img src="` + productInfo.images[0] + `" alt="product image 1" class="img-thumbnail" height="50" width="300">
                <img src="` + productInfo.images[1] + `" alt="product image 2" class="img-thumbnail" height="50" width="300">
                <img src="` + productInfo.images[2] + `" alt="product image 3" class="img-thumbnail" height="50" width="300">
                <img src="` + productInfo.images[3] + `" alt="product image 4" class="img-thumbnail" height="50" width="300">

                <br><br>
                <h4> Comentarios </h4>
                <div id="todos_comentarios">
                `;

                for (let index = 0; index < productComments.length; index++) {

                    const comentario = productComments[index];
                    
                    if (comentario.score == 1) {
                        estrellas = `
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        ` } else if (comentario.score == 2){ 
                            estrellas =  `
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                                ` } else if (comentario.score == 3) {
                                    estrellas = `
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                        ` } else if (comentario.score == 4){
                                            estrellas = `
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star"></span>
                                                ` }
                                                else if (comentario.score == 5) {
                                                    estrellas =  `
                                                        <span class="fa fa-star checked"></span>
                                                        <span class="fa fa-star checked"></span>
                                                        <span class="fa fa-star checked"></span>
                                                        <span class="fa fa-star checked"></span>
                                                        <span class="fa fa-star checked"></span>
                                                        ` } 
                                                    
            
                    htmlContentToAppend +=  `<div class="list-group-item list-group-item-action")>     
                    <strong> `+ comentario.user +`</strong> - ${comentario.dateTime} - ${estrellas}
                    <p> ${comentario.description} </p>
                    </div> `
                    
                }
            
                ` </div> 
            </div>


        `;

        document.getElementById("prod-info-container").innerHTML = htmlContentToAppend; 


        let htmlContentToAppend2 = "";
     
        htmlContentToAppend2 += `<div style = "float: left" onclick="setNewProdID(${productInfo.relatedProducts[0].id})"><figure>
                               <img src="` + productInfo.relatedProducts[0].image + `" alt="product image" class="img-thumbnail" height="250" width="250">
                                <figcaption> <center> ` + productInfo.relatedProducts[0].name + `  </center> </figcaption>
                                </figure></div> 
                                    
                                <div style = "float: left" onclick="setNewProdID(${productInfo.relatedProducts[1].id})"><figure>
                               <img src="` + productInfo.relatedProducts[1].image + `" alt="product image" class="img-thumbnail" height="250" width="250">
                                <figcaption>  <center>` + productInfo.relatedProducts[1].name + `  </center> </figcaption>
                                </figure></div>
                                
                                <br><br><br><br><br><br>
                           `

        document.getElementById("related_products").innerHTML = htmlContentToAppend2
    }  

    function setNewProdID(id) {
        localStorage.setItem("prodID", id);
        window.location = "product-info.html"
    }


document.addEventListener("DOMContentLoaded", function(e){
    let link_producto = "https://japceibal.github.io/emercado-api/products/" + id_producto + ".json"       
    let link_comentario =  "https://japceibal.github.io/emercado-api/products_comments/" + id_producto + ".json"
    getJSONData(link_producto).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        productInfo = resultObj.data;
        console.log(productInfo)
    }
})

setTimeout(() => {
    getJSONData(link_comentario).then(function(resultObj1){
        if (resultObj1.status === "ok")
        {
            productComments = resultObj1.data;
            console.log(productComments)
        }
    
        showProductInfo(); 
    })
  }, "500")



});

comentar.addEventListener("click", () => {    
    let commentary = nuevoComentario.value;
    let puntaje = puntuacion.value;
    let CommentToAppend = ""
    let fecha_comentario = new Date();
	var fecha_actual = fecha_comentario.getFullYear()+"-"+(fecha_comentario.getMonth()+1)+"-"+ fecha_comentario.getDate() +" "+ fecha_comentario.getHours()+":"+fecha_comentario.getMinutes()+":"+ fecha_comentario.getSeconds();;

    if (puntaje == 1) {
        estrellas_otorgadas = `
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        ` } else if (puntaje == 2){ 
            estrellas_otorgadas =  `
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                ` } else if (puntaje == 3) {
                    estrellas_otorgadas = `
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        ` } else if (puntaje == 4){
                            estrellas_otorgadas = `
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>
                                ` }
                                else if (puntaje == 5) {
                                    estrellas_otorgadas =  `
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        ` } 

                                
    CommentToAppend += `<div class="list-group-item list-group-item-action")>     
    <strong> `+ usuario_logeado +`</strong> - ${fecha_actual} - ${estrellas_otorgadas}
    <p> ${commentary} </p>
    </div> `

    document.getElementById("todos_comentarios").innerHTML += CommentToAppend; 

});