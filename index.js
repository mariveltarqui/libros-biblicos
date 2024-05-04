//express
const express = require('express');
const app = express();
const PORT = 3000; //puede cambiar

//array
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis', autor: 'Moises'},
    {id: 2 , nombre: 'Exodo', autor: 'Moises'},
    {id: 3 , nombre: 'Levitico', autor: 'Moises'},
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




app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT)
});