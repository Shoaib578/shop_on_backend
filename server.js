const express = require('express')
const app = express()
const path = require('path')


const cors = require('cors');
const connect_db = require('./connect_db')

const upload = require('express-fileupload')
app.use(express.static("public"));
app.use(upload())
app.use(cors());
app.use(express.json());
connect_db()




const user = require('./routes/apis/user')
app.use('/apis/user',user)


const item = require('./routes/apis/item')
app.use('/apis/item',item)

const cart = require('./routes/apis/cart')
app.use('/apis/cart',cart)


const groups = require('./routes/apis/groups')
app.use('/apis/groups',groups)

const hash_tag = require('./routes/apis/hash_tag')
app.use('/apis/hash_tag',hash_tag)

const order = require('./routes/apis/order')
app.use('/apis/order',order)

const colors = require('./routes/apis/colors')
app.use('/apis/colors',colors)


const sizes = require('./routes/apis/size')
app.use('/apis/sizes',sizes)


const contacts = require('./routes/apis/contacts')
app.use('/apis/contacts',contacts)

let host;
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
   host= add
   console.log("Your Host is "+add)
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

