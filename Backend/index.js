
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const { registerUser } = require('./controller/RegisterUser');
const { loginUser } = require('./controller/LoginUser');
const InvoiceData = require('./controller/InvoiceData');
const { default: puppeteer } = require('puppeteer');



require('dotenv').config()
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;


app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  credentials: true // Allow cookies to be sent cross-origin
}));

const database = process.env.URI

app.listen(PORT, () => {
  console.log(`Levitation app listening on port ${PORT}`)
})

mongoose.connect(database)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


//routes

app.post('/register', registerUser)
app.post('/login', loginUser)
app.post('/invoice', InvoiceData)



app.get('/generate-invoice-pdf', async (req, res) => {
  try {
    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
      headless: true, // Running in headless mode
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Important for environments like Heroku
    });

    const page = await browser.newPage();

    // Navigate to the invoice page on the frontend
    await page.goto('http://localhost:5173/product-invoice', { waitUntil: 'networkidle0' });

    // Generate the PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px',
      },
    });

    const screenshotBuffer = await page.screenshot({
      fullPage: true // Capture the full page, not just the viewport
  });

    // Close the browser
    await browser.close();

 

    // Send the generated PDF as a response
    res.contentType('application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="product-invoice.pdf"');
    const buffer = Buffer.from(pdfBuffer);
    res.send(buffer);
    console.log('successfully generated')
    


  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});