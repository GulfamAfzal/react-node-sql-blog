const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
    const { PostId, UserId } = req.body;
    try {
        // Look up if a record exists in Likes table matching criteria
        const checkLike = await sql.query`
            SELECT id FROM Likes WHERE PostId = ${PostId} AND UserId = ${UserId}
        `;

        if (checkLike.recordset.length === 0) {
            await sql.query`INSERT INTO Likes (PostId, UserId) VALUES (${PostId}, ${UserId})`;
            res.json({ liked: true });
        } else {
            await sql.query`DELETE FROM Likes WHERE PostId = ${PostId} AND UserId = ${UserId}`;
            res.json({ liked: false });
        }
    } catch (err) {
        console.error("MSSQL Likes Exception:", err.message);
        res.status(500).json({ error: "Like processing transaction failed.", details: err.message });
    }
});

module.exports = router;