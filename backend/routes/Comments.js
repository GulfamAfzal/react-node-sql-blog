const express = require("express");
const router = express.Router();
const sql = require("mssql");

// GET comments for a specific post
router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    try {
        const result = await sql.query`SELECT id, commentBody, PostId, username, createdAt FROM Comments WHERE PostId = ${postId}`;
        res.json(result.recordset);
    } catch (err) {
        console.error("MSSQL Comments Fetch Exception:", err.message);
        res.status(500).json({ error: "Failed to fetch comments.", details: err.message });
    }
});

// POST a comment
router.post("/", async (req, res) => {
    const { commentBody, PostId, username } = req.body;
    try {
        await sql.query`
            INSERT INTO Comments (commentBody, PostId, username, createdAt) 
            VALUES (${commentBody}, ${PostId}, ${username}, GETDATE())
        `;
        res.json({ success: "Comment added successfully!" });
    } catch (err) {
        console.error("MSSQL Comment Insertion Exception:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;