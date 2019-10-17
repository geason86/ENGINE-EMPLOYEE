var inquirer = require("inquirer");
var Employee = require("./lib/employee");
const util = require("util");
var team = [];

//const writeFileAsync = util.promisify(fs.writeFile);

function main()
{
    console.log("start building your team.")
    return inquirer.prompt([
        {
            type:"list",
            name:"employeeType",
            message: "What type of employee?",
            choices: ["Engineer", "Manager", "Intern"]
        },
        {
            type:"input",
            name: "employeeName",
            message: "What is the employee's name?"
        },
        {
            type:"input",
            name: "employeeID",
            message: "What is the employee's ID?"
        },
        {
            type:"input",
            name: "employeeEmail",
            message: "What is the employee's email?"
        }
    ])
    
}

function generateHTML(answers) {
    console.log(answers);
    return `
   <!DOCTYPE html>
   <html lang="en">
   <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Document</title>
   </head>
   <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Name: ${answers.employeeName}</h1>
        <ul>
            <li class="list-group-item">Employee ID: ${answers.employeeID}</li>
            <li class="list-group-item">Employee Email: ${answers.employeeEmail}</li>
        </ul>
    </div>
    </div>
   </body>
   </html>`;
    }

   main()
   .then(function(results){
    
    const {employeeName, employeeID, employeeEmail} = results;
    const employeeToAdd = new Employee(employeeName, employeeID, employeeEmail);
    team.push(employeeToAdd);
    console.log(team);
    // prompt user again
    // once they say no more, then pass your array of team members to a function that generates HTML

})

    .then(function(answers) {
    console.log(answers)
      const html = generateHTML(answers);
      return writeFileAsync("team.html", html);
    })

    .then(function() {
      console.log("Successfully wrote to team.html");
    })

    .catch(function(err) {
      console.log(err);
    });
