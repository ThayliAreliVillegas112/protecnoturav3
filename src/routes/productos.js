const express = require('express');
const router =  express.Router();

const pool = require('../database.js');


router.get('/', async (req, res) => {
    let listProduct = await pool.query('SELECT * FROM product');
    
    res.json({
        status: 200,
        message: "Se ha listado correctamente el producto",
        listProduct: listProduct
    });
    console.log(listProduct);
})

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let listProduct = await pool.query('SELECT * FROM product WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el producto",
        listProduct: listProduct
    });
});

router.post('/create', async (req, res)=> {
    const { nameProduct, codeBarras, gramaje, stock , price, dateRegister, description } = req.body;
    var dateCreated = new Date().toISOString();
    //var dateCreated2 = new Date().toLocaleString();
    const product ={
        nameProduct, codeBarras, gramaje, stock , price, dateRegister: dateCreated, description
    };

    await pool.query('INSERT INTO product set ?', [product]);
    res.json({
        status: 200,
        message: "Se ha registrado el producto exitosamente!",
        product: product
    });
});

router.post('/update/:id', async (req, res)=>{
    const { id } = req.params;
    // var dateUpdate = new Date().toISOString();
    const { nameProduct, codeBarras, gramaje, stock , price, dateRegister, description } = req.body;

    const product = { nameProduct, codeBarras, gramaje, stock , price, dateRegister, description };

     await pool.query('UPDATE product SET ? WHERE id = ?', [product, id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente el producto",
            product: product
        });
});

router.post ('/delete/:id', async (req, res) =>{
    const { id } = req.params;

    await pool.query('DELETE FROM product WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    });
});
module.exports = router;