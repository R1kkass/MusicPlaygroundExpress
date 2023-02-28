const express = require('express')
const app = express()
const sequelize = require('./db')
const fileUpload = require('express-fileupload')
const path = require('path')
const PORT = 5001
const schema = require('./graphQL/shema/shema')
const { graphqlHTTP } = require('express-graphql')
const root = require('./graphQL/worker/user')
const cors = require('cors')
const router = require('./router/index')

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload())
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))
app.use('/api', router)


const start = async ()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Сервер стартовал ${PORT}`))
    }catch(e){
        console.log(e);
    }
}

start()