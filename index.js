//express
const express = require('express');
const app = express();
const PORT = 3000; //puede cambiar

//array
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis', autor: 'Moises', anioPubliacion: 2020},
    {id: 2 , nombre: 'Exodo', autor: 'Juan', anioPubliacion: 2024},
    {id: 3 , nombre: 'Levitico', autor: 'Pedro', anioPubliacion: 1990},
];
// manejo de JSON
app.use(express.json());
// endpoint 1 obtener todos los libros
app.get('/libros', (req, res) =>{
    res.json(librosBiblicos);
});
// endpoint 2 obtener libros por ID
app.get('/libros/:id', (req, res) =>{
    const idCapturado = parseInt(req.params.id);
    console.log(idCapturado);
    const libroEncontrado = librosBiblicos.find((libro) => libro.id === idCapturado);
if (libroEncontrado) {
    res.json(libroEncontrado);
} else {
    res.status(404).json({ mensaje : 'Libro no encontrado'});
}
} );
// endpoint 3 agregar un libros
app.post('/agregar-libro', (req, res) => {
    const nuevolibro = req.body;
console.log(nuevolibro);
librosBiblicos.push(nuevolibro);
res.status(201).json('Este libro fue guardado exitosamente');
});
// endpoint 4 actualizar el libro
app.put('/actualizar-libro/:id', (req, res) => {
    const idCapturado = parseInt(req.params.id);
    const indexLibroLocalizado = librosBiblicos.findIndex((libro) => libro.id === idCapturado);
    if (indexLibroLocalizado !== -1){
        librosBiblicos[indexLibroLocalizado] = req.body;
        res.json(librosBiblicos[indexLibroLocalizado]);
    }else {
        res.status(404).json({mensaje : 'libro no encontrado'});
    }
    
} );

/// endpoint 5 eliminar  libro
app.delete('/eliminar-libro/:id', (req, res) => {
 const id = parseInt(req.params.id);
 lBiblico =librosBiblicos.filter( libro => libro.id !== id);
 res.status(201).json({mensaje : 'se ha eliminado el libro'});
 console.log(lBiblico);
});

//endpoint 6 eliminar  libro de otra manera
app. get('/libros/publicacion/:anio', (req, res) => {
    const year =parseInt(req.params.anio);
    const libroPublicados =librosBiblicos.filter(x => x.anioPubliacion === year);
    if(libroPublicados.length >0){
        res.json(libroPublicados);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado libros publicados'});
    }
})
//+++++++++++++PRACTICA 2+++++++++++++++
//---------------------------------------------------


//endpoint 7 Obtener un endpoint de bienvenida con su nombre y su profesion actual
//---------------------------------------------------

app.get('/bienvenida', (req, res) =>{
   // res.json(bienvenida);
   // res.write('BIENVENIDO A LA PRACTICA 2 '+'  '),
   // res.write('----------------------------- '+' '),
    //res.write('NOMBRE: MARIBEL MAMANI TARQUI'+' '),
    //res.write('PROFESION ACTUAL:  ASESOR EXPERIENCIA AL CLIENTE '),
    //res.end();
    res.status(201).json({
         Tarea:'BIENVENIDO A LA PRACTICA2',
          nombre: 'Maribel Mamani Tarqui',
           Profesion: 'Asesor Experiencia al Cliente'

    });

});


// endpoint 8 Obtener libros por autor
//---------------------------------------------------
app.get('/libros/autores/:autor', (req, res) =>{

    const  idCapturado = String(req.params.autor);
    console.log(idCapturado);
    const libroEncontrado = librosBiblicos.find((libro) => libro.autor === idCapturado);
if (libroEncontrado) {
    res.json(libroEncontrado);
} else {
    res.status(404).json({ mensaje : 'Autor no encontrado'});
}
} );

// endpoint 9 obtener cantidad de libros
//---------------------------------------------------
app.get('/cantidad-libro', (req, res) => {
    
   const cant = librosBiblicos.length;
   console.log(cant);
    res.status(201).json({mensaje :'la cantidad de libros es:'+'  '+ cant});

} );

// endpoint 10 Obtener libros por nombre que contenga el texto "Juan"
//---------------------------------------------------

app.get('/libros/nombres/:nombre', (req, res) =>{
    const idCapturado = String(req.params.nombre);
    console.log(idCapturado);
    const libroEncontrado = librosBiblicos.find((libro) => libro.nombre === idCapturado);
if (libroEncontrado) {
    res.json(libroEncontrado);
} else {
    res.status(404).json({ mensaje : 'El nombre del libro no fue encontrado'});
}
} );

 // endpoint 11 Ordenar libros por nombre
 //---------------------------------------------------
 app.get('/ordenar-libro', (req, res) => {


    librosBiblicos.sort((a, b) => {

        const nombreA = a.nombre.toLowerCase();
        const nombreB = b.nombre.toLowerCase();

        if (a.nombre < b.nombre){
            return -1;
        }
        if (a.nombre > b.nombre){
            return 1;
        }
        return 0;
    });
    console.log(librosBiblicos);
    res.status(201).json({mensaje :'se ha Ordenado los  libro por nombre'});
    
 } );




app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT)
});