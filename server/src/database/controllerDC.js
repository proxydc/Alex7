const pool = require("../../db");
const queries = require("./queries");
const docTemplate = require("./documentTemplate");
const dcStatus = 1;
const getDCs = (req, res) => {
  pool.query(queries.getDCs, (error, results) => {
    try {
      if (error) throw error;
      res.status(200).json(results.rows);
    } catch (err) {
      console.log("catch: " + err);
      res.status(204).json("Error Database");
    }
  });
};
const getDCById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.getDCById, [id], (error, results) => {
    try {
      if (error) throw error;
      res.status(200).json(results.rows);
    } catch (err) {
      console.log("catch: " + err);
      res.status(204).json("Error Database");
    }
  });
};
const getDCByIdCandidat = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getDCById, [id], (error, results) => {
      if (error) throw error;
      if (results.rows[0].dc_status == 1 && results.rows[0].dc_status == 2) {
        res.status(200).json(results.rows);
      } else {
        res.status(203).json("Access denied!");
      }
    });
  } catch (err) {
    console.log("catch: " + err);
    res.status(204).json("Error Database");
  }
};
const getDCDocById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getDCDocById, [id], (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows[0]);
    });
  } catch (err) {
    console.log("catch: " + err);
    res.status(204).json("Error Database");
  }
};
const addDC = (req, res) => {
  const { familyname, firstname, email } = req.body;
  try {
    //check if DC exists
    pool.query(queries.checkDCExists, [email], (error, results) => {
      if (error) throw error;
      if (results.rows.length) {
        res.status(203).send("Candidat already exists.");
      } else {
        //add DC to db
        let initialDocument = docTemplate.GetDocTemp(
          familyname,
          firstname,
          email
        );
        pool.query(
          queries.addDC,
          [familyname, firstname, email, dcStatus, initialDocument],
          (error, results) => {
            if (error) throw error;
            res.status(201).send("Candidat created Successfully!");
          }
        );
      }
    });
  } catch (err) {
    console.log("catch: " + err);
    res.status(204).json("Error Database");
  }
};

const deleteDCById = (req, res) => {
  try {
    const id = req.params.id;
    pool.query(queries.getDCById, [id], (error, results) => {
      const noDCFound = !results.rows.length;
      if (noDCFound) {
        res.status(203).send("Candidat does not exist in the database");
      } else {
        pool.query(queries.deleteDCById, [id], (error, results) => {
          if (error) throw error;
          res.status(201).send("Candidat deleted Successfully!");
        });
      }
    });
  } catch (err) {
    console.log("catch: " + err);
    res.status(204).json("Error Database");
  }
};

const updateDCDoc = (req, res) => {
  try {
    const id = req.params.id;
    const { dc_status, document } = req.body;
    pool.query(queries.getDCById, [id], (error, results) => {
      const noDCFound = !results.rows.length;
      if (noDCFound) {
        res.status(203).send("Candidat does not exist in the database");
      } else {
        pool.query(
          queries.updateDCDoc,
          [id, document, dc_status],
          (error, results) => {
            if (error) throw error;
            res.status(201).send("Candidat updated Successfully!");
          }
        );
      }
    });
  } catch (err) {
    console.log("catch: " + err);
    res.status(204).json("Error Database");
  }
};
const updateDCByAdmin = (req, res) => {
  try {
    const id = req.params.id;
    const { familyname, firstname, email, dc_status, tags } = req.body;
    pool.query(queries.getDCById, [id], (error, results) => {
      const noDCFound = !results.rows.length;
      if (noDCFound) {
        res.status(203).send("Candidat does not exist in the database");
      } else {
        pool.query(
          queries.updateDCByAdmin,
          [id, familyname, firstname, email, dc_status, tags],
          (error, results) => {
            if (error) throw error;
            res.status(201).send("Candidat updated Successfully!");
          }
        );
      }
    });
  } catch (err) {
    console.log("catch: " + err);
    res.status(204).json("Error Database");
  }
};

const getAllDcStatus = (req, res) => {
  try {
    pool.query(queries.getAllDcStatus, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log("catch: " + err);
    res.status(204).json("Error Database");
  }
};

module.exports = {
  getDCs,
  getDCById,
  getDCByIdCandidat,
  getDCDocById,
  addDC,
  updateDCDoc,
  updateDCByAdmin,
  deleteDCById,
  getAllDcStatus,
};
