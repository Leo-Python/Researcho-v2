import Express from "express";
import { CheckForLogin, FetchID } from "../Modules/Database.mjs";
import {Hash} from "../Modules/Hasher.mjs"
var router = Express.Router();

/* GET Login page. */
router.get('/', function(req, res, next) {
  if(req.session.user) {
    res.render('dashboard');
  }
  else {
    res.render('login');
  }
  
});

router.post('/', async function(req, res) {
  console.log(req.body.Email, req.body.Pass)

  let MailValue = req.body.Email;
  let Password = req.body.Pass;
  let HashedPass = await Hash(Password)

  console.log(MailValue, Password);

  let Validation = await CheckForLogin(MailValue, Password).then();
  console.log("Validation is " + Validation)

  if (Validation == true)
  {

    let UserID = await FetchID(MailValue)
    
    console.log("Valid");
    
    req.session.user = {
      Mail: MailValue,
      ID: UserID
    };
    let Data = req.session.user
    res.render('dashboard', {Data});
   
    

  }


});

router.options('/auth', async function(req, res) {
  let MailValue = req.body.Email;
  let Password = req.body.Pass;
  let HashedPass = await Hash(Password)

  console.log(MailValue, Password);

  let Validation = await CheckForLogin(MailValue, Password).then();
  console.log("Validation is " + Validation)

  if (Validation == true)
  {

    let UserID = await FetchID(MailValue)
    
    console.log("Valid");
    
    req.session.user = {
      Mail: MailValue,
      ID: UserID
    };
    let Data = req.session.user
    res.render('externsion', {Data});
   
    

  }

});


export default router;
