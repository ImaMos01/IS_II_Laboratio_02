const {Router} = require('express');
const router = Router();
const comp = require('../compiler/parser');
//const mesages = require('../sample.json');

//rutas
router.get('/',(req,res)=>{
    res.render('index.html',{title:'GENERIC',op:0,outp:false,fc:'',cdd:''}); //title:titulo,op:n_mensaje,outp:imprimir,error:cambiar al asistente en mensaje de error,generate:codigo fuente generado
});

//req.body recibir datos
router.post('/',(req,res)=>{
    const n_slide = req.body.asist; //n del mensaje del asistente
    var code = req.body.codigo; //codigo
    const output = code.split(/[\r\n]/);
    var codes ='';
    var coddd ='';
    for(let i=0;i<output.length;i+=2){
        codes += output[i];  
        coddd += output[i];
        coddd+='\n';
    }
    var finalout = comp(codes);
    //res.json(output);
    res.render('index.html',{title:'GENERIC',op:n_slide,outp:true,fc:finalout,cdd:coddd});

});

module.exports = router;