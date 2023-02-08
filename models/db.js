const mongoose = require('mongoose')

// Model of Vehicle Details
const vehicleSchema = new mongoose.Schema({
    refrencid: {
        type: Number,
    },
    chasisid: {
        type: Number,
    },
    modelid: {
        type: Number,
    },
    year: {
        type: Number
    },
    make: {
        type: String
    },
    model: {
        type: String
    },
    body: {
        type: String
    },
    option: {
        type: String
    }
})

module.exports = mongoose.model("Vehicle", vehicleSchema)