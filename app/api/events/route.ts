import { apiGet, apiPost } from "../database";

/*
--- Database schema for HTTP requests ---
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT,
location VARCHAR(255),
event_date TIMESTAMP NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
slug TEXT UNIQUE NOT NULL
*/

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { title, description, location, event_date, slug } = body;

  const query = `INSERT INTO events(title, description, location, event_date, slug) VALUES (?, ?, ?, ?, ?)`;
  const values = [title, description, location, event_date, slug];

  let status, respBody;

  await apiPost(query, values)
    .then(() => {
      status = 200;
      respBody = { message: "Successfully created event" };
    })
    .catch((err) => {
      status = 400;
      respBody = err;
    });

  return Response.json(respBody, {
    status,
  });
}

export async function GET(req: Request, res: Response) {
  const query = `SELECT * FROM events`;

  let status, body;

  try {
    await apiGet(query)
      .then((res) => {
        status = 200;
        body = res;
      })
      .catch((err: Error) => {
        status = 400;
        body: {
          error: err;
        }
      });
    return Response.json(body, {
      status,
    });
  } catch (err: any) {}
}
