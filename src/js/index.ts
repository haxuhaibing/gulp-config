class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}


class Horse extends Animal {
    constructor(name: string) { super(name); }
    // move(distanceInMeters = 45) {
    //     super.move(distanceInMeters);
    // }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move(20);
tom.move(34);
