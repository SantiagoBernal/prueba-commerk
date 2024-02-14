const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('./db/connection.js')

const app = express()
const port = 5500;
app.use(express.json())
// app.use(cors());
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
  app.use(cors(corsOptions));


//Registration Endpoint
app.post('/register', async (req, res) => {
    const { username, password, email, last_name, position_company, phone_number } = req.body;

    //Hash the Password
    const hashedPassword = await bcrypt.hash(password, 10)
    // console.log(hashedPassword);
    // console.log("Usuario",username,email,last_name, position_company, phone_number);
    

    const sql = 'INSERT INTO users (username, password, email, last_name, position_company, phone_number ) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [username, hashedPassword, email, last_name, position_company, phone_number], (err, result) => {
        if (err) {
            console.log("Error In Registration: " + err)
        } else {
            res.json({ message: "Registration successful" });
        }
    })
});

//Login Endpoint

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    //Check if username and password are present
    if (!email || !password) {
        return res.status(400).json({ message: 'email and Password are Required' });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, result) => {
        if (err || result.length === 0) {
            console.log("Error Searching for email: " + err)
            res.status(404).json({ message: "No username found" })
        } else {
            //compare hashed password
            const match = await bcrypt.compare(password, result[0].password);
            if (match) {
                //create a jwt token
                const token = jwt.sign({ userId: result[0].id }, 'my_secret_key', { expiresIn: '1h' });
                res.json({ message: 'Login Successful', token })
            } else {
                res.status(401).json({ message: 'Invalid Password' })
            }
        }
    })
});


//Authentication Middleware using JWT
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    console.log("Unextracted Token: " + token)

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    const extractedToken = token.split(' ')[1];
    console.log('Actual TOken: ' + extractedToken)

    try {
        // /verift and validate our token
        const decoded = jwt.verify(extractedToken, 'my_secret_key')
        req.userId = decoded.userId;
        next();

    } catch (err) {
        res.status(401).json({ message: "Invalid Token" })
    }
}

app.get('/profile', authenticate, (req, res)=>{
    const userId = req.userId;
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [userId], (err, result)=>{
        if (err || result.length === 0) {
            res.status(500).json({message: "Error Fetching Details"})
        }else{
            res.json({usuario: result[0]});
        }
    })
});

app.put('/edit', (req, res) => {
    // console.log("req",req)
    const { id } = req.body;
    const { username } = req.body;
    const { last_name } = req.body;
    const { position_company } = req.body;
    const { phone_number } = req.body;

    let sql = "UPDATE users SET username = ?, last_name = ?, position_company = ? , phone_number = ? WHERE id = ?";
    db.query(sql, [username, last_name, position_company, phone_number, id], (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
            console.log(result);
        }
    })
});

// Product LIst endpont
app.get('/products', (req, res)=>{
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, result)=>{
        if(err){
            res.status(500).json({message: 'Error Fetching Products'})
        }else{
            res.json(result);
        }
    })
})

// Product task endpoint
app.post("/task", (req, res) => {
    //console.log("req post task",req.body)
    const { username } = req.body;
    const { name_task } = req.body;
    const { email } = req.body;
    const { amount } = req.body;
    const { date } = req.body;

    let sql = "INSERT INTO task (username, name_task, email, amount, date) VALUES (?,?,?,?,?)"
    db.query(sql, [username, name_task, email, amount, date], (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            console.log(result);
        }
    })
});

app.put("/editTask", (req, res) => {
    //console.log("req edit task",req.body)
    const { id } = req.body;
    const { name_task } = req.body;
    const { amount } = req.body;
   

    let sql = "UPDATE task SET name_task = ?, amount = ? WHERE id = ?";
    db.query(sql, [name_task, amount, id], (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

app.delete("/delete/:index", (req,res) =>{
    const { index } = req.params

    let sql = "DELETE FROM task WHERE id = ?"
    db.query(sql, [index], (err,result) =>{err ? console.log(err) : res.send(result)})
})

// Product task endpont
app.get('/task', (req, res)=>{
    const sql = 'SELECT * FROM task';
    db.query(sql, (err, result)=>{
        if(err){
            res.status(500).json({message: 'Error Fetching Products'})
        }else{
            res.json(result);
        }
    })
})


app.listen(port, () => {
    console.log('Server is running ✌🏾')
})