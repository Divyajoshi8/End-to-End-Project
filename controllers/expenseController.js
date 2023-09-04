const path = require("path");
const Expense = require("../models/expenseModel");
const User = require("../models/userModel");
//const database = require("../utils/database");

exports.getHomePage = async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../", "public", "views", "home.html"));
  } catch (err) {
    console.log(err);
  }
};

exports.addExpense = async (req, res, next) => {
  const date = req.body.date;
  const category = req.body.category;
  const description = req.body.description;
  const amount = req.body.amount;
  User.update(
    {
      totalExpenses: req.user.totalExpenses + amount,
    },
    { where: { id: req.user.id } }
  );


  try {
    const result = await Expense.create({
      date: date,
      category: category,
      description: description,
      amount: amount,
      userId: req.user.id,
    });
    res.status(200);
    res.redirect("/home");
  } catch (err) {
    console.log(err);
  }
};

exports.getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    res.json(expenses);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllExpensesPagination = async (req, res, next) => {
  try {
    const pageNo = req.params.page;
    const limit = 5;
    const offset = (pageNo - 1) * limit;
    const totalExpenses = await Expense.count({
      where: { userId: req.user.id },
    });
    const totalPages = Math.ceil(totalExpenses / limit);
    const expenses = await Expense.findAll({
      where: { userId: req.user.id },
      offset: offset,
      limit: limit,
    });
    res.json({ expenses: expenses, totalPages: totalPages });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  const id = req.params.id;
  console.log(id, req.user.id);
    try {
      const expense = await Expense.findByPk(id);
      await User.update({
        totalExpenses: req.user.totalExpenses - expense.amount,
      },
      { where: { id: req.user.id } }
      );
      await Expense.destroy({ where: { id: id, userId: req.user.id } });
        res.redirect("/home");
      } catch (err) {
        console.log(err);
    }
  };

  exports.editExpense = async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log(req.body);
      const category = req.body.category;
      const description = req.body.description;
      const amount = req.body.amount;

      const expense = await Expense.findByPk(id);

      await User.update(
        {
          totalExpenses: req.user.totalExpenses - expense.amount + amount,
        },
        { where: { id: req.user.id } }
      );

      await Expense.update(
        {
          category: category,
          description: description,
          amount: amount,
        },
        { where: { id: id, userId: req.user.id } }
      );

      res.redirect("/home");
    } catch (err) {
      console.log(err);
    }
  };
