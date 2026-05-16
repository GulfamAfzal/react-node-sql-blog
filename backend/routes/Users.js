const express = require("express");
const router = express.Router();
const sql = require("mssql");

// Authentication state route for frontend validation checkpoint
router.get("/auth", async (req, res) => {
    res.json({ status: true, username: "DevOpsUser", id: 1 });
});

// User Registration Endpoint
router.post("/", async (req, res) => {
    const { username, password } = req.body;
    try {
        await sql.query`
            INSERT INTO Users (username, password, createdAt) 
            VALUES (${username}, ${password}, GETDATE())
        `;
        res.json("SUCCESS");
    } catch (err) {
        console.error("MSSQL Registration Exception:", err.message);
        res.status(500).json({ error: "Username might already be taken.", details: err.message });
    }
});

// Login Verification Endpoint
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await sql.query`SELECT id, username, password FROM Users WHERE username = ${username}`;
        
        // Validation check for empty match
        if (result.recordset.length === 0) {
            return res.json({ error: "User Doesn't Exist" });
        }

        // Safely pull first element index
        const user = result.recordset[0];

        if (password !== user.password) {
            return res.json({ error: "Wrong Username and Password Combination" });
        }

        res.json({ token: "authenticated-session-key", username: user.username, id: user.id });
    } catch (err) {
        console.error("MSSQL Auth Exception:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;