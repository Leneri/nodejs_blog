const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes.js')

// express app
const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://leneriuser:test1234@nodepractice.exili9w.mongodb.net/nodepractice-db?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result) => {
    app.listen(3000); 
    console.log('connected!')
})
.catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About '});
})

// blog routes
app.use('/blogs', blogRoutes);

//404's
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})