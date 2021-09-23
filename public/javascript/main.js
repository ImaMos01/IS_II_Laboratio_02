var editor = CodeMirror.fromTextArea(document.getElementById('editor'),
            { mode: "textile",
            theme: "cm-s-dracula",
            lineNumbers: true});
editor.setSize("450","300");


//los dialogos del asistente
/*
    if(error === true) {no se ejecutan las linea 22  innerHTML = errormessage}
    else { }
*/
const b = document.getElementById("mens").innerHTML;

document.getElementById("message").innerHTML = sesion[b].message;
//editor.setValue(sesion[b].code);

const a = document.getElementById("message");
let cont = b;
a.addEventListener("click",function(){
    if(cont < sesion.length){
        var mes = sesion[cont].message;
        var cod = sesion[cont].code;
        document.getElementById("message").innerHTML = mes;
        editor.setValue(cod); //setValue:agregar texto al codemirro, getValue: obtener
        document.getElementById("mens").innerHTML = cont;
        cont++;
    }
    else{ console.log("fin");}
});

//imprimir en la etiqueta iframe
const bool = document.getElementById("boolean").innerHTML;
function print_code(bool){
    if(bool === 'true'){
        const na = document.getElementById("cddd").innerHTML;
        console.log(na);
        editor.setValue(na);
        const cod = document.getElementById("finalcode").innerText;
    
        var x = document.getElementById("preview");

        var y = (x.contentWindow.document || x.contentDocument);
        y.open();
        y.write(String(cod));
        y.close();
    }
}
print_code(bool);

