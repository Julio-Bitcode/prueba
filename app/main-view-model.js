var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");
var arrayUsu = new ObservableArray(["admin", "usuario", "usuario1", "usuario2"]);
var arrayPass = new ObservableArray(["12345", "123456", "1234567", "12345678"]);

//Funcion que valida el usuario y la contraseña
function getMessage(usu, pass) {
    //valido usuario y contraseña
    var arrayVali = usuarioArray(usu, pass);
    if (!arrayVali.getItem(0)){
        //Alerta de error usuario
        dialogs.alert({
            title: "ERROR",
            message: "Usuario incorrecto",
            okButtonText: "Atras"
        });
    } else if(!arrayVali.getItem(1)){
        //Alerta de error contraseña
        dialogs.alert({
            title: "ERROR",
            message: "Contraseña incorrecta",
            okButtonText: "Atras"
        });
    } else {
        var topmost = frameModule.topmost();
        const navigationEntry = {
            moduleName: "views/login/login",
            //Limpia el historial de navegación (true)
            clearHistory:false,
            //Pasa datos a otra pantalla
            context: {usu, pass},
            animated: false
        };
        topmost.navigate(navigationEntry);
    }
}


//Prueba para entrar en otra panatalla
function createViewModel(page) {
    var viewModel = new Observable();
    var usu = "";
    var pass = "";
    
    //Funcion para el login
    viewModel.entrar = function() {
        //Recoge los datos que el usuario pone
        usu = page.getViewById("usuario").text;
        pass = page.getViewById("contraseña").text;
        //Llama a una función para validar
        this.set("message", getMessage(usu, pass));
    }

    //Funcion para limpiar los campos
    viewModel.limpiar = function(){
        this.set("usuario");
        this.set("contraseña");
    }

    //Funcion para rellenar los campos automaticamente
    viewModel.rellenar = function(){
        this.set("usuario", "admin");
        this.set("contraseña", "12345");
    }

    //Funcion para registar los campos automaticamente
    viewModel.registrar = function(){
        //Recoge los datos que el usuario pone
        usu = page.getViewById("usuario").text;
        pass = page.getViewById("contraseña").text;

        //Si el usu
        if (usu !== "" && pass !== ""){
            //Añadir a un array
            arrayUsu.push(usu);
            arrayPass.push(pass);
        }
    }
    return viewModel;
}

//Funcion para buscar los usuarios y las contraseñas desde unos array
function usuarioArray(usu, pass){
    var i  = 0;
    var validacion = false;
    var valiUsu = false;
    var valiPass = false;

    //Recorro los arrays 
    for (var i=0; i<arrayUsu.length; i++){
        //Relleno las variables con los datos del array
        var usuarray = arrayUsu.getItem(i);
        var passarray = arrayPass.getItem(i);

        //Si el usuario y la contraseña coinciden en la misma psoción del array 
        if(usu === usuarray){
            validacion = true;
            if (validacion){
                valiUsu = true;
                if (pass === passarray){
                    valiPass = true;
                }
            }
        }

        var arrayVali = new ObservableArray([valiUsu, valiPass]);
    }

    return arrayVali;
}

exports.createViewModel = createViewModel;
