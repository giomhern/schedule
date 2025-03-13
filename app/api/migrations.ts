import { db } from "./database";

export const migrate = () => {
  db.serialize(() => {
    db.run(
      `
            CREATE TABLE events (
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

migrate()