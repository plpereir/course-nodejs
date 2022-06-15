const {DataTypes} = require('sequelize')

const db = require('../db/conn')

const User = db.define('User',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        require: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        require:true
    },
    occupation:{
        type: DataTypes.STRING,
        require:true
    },
    newsletter:{
        type: DataTypes.BOOLEAN
    }
})

module.exports = User;