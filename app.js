const express = require("express")
const app = express()
const exphbs = require("express-handlebars")
const data = []

app.listen(3003, _ => {
console.log("Servidor conectado");
})

app.engine(
"handlebars",
exphbs({
layoutsDir: __dirname + "/views",
partialsDir: __dirname + "/views/componentes/",
})
)

app.set("view engine", "handlebars")


app.use('/bootstrap', express.static(__dirname +
    '/node_modules/bootstrap/dist/css'))
app.use('/bootstrapjs', express.static(__dirname +
    '/node_modules/bootstrap/dist/js'))
    // Paso 3
app.use('/jquery', express.static(__dirname +
    '/node_modules/jquery/dist'))



app.use(express.static("assets"))
app.get("/", function (req, res) {
res.render("Inicio", {
layout: "Inicio",
imagenes: [
    "piscomistral40",
    "cebollas",
    "lechuga",
    "papas",
    "pimenton",
    "tomate"
],
src: 
"https://www.seekpng.com/png/detail/986-9868123_png-file-icono-carrito-de-compras.png"
});
});

app.post("/producto", function (req, res) {
    let body = "";
    req.on("data", (payload) => {
        body += payload;
    });
    req.on("end", async () => {
        console.log(body)
        const datos = Object.values(JSON.parse(body));
        data.push(datos)
    });
})

app.get("/productos", function (req, res) {
    // console.log(data)
    res.end(JSON.stringify(data));
})