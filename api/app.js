let express=require('express');
let mysql=require('mysql');
let app=express();
let puerto=3000;

app.listen(puerto, function(){
    console.log('Server ONLINE!');
});

// Base de datos
// Parametros de conexion
let connection=mysql.createConnection({
    host:'192.168.64.2',
    user:'pw',
    password:'12345678',
    database:'pw'
});

// Realiza la conexion, sino regresa un error
connection.connect(function(error){
    if(error){
        throw error
    }else{
        console.log('Successfully connected to database!');
    }
});

// RUTAS
// Ruta de inicio - raiz
app.get('/',function(req,res){
    res.send('Ruta de inicio');
});

// Ruta a todos los articulos
app.get('/api/articulos',function(req,res){
    connection.query("SELECT * FROM articulos",function(error,regs){
        if(error){
            throw error;
        }else{
            res.send(regs);
        }
    });
});

// Ruta a un articulo en especifico
app.get('/api/articulos/:id',function(req,res){
    connection.query("SELECT * FROM articulos WHERE id=?",[req.params.id],function(error,reg){
        if(error){
            throw error;
        }else{
            res.send(reg);
        }
    });
});

// Ruta para agregar un articulo
app.post('/api/articulos',function(req,res){
    let data={
        descripcion:req.body.descripcion,
        precio:req.body.precio,
        cantidad:req.body.cantidad
    };
    let sql="INSERT INTO articulos SET ?";
    connection.query(sql,data,function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});