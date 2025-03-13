import { db } from "./database";

export const migrate = () => {
  db.serialize(() => {
    db.run(
      `
            CREATE TABLE events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                location VARCHAR(255),
                event_date TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
                slug TEXT UNIQUE NOT NULL
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