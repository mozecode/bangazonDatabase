
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite');

db.serialize(function(){

    //drop existing tables to get up-to-date info  -- not sure of order to put in
    db.run(`DROP TABLE IF EXISTS departments`);
    db.run(`DROP TABLE IF EXISTS productCategories`);
    db.run(`DROP TABLE IF EXISTS productOrders`);
    db.run(`DROP TABLE IF EXISTS products`);
    db.run(`DROP TABLE IF EXISTS orders`);
    db.run(`DROP TABLE IF EXISTS paymentTypes`);
    db.run(`DROP TABLE IF EXISTS employees`);
    db.run(`DROP TABLE IF EXISTS employeeTraining`);
    db.run(`DROP TABLE IF EXISTS training`);
    db.run(`DROP TABLE IF EXISTS computers`);
    db.run(`DROP TABLE IF EXISTS customers`);

    db.run(`CREATE TABLE IF NOT EXISTS customers(
        customerId INTEGER PRIMARY KEY,
        firstName TEXT UNIQUE NOT NULL,
        lastName TEXT UNIQUE NOT NULL,
        dateEnrolled TEXT,
        active INTEGER,
        address TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS computers(
    computerId INTEGER PRIMARY KEY,
    datePurchased TEXT,
    dateDecom TEXT,
    employee_id INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS training(
        trainProgId INTEGER PRIMARY KEY,
        trainProgName TEXT,
        trainProgStart TEXT,
        trainProgEnd TEXT,
        maxAttendees INTEGER,
        employeesAttending INTEGER,
        employeesCompleted INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS employeeTraining(
        empTrainId INTEGER PRIMARY KEY,
        employee_id INTEGER,
        trainProgId INTEGER,
        complete INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS employees(
        employeeId INTEGER PRIMARY KEY,
        department_id INTEGER,
        employeeName TEXT,
        empSupervisor INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS paymentTypes(
        paymentId INTEGER PRIMARY KEY,
        customer_id INTEGER,
        paymentName TEXT,
        accountNumber INTEGER,
        expirationDate TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS orders(
        orderId INTEGER PRIMARY KEY,
        dateInitiated TEXT,
        dateFulfilled TEXT,
        payment_id INTEGER,
        customer_id INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS products(
        productId INTEGER PRIMARY KEY,
        category_id INTEGER,
        customer_id INTEGER,
        productName TEXT,
        productDesc TEXT,
        price REAL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS productOrders(
        productOrderId INTEGER PRIMARY KEY,
        order_id INTEGER,
        quantity INTEGER,
        product_id INTEGER
        department_id INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS productCategories(
        categoryId INTEGER PRIMARY KEY,
        categoryName TEXT,
        department_id INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS departments(
        departmentId INTEGER PRIMARY KEY,
        supervisor INTEGER,
        departmentName TEXT,
        budget REAL
    )`);
});