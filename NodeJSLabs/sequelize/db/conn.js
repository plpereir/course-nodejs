const { Sequelize } = require('sequelize')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '/Users/pedro.pereira/Projects/NodeJSLabs/challenge-06/db/database.sqlite'
  });
module.exports = sequelize