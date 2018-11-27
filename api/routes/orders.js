const Sequelize = require('sequelize')//mysql object model
const connection = new Sequelize('kenmoreApi','root','pieter8883',{
    dialect:'mysql'
})

var Article = connection.define('article', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT,
    tag:Sequelize.STRING
})

connection.sync();
