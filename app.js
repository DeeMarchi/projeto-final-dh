const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const methodOverride = require('method-override');

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
app.use(session({
    secret: '#!&*@!djasiodjao12309102',
    resave: true,
    saveUninitialized: true,
}));

app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario;
    next();
});

app.use('/', authRouter);
app.use('/index', indexRouter);



// catch 404 and forward to error handler
// app.use((req, res, next) => {
//     next(createError(404));
// });

app.use((req, res, next) => {
    res.status(404).render('nao-encontrado', {
        titulo: 'Não encontrado',
    });
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.locals.site = {
    nomeProjeto: 'Trip Diary',
};

module.exports = app;
