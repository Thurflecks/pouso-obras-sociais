const express = require("express")
const path = require("path")
const { engine } = require("express-handlebars")
const app = express()
const session = require("express-session")
const port = process.env.PORT | 8080;
const routerBase = require("./routes/baseRoutes")
const routerUser = require("./routes/usuariosRoutes")
const routerAdmin = require("./routes/adminRoutes")

app.engine("handlebars", engine({
    defaultLayout: "main",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        eq: (a, b) => a === b,
    },
}));
app.set("view engine", "handlebars")
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(session({
    secret: 'pouso9090',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

app.use("/user", routerUser)
app.use("/admin", routerAdmin)
app.use("/", routerBase)


app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})  