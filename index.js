const express = require("express")
const path = require("path")
const { engine } = require("express-handlebars")
const app = express()
const session = require("express-session")
const routerBase = require("./routes/baseRoutes")
const routerUser = require("./routes/usuariosRoutes")
const routerAdmin = require("./routes/adminRoutes")
const routerDoacao = require("./routes/doacaoRoutes")
const routerEventos = require("./routes/eventosRoutes")
const BaseController = require("./controllers/BaseController")
const flash = require('express-flash')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
require("dotenv").config({ quiet: true })
const { SESSION_SECRET, PORT } = process.env
const helmet = require('helmet');
const compression = require('compression');

const isProduction = process.env.NODE_ENV === 'production';



if (isProduction) {
    app.use(helmet());

    app.use((req, res, next) => {
        res.removeHeader("Permissions-Policy");
        res.setHeader(
            "Permissions-Policy",
            "camera=(), microphone=(), geolocation=()"
        );
        next();
    });
    
    app.use(compression());
}

app.engine("handlebars", engine({
    defaultLayout: "main",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        eq: (a, b) => a === b,
    }
}));
app.set("view engine", "handlebars")
app.use(
    express.urlencoded({
        extended: true
    })
)
app.set('trust proxy', 1)

app.use(session({
    name: 'admin',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: !isProduction,
    cookie: {
        secure: isProduction,
        maxAge: 1000 * 60 * 30,
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax"
    }
}))



app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(flash())

app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.session = req.session
    }
    next()
})

app.use("/user", routerUser)
app.use("/admin", routerAdmin)
app.use("/doacao", routerDoacao)
app.use("/", routerBase)
app.use("/eventos", routerEventos)
app.use(BaseController.notFound);



app.listen(PORT || 8080, () => {
    console.log(`Ambiente: ${process.env.NODE_ENV}`)
    if (isProduction) {
        console.log(`Servidor rodando em https://vlagronegocios.com.br`, `na porta ${PORT}`)
    } else {
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    }
})