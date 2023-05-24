// Here is the O.R.M. where you write functions that takes inputs and conditions
// and turns them into database commands like SQL.

const connection = require("./connection.js");

function printQuestionMarks(num) {
    var array = [];

    for (var i = 0; i < num; i++) {
        array.push("?");
    };

    return array.toString();
};

function objToSql(object) {
    var array = [];

    for (var key in object) {
        array.push(key + "=" + object[key]);
    };

    return array.toString();
};

var orm = {
    all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
        if (err) {
            throw err;
        }

        cb(result);
    });
    },
// vals is an array of values that we want to save to cols
// cols are the columns we want to insert the values into
    create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    connection.query(queryString, vals, function(err, result) {
    if (err) {
        throw err;
    }

    console.log(queryString);

    cb(result);
    })
    },
    // objColVals would be the columns and values that you want to update
  // an example of objColVals would be {name: panther, sleepy: true}

    update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
        if (err) {
            throw err;
        }

        console.log(queryString);

        cb(result);
    });
    }
};

module.exports = orm;