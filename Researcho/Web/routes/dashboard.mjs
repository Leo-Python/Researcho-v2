import Express from "express";
var router = Express.Router();

import { FetchProjects, CreateProject, GetSources, CreateSource } from "../Modules/DashboardData.mjs";

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user);
  if (req.session.user) {
    let Data = req.session.user
    res.render('dashboard', {Data});
    

  } else {
    res.render('login');
    

  }
});
router.get('/Data', async function(req, res, next) {
  console.log(req.session.user);
  if (req.session.user) {
    let Projects = await FetchProjects(req.session.user.ID)
    console.log(Projects);

    res.send(Projects[0])
  }
});

router.post('/createProject', async function(req,res,next) {
  console.log(req.session.user);
  let Name = req.body.Name;
  let Description = req.body.Description;
  let ID = req.session.user.ID;
  console.log(ID);

  CreateProject(ID,Name,Description)

  res.sendStatus(200);

});
router.get('/projects/:id', async function(req, res, next) {
  if (req.session.user) {
    console.log("Yes______________________________________________________________")
    let ID = req.params.id;
    res.render('manage');
    

  } else {
    res.redirect('/login');
    

  }
});
router.post('/createSource', async function(req, res, next) {
  if (req.session.user) {

    let ID = req.body.ownerID;
    let Title = req.body.Title
    let Description = req.body.Description
    let Link = req.body.Link
    let Time =  req.body.Time
    let Author =  req.body.Author
    CreateSource(Title,Description,Link,Time,Author,ID)
    res.send(200);
  } 
});

router.post('/sources', async function(req, res, next) {
  console.log(req.session.user);
  if (req.session.user) {

    let ID = req.body.ID;

    let Projects = await GetSources(ID);
    res.send(Projects[0]);

    
  }
});


export default router;