//analisis lexico
function lexic(input){
    let current=0; //recorrer un subarreglo 
    let tokens = []; //alamacenar los tokens

    while(current < input.length){
        let char = input[current];

        let Letter = /[a-z]/i; //si es una palabra reservada o una variable
        if(Letter.test(char)){
            let value = '';
            while(Letter.test(char)){
                value +=char;
                char = input[++current];
            }
            if(value === 'draw' || value === 'delete' || value === 'left' 
                || value === 'right' || value === 'up' || value === 'down'){
                tokens.push({type:'reserved',value});
            }else if (value === 'square' || value === 'rectangle' || value === 'circle') {
                tokens.push({type:'figure',value});
            } else {throw new TypeError('the character doesnt exist: ' + char);}
            continue;
        }
        
        let Space =/\s/; //si existe espacios, se les ingnora
        if(Space.test(char)){
            current++;
            continue;
        }

        if (char === '(') {
            tokens.push({
              type: 'paren',
              value: '(',
            });
            current++;
            continue;
        }
      
        if (char === ')') {
            tokens.push({
              type: 'paren',
              value: ')',
            });
            current++;
            continue;
        }

        if(char === ';'){ 
            tokens.push({
                type:'semicolon',
                value:';'
            });
            current++;
            continue;
        }

        let Number = /[0-5]/;
        if (Number.test(char)) {
            let value = '';
            while (Number.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({ type: 'number', value });
            continue;
        }
        throw new TypeError('the character doesnt exist: ' + char);
    }
    return tokens;
}

//creamos el arbol sintactico a partir de los tokens
function parsers(tokens){
    var AST = {
        type: 'Program',
        body:[]
    }
    while(tokens.length>0){
        var current_token = tokens.shift();
        if(current_token.type === 'reserved'){
            switch(current_token.value){
                case 'draw':
                    var expression = {
                        type:'CallExpression',
                        name:'Drawing',
                        parameters:[]
                    }

                    var argument = tokens.shift();
                    if(argument.type === 'paren'){
                        argument = tokens.shift();
                        if(argument.type === 'figure'){
                            expression.parameters.push({ 
                                type: 'figure',
                                value: argument.value
                            })
                            AST.body.push(expression);
                            argument = tokens.shift();
                            if(argument.type === 'paren'){
                                argument = tokens.shift();
                                if(argument.type==='semicolon'){
                                    console.log("todo correto");
                                }
                            }
                        }    
                    } else {throw 'Drawing command must be followed by a number.'}

                    break;

                case 'delete':
                    var expression = {
                        type:'CallExpression',
                        name:'Deleting',
                        parameters:[]
                    }
                    var argument = tokens.shift();
                    if(argument.type === 'semicolon'){
                        expression.parameters.push({ 
                            type: 'DeleteLiteral',
                            value: true
                        })
                        AST.body.push(expression);
                    } else {throw 'Drawing command must be followed by a number.'}
                    break;

                case 'left':
                    var expression = {
                        type:'CallExpression',
                        name:'Goleft',
                        parameters:[]
                    }
                    var argument = tokens.shift();
                    if(argument.type === 'paren'){
                        argument = tokens.shift();
                        if(argument.type === 'number'){
                            expression.parameters.push({ 
                                type: 'NumberLiteral',
                                value: argument.value
                            })
                            AST.body.push(expression);
                            if(argument.type === 'paren'){
                                argument = tokens.shift();
                                if(argument.type==='semicolon'){
                                    argument = tokens.shift();
                                }
                            }
                        }    
                    } else {throw 'Drawing command must be followed by a number.'}
                    break;

                case 'right':
                    var expression = {
                        type:'CallExpression',
                        name:'Goright',
                        parameters:[]
                    }
                    var argument = tokens.shift();
                    if(argument.type === 'paren'){
                        argument = tokens.shift();
                        if(argument.type === 'number'){
                            expression.parameters.push({ 
                                type: 'NumberLiteral',
                                value: argument.value
                            })
                            AST.body.push(expression);
                            if(argument.type === 'paren'){
                                argument = tokens.shift();
                                if(argument.type==='semicolon'){
                                    argument = tokens.shift();
                                }
                            }
                        }    
                    } else {throw 'Drawing command must be followed by a number.'}
                    break;

                case 'up':
                    var expression = {
                        type:'CallExpression',
                        name:'Goup',
                        parameters:[]
                    }
                    var argument = tokens.shift();
                    if(argument.type === 'paren'){
                        argument = tokens.shift();
                        if(argument.type === 'number'){
                            expression.parameters.push({ 
                                type: 'NumberLiteral',
                                value: argument.value
                            })
                            AST.body.push(expression);
                            if(argument.type === 'paren'){
                                argument = tokens.shift();
                                if(argument.type==='semicolon'){
                                    argument = tokens.shift();
                                }
                            }
                        }    
                    } else {throw 'Drawing command must be followed by a number.'}
                    break;

                case 'down':
                    var expression = {
                        type:'CallExpression',
                        name:'Godown',
                        parameters:[]
                    }
                    var argument = tokens.shift();
                    if(argument.type === 'paren'){
                        argument = tokens.shift();
                        if(argument.type === 'number'){
                            expression.parameters.push({ 
                                type: 'NumberLiteral',
                                value: argument.value
                            })
                            AST.body.push(expression);
                            if(argument.type === 'paren'){
                                argument = tokens.shift();
                                if(argument.type==='semicolon'){
                                    argument = tokens.shift();
                                }
                            }
                        }    
                    } else {throw 'Drawing command must be followed by a number.'}
                    break;
            }
        }
    }
    return AST;
}

//transformamos el arbol sintactico
function transform(ast){
    var scr_ast = {
        tag:'script',
        body:[]
    }

    while(ast.body.length > 0){
        var node = ast.body.shift();
        switch(node.name){
            case 'Drawing':
                var op = node.parameters[0].value;
                if(op === 'circle'){
                    scr_ast.body.push({
                        tag: 'figure', 
                        attr: 'con.arc(x,y,30,0,2*Math.PI);\n'
                    })
                }
                if(op === 'rectangle'){
                    scr_ast.body.push({
                        tag: 'figure', 
                        attr: 'con.rect(x,y,90,50);\n'
                    })
                }
                if(op === 'square'){
                    scr_ast.body.push({
                        tag: 'figure', 
                        attr: 'con.rect(x,y,50,50);\n'
                    })
                }
                break;
            case 'Goleft':
                var op = node.parameters[0].value;
                scr_ast.body.push({
                    tag: 'left', 
                    attr: (22*op)
                })
                break;
            case 'Goright':
                var op = node.parameters[0].value;
                scr_ast.body.push({
                    tag: 'right', 
                    attr: (22*op)
                })
                break;
            case 'Goup':
                var op = node.parameters[0].value;
                scr_ast.body.push({
                    tag: 'up', 
                    attr: (18*op)
                })
                break;
            case 'Godown':
                var op = node.parameters[0].value;
                scr_ast.body.push({
                    tag: 'down', 
                    attr: (22*op)
                })
                break;
            case 'Deleting':
                scr_ast.body.push({
                    tag: 'delete', 
                    attr: true,
                })
                break;
        }
    }
    return scr_ast;
}

//generador de codigo
function generator(scr_ast){
    let code ='';
    let ini_posx = 195;
    let ini_posy = 110;
    let reppx = 0;
    let reppy = 0;
    let posfinx = 195;
    let posfiny = 110;
    let conditionals = 0; //cantidad de condicionales que se usaran
    let mover = 0;
    let a = 0;
    let b = 0;
    while(scr_ast.body.length > 0){
        var gene = scr_ast.body.shift();
        switch(gene.tag){
            case 'figure':
                var figss = gene.attr;
                code ='<html><canvas id="objectss" width="430" height="279" ><\/canvas>';
                code += '<script>\nvar canvas = document.querySelector("canvas");\nvar con = canvas.getContext("2d");\nvar x = 195;\nvar y = 110;\n';
                code += 'let speedx = 0;\nlet speedy = 0;\nlet cont_move = false;\nlet repx = ';
                code += reppx;
                code += ';\nlet repy = ';
                code += reppy;
                code +=';\nfunction animate(){\nrequestAnimationFrame(animate);\ncon.clearRect(0,0,canvas.width, canvas.height);\ncon.beginPath();\n';
                code += figss;
                code += 'con.fillStyle ="red";\ncon.fill();\ncon.stroke();\ncont_move=false;\n';
                break;
            case 'delete':
                code += 'con.clearRect(0, 0, canvas.width, canvas.height);';
                break;
            case 'right':
                mover = gene.attr;
                posfinx +=mover;
                code += 'if(x >= ';
                code += ini_posx;
                code +=' && x <= ';
                code += posfinx;
                code += ' && y===';
                code += ini_posy;
                code +=' && repx===';
                code += reppx;
                code += '){\nspeedx = 2;\nspeedy = 0;\ncont_move=true;\n}else{repx=';
                code += (reppx+1);
                code +=';\n';
                conditionals++;
                a = (posfinx-ini_posx)/2;
                b = a.toFixed();
                ini_posx += b*2;
                if(ini_posx <= posfinx){ini_posx+=2;}
                reppx++;
                break;
            case 'left':
                mover = gene.attr;
                posfinx -= mover;
                code += 'if(x >= ';
                code += posfinx;
                code +=' && x <= ';
                code += ini_posx;
                code += ' && y===';
                code += ini_posy;
                code +=' && repx===';
                code += reppx;
                code += '){\nspeedx = -2;\nspeedy = 0;\ncont_move=true;\n}else{repx=';
                code += (reppx+1);
                code +=';\n';
                conditionals++;
                a = (ini_posx-posfinx)/2;
                b = a.toFixed();
                ini_posx -= b*2;
                if(ini_posx >= posfinx){ini_posx-=2;}
                reppx++;
                break;

            
            case 'up':
                mover = gene.attr;
                posfiny -= mover;
                code += 'if(y >= ';
                code += posfiny;
                code +=' && y <= ';
                code += ini_posy;
                code += ' && x===';
                code += ini_posx;
                code +=' && repy===';
                code += reppy;
                code += '){\nspeedx = 0;\nspeedy = -2;\ncont_move=true;\n}else{repy=';
                code += (reppy+1);
                code +=';\n';
                conditionals++;
                a = (ini_posy-posfiny)/2;
                b = a.toFixed();
                ini_posy -= b*2;
                if(ini_posy >= posfiny){ini_posy-=2;}
                reppy++;
                break;
            case 'down':
                mover = gene.attr;
                posfiny += mover;
                code += 'if(y >= ';
                code += ini_posy;
                code +=' && y <= ';
                code += posfiny;
                code += ' && x===';
                code += ini_posx;
                code +=' && repy===';
                code += reppy;
                code += '){\nspeedx = 0;\nspeedy = 2;\ncont_move=true;\n}else{repy=';
                code += (reppy+1);
                code +=';\n';
                conditionals++;
                a = (posfiny-ini_posy)/2;
                b = a.toFixed();
                ini_posy += b*2;
                if(ini_posy <= posfiny){ini_posy+=2;}
                reppy++;
                break;

        }
    }
    for(let i=0; i<conditionals;i++){code+='}';}
    code +='if (cont_move === true){\nx += speedx;\ny += speedy;\n}\n}\nanimate();\n<\/script><\/html>';
    return code;
}

//unimos las funciones
function Compiler(input){
    let token = lexic(input);
    let par = parsers(token);
    let ast = transform(par);
    let Out = generator(ast);
    
    return Out;
}

//exportamos el compilador
module.exports = Compiler;

/* ejemplos
let ass = 'draw(square);down(5);up(5);';
let aop = lexic(ass);
console.log(aop);
let bop = parsers(aop);
console.log(bop);
let cop = transform(bop);
let dop = generator(cop);
console.log(dop);
*/