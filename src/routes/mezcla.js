const express = require('express');
const router =  express.Router();

const pool = require('../database.js');

// SERVICIO PARA HACER EL REGISTRO, VISUALIZACIÓN DE TODOS LO REGISTROS Y BUSQUEDA POR ID DE Mezcla
router.get('/', async (req, res) => {
    let listMezcla = await pool.query('SELECT * FROM mezcla');
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente los registros de la mezcla",
        listMezcla: listMezcla
    });
    console.log(listMezcla);
})
router.get('/usadoM', async (req, res) => { // SERVICIO PARA REGRESAR TODOS LOS REGISTROS DE AMAANTO REVENTADO A USAR
    let listUsado = await pool.query('SELECT * FROM mezclaUsar');
    res.json({
        status: 200,
        message: "Se ha listado correctamente los registros de la mezcla a usar",
        listUsado: listUsado
    });
    console.log(listUsado);
})

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let listMezcla = await pool.query('SELECT * FROM mezcla WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el registro de la mezcla selecionado",
        listMezcla: listMezcla
    });
});

router.get('/usadoM2/:id', async (req, res) =>{
    const { id } = req.params;
    let listUsado = await pool.query('SELECT * FROM mezclaUsar WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el registro de la mezcla selecionado a usar",
        listUsado: listUsado
    });
});

router.post('/create', async (req, res)=> {
    const { cantChia, cantAmaranto, cantAjonjoli, mezclaTotal, dateElaboracion } = req.body;

    const mezcla ={
        cantChia, cantAmaranto, cantAjonjoli, mezclaTotal, dateElaboracion
    };
    await pool.query('INSERT INTO mezcla set ?', [mezcla]);
    res.json({
        status: 200,
        message: "Se ha registrado el seguimiento de la mezcla exitosamente!",
        mezcla: mezcla
    });
});

router.post('/createUsadoM', async (req, res)=> {
    const { cantidadMezcla, dateRegistro } = req.body;

    const usado ={
        cantidadMezcla, dateRegistro
    };

    await pool.query('INSERT INTO mezclaUsar set ?', [usado]);
    res.json({
        status: 200,
        message: "Se ha registrado el seguimiento de la mezcla a usar exitosamente!",
        usado: usado
    });
});


// -------------------------------------


module.exports = router;