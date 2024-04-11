import mysql from "mysql2"
import {Compare} from "./Hasher.mjs"



const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "NTIAwards!PSWRD2007",
    database: "rshdb",
    rowsAsArray: true
}).promise()

export async function CheckEmail(Mail) {
    try {
        const result = await pool.query(`SELECT email FROM users WHERE email="${Mail}";`);
        const rows = result[0];
        console.log(rows.length);
        
        if (rows.length != 0)
        {
            return false;
        } else {
            return true;
        }

    } catch (error) {
        // Handle query execution errors
        console.error("Error executing query:", error);
        throw error;
    }
}
export async function CreateUser(Email, Password) 
{
    const result = await pool.query(`INSERT INTO users (email, password) VALUES ('${Email}', '${Password}');`);
} 

export async function CheckForLogin(Email, Password) {
    console.log(Password);
    let EmailEmpty = await CheckEmail(Email);

    if (EmailEmpty == false) 
    {
    
        const result = await pool.query(`SELECT password from users WHERE email = '${Email}'`,);
        let DBPass = result[0][0].toString();
        let LoginResult = Compare(Password, DBPass).then((value) => {
            console.log(value);
            return value;
        });
        return LoginResult;

        
    }
    

}

export async function FetchID(Email) {
    const result = await pool.query(`SELECT ID from users WHERE email = '${Email}'`,);
    let ID = result[0][0].toString();
    return ID;
}