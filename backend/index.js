const express = require("express");
const app = express();
const cors = require("cors");
const sql = require("mssql");
require("dotenv").config();

// Middleware Setup
app.use(cors());
app.use(express.json());
app.use("/Images", express.static("./Images"));

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

// Secure Azure SQL Connection Pool configuration
const dbConfig = {
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 1433,
    options: {
        encrypt: true,
        trustServerCertificate: false
    },
    pool: { max: 10, min: 0, idleTimeoutMillis: 30000 }
};


// Create a globally accessible connection lifecycle pool
async function initializeServer() {
    try {
        // Creating a global pool attaches connection context natively to sql.query calls
        await sql.connect(dbConfig);
        console.log("Successfully authenticated and connected to Azure SQL Database Pool!");

        const PORT = process.env.PORT || 3001;
        // The Express server is called ONLY AFTER the DB pool has successfully resolved
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Critical database pool connection error:", err);
        setTimeout(initializeServer, 5000);
    }
}

// Start Server and Database Pool concurrently 
initializeServer();