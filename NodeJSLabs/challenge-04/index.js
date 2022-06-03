const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
app.engine('handlebars',exphbs.engine())
app.set("view engine","handlebars")
app.use(express.static("public"))

const products = [
    {
        id: "1",
        title: "A Arvore que Dava Dinheiro",
        price: 39.52,
        img: "https://images-na.ssl-images-amazon.com/images/I/91lnLN4YV4L.jpg"
    },
    {
        id: "2",
        title: "Droga Da Obediência (a)",
        price: 48.11,
        img: "https://images-na.ssl-images-amazon.com/images/I/91nzO719GpL.jpg"
    },

    {
        id: "3",
        title: "Entre Deuses e Monstros",
        price: 27.43,
        img: "https://images-na.ssl-images-amazon.com/images/I/81KvWAxKgRL.jpg"
    }
]


const port = 5000

app.get('/',(req,res)=>{
    res.render('home', {products})
})

app.get('/product/:id',(req,res)=>{
    const product = products[parseInt(req.params.id)-1]
    res.render('product', {product})
})

app.listen(port, () => {
    console.log(`the server its works port: ${port}`)
}
)