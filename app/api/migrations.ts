import { db } from "./database";

export const migrate = () => {
  db.serialize(() => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS events (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255),
          description TEXT,
          location VARCHAR(255),
          event_date TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
          slug TEXT
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