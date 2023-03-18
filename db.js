const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'FilmsMarket',
    'postgres',
    "000",
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5000 
    }
)
