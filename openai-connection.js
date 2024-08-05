const OpenAI = require("openai");
const dotenv = require("dotenv");

// prep for read data from .env file
dotenv.config();

// create new OpenAI object
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// create connection
async function getProblem() {
  const message = `
you will create a practice problem involving basic JavaScript syntax and control structures.
the output should only include the problem statement.
ensure the output is in the following format and in JSON format.
the output will be polite Japanese.
    {
      "problem": "",
      "initial_code": "",
      "answer_code": ""
     }
  `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: message }],
    model: "gpt-4o-mini",
    response_format: {type: "json_object"},
  });

  const res = completion.choices[0].message;
  const { problem, initial_code, answer_code} = JSON.parse(res.content);
  return {problem, initial_code, answer_code};
}

async function judge(instruction, user_code){
  const message = `
you will judge the following code. you will check requirements for the code and check if the code fulfill the requirements.
the code ${user_code}. requirements ${instruction}
output is JSON. result must be either "正解" or "不正解". you will translate the output into polite Japanese.
{
"result": "",
"comment": "",
"answer_code": ""
}
  `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: message }],
    model: "gpt-4o-mini",
    response_format: {type: "json_object"},
  });

  const res = completion.choices[0].message;
  const {result, comment, answer_code} = JSON.parse(res.content);
  return {result, comment, answer_code};
}
// execute function
module.exports = {getProblem, judge};



