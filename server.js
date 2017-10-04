const express = require('express'),
      app = express(),
      path = require('path'),
      { db, seed } = require('./db');


app.use(require('morgan')('dev'));
app.use(require('body-parser').json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));
    
app.use((err, req, res, next) => {
  if(err) console.log(`Error ${err.message}`);
});
        
db.sync({ force: true, logging: false })
  .then(seed)
  .then(()=> {
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  })
  .catch(err => console.log(`Error! ${err.message}`));


        
      