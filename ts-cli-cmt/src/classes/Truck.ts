// import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle';
import Motorbike from './Motorbike';
import Car from './Car';
import Wheel from '../Wheel';
import AbleToTow from '../interfaces/AbleToTow';

class Truck extends Vehicle {
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  towingCapacity: number;
  wheels: Wheel[];

constructor(
  vin: string,
  color: string,
  make: string,
  model: string,
  year: number,
  weight: number,
  topSpeed: number,
  towingCapacity: number,
  wheels: Wheel[],

  ) {
    
super();

this.vin = vin;
this.color = color;
this.make = make;
this.model = model;
this.year = year;
this.weight = weight;
this.topSpeed = topSpeed;
this.towingCapacity = towingCapacity;
this.wheels = wheels;

if (wheels.length !==4) {
  this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
} else {
  this.wheels = wheels;
}

  };

tow(vehicle: Truck | Motorbike | Car): void {
};

override printDetails(): void {
  super.printDetails();


console.log(`VIN: ${this.vin}`);
console.log(`Color: ${this.color}`);
console.log(`Make: ${this.make}`);
console.log(`Model: ${this.model}`);
console.log(`Year: ${this.year}`);
console.log(`Weight:${this.weight}`);
console.log(`Top Speed: ${this.topSpeed}`);
console.log(`Towing Capacity: ${this.towingCapacity}`);

// details of wheel
console.log(
  `Wheel 1: ${this.wheels[0].getDiameter} inch with a ${this.wheels[0].getTireBrand} tire`
);
console.log(
  `Wheel 2: ${this.wheels[1].getDiameter} inch with a ${this.wheels[1].getTireBrand} tire`
);
console.log(
  `Wheel 3: ${this.wheels[2].getDiameter} inch with a ${this.wheels[2].getTireBrand} tire`
);
console.log(
  `Wheel 4: ${this.wheels[3].getDiameter} inch with a ${this.wheels[3].getTireBrand} tire`
);
}
  };    


export default Truck;
function interfacetowVehicle() {
  throw new Error('Function not implemented.');
}

