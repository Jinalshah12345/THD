const express = require('express');

const cors = require('cors');
const Joi = require('joi');
const mysql = require('mysql2');
const { response } = require('express');

const nodemailer  = require('nodemailer');


const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {}
}));

const app = express();

app.use(cors());

app.use(express.json());


const db = mysql.createConnection({
    
    host: "34.121.38.21",
    user: "root",
    database: "posts",
    password: "root",
    //socketPath: `/cloudsql/${'trial-331402:us-central1:trial'}`,
    // port: 3306,
    multipleStatements: true
});

// const DB_HOST = process.env.DB_HOST;
// const DB_USER = process.env.DB_USER;
// const DB_PASS = process.env.DB_PASS;
// const DB_NAME = process.env.DB_NAME;

// const db = mysql.createConnection({
//         socketPath: "/cloudsql/trial-331402:us-central1:trial",
//         host: "34.121.38.21",
//         user: DB_USER,
//         database: DB_NAME,
//         password: DB_PASS,
//         port: 3306,
//         multipleStatements: true
// });


//check database connection

db.connect(err=>{
    if(err) {
        console.log('error');
} console.log('database connected');
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});
// app.listen(3000,()=>console.log('server running at port 3000'));



app.get('/user',(req,res)=>{
    
   
    let qr = `select * from users`;

    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    

    db.query(qr,(err,result)=>{
        
        if(err){
            console.log(err,'err');
        }

        if(result.length>0){
            res.send({
                message: 'all user data',
                data:result
            });
        }
    });
});
    
app.get('/user/:id',(req,res)=>{
      
    let gID = req.params.id;

    let qr = `select * from users where id = ${gID}`;

    db.query(qr,(err,result)=>{
       
        if(err){
            console.log(err);
        }

        if(result.length>0){
            res.send({
                message: 'get single data',
                data:result
            });
        }
          else{
              res.send({
                  message: 'data not found'
              });
          }
    });

});

//create data using original

app.post('/user',(req,res)=>{

    let Name = req.body.name;
    let Email = req.body.email;
    let Username = req.body.username;
    let Password = req.body.password;
    let Contact = req.body.contact;
    let State = req.body.state;


    data = req.body

    const schema = Joi.object({
        name: Joi.string().required().max(15),
        username: Joi.string().required().max(15),
        email: Joi.string()
          .email()
          .pattern(new RegExp("^[a-zA-Z0-9]+@miraclesoft.com$"))
          .required(),
        password: Joi.string().required().min(7),
        contact: Joi.number().required().min(10),
        state: Joi.string().required().min(10)
      });
    
      const { value, err } = schema.validate(data);
      const pass = schema.validate(data);
  if (pass.error) {
    console.log(pass.error);

    res.status(400).send({ status: "error", error: pass.error });
  } else {

    var transporter = nodemailer.createTransport({
        host: "smtp.miraclesoft.com",
        port: 587,
        auth: {
        user: "jshah@miraclesoft.com",
        pass: "GanpatiBappa12345@",
        },
        });
        
        const message = {
        from: "jshah@miraclesoft.com",
        to: "jshah@miraclesoft.com",
        
        // to: ${options.userEmail},
        subject: "User Registered Successfully",
        text:" Greetings!! Username Registered with name: " +
        data.name +
        
        "Email Address: " +
        data.email + 

        " and username: " +
        data.username,
        
        };
        
        transporter.sendMail(message, function (error, info) {
        if (error) {
        console.log(error);
        
        } else {
        console.log("Email sent: " + info.response);
        }
        });

    
        // y2ukqArLHa02hu9p
    



    let qr = `insert into users(name,email,username,password,contact,state) 
              values('${Name}','${Email}','${Username}','${Password}','${Contact}', '${State}')`;

    
   db.query(qr,(err,result)=>{

     if(err) {
         console.log(err);
     }
      
     console.log(result,'result')
     res.send({
         message: 'data inserted',

     });

   });
}

});

//update single data

app.put('/user/:id',(req,res)=>{

    let gID = req.params.id;

    let Name = req.body.name;
    let Email = req.body.email;
    let Username = req.body.username;
    let Password = req.body.password;
    let Contact = req.body.contact;
    let State = req.body.state;

    let qr = `update users set name = '${Name}', email = '${Email}', username = '${Username}', password = '${Password}', contact = '${Contact}', state ='${State}'
              where id = ${gID}`;

              db.query(qr,(err,result)=>{

                if(err){
                    console.log(err);
                }

                res.send({
                    message: 'data updated',
                });

              });


});


//delete single data

app.delete('/user/:id',(req,res)=>{

    let qID = req.params.id;

    let qr = `delete from users where id = '${qID}'`;
    db.query(qr,(err,result)=>{

        if(err){
            console.log(err);
        }

        res.send({
            message: 'data deleted'
        })

    });
});

//post using stored procedure

app.post('/user/test',(req,res)=>{
    let emp = req.body;
    var qr = "SET @id = ?; SET @name = ?; SET @email = ?; SET @username = ?; SET @password = ?; SET @contact = ?; \
    CALL UserAddOrEdit(@id,@name,@email,@username,@password,@contact);";
    db.query(qr,[emp.id,emp.name,emp.email,emp.username,emp.password,emp.contact],(err,rows,fields)=>{
        if(!err)
        rows.forEach(element => {
            if(element.constructor == Array)
            res.send('Inserted Employee ID: '+element[0].id);
            
        });
        else
        console.log(err);
    })
});

    