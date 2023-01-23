import mysql from "mysql";
// var db = new SQL.Database();
const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "laravel",
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const sql = "INSERT INTO historial_empresas (nombre, valor, fecha) VALUES ('BBVA', 10, '2022-12-19 00:00:00')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});