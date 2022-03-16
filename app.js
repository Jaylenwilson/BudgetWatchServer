require('dotenv').config();


const Express = require("express");
const dbConnection = require('./db');
const app = Express();
const controllers = require('./controllers');

const middleware = require('./middleware');
app.use(Express.json());

app.use(require("./middleware/header"));
app.use(Express.json());

app.use("/auth", controllers.usercontroller)
app.use(middleware.validateSession)
app.use("/transaction", controllers.transactioncontroller)
app.use("/expense", controllers.expensecontroller)
app.use("/category", controllers.categorycontroller)

dbConnection
    .authenticate()
    .then(async () => await dbConnection.sync({}))
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[SERVER]: App is listening on ${process.env.PORT}`)
        })
    })
    .catch(error => console.log(`[SERVER]: ${error}`))
