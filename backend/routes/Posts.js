const express = require("express");
const router = express.Router();
const sql = require("mssql");

// GET all posts
router.get("/", async (req, res) => {
    try {
        // MSSQL requires explicitly fetching column identifiers (no wildcard '*')
        const result = await sql.query`SELECT id, title, postText, username, image, UserId, createdAt FROM Posts`;
        res.json({ listOfPosts: result.recordset });
    } catch (err) {
        console.error("MSSQL Fetch Exception:", err.message);
        res.status(500).json({ error: "Failed to fetch posts from cloud database.", details: err.message });
    }
});

// POST a new post
router.post("/", async (req, res) => {
    const { title, postText, username, image, UserId } = req.body;
    try {
        // Parameterized insertion query with template literals to prevent SQL Injection
        await sql.query`
            INSERT INTO Posts (title, postText, username, image, UserId, createdAt) 
            VALUES (${title}, ${postText}, ${username}, ${image}, ${UserId}, GETDATE())
        `;
        res.json({ success: "Post created successfully!" });
    } catch (err) {
        console.error("MSSQL Insertion Exception:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;