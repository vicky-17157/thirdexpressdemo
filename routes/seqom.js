const mysql = require('mysql2');
const express = require('express');
//const { Schema } = require('mongoose');
var router= express.Router();
//Configuring express server

router.use(express.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vicky@27',
    database: 'customer1',
    multipleStatements: true
    });

mysqlConnection.connect((err)=> {
        if(!err)
        console.log('Connection Established Successfully');
        else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
        });
router.get('/' , (req, res) => {
    mysqlConnection.query('select * from myemployee ;', (err, rows, fields) => {
    if (!err)
    res.send(rows);
    //return res.console.log(rows);    
    else
    console.log(err);
    })
    } );
  
//Router to GET specific item detail from the MySQL database
router.get('/:emplid' , (req, res) => {
    mysqlConnection.query('SELECT * from myemployee WHERE emplid = ?',[req.params.emplid], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );

router.get('/:insert' , (req, res) => {
    mysqlConnection.connect(function(err){
        if(err)throw err;
        var sqlInsert = "INSERT into myemployee(emplname,jobrole,city,dept_id) values('aditya','software developer','noida',3)"
        mysqlConnection.query(sqlInsert, (err, result) => {
            res.send("1 entry added");
        })
    })
});

router.get('/delete/:emplid' , (req, res) => {
    var empl = req.params.emplid;
    var sqlDelete = "DELETE FROM myemployee WHERE emplid = ? " 
        mysqlConnection.query(sqlDelete, empl, (err, result) => {
            if (err) console.log(err);
        })
    });

router.get('/update/:emplid' , (req, res) => {
    var empl = req.params.emplid;
    var name = req.params.empname;
    var sqlUpdate = "UPDATE SET myemployee empname = ? WHERE emplid= ?";
    mysqlConnection.query(sqlUpdate, [name, empl],  (err, result) => {
        if (err) console.log(err);
    });
});




module.exports=router;