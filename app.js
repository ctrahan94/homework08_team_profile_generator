const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the managers name?",
        name: "managerName",
      },
      {
        type: "input",
        message: "What is the managers id number?",
        name: "managerId",
      },
      {
        type: "input",
        message: "What is the managers email address?",
        name: "managerEmail",
      },
      {
        type: "input",
        message: "What is the managers office number?",
        name: "managerOfficeNumber",
      },
    ])
    .then((data) => {
      var newManager = new Manager(
        data.managerName,
        data.managerId,
        data.managerEmail,
        data.managerOfficeNumber
      );
      employees.push(newManager);
      createTeam();
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your engineers name?",
        name: "engineerName",
      },
      {
        type: "input",
        message: "What is your engineers id number?",
        name: "engineerId",
      },
      {
        type: "input",
        message: "What is your engineers email address?",
        name: "engineerEmail",
      },
      {
        type: "input",
        message: "What is your engineers github username?",
        name: "engineerGithub",
      },
    ])
    .then((data) => {
      var newEngineer = new Engineer(
        data.engineerName,
        data.engineerId,
        data.engineerEmail,
        data.engineerGithub
      );
      employees.push(newEngineer);
      createTeam();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your interns name?",
        name: "internName",
      },
      {
        type: "input",
        message: "What is your interns id number?",
        name: "internId",
      },
      {
        type: "input",
        message: "What is your interns email address?",
        name: "internEmail",
      },
      {
        type: "input",
        message: "Where does your intern attend school?",
        name: "internSchool",
      },
    ])
    .then((data) => {
      var newIntern = new Intern(
        data.internName,
        data.internId,
        data.internEmail,
        data.internSchool
      );
      employees.push(newIntern);
      createTeam();
    });
}

function createTeam() {
  inquirer
    .prompt({
      type: "list",
      message: "What type of team member would you like to add?",
      choices: ["engineer", "intern", "I am done."],
      name: "teamChoice",
    })
    .then((data) => {
      switch (data.teamChoice) {
        case "engineer":
          createEngineer();
          break;

        case "intern":
          createIntern();
          break;

        default:
          buildTeam();
      }
    });
}

function buildTeam() {
  fs.mkdirSync(OUTPUT_DIR);
  fs.writeFileSync(outputPath, render(employees), "utf-8");
}

createManager();
