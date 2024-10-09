import mysql from "mysql";

export const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
});
/*
pool.getConnection((err, connection) => {
  if (err) {
    return console.log("err : " + err.stack);
  }
  console.log("Connected to database successfully");
  connection.release();
});

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
});

db.connect((err) => {
  if (err) {
    console.log("Error while connection to databse : " + err.stack);
    return;
  }
  console.log("Connected to MySQl database");
});

db.end((err) => {
  if (err) throw err;
  console.log("Connection closed.");
});*/
