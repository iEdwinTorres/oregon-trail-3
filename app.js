function Traveler(name) {
	this.name = name;
	this.food = 1;
	this.isHealthy = true;
}

Traveler.prototype = {
	constructor: Traveler,
	hunt: function() {
		this.food = this.food + 2;
	},
	eat: function() {
		if (this.food > 0) {
			this.food = this.food - 1;
		} else {
			this.isHealthy = false;
		}
	}
};

function Doctor(name, food, isHealthy) {
	Traveler.call(this, name, food, isHealthy);
}

Doctor.prototype = Object.create(Traveler.prototype);
Doctor.prototype.constructor = Doctor;
Doctor.prototype.heal = function(traveler) {
	traveler.isHealthy = true;
};

function Hunter(name, food, isHealthy) {
	Traveler.call(this, name, food, isHealthy);
	this.food = 2;
}

Hunter.prototype = Object.create(Traveler.prototype);
Hunter.prototype.constructor = Hunter;
Hunter.prototype.eat = function() {
	this.food = this.food - 2;
	if (this.food < 0) {
		this.food = 0;
		this.isHealthy = false;
	}
};
Hunter.prototype.hunt = function() {
	this.food = this.food + 5;
};
Hunter.prototype.giveFood = function(traveler, food) {
	if (this.food > food) {
		traveler.food += food;
		this.food -= food;
	}
	return "I dont have enough food.";
};

function Wagon(capacity) {
	Traveler.call(this, name);
	this.capacity = capacity;
	this.passengers = [];
}

Wagon.prototype = {
	constructor: Wagon,
	getAvailableSeatCount: function() {
		return this.capacity - this.passengers.length;
	},
	join: function join(travelers) {
		if (this.passengers.length < this.capacity) {
			this.passengers.push(travelers);
		}
	},
	shouldQuarantine() {
		let passenger = this.passengers;
		let totalPassengers = this.passengers.length;
		for (let i = 0; i < totalPassengers; i++) {
			if (!passenger[i].isHealthy) {
				return true;
			}
		}
		return false;
	},
	totalFood: function totalFood() {
		let totalFood = 0;
		for (i = 0; i < this.passengers.length; i++) {
			totalFood = this.passengers[i].food + totalFood;
		}
		return totalFood;
	}
};

// * Test Code * //
// Create a wagon that can hold 4 people
let wagon = new Wagon(4);
// Create five travelers
let henrietta = new Traveler("Henrietta");
let juan = new Traveler("Juan");
let drsmith = new Doctor("Dr. Smith");
let sarahunter = new Hunter("Sara");
let maude = new Traveler("Maude");
console.log(
	`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`
);
wagon.join(henrietta);
console.log(
	`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`
);
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
wagon.join(maude); // There isn't room for her!
console.log(
	`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`
);
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
sarahunter.hunt(); // gets 5 more food
drsmith.hunt();
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan is now hungry (sick)
console.log(
	`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`
);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
drsmith.heal(juan);
console.log(
	`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`
);
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // She only has 1, so she eats it and is now sick
console.log(
	`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`
);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);
