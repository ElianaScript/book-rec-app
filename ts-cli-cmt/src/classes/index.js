"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import classes
var Truck_ts_1 = require("./Truck");
var Car_ts_1 = require("./Car");
var Motorbike_ts_1 = require("./Motorbike");
var Wheel_ts_1 = require("./Wheel");
var Cli_ts_1 = require("./Cli");
// create an array of vehicles
var vehicles = [];
// TODO: uncomment once trucks are implemented
var truck1 = new Truck_ts_1.default(Cli_ts_1.default.generateVin(), "red", "Ford", "F-150", 2021, 5000, 120, [], 10000);
// will use default wheels
var car1 = new Car_ts_1.default(Cli_ts_1.default.generateVin(), 'blue', 'Toyota', 'Camry', 2021, 3000, 130, []);
// TODO: uncomment once motorbikes are implemented
var motorbike1Wheels = [new Wheel_ts_1.default(17, "Michelin"), new Wheel_ts_1.default(17, "Michelin")];
var motorbike1 = new Motorbike_ts_1.default(Cli_ts_1.default.generateVin(), "black", "Harley Davidson", "Sportster", 2021, 500, 125, motorbike1Wheels);
// push vehicles to array
// TODO: uncomment once trucks are implemented
vehicles.push(truck1);
vehicles.push(car1);
// TODO: uncomment once motorbikes are implemented
vehicles.push(motorbike1);
// create a new instance of the Cli class
var cli = new Cli_ts_1.default(vehicles);
// start the cli
cli.startCli();
