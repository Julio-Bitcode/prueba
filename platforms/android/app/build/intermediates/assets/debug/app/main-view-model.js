var Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");

//Funcion que valida el usuario y la contraseña
function getMessage(usu, pass) {
    if (usu != "admin") {
        //Alerta de error usuario
        dialogs.alert({
            title: "ERROR",
            message: "Usuario incorrecto",
            okButtonText: "Atras"
        });
    } else if(pass != "12345"){
        //Alerta de error contraseña
        dialogs.alert({
            title: "ERROR",
            message: "Contraseña incorrecta",
            okButtonText: "Atras"
        });
    } else {
        var topmost = frameModule.topmost();
        /*const navigationEntry = {
            moduleName: "views/login/login",
            //Limpia el historial de navegación (true)
            clearHistory:false,
            //Pasa datos a otra pantalla
            context: {usu, pass},
            animated: false
        };*/
        topmost.navigate("views/login/login");
    }
}


//Prueba para entrar en otra panatalla
function createViewModel(page) {
    var viewModel = new Observable();
    var usu = "";
    var pass = "";
    
    //Funcion para el login
    viewModel.login = function() {
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
    return viewModel;
}

exports.createViewModel = createViewModel;