const router = require("express").Router();
const VehicleModel = require('../models/db')


// ADD Vehicle Details
router.get('/', (req, res) => {
    res.render('vehicle/add', { viewTitle: 'Add', })
})

// ADD Vehicle Details
router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res)
    else
        updateRecord(req, res)
})

function insertRecord(req, res) {
    const vehicle = new VehicleModel()
    vehicle.refrencid = req.body.refrencid
    vehicle.chasisid = req.body.chasisid
    vehicle.modelid = req.body.modelid
    vehicle.year = req.body.year
    vehicle.make = req.body.make
    vehicle.model = req.body.model
    vehicle.body = req.body.body
    vehicle.option = req.body.option
    vehicle.save((err, doc) => {
        if (!err)
            res.redirect('/vehicle/list')
        else {
            console.log('error ' + err);
        }
    })
}


function updateRecord(req, res) {
    VehicleModel.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err)
            res.redirect('/vehicle/list')
        else {
            console.log('error ' + err);
        }
    })
}

// List Details
router.get('/list', (req, res) => {
    VehicleModel.find({}).lean()
        .exec(function (err, docs) {
            if (!err) {
                res.render('vehicle/list', {
                    list: docs
                })
            } else {
                console.log('error ' + err);
            }

        })
})


router.get('/:id', (req, res) => {
    VehicleModel.findById(req.params.id).lean()
        .exec(function (err, doc) {
            if (!err) {
                res.render('vehicle/add', {
                    viewTitle: 'Update',
                    vehicle: doc
                })
            }
        })
})

// Delete Details
router.get('/delete/:id', (req, res) => {
    VehicleModel.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err)
            res.redirect('/vehicle/list')
        else {
            console.log('error ' + err);
        }
    })
})

module.exports = router
