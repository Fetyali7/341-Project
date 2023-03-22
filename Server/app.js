const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors");

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'mak_database',
//   socketPath: '/var/run/mysqld/mysqld.sock',         // This is only needed for my chromebook
});

app.use(cors());
app.use(express.json());

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});
/**For Login and accessing pages */
app.get("/UserLogin", (req, res) => {
    const sqlSelect = "SELECT * FROM UserLogin";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post("/insertUserLogin", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const apliemp = req.body.apliemp;

    const sqlInsert = "INSERT INTO UserLogin (username, password, email, apliemp) VALUES (?,?,?,?)";
    db.query(sqlInsert, [username, password, email, apliemp], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
});
app.delete("/deleteUserLogin/:idUserLogin", (req, res) => {
    const id = req.params.idUserLogin;
    const sqlDelete = "DELETE from UserLogin WHERE idUserLogin = ?";

    db.query(sqlDelete, id, (err, result) => {
        if (err){ console.log(err);}
    })

}) 

/**FOR SIGNUP**/
app.get("/userSu", (req, res) => {
    const sqlSelect = "SELECT * FROM userSu";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post("/insertUserSu", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const apliemp = req.body.apliemp;

    const sqlInsert = "INSERT INTO userSu (username, password, email, apliemp) VALUES (?,?,?,?)";
    db.query(sqlInsert, [username, password, email, apliemp], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
});


/**FOR JobPostings**/
app.delete("/deleteJobPostings/:idJobPostings", (req, res) => {
    const id = req.params.idJobPostings;
    const sqlDelete = "DELETE from jobpostings WHERE idJobPostings = ?";

    db.query(sqlDelete, id, (err, result) => {
        if (err){ console.log(err);}
    })

}) 

app.get("/JobPostings", (req, res) => {
    const sqlSelect = "SELECT * FROM jobpostings";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post("/insertJobPosting", (req,res) => {
    const companyName = req.body.companyName;
    const phoneNumber = req.body.phoneNumber;
    const employerName = req.body.employerName;
    const jobDescription = req.body.jobDescription;
    const location = req.body.location;
    const Employer = req.body.Employer;

    const sqlInsert = "INSERT INTO jobpostings (companyName, phoneNumber, employerName, jobDescription, location, Employer) VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert, [companyName, phoneNumber, employerName, jobDescription, location, Employer], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
});

app.put("/update", (req, res) => {
    const companyName = req.body.companyName;
    const phoneNumber = req.body.phoneNumber;
    const employerName = req.body.employerName;
    const jobDescription = req.body.jobDescription;
    const location = req.body.location;
    const id = req.body.id;
    
    const sqlEdit =  "UPDATE jobpostings SET companyName = ?, phoneNumber = ?, employerName = ?, jobDescription = ?, location = ? WHERE idJobPostings = ?";

    db.query(sqlEdit, [companyName, phoneNumber, employerName, jobDescription, location, id], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

app.listen(3001, () => {
    console.log("Running on port 3001");
})