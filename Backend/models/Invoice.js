
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    products: [{
        productName: {
            type: String,
            required: true,
        },
        productPrice: {
            type: Number,
            required: true,
        },
        ProductQuantity: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        }
    }],
    
        totalwithgst:{
            type:Number,
            required:true
        },
    

    createdAt: {
        type: Date,
        default: Date.now,
    },
},{collection:'InvoiceData'});

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;
