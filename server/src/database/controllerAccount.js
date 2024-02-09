const pool = require("../../db");
const queries = require("./queries");
const getAuthentification = (req, res) => {
  const { login_name, pass_word } = req.body;
  pool.query(
    queries.getAuthentification,
    [login_name, pass_word],
    (error, results) => {
      try {
        if (error) {
          throw error;
        }
        const noAccountFound = !results.rows.length;
        console.log("acc: " + noAccountFound);
        if (!noAccountFound) {
          res.status(200).json(results.rows[0]["role_id"]);
        } else {
          res.status(203).json("Login failed");
        }
      } catch (err) {
        console.log("catch: " + err);
        res.status(204).json("Error Database" + err);
      }
    }
  );
};
const getAccounts = (req, res) => {
  pool.query(queries.getAccounts, (error, results) => {
    try {
      if (error) throw error;
      res.status(200).json(results.rows);
    } catch (err) {
      console.log("catch: " + err);
      res.status(204).json("Error Database" + err);
    }
  });
};
const getAccountById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getAccountById, [id], (error, results) => {
    try {
      if (error) throw error;
      res.status(200).json(results.rows);
    } catch (err) {
      console.log("catch: " + err);
      res.status(204).json("Error Database");
    }
  });
};
const addAccount = (req, res) => {
  const { login_name, display_name, pass_word, role_id } = req.body;
  //check if login name exists
  pool.query(queries.checkLoginExists, [login_name], (error, results) => {
    try {
      if (results.rows.length) {
        res.status(203).json("Login already exists.");
      } else {
        //add account to db
        pool.query(
          queries.addAccount,
          [login_name, display_name, pass_word, role_id],
          (error, results) => {
            if (error) throw error;
            res.status(201).send("Account created Successfully!");
          }
        );
      }
    } catch (err) {
      console.log("catch: " + err);
      res.status(204).json("Error Database");
    }
  });
};
const deleteAccountById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getAccountById, [id], (error, results) => {
    try {
      const noAccountFound = !results.rows.length;
      if (noAccountFound) {
        res.status(203).json("Account does not exist in the database");
      } else {
        pool.query(queries.deleteAccountById, [id], (error, results) => {
          if (error) throw error;
          res.status(200).send("Account deleted Successfully!");
        });
      }
    } catch (err) {
      console.log("catch: " + err);
      res.status(204).json("Error Database");
    }
  });
};
const updateAccount = (req, res) => {
  const id = parseInt(req.params.id);
  const { display_name, pass_word, role_id } = req.body;
  pool.query(queries.getAccountById, [id], (error, results) => {
    try {
      const noAccountFound = !results.rows.length;
      if (noAccountFound) {
        res.status(203).json("Account does not exist in the database");
      } else {
        pool.query(
          queries.updateAccount,
          [id, display_name, pass_word, role_id],
          (error, results) => {
            if (error) throw error;
            res.status(200).send("Account updated Successfully!");
          }
        );
      }
    } catch (err) {
      console.log("catch: " + err);
      res.status(204).json("Error Database");
    }
  });
};
module.exports = {
  getAuthentification,
  getAccounts,
  getAccountById,
  addAccount,
  deleteAccountById,
  updateAccount,
};
