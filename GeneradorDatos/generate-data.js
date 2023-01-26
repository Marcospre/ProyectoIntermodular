import mysql from "mysql2/promise";
import cron from "node-cron";
const NOW = new Date(new Date().setSeconds(0));

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "stocks",
    password: "stocks",
    database: "stocks",
    connectionLimit: 10,
});

// const createDb = async () => {
//     try {
//         const con = await pool.getConnection();
//         await con.query("DROP TABLE IF EXISTS companies, stocks cascade");
//         await con.query(
//             "CREATE TABLE companies (id INT PRIMARY KEY, name VARCHAR(255))"
//         );
//         await con.query(
//             "CREATE TABLE stocks (company_id INT, price FLOAT, date DATETIME)"
//         );

//         con.release();
//     } catch (err) {
//         console.log(err);
//     }
//     console.log("Database created");
// };

const companies = [
    "bbva",
    "santander",
    "repsol",
    "iberdrola",
    "inditex",
    "caixabank",
    "cellnex",
    "naturgy",
    "telefonica",
    "ferrovial",
];

const ids = [1,2,3,4,5,6,7,8,9,10];

// const insertCompanies = async () => {
//     await createDb();

//     try {
//         const con = await pool.getConnection();

//         let values = companies
//             .map((name, id) => `(${id}, '${name}')`)
//             .join(",");
//         await con.query(`INSERT INTO companies (id, name) VALUES ${values}`);
//         con.release();
//         return companies.length;
//     } catch (err) {
//         console.log(err);
//     }
//     console.log("Companies inserted");
// };

// const volatility = 0.02;

const f = (old_price,volatility) => {
    const rnd = Math.random() - 0.498;
    const change_percent = 2 * volatility * rnd;
    const change_amount = old_price * change_percent;
    const new_price = old_price + change_amount;

    if (new_price < 0.01) return new_price + Math.abs(change_amount) * 2;
    else if (new_price > 1000) return new_price - Math.abs(change_amount) * 2;

    return new_price;
};
const getCompaniesCount = async () => {
    const con = await pool.getConnection();
    const [rows] = await con.query("SELECT COUNT(*) FROM empresas");
    con.release();
    return rows[0]["COUNT(*)"];
};

let seed = 100;

const unfold = (seed, fn, n) => {
    let result = [];
    if(n != 1){
        for (let i = 0; i < n; i++) {
            result.push(seed);
            seed = fn(seed,0.02);
        }
    }else{
        for (let i = 0; i < n; i++) {
            seed = fn(seed,0.3);
            result.push(seed);
        }
    }
    return result;
};

const ENTRIES_PER_COMPANY = 45000;

const generateData = (number) => unfold(100, f, number);

const generateCompanyData = (id,number) => {

    if(number != 1){
        return generateData(number).map((price, offset) => [
            id,
            price,
            substractMinutesFromDate(NOW, ENTRIES_PER_COMPANY - offset + 1),
        ]);
    }else{
        return generateData(number).map((price, offset) => [
            id,
            price,
            new Date(),
        ]);
    }
};

const substractMinutesFromDate = (date, minutes) => {
    return new Date(date.getTime() - minutes * 60000);
};

const withConnection = async (fn) => {
    try {
        const con = await pool.getConnection();
        await fn(con);
        con.release();
    } catch (e) {
        console.error(e)
    }
};

const insertCompanyData = async (id,number) => {
    const data = generateCompanyData(id,number);
    console.log(data)
    await withConnection(async (con) => {
        const query = `INSERT INTO historial_empresas (id_empresa, valor, fecha) VALUES ?`;
        await con.query(query, [data]);
        if(number == 1){
            const query1 = `update actuales set datos = ?, fecha = ? where id = ?`;
            data.forEach(async ele=>{
                await con.query(query1,[ele[1],ele[2],ele[0]]);
            })
        }
    });
};

const insertCompaniesData = async (number) => {
    // const ids = companies.map((_, id) => id);
    const inserts = ids.map((id) => insertCompanyData(id,number));
    await Promise.all(inserts);
};



// console.time("Benchmark");

try {
    // await createDb();
    // await insertCompanies()
    await insertCompaniesData(ENTRIES_PER_COMPANY);
    cron.schedule("* * * * * ",() =>{
        insertCompaniesData(1);
        console.log("insertado a fecha: " +new Date());
   });
} catch (e) {
    console.error(e)
}

// console.timeEnd("Benchmark");

// process.exit()
