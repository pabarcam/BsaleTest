const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const dbConecction = require('./dbConnection')
const connection = dbConecction() 
const data = []

app.listen(3003, _ => {
    console.log("Servidor conectado");
})

app.set("view engine", "handlebars")
app.engine(
    "handlebars",
    exphbs({
        layoutsDir: __dirname + "/views",
        partialsDir: __dirname + "/views/components/",
})
)

app.use('/bootstrap', express.static(__dirname +
    '/node_modules/bootstrap/dist/css'))
    app.use('/bootstrapjs', express.static(__dirname +
        '/node_modules/bootstrap/dist/js'))
app.use('/jquery', express.static(__dirname +
    '/node_modules/jquery/dist'))
    
app.use(express.static("assets"))
    
//middlewares
    
app.get("/", function (req, res) {
  connection.query('SELECT * FROM product', (err, result) => {
    res.render("Inicio", {
      layout: "Inicio",
      imagenes: result,
    })
  })
})

app.post("/producto", function (req, res) {
    let body = "";
    req.on("data", (payload) => {
        body += payload;
    })
    req.on("end", async () => {
        console.log(body)
        const datos = Object.values(JSON.parse(body))
        data.push(datos)
    })
})

app.get("/productos", function (req, res) {

    res.end(JSON.stringify(data));
})