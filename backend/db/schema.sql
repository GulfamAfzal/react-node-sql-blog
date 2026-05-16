-- 1. Create the Users Table
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME2 DEFAULT GETDATE()
);

-- 2. Create the Posts Table
CREATE TABLE Posts (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    postText TEXT NOT NULL,
    username VARCHAR(255) NOT NULL,
    UserId INT NOT NULL,
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT FK_UserPost FOREIGN KEY (UserId) REFERENCES Users(id) ON DELETE CASCADE
);

-- 3. Create the Comments Table (Optional but standard for this repo)
CREATE TABLE Comments (
    id INT IDENTITY(1,1) PRIMARY KEY,
    commentBody TEXT NOT NULL,
    username VARCHAR(255) NOT NULL,
    PostId INT NOT NULL,
    createdAt DATETIME2 DEFAULT GETDATE(),
    updatedAt DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT FK_PostComment FOREIGN KEY (PostId) REFERENCES Posts(id) ON DELETE CASCADE
);