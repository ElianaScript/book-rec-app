// import the classes
import Truck from "../classes/Truck";
import Motorbike from "../classes/Motorbike";
import Car from "../classes/Car";

// define the interface
interface AbleToTow {
    // declare the properties
    towingCapacity: number;
    // tow method takes a truck or a motorbike or a car as an argument
    tow(vehicle: Truck | Motorbike | Car): void;
}

// export the interface
export default AbleToTow;
