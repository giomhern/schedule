import { db } from "./database";

export const migrate = () => {
  db.serialize(() => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        location VARCHAR(255) NOT NULL,
        date TEXT NOT NULL CHECK (date LIKE '____-__-__'),  
        time TEXT NOT NULL CHECK (time LIKE '__:__'),    
        comments TEXT DEFAULT NULL  
      );
      `
    ),
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log("Events table created successfully!");
      };
  });
};

export const runMigrations = () => {
  db.serialize(() => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        emailId TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
      `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log("Users table created successfully.");
      }
    );
  });
};


migrate()