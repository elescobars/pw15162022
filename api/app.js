let express=require('express');
let mysql=require('mysql');
// Que el cliente frontend pueda usar la api
let cors=require('cors');
let app=express();
let puerto=3000;

// Recibir datos json
app.use(express.json());

app.listen(puerto, function(){
    console.log('Server ONLINE!');
});

// Base de datos
// Parametros de conexion
let connection=mysql.createConnection({
    host:'localhost',
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

// Ruta para actualizar un articulo
app.put('/api/articulos/:id',function(req,res){
    let id=req.params.id;
    let descripcion=req.body.descripcion;
    let precio=req.body.precio;
    let cantidad=req.body.cantidad;
    let sql="UPDATE articulos SET descripcion = ?, precio = ?, cantidad = ? WHERE id = ?";
    connection.query(sql,[descripcion,precio,cantidad,id],
        function(error,results){
            if(error){
                throw error;
            }else{
                res.send(results);
            }
        });
});

//Ruta para borrar un articulo
app.delete('/api/articulos/:id',function(req,res){
    let id=req.params.id;
    let sql='DELETE FROM articulos WHERE id = ?';
    connection.query(sql,[id],function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
});