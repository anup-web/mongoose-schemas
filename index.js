const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const articlerouter = require('./routes/Article');

app.use(express.json());
app.use(cors());
app.use('/Article', articlerouter);

mongoose.connect('#', 
   { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
   });
const con = mongoose.connection;
try {
    con.on('open', () => {
        console.log('Connected to the database');
    })
} catch (error) {
    console.log( "Error: " + error );
}
  

  
//   app.get('/articles', async (req, res) => {
//     const blogs = await Article.find();
//     res.json(blogs);
//   });
  
//   app.put('/articles/:id', async (req, res) => {
//     const blog = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(blog);
//   });
  
//   app.delete('/articles/:id', async (req, res) => {
//     await Article.findByIdAndDelete(req.params.id);
//     res.send('Blog deleted');
//   });
  
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });


