var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "", 
    database: "ice_creamDB"
});

connection.connect();

/**
 * 
 * @param {*} flavor
 * @param {*} price
 * @param {*} quantity
 */

function create(flavor, price, quantity) {
    connection.query(`
        INSERT INTO products (flavor, price, quantity) VALUES (?, ?, ?)
        `, [flavor, price, quantity], function (err, res) {
            if (err) throw err; 
            console.log(`New Flavor: ${flavor} Created!`);
            connection.end();
        })
}
function read(id) {
    if (id) {
        connection.query("SELECT * FROM products WHERE id = ?", [id], function (err, res){
            if (err) throw err; 
            console.log(res);
        })
    }
    else{
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err; 
            console.log(res);
        })
    }

}
function update(id, flavor, price, quantity) {
    connection.query(`
    UPDATE products SET
    flavor = ?, 
    price= ?, 
    quantity = ? 
    WHERE id = ?
    `, [flavor, price, quantity, id], function (err, res) {
        console.log(res);
    })
}

function destroy(id) {
        connection.query("DELETE FROM products WHERE id = ?", [id], function (err, res){
            if (err) throw err; 
            console.log(res);
        })
    }

inquirer   
    .prompt([
        /* pass questions here*/

        {
        name: "action", 
        messaage: "What action do you wish to take", 
        type: "list", 
        choice: ["Create", "Read", "Update", "Delete"]
        }
    ])
    .then(answers => {
        if (answers.action === "CREATE") {
            inquirer.prompt([
                {
                    name: "flavor", 
                    message: "Flavor:"
                }, 
                {
                    name: "quantity", 
                    message: "Qty:"
                }, 
                {
                    name: "price", 
                    message: "Prices:"
                }
            ])
            .then(function(answers) {
                create(answers.flavor, answers.price, answers.quantity);
            })
        }
        else if (answers.action === "Read") {
            console.log("R");
        }
        else if (answers.action === "Update") {
            console.log("U");
        }
        else if (answers.action === "Delete") {
            console.log("D");
        }
    });

