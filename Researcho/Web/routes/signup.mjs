import Express from "express";
import {Hash} from "../Modules/Hasher.mjs"
import { CheckEmail,CreateUser } from "../Modules/Database.mjs";


var router = Express.Router();

/* GET signup page. */
router.get('/', function(req, res) {
  res.render('signup', { title: 'Express' });
});

router.post('/', async function(req, res) {
  
  let Mail = req.body.Email;
  let Password = req.body.Pass;

  let HashPass = await Hash(Password);

  let CheckedEmail = await CheckEmail(Mail);


 // Is Mail valid?
  
  if (CheckedEmail == false) {
    res.sendStatus(409);
  }
  // If username is valid, continue..
  else
  {
    res.send(200);
    let NewAcc = CreateUser(Mail, HashPass);
  }   
});

export default router;
