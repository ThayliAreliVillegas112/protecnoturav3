const express = require('express');
const router =  express.Router();

const pool = require('../database.js');


router.get('/', async (req, res) => {
    let listHarina = await pool.query('SELECT * FROM harina');
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente todas las harinas",
        listHarina: listHarina
    });
    console.log(listHarina);
})

router.get('/materialProcesado/:id', async (req, res) => { // Regresa todos los registros de la tabla "materialPro" por id
    const { id } = req.params;
    let listHarina = await pool.query('SELECT * FROM materialPro WHERE id = ?', [id]);
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente todos los registros de material procesado",
        listHarina: listHarina
    });
    console.log(listHarina);
})

router.get('/materialProcesado2', async (req, res) => { // Regresa todos los registros de la tabla "materialPro" junto con sus respectivos id de las tablas materia prima y 
    let listHarina = await pool.query('SELECT * FROM `materialpro` m inner join harina h on m.harina_id = h.id INNER join materiaprima p on m.materiaPrima_id = p.id;');
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente todos los registros de material procesado",
        listHarina: listHarina
    });
    console.log(listHarina);
})

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let listHarina = await pool.query('SELECT * FROM harina WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado la harina",
        listHarina: listHarina
    });
});

router.post('/create', async (req, res)=> {
    const { nameH, stockH } = req.body;

    const harina ={
        nameH, stockH 
    };

    await pool.query('INSERT INTO harina set ?', [harina]);
    res.json({
        status: 200,
        message: "Se ha registrado la harina exitosamente!",
        harina: harina
    });
});

router.post('/createMaterialProcesado', async (req, res)=> {
    const { cantidad, cantidadHarina, dateRegistro, harina_id, materiaPrima_id } = req.body;

    const materialPro ={
        cantidad, cantidadHarina, dateRegistro, harina_id, materiaPrima_id
    };

    await pool.query('INSERT INTO materialPro set ?', [materialPro]);
    res.json({  
        status: 200,
        message: "Se ha registrado el material procesado exitosamente!",
        materialPro: materialPro
    });
});

router.post('/update/:id', async (req, res)=>{
    const { id } = req.params;
    const { nameH, stockH } = req.body;

    const harina = { nameH, stockH };

     await pool.query('UPDATE harina SET ? WHERE id = ?', [harina, id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente la información del cliente",
            harina: harina
        });
});

module.exports = router;