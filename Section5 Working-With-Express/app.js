const express = require('express');
const adminRoute = require('./routes/admin')
const productRoute = require('./routes/product')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());

// now use the routes
app.use(adminRoute)
app.use(productRoute)

// you can also specify the starting path of your route
// For eg
// app.use('/shop', productRoute)
// In the above case, api call to /shop/product would send "This is product page" response

app.get('/', (req, res) => {
    return res.send("Hello from express!");
})

app.post("/", (req, res) => {
    // will only be able to get json data
    const body = req.body;
    return res.status(200).send(body);
})

app.use('/', (req, res) => {
    return res.send("Hello from express!");
})


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
