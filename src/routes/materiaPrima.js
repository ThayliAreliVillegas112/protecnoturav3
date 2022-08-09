const express = require('express');
const router =  express.Router();

const pool = require('../database.js');


router.get('/', async (req, res) => {
    let listMateria = await pool.query('SELECT * FROM materiaPrima');
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente las materias primas",
        listMateria: listMateria
    });
    console.log(listMateria);
})

router.get('/registros', async (req, res) => {
    let listMateria = await pool.query('SELECT * FROM registerCompra s inner JOIN materiaprima c on s.materiaPrima_id = c.id');
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente las materias primas",
        listMateria: listMateria
    });
    console.log(listMateria);
})


// router.get('/com/:id', async (req, res) => { // desplegar los registos de compra
//     const { id } = req.params;
//     let listMateria = await pool.query('SELECT * FROM registercompra s inner JOIN materiaprima c on s.materiaPrima_id = c.id where s.materiaPrima_id = ?', [id]); //muestra solo las compras de la materia prima seleccionada
    
//     res.json({
//         status: 200,
//         message: "Se ha listado correctamente las materias primas",
//         listMateria: listMateria
//     });
//     console.log(listMateria);
// })

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let listMateria = await pool.query('SELECT * FROM materiaPrima WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado la materia prima",
        listMateria: listMateria
    });
});

router.get('/stock/:id', async (req, res) =>{
    const { id } = req.params;
    let listStock = await pool.query('SELECT SUM(cantidad) FROM registerCompra WHERE materiaPrima_id = ?', [id]);
    res.json({
        status: 200,
        message: "e esta calculando correctamente el stock",
        listStock: listStock
    });
});

// router.post('/stock/:id', async (req, res)=>{ //Solo actualiza el stock
//     const { id } = req.params; 

//      await pool.query('SELECT SUM(cantidad) FROM registerCompra WHERE materiaPrima_id = ?', [id]);
//         res.json({
//             status: 200,
//             message: "Se esta calculando correctamente el stock",
//             stock2: stock2
//         });
// });
router.get('/registerC/:id', async (req, res) =>{
    const { id } = req.params;
    let listMateria = await pool.query('SELECT * FROM registerCompra WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el registro",
        listMateria: listMateria
    });
});

router.post('/create', async (req, res)=> {   //Primero solo registra el nombre y precio de la materia prima para tenerlo en la tabla
    const { nameM, pricePublic } = req.body;
    // var dateCompraC = new Date().toISOString();
    //var dateCreated2 = new Date().toLocaleString();
    const materiaPrima ={
        nameM, pricePublic
    };

    await pool.query('INSERT INTO materiaPrima set ?', [materiaPrima]);
    res.json({
        status: 200,
        message: "Se ha registrado el nombre y precio de la materia prima exitosamente!",
        materiaPrima: materiaPrima
    });
});

router.post('/regCompra', async (req, res)=>{ // Registra la compra de alguna de las materias primas previamente registradas (nombre y precio)
    // const { id } = req.params;
    // var dateUpdate = new Date().toISOString();
    const { lote, cantidad , nameProveedor, claveProductor, dateCompra, costales, claveCostales, quienEntrego, quienRecibio, materiaPrima_id } = req.body;

    const materiaPrima = {lote, cantidad , nameProveedor, claveProductor, dateCompra, costales, claveCostales, quienEntrego, quienRecibio, materiaPrima_id };

     await pool.query('INSERT INTO registerCompra SET ?', [materiaPrima]);
        res.json({
            status: 200,
            message: "Se ha registrado la compra de la materia prima correctamente",
            materiaPrima: materiaPrima
        });
});

router.post('/update/:id', async (req, res)=>{ //Solo actualiza el nombre y precio
    const { id } = req.params;
    // var dateUpdate = new Date().toISOString();
    const { nameM, pricePublic } = req.body;

    const materiaPrima = { nameM, pricePublic };

     await pool.query('UPDATE materiaPrima SET ? WHERE id = ?', [materiaPrima, id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente el nombre y precio",
            materiaPrima: materiaPrima
        });
});


module.exports = router;