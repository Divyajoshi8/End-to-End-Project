const sequelize = require("sequelize");

const db = new sequelize("expense_tracker", "root", "Divya&joshi8",{
    dialect: "mysql",
    host: "localhost",
});

module.exports = db;