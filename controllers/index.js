var express	= require('express');
var router	= express.Router();
let dataModal = require('../models/userModal')

router.post('/', async (req, res) => {	
    let { key, value } = req.body

    let data = await dataModal.saveData(key, value)
    
	res.send(data)
});

router.get('/', async (req, res) => {
    let data = []
    if(req.query.key) {
        data = await dataModal.getDataByKey(req.query.key)
    } else data = await dataModal.getData()
    
	res.send(data)
})

router.delete('/', async (req, res) => {
    let key = req.query.key
    if(!key) {
        res.send({
            code: 403,
            status: 'fail',
            message: "Please provide key from url"
        })
    } else {
        let data = await dataModal.deleteDataByKey(key)
        res.send(data)
    }
})

router.put('/', async (req, res) => {
    let { key, value } = req.body
    if(!key) {
        res.send({
            code: 403,
            status: 'fail',
            message: "Please provide key from url"
        })
    } else {
        let data = await dataModal.updateDataByKey(key, value)
        res.send(data)
    }
})

module.exports = router;