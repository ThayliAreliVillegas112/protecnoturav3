const express = require('express');
const router =  express.Router();

const pool = require('../database.js');


router.get('/', async (req, res) => { // OBTIENE TODOS LOS PEDIDOS QUE TENGAN COMO STATUS 1
    let listPedido = await pool.query('SELECT * FROM pedido where status = 1');
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente los pedidos",
        listPedido: listPedido
    });
    console.log(listPedido);
})


router.get('/pedidosDetalles/:id', async (req, res) =>{
    const { id } = req.params;
    let listDetallesPedido = await pool.query('SELECT * FROM detallespedidog WHERE pedido_id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el detalle del pedido",
        listDetallesPedido: listDetallesPedido
    });
});


router.get('/pedidosDetallesTablaG/:id', async (req, res) =>{ //MUESTRA LOS PRODUCTOS EN LA TABLA DEL MODAL EN DONDE SE VAN AGREGANDO LOS PRODUCTOS
    const { id } = req.params;
    let listDetallesPedido = await pool.query('SELECT * FROM detallesPedidog m inner join pedido h on m.pedido_id = h.id INNER join materiaPrima p on m.materiaPrima_id = p.id WHERE pedido_id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el detalle del pedido para ser mostrado en la tabla",
        listDetallesPedido: listDetallesPedido
    });
});

// SELECT * FROM detallesPedidop m inner join pedido h on m.pedido_id = h.id INNER join product p on m.product_id = p.id;
router.post('/create', async (req, res)=> { // CREA UN PEDIDO PARA QUE DESPUES SEAN AGREGADOS SUS RESPECTIVOS PRODUCTOS
    const { pedido, elaboro, dateSolicitud, status, client_id } = req.body;
    const pedidos ={
        pedido, elaboro, dateSolicitud, status, client_id
    };
    await pool.query('INSERT INTO pedido set ?', [pedidos]);
    res.json({
        status: 200,
        message: "Se ha registrado el pedido exitosamente!",
        pedidos: pedidos
    });
});

router.post('/createDetallesGranel', async (req, res)=> { // SE VAN REGISTRANDO CADA UNO DE LOS PRODUCTOS QUE SE VAN AGREGANDO EN EL MODAL DE AGREGAR PRODUCTOS
    const { materiaPrima_id, pedido_id, cantidad, precioTotal, total } = req.body;
    const pedidosDetallesG ={
        materiaPrima_id, pedido_id, cantidad, precioTotal, total
    };
    await pool.query('INSERT INTO detallespedidog set ?', [pedidosDetallesG]);
    res.json({
        status: 200,
        message: "Se ha registrado los detalles del pedido a granel exitosamente!",
        pedidosDetallesG: pedidosDetallesG
    });
});


module.exports = router;