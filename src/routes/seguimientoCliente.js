const express = require('express');
const router =  express.Router();

const pool = require('../database.js');

router.get('/segC', async (req, res) => {
    let listSegClient = await pool.query('SELECT * FROM seguimientoCliente s inner JOIN client c on s.client_id = c.id');
    
    res.json({
        status: 200,
        message: "Se han listado los seguimientos correctamente",
        listSegClient: listSegClient
    });
    console.log(listSegClient);
})

router.get('/acuerdo/:id', async (req, res) =>{
    const { id } = req.params;
    let listSegClient = await pool.query('SELECT * FROM seguimientoCliente WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado al cliente",
        listSegClient: listSegClient
    });
});
// router.get('/segPorCliente/:id', async (req, res) => {
//     const { id } = req.params;
//     let listSegClient = await pool.query('SELECT * FROM seguimientoCliente s inner JOIN client c on s.client_id = c.id where s.client_id = ?', [id]);
    
//     res.json({
//         status: 200,
//         message: "Se han listado los seguimientos correctamente",
//         listSegClient: listSegClient
//     });
//     console.log(listSegClient);
// })
//SI FILTRA PERO AÚN NO ENCUENTRO LA MANERA DE CONSUMIRLO

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let listSegClient = await pool.query('SELECT * FROM seguimientoCliente WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado al seguimiento del cliente",
        listSegClient: listSegClient
    });
});

router.post('/create', async (req, res)=> {
    const { representante, date , asunto, acuerdo, client_id } = req.body;
    var dateCreated = new Date().toISOString();
    //var dateCreated2 = new Date().toLocaleString();
    const segClient ={
        representante, date: dateCreated, asunto, acuerdo, client_id
    };

    await pool.query('INSERT INTO seguimientoCliente set ?', [segClient]);
    res.json({
        status: 200,
        message: "Se ha registrado el seguimiento del cliente exitosamente!",
        segClient: segClient
    });
});



module.exports = router;