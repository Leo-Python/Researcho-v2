import createError from "http-errors";
import express, { Router  } from "express";
import { Server } from "socket.io";
import session from "express-session";
import path from "path";
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import { ExpressValidator } from "express-validator";

import indexRouter from "./routes/index.mjs";
import loginRouter from "./routes/login.mjs";
import signupRouter from "./routes/signup.mjs";
import dashboardRouter from "./routes/dashboard.mjs";


//* import UsernameExists from "./Modules/UsernameExists.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'VDd&I"uI@-<VTbvI,0?M#ribbg;E>5s^',
  resave: false,
  saveUninitialized: false, // Prevents uninitialized sessions from being saved to store
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 
  }
}));


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// ROUTES

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use("/signup", signupRouter);
app.use("/dashboard", dashboardRouter);
app.use("/projects/:id", dashboardRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Database handling




export default app;