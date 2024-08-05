const express = require("express");
const path = require("path");
const {getProblem, judge } = require("./openai-connection.js");

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/challenge', async (req, res) => {
  try {
    const {problem, initial_code, answer_code} = await getProblem();
    res.render('challenge', {problem, initial_code, answer_code, error: null});
  } catch (error) {
    res.render('challenge', {problem: null, initial_code: null, error: "error fetching problem from OpenAI"} );
  }
});

app.post('/check', async (req, res) => {
  try {
    const {result, comment, answer_code} = await judge(req.body.instruction, req.body.user_code)
    const user_code = req.body.user_code
    res.render('check', {result, comment, answer_code, user_code, error: null});
  } catch (error) {
    res.render('check', {result:null, comment:null , error: error});
  }
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
