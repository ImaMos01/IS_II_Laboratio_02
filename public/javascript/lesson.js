var sesion = [
    {message:"Hola, me llamo... y el día de hoy vengo a enseñarte un poco de programación",
        code: " "},
    { message: "Comenzemos con la creacion de una figura, usaremos el comando 'draw' y especificamos la figura que queremos. Las figuras disponibles son: 'square','circle' y 'rectangle'", 
        code: "draw(square);"},
    { message:"Se puede definir la posicion de la figura con los comandos 'left','right','up' y 'down' entre el rango de 1-5", 
        code:"draw(square);\nleft(2);"},
    { message:"Puedes establecer un recorrido para la figura con una sucesión de comandos.",
        code:"draw(square);\nleft(2);\nright(5);"},
    { message:"Para eliminar una figura escribe el comando 'delete'",
        code:"draw(square);\ndelete;"},
    { message:"Graciar por acompañarme, ahora puedes escribir el código que gustes",
        code:" "}
];


var figures = [
    { Fig:'var canvas = document.getElementById("objectss");\nvar con = canvas.getContext("2d");\ncon.beginPath();\ncon.arc(85,40,30,0,2*Math.PI);\ncon.fillStyle = "red";\ncon.fill();\ncon.stroke();\n',
        Left:'140px;\n',
        Top:'105px;\n'},
    { Fig:'var canvas = document.getElementById("objectss");\nvar con = canvas.getContext("2d");\ncon.beginPath();\ncon.moveTo(75,50);\ncon.lineTo(50,105);\ncon.lineTo(105,105);\ncon.fillStyle="red";\ncon.fill();\ncon.stroke();\n',
        Left:'140px;\n',
        Top:'65px;\n'},
    { Fig:'var canvas = document.getElementById("objectss");\nvar con =canvas.getContext("2d");\ncon.beginPath();\ncon.rect(10,10,50,50);\ncon.fillStyle="red";\ncon.fill();\ncon.stroke();\n',
        Left:'185px;\n',
        Top:'100px;\n'}
]
var errormessage = "Al parecer escribió el código incorrectamente, intente de nuevo.";
