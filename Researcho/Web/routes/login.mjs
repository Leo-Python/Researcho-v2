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
router.get('/validateCookie', (req, res) => {
  const connectCookie = req.cookies["connect.sid"];
  console.log(connectCookie);
  console.log("Validated cookies", req.signedCookies)
  if (connectCookie) {
    console.log("200")
    res.sendStatus(200)
      
  } else {
    console.log("404")
      res.sendStatus(404);
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
    res.render("Dashboard", {Data});
   
    

  }


});

router.post('/auth', async function(req, res) {
  console.log("Session " + JSON.stringify(req.session.user));
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
    res.send(Data);
   
    

  } else {
    res.sendStatus(409)
  }

});


export default router;
