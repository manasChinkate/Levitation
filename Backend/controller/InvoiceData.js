const Invoice = require("../models/Invoice");

const InvoiceData = async(req,res)=>{
    try {
        const { username, email, products, totalwithgst } = req.body;

        // Calculate total price for each product and add it to the products array
        const updatedProducts = products.map(product => ({
            ...product,
            totalPrice: product.productPrice * product.ProductQuantity,
        }));

        // Create a new invoice
        const newInvoice = new Invoice({
            username,
            email,
            products: updatedProducts,
            totalwithgst:totalwithgst
        });

        // Save invoice to database
        await newInvoice.save();
        res.status(201).json({ message: 'Invoice created successfully', newInvoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create invoice', error });
    }
}

module.exports = InvoiceData