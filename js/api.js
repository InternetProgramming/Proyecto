const bodyParser = require('body-parser');
var multer  = require('multer')();
var fs = require('fs'); 
var JSFtp = require("jsftp");
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json());

var serviceAccount = require("./schoolNoteKey.json");
const { join } = require("path");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://school-note-b5b4c.firebaseio.com"
})
const port = 1711;
const base = '/api/';
const filesPath = "/htdocs/user-files/"
const filesURL = "http://schoolnote.infinityfreeapp.com/user-files/"
const dbConfigAmazon = {
    server: 'schoolnotev3.cfbntdcyzzy0.us-east-2.rds.amazonaws.com',
    user: 'adminSN', //update me
    password: 'SchoolNote2020',
    database: 'schoolNoteV3',
    port: 1433
};
async function connectDB() {
    try {
        const pool = new sql.ConnectionPool(dbConfigAmazon);
        await pool.connect();
        return pool;
    }
    catch (err) {
        console.log('Database connection failed!', err);
        return err;
    }
}
app.post(base + 'addScore', async (req, res) => {
        const schema = {
            name: Joi.string().required(),
            score: Joi.string().required()
        };
        const { error } = Joi.validate(req.body, schema);
        if (error)
            return res.status(400).json({success: 0, message: "No se estan enviando los parámetros necesarios" });
        const db = await connectDB();
        try {
                const data = await db.request()
                .input('name', sql.VarChar, req.body.name)
                .input('score', sql.Int, req.body.score)
                .query("INSERT INTO score (name, score) OUTPUT Inserted.name VALUES (@name, @score)");
                if (data.recordset.length > 0)
                    res.status(200).json({success: 1, message: "Ok", data: data.recordset[0]});
                else
                    res.status(200).json({ success: 0, message: "Ocurrió un error al registrar la información" });
        } catch (error) {
            console.log(error);
            res.status(500).send("Error de conexión");
        }
        finally{
            db.close();
        }
    });
app.post(base + 'getScores', async (req, res) => {
    
    const db = await connectDB();
    try {
            const data = await db.request()
            .input('idUsuario', sql.Int, req.body.idUsuario)
            .query("SELECT * FROM score ORDER BY score DESC LIMIT 10");
            if (data.recordset.length > 0)
                res.status(200).json({success: 1, message: "Ok", data: data.recordset});
            else
                res.status(200).json({ success: 0, message: "Ocurrió un error al obtener la información" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de conexión");
    }
    finally{
        db.close();
    }
});
console.log("Listening on port "+port);
app.listen(port);