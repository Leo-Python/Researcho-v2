/* Salt and hashing */
import bcrypt from "bcrypt";
const saltRounds = 10;


function Hash(input) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                reject(err);
            } else {
                bcrypt.hash(input, salt, (err, hash) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash); // Resolve with the hash value
                    }
                });
            }
        });
    });
}

function Compare(UP, DBP) { // Userpassword, Databasepassword
    return new Promise((resolve, reject) => {
        bcrypt.compare(UP,DBP, (err, data) => {
            if(err) {reject(err);}
            else {resolve(data);}
        })
    })
}

export { Hash, Compare };