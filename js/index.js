const ingresar = document.getElementById("button"); //referencio al botón

function error() {
    alert ("Error. Verifique sus datos y vuelva a intentar")
    setTimeout(function() {window.location = "index.html" });
}

ingresar.addEventListener("click", () => {    
    let usuario = document.getElementById("usuario");       //referencio al correo que escribió el usuario
    let password = document.getElementById("password");     //referencio a la contraseña

    //booleanos para marcar errores
    let usuario_vacio = false; 
    let password_vacio = false;

    //validar campos vacios del usuario
    if(usuario.value.length === 0){
        usuario_vacio = true;
        }       
   
    //validar campos vacios de la contraseña
    if(password.value.length === 0){
        password_vacio = true;
        }            

    if(password_vacio || usuario_vacio){     
        error(); 
    }
    else {
        if (usuario.value) localStorage.setItem("text", usuario.value);     //si hay valor escrito en usuario, se lo asigno al localStorage con el ID text
        setTimeout(function() {window.location = "home.html" });            //y luego se redirige a la página principal
    }

});
