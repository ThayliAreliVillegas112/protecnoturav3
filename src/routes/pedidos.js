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

router.get('/lista2/', async (req, res) => { // OBTIENE TODOS LOS PEDIDOS QUE TENGAN COMO STATUS 2
    let listPedido = await pool.query('SELECT * FROM pedido p inner join client c on p.client_id = c.id where status = 2');
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente los pedidos con status 2",
        listPedido: listPedido
    });
    console.log(listPedido);
})

router.get('/:id', async (req, res) =>{ 
    const { id } = req.params;
    let listPedido = await pool.query('SELECT * FROM pedido WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el pedido",
        listPedido: listPedido
    });
});

router.get('/pedidosDetalles/:id', async (req, res) =>{
    const { id } = req.params;
    let listDetallesPedido = await pool.query('SELECT * FROM detallespedidop WHERE pedido_id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el detalle del pedido",
        listDetallesPedido: listDetallesPedido
    });
});

router.get('/pedidosDetallesTabla/:id', async (req, res) =>{ //MUESTRA LOS PRODUCTOS EN LA TABLA DEL MODAL EN DONDE SE VAN AGREGANDO LOS PRODUCTOS
    const { id } = req.params;
    let listDetallesPedido = await pool.query('SELECT * FROM detallesPedidop m inner join pedido h on m.pedido_id = h.id INNER join product p on m.product_id = p.id WHERE pedido_id = ?', [id]);
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

router.post('/createDetalles', async (req, res)=> { // SE VAN REGISTRANDO CADA UNO DE LOS PRODUCTOS QUE SE VAN AGREGANDO EN EL MODAL DE AGREGAR PRODUCTOS
    const { cantUnidades, precioTotal, total, pedido_id, product_id	 } = req.body;
    const pedidosDetalles ={
        cantUnidades, precioTotal, total, pedido_id, product_id
    };
    await pool.query('INSERT INTO detallespedidop set ?', [pedidosDetalles]);
    res.json({
        status: 200,
        message: "Se ha registrado los detalles del pedido exitosamente!",
        pedidosDetalles: pedidosDetalles
    });
});


router.post ('/delete/:id', async (req, res) =>{ // CAMBIA EL ESTADO DEL PEDIDO A 2
    const { id } = req.params;

    await pool.query('UPDATE pedido SET status = 2 WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha hecho check al pedido correctamente"
    });
});
module.exports = router;