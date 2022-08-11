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

// router.get('/lista2/', async (req, res) => { // OBTIENE TODOS LOS PEDIDOS QUE TENGAN COMO STATUS 2
//     let listPedido = await pool.query('SELECT * FROM pedido where status = 2'); // p inner join client c on p.client_id = c.id -> esto le quite porque solo me regresaba como id el 1, 2 o a veces el 3
    
//     res.json({
//         status: 200,
//         message: "Se ha listado correctamente los pedidos con status 2",
//         listPedido: listPedido
//     });
//     console.log(listPedido);
// })

// router.get('/lista3/', async (req, res) => { // OBTIENE TODOS LOS PEDIDOS QUE TENGAN COMO STATUS 3
//     let listPedido = await pool.query('SELECT * FROM pedido where status = 3'); 
    
//     res.json({
//         status: 200,
//         message: "Se ha listado correctamente los pedidos con status 3",
//         listPedido: listPedido
//     });
//     console.log(listPedido);
// })

// router.get('/lista4/', async (req, res) => { // OBTIENE TODOS LOS PEDIDOS QUE TENGAN COMO STATUS 2
//     let listPedido = await pool.query('SELECT * FROM pedido where status = 4'); // p inner join client c on p.client_id = c.id -> esto le quite porque solo me regresaba como id el 1, 2 o a veces el 3
    
//     res.json({
//         status: 200,
//         message: "Se ha listado correctamente los pedidos con status 4",
//         listPedido: listPedido
//     });
//     console.log(listPedido);
// })

// router.get('/lista2/:id', async (req, res) =>{
//     const { id } = req.params;
//     let listPedido = await pool.query('SELECT * FROM pedido p inner join client c on p.client_id = c.id where status = 2 and p.id = ?', [id]);
//     // SELECT * FROM pedido p inner join client c on p.client_id = c.id where status = 2 and p.id = ?
//     res.json({
//         status: 200,
//         message: "Se ha encontrado el pedido",
//         listPedido: listPedido
//     });
// });
// SELECT * FROM pedido p inner join client c on p.client_id = c.id inner join detallespedidop d on p.id = d.pedido_id inner join product r on d.product_id = r.id where status = 2 and p.id = 3

// router.get('/:id', async (req, res) =>{ 
//     const { id } = req.params;
//     let listPedido = await pool.query('SELECT * FROM pedido WHERE id = ?', [id]);
//     res.json({
//         status: 200,
//         message: "Se ha encontrado el pedido",
//         listPedido: listPedido
//     });
// });

// router.get('/pedidoL2/:id', async (req, res) =>{ 
//     const { id } = req.params;
//     let listPedido = await pool.query('SELECT * FROM pedido WHERE status = 2 and id = ?', [id]);
//     res.json({
//         status: 200,
//         message: "Se ha encontrado el pedido",
//         listPedido: listPedido
//     });
// });

router.get('/pedidosDetalles/:id', async (req, res) =>{
    const { id } = req.params;
    let listDetallesPedido = await pool.query('SELECT * FROM detallespedidop WHERE pedido_id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el detalle del pedido",
        listDetallesPedido: listDetallesPedido
    });
});

// router.get('/pedidoL2Detalles/:id', async (req, res) =>{ 
//     const { id } = req.params;
//     let listPedido = await pool.query('SELECT * FROM pedido p inner join client c on p.client_id = c.id WHERE status = 2 and p.id = ?', [id]);
//     res.json({
//         status: 200,
//         message: "Se ha encontrado el detalle del pedido mmmmm",
//         listPedido: listPedido
//     });
// });

// router.get('/pedidoDetallesConfirmados/:id', async (req, res) =>{ 
//     const { id } = req.params;
//     let listPedido = await pool.query('SELECT * FROM pedido p inner join client c on p.client_id = c.id WHERE status = 3 and p.id = ?', [id]);
//     res.json({
//         status: 200,
//         message: "Se ha encontrado el detalle del pedido gggggggg",
//         listPedido: listPedido
//     });
// });

// router.get('/pedidoL3Detalles/:id', async (req, res) =>{ 
//     const { id } = req.params;
//     let listPedido = await pool.query('SELECT * FROM pedido p inner join client c on p.client_id = c.id WHERE status = 4 and p.id = ?', [id]);
//     res.json({
//         status: 200,
//         message: "Se ha encontrado el detalle del pedido xdxdxdxdxxd",
//         listPedido: listPedido
//     });
// });

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

router.post('/createDetallesGranel', async (req, res)=> { // SE VAN REGISTRANDO CADA UNO DE LOS PRODUCTOS QUE SE VAN AGREGANDO EN EL MODAL DE AGREGAR PRODUCTOS
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

router.post('/confirmar/:id', async (req, res)=>{
    const { id } = req.params;
    // var dateUpdate = new Date().toISOString();
    const { datePago, status } = req.body;

    const confi = { datePago, status };

     await pool.query('UPDATE pedido SET ? WHERE id = ?', [confi, id]);
        res.json({
            status: 200,
            message: "Se ha confirmado el pedido con la fecha de pago",
            confi: confi
        });
});

router.post('/regOrdenSalida/:id', async (req, res)=>{
    const { id } = req.params;
    // var dateUpdate = new Date().toISOString();
    const { dateEntrega, timeLlegada, companyTransporte, nameOperador, seIdentifico, numPlacas, tipoTransporte, descripCarga, observations, dateSalida, status } = req.body;

    const confi = { dateEntrega, timeLlegada, companyTransporte, nameOperador, seIdentifico, numPlacas, tipoTransporte, descripCarga, observations, dateSalida, status };
    console.log(confi)
     await pool.query('UPDATE pedido SET ? WHERE id = ?', [confi, id]);
        res.json({
            status: 200,
            message: "Se ha registrado la orden de salida",
            confi: confi
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