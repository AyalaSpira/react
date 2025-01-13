import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../db/db.json');

// רישום משתמש חדש
router.post('/register', (req, res) => {
   console.log("Request body:", req.body);
    const { name, password } = req.body;
    const db = JSON.parse(fs.readFileSync(dbPath));

    if (db.users.find(user => user.name === name)) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = {
        id: Date.now(),
        name,
        password  // במציאות – להצפין סיסמא
    };

    db.users.push(newUser);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
});

// התחברות
router.post('/login', (req, res) => {
    console.log("Request body:", req.body);

    const { name, password } = req.body;
    const db = JSON.parse(fs.readFileSync(dbPath));
    console.log(req);

    const user = db.users.find(user => user.password === password && user.name === name);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
});

router.put('/', authMiddleware, (req, res) => {
    
    const { name, lname, email, phone, addres } = req.body;
    const id = parseInt(req.headers['user-id']); 
    
    const db = JSON.parse(fs.readFileSync(dbPath));
    const user = db.users.find(user => user.id === id);
    console.log(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    user.name = name;
    user.lastName = lname;
    user.email = email;
    user.address = addres;
    user.phone = phone;
    
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(user);
});

export default router