import mysql from "mysql2"

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "NTIAwards!PSWRD2007",
    database: "rshdb",
    rowsAsArray: true
}).promise()



async function FetchProjects(ID) {
    const result = await pool.query(`SELECT * from projects WHERE ownerID = '${ID}'`,);
    let returnValue = result;
    return returnValue;
}
async function GetSources(ID) {
    const result = await pool.query(`SELECT * from sources WHERE ownerID = '${ID}'`,);
    let returnValue = result;
    return returnValue;
}

async function CreateProject(ID, Name, Desc) {
    const result = await pool.query(`INSERT INTO projects (ownerID,name,description) VALUES ('${ID}', '${Name}','${Desc}' );`);
}
async function CreateSource(Title,Description,Link,Time,Author,ID) {
    const result = await pool.query(`INSERT INTO sources (name,description,link,time,author,ownerID) VALUES ('${Title}', '${Description}','${Link}','${Time}','${Author}',${ID} );`);

}

export {FetchProjects, CreateProject, GetSources, CreateSource}