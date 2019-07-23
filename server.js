const mysql = require('mysql');
const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 4000


//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});

app.get('/employees', (req, res) => {
  mysqlConnection.query('SELECT * FROM Employee', 
    (err,rows,field) => {
    if (!err) res.send(rows);
    else console.log(err);

  });

app.get('/employees/:id', (req, res) => {
  mysqlConnection.query('SELECT * FROM Employee WHERE EmpID =?', 
  [req.params.id], 
  (err,rows,field) => {
    if (!err) res.send(rows);
    else console.log(err);
  
  });

  app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query(
      'Delete FROM Employee WHERE EmpID =?', 
    [req.params.id], 
    (err,rows,field) => {
      if (!err) res.send('Deleted Successfully');
      else console.log(err);
   
});

// app.post('/employees', (req, res)=> {
//   let emp =req.body;
//   let sql ='SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary =?; \
//     CALL EmployeeAndOrEdit(@EmpID, @Name, @EmpCode, @Salary);';
//     mysqlConnection.query(
//       sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
//       [req.params.id],
//       (err, rows, field) => {
//         if(!err) res.send(rows);
//         else console.log(err);
//       }
//     );
// })

const mysqlConnection = mysql.createConnection({
host: '10.9.3.218',
user: 'TWStudent',
password: 'TechWorks!',
database: 'employeedb',
multipleStatements: true
});

mysqlConnection.connect(err =>{
  if (!err) console.log('DB connection succeeded');
  else {
    console.log(
      `DB connection failed Error: ` + JSON.stringify(err, undefined, 2)
    );
  }
})