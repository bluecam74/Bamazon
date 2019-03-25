var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost", 
    port: 8889, 
    user: "root", 
    password: "root", 
    database: "bamazon_db"
});

connection.connect();

/**
 * 
 * @param {*} item_id
 * @param {*} price
 * @param {*} stock_quantity
 */

var productLength;

function read(item_id) {
    if (item_id) {
        connection.query("SELECT * FROM products WHERE item_id = ?", [item_id], function (err, res){
            if (err) throw err; 
            })
    }
    else{
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err; 
            productLength = res.length;
            console.log("***********************************************************************")
            for (i = 0; i < res.length; i++) { 
                console.log(`Item ID: ${res[i].item_id} \nProduct Name: ${res[i].product_name} \nDepartment:  ${res[i].department_name} \nPrice: $${res[i].price} \nStock Quantity: ${res[i].stock_quantity}`);
                console.log("***********************************************************************")
            }
            console.log("------------------------------------------------------------------");
            prompt();
        })
    }
    
}
function update(item_id, stock_quantity, quantity, price) {
    if (stock_quantity >= quantity) {
        var new_stock = stock_quantity - quantity;
        connection.query(`
        UPDATE products SET 
        stock_quantity = ? 
        WHERE item_id = ?
        `, [new_stock, item_id], function (err, res) {
        var totalPrice = quantity*price;
        console.log("------------------------------------------------------------------");
        console.log("Thank you for your order, your total is $" + totalPrice + "." )
        console.log("------------------------------------------------------------------");
        connection.end();
        })
    }
    else {
        console.log("-----------------------------------------------------------------------------------------");
        console.log("We do not have enough inventory to fill your order. Please try another item or quantity.")
        console.log("-----------------------------------------------------------------------------------------");
        prompt();
    }
    
}

read();


function prompt() {
    inquirer   
    .prompt([
        {
        name: "item_id", 
        message: "What is the item ID of the item you would like to purchase?", 
        type: "input"
        },
        {
        name: "quantity", 
        message: "How many of the item you would like to purchase?", 
        type: "input"
        }

    ])
    .then(answers => {
        var item_number = parseInt(answers.item_id);
        var quantity_number = parseInt(answers.quantity);
        if (answers.item_id) {
            connection.query("SELECT * FROM products WHERE item_id = ?", [answers.item_id], function (err, res){
                if (err) {
                    throw err; 
                }
                else {
                     if (item_number <= productLength) {
                        if (typeof(quantity_number) != "number") {
                            console.log("--------------------------------------");
                            console.log(" Please enter a quantity for item desired.");
                            console.log("--------------------------------------");
                        }
                        else {
                            update(res[0].item_id, res[0].stock_quantity, answers.quantity, res[0].price);    
                        }
                     }

                     else {
                        console.log("--------------------------------------");
                         console.log(" Please enter a valid item ID number.");
                         console.log("--------------------------------------");
                         prompt();
                     }
                     
                   
                }
            })
        }
        else{
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err; 
                console.log(res);
            })
        }
    })
}




