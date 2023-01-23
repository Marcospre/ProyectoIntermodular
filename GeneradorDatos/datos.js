
function generarDatos(cantidad){
    const volatility = 0.02;
    const f = (old_price) => {
    const rnd = Math.random() - 0.4982; // generate number, 0 <= x < 1.0
    const change_percent = 2 * volatility * rnd;
    const change_amount = old_price * change_percent;

    const new_price = old_price + change_amount;

    if (new_price < 0.01) return new_price + Math.abs(change_amount) * 2;
    else if (new_price > 1000) return new_price - Math.abs(change_amount) * 2;

    return new_price;
    };

    let seed = 30;
    for (let i = 0; i < cantidad; i++) {
    seed = f(seed);
    console.log(seed);
    }
}

/************************************************************************************* */
import mysql from "mysql";
// var db = new SQL.Database();
const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "laravel",
});

const ENTRIES_PER_STOCK = 50000;
const PARAM_LIMIT = 65536;
const PARAMS_PER_ENTRY = 3;
const ENTRIES_PER_INSERT = PARAM_LIMIT / PARAMS_PER_ENTRY;

con.connect(function (err) {
 
  if (err) throw err;

  const query = "INSERT INTO historial_empresas (id_empresa, valor, fecha) VALUES ?";
  const now = new Date().setSeconds(0);
 
  // const stocks = [
  //   "BBVA",
  //   "CaixaBank",
  //   "Cellnex",
  //   "Ferrovial",
  //   "Iberdrola",
  //   "Inditex",
  //   "Naturgy",
  //   "Repsol",
  //   "Santander",
  //   "Telefonica",
  // ];

  const stocks = [1,2,3,4,5,6,7,8,9,10];

  for (const stock of stocks) {
    const data = generateStockData().map((data, i) => {
      return [
        stock,
        data,
        substractMinutesFromDate(now, ENTRIES_PER_STOCK - i),
    ];
    });
    
    times(ENTRIES_PER_INSERT, (i) => {

      const bulk =data.slice(PARAM_LIMIT * i, PARAM_LIMIT * (i + 1));
      
      con.query(query,`(${bulk})`, function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
  
    });
    
     console.log(data);
  }
  
});

const volatility = 0.02;
const generateData = (old_price) => {
  const rnd = Math.random() - 0.4982; // generate number, 0 <= x < 1.0
  const change_percent = 2 * volatility * rnd;
  const change_amount = old_price * change_percent;

  const new_price = old_price + change_amount;

  if (new_price < 0.01) return new_price + Math.abs(change_amount) * 2;
  else if (new_price > 1000) return new_price - Math.abs(change_amount) * 2;

  return new_price;
};

const generateStockData = () => {
  return unfold(generateData, 10, ENTRIES_PER_STOCK);
};

const unfold = (fn, seed, count) => {
  const arr = [];
  let current = seed;
  for (let i = 0; i < count; i++) {
    arr.push(current);
    current = fn(current);
  }

  return arr;
};

const times = (n, fn) => {
  for (let i = 0; i < n; i++) {
    fn(i);
  }
};

const MS_IN_MINUTE = 60000;
const substractMinutesFromDate = (date, minutes) => {
    let fecha =new Date(date - MS_IN_MINUTE * minutes);
     fecha=fecha.toISOString().split("T")[0]+" 00:00:00";
    // // console.log(fecha.toISOString().split("T")[0]+" 00:00:00");
    return fecha;
};
