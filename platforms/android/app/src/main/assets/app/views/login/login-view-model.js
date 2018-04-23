var Observable = require("data/observable").Observable;
var frameModule = require("ui/frame");

//Prueba para volver a la pantalla anterior
function createViewModel(usu, pass) {
    var viewModel = new Observable();
    var date = new Date ();

    //Muestra en la etiqueta el mensaje más el usuario
    viewModel.set("men1", "Hola " + usu);
    //Muestra en la etiqueta el mensaje más la contraseña
    viewModel.set("men2", "Contraseña: " + pass);
    //Muestra en la etiqueta el mensaje más la fecha y la hora
    viewModel.set("men3", "Fecha: " + date.getDate() + "/" + (date.getMonth() + 1) 
    + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());

    //Funcion que te devuelve a la pantalla antrior
    viewModel.volver = function() {
        var topmost = frameModule.topmost();
        //Comando para volver a la pantalla anterior
        topmost.goBack();
    }

    return viewModel;
}

exports.createViewModel = createViewModel;