import mysql from "mysql2/promise";
import cron from "node-cron";

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "stocks",
    password: "stocks",
    database: "stocks",
    connectionLimit: 10,
});

const ids = [1,2,3,4,5,6,7,8,9,10];

const volatility = 0.02;

const f = (old_price) => {
    const rnd = Math.random() - 0.498;
    const change_percent = 2 * volatility * rnd;
    const change_amount = old_price * change_percent;
    const new_price = old_price + change_amount;

    if (new_price < 0.01) return new_price + Math.abs(change_amount) * 2;
    else if (new_price > 1000) return new_price - Math.abs(change_amount) * 2;

    return new_price;
};


const unfold = (seed, fn, n) => {
    let result = [];
    for (let i = 0; i < n; i++) {
        seed = fn(seed);
        result.push(seed);
    }
    return result;
};
const generateData = () => unfold(100, f, 1);

const generateCompanyData = (id) => {
    return generateData().map((price, offset) => [
        id,
        price,
        new Date(),
    ]);
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

const insertCompanyData = async (id) => {
    const data = generateCompanyData(id);
    console.log(data)
    await withConnection(async (con) => {
        const query = `INSERT INTO historial_empresas (id_empresa, valor, fecha) VALUES ?`;
        await con.query(query, [data]);
    });
};

const insertCompaniesData = async () => {
    // const ids = companies.map((_, id) => id);
    const inserts = ids.map((id) => insertCompanyData(id));
    await Promise.all(inserts);
};

try {
    // await createDb();
    // await insertCompanies()
    cron.schedule("* * * * * ",() =>{
         insertCompaniesData();
         console.log("insetado a fecha:" +new Date());
    });
} catch (e) {
    console.error(e)
}