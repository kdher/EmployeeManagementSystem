//Import required packages

const mysql = require('mysql2');
const inquirer = require('inquirer');
const chalk = require('chalk');


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "FCA1210_inf",
    database: "employee_db"
},
console.log(`Connected to the employee_db database.`)

);
  connection.connect(function (err) {
    if (err) throw err;
    console.log();
    console.log(chalk.red("*********************************************************"));
    console.log(chalk.red.bold("                       EMPLOYEE                      "));
    console.log("                      ╭╮            ");
    console.log("             ╭━━┳╮╭┳━━┫┃╭━━┳╮ ╭┳━━┳━━╮ ");
    console.log("             ┃┃━┫╰╯┃╭╮┃┃┃╭╮┃┃ ┃┃┃━┫┃━┫");
    console.log("             ┃┃━┫┃┃┃╰╯┃╰┫╰╯┃╰━╯┃┃━┫┃━┫");
    console.log("             ╰━━┻┻┻┫╭━┻━┻━━┻━╮╭┻━━┻━━╯");
    console.log("                   ┃┃      ╭━╯┃ ");
    console.log("                   ╰╯      ╰━━╯ ");
    console.log("                    ╭╮        ╭╮");
    console.log("                   ╭╯╰╮       ┃┃");
    console.log("                   ╰╮╭╋━┳━━┳━━┫┃╭┳━━┳━╮");
    console.log("                    ┃┃┃╭┫╭╮┃╭━┫╰╯┫┃━┫╭╯");
    console.log("                    ┃╰┫┃┃╭╮┃╰━┫╭╮┫┃━┫┃");
    console.log("                    ╰━┻╯╰╯╰┻━━┻╯╰┻━━┻╯");
    console.log("");
    console.log("");
    console.log(chalk.red("**********************************************************"))
    console.log();
    init();
});

function init() {
    inquirer.prompt({
            name: "Option",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add Employee",
                "View All Employees",
                "Add Role",
                "View All Roles",
                "Add Department",
                "View All Departments",
                "Update Employee",
                "Delete Employee",
                "Delete Role",
                "Delete Department",
                "View Employee by department",
                
                "Exit"
            ]
        })
        .then(function (choose) {
            switch (choose.Option) {
                case "Add Employee":
                    addEmployee();
                    break;
                    
                case "View All Employees":
                    viewEmployees();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "View All Departments":
                    viewDepartments();
                    break;
                
                case "View Employees by Departments":
                    viewEmployesbyDepartments();
                    break;


                case "Update Employee":
                    updateEmployee();
                    break;

                case "Delete Employee":
                    deleteEmployee();
                    break;

                case "Delete Role":
                    deleteRole();
                    break;
                
                case "Delete Department":
                      deleteDepartment();
                     break;

                case "Exit":
                    connection.end();
            }
        });
}

function addEmployee() {
    inquirer.prompt([{
                name: "FirstName",
                type: "input",
                message: "What is the Employee first name?",
            },
            {
                name: "LastName",
                type: "input",
                message: "What is the Employee last name?",
            },
            {
                name: "managerID",
                type: "number",
                message: "What is the Employee manager's ID?",
            },
            {
                name: "RoleId",
                type: "number",
                message: "What is role ID?",
                validate: function (choose) {
                    if (isNaN(choose)) {
                        return "ID must only numbers.";
                    } else {
                        return true;
                    }
                },
            }
        ])
        .then(function (choose) {
            connection.query( "INSERT INTO employees SET ?", {
                    first_Name: choose.FirstName,
                    last_Name: choose.LastName,
                    role_Id: choose.RoleId,
                    manager_Id: choose.managerID
                },
                function (err) {
                    if (err) throw err;
                    console.log("Added Employee to the database.");
                    init()
                }
            );
        });
}


function viewEmployees() {
    connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        console.table(results);
        init();
    });
}

function addRole() {
    inquirer.prompt([{
                name: "Role",
                type: "input",
                message: "What is the name of the role?",
            }, 
            {
                name: "deptoName",
                type: "input",
                message: "What is the department ID for the role?",
            },
            {
                name: "salary",
                type: "number",
                message: "What is the role's salary?",
            },
    
        ])
        .then(function (choose) {
            connection.query( "INSERT INTO roles SET ?", {
                    title: choose.Role,
                    department_Id: choose.deptoName,
                    salary: choose.salary,

                },
                function (err) {
                    if (err) throw err;
                    console.log(" added Role to the database");
                    init();
                }
            );
        });
}

function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;
        console.table(results);
        init();
    });
}

function addDepartment() {
    
    inquirer.prompt([{
                name: "Department",
                type: "list",
                message: "What is the name of department would you like to add?",
                choices: ['Engineering','Finance','Legal','Sales','Service']
            },  
        ])
        .then(function (choose) {
            connection.query( "INSERT INTO departments SET ?", {
                    deptName: choose.Department,
                },
                function (err) {
                    if (err) throw err;
                    console.log(" Added department to the Database");
                    init();
                }
            );
        });
}

function viewDepartments() {
    connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
        console.table(results);
        init();
    });
}               

function updateEmployee() {
    inquirer.prompt([{
                name: "updateEmployee",
                type: "input",
                message: "Which employee do you want to update?",
            },
            {
                name: "roleID",
                type: "number",
                message: "What is the new role ID?",
            }

        ]).then(function (choose) {
                connection.query("UPDATE employees SET ? WHERE ?",
                    [{
                            role_Id: choose.roleID
                        },
                        {
                            id: choose.updateEmployee
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        init();
                    }

                )
            })
        }

        function deleteEmployee() {
            inquirer.prompt(
                {
                    name: "deleteEmployee",
                    type: "number",
                    message: "What is the employee's ID number?",
                }
    
            ).then (function (choose){
            connection.query("DELETE FROM employees WHERE ?",
                {
                  id: choose.deleteEmployee
                },
                function(err, res) {
                  if (err) throw err;
                  init();
                }
              );
            })
        }

        function deleteRole() {
            inquirer.prompt(
                {
                    name: "deleteRole",
                    type: "number",
                    message: "What is the role ID number?",
                }
    
            ).then (function (choose){
            connection.query("DELETE FROM roles WHERE ?",
                {
                  id: choose.deleteRole
                },
                function(err, res) {
                  if (err) throw err;
                  init();
                }
              );
            })
        }

function deleteDepartment() {
            inquirer.prompt(
                {
                    name: "deleteDepto",
                    type: "number",
                    message: "What is the department ID number?",
                }
    
            ).then (function (choose){
            connection.query("DELETE FROM departments WHERE ?",
                {
                  id: choose.deleteDepto
                },
                function(err, res) {
                  if (err) throw err;
                 init();
                }
              );
            })
        }       

function viewEmployesbyDepartments(){
    connection.query("SELECT id  FROM departments", function (err, results) {
        if (err) throw err;
        console.table(results);
        init();
    });

}            
                   