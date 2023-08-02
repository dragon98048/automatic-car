// JavaScript
const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const N = 1000;
const cars = generateCars(N);
let bestCar = cars[0];

if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
        if (i !== 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.1);
        }
    }
}

const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -900, 30, 50, "DUMMY", 1.5),
    new Car(road.getLaneCenter(1), -800, 30, 50, "DUMMY", 1.5)
];

animate();

function save() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}

function generateCars(N) {
    const cars = [];
    for (let i = 1; i <= N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
    return cars;
}

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].set_name("traffic");
        traffic[i].update(road.borders, []);
    }

    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }

    bestCar = cars.find(
        c => c.y === Math.min(...cars.map(c => c.y))
    );

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.clearRect(0, 0, carCanvas.width, carCanvas.height);

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

    road.draw(carCtx);

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }

    carCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue");
    }
    carCtx.globalAlpha = 1;

    bestCar.draw(carCtx, "blue", true);
    carCtx.restore();

    networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
}



// // JavaScript
// // Get canvas elements and set their widths
// const carCanvas = document.getElementById("carCanvas");
// carCanvas.width = 200;

// const networkCanvas = document.getElementById("networkCanvas");
// networkCanvas.width = 300;

// // Get the 2D rendering contexts of the canvases
// const carCtx = carCanvas.getContext("2d");
// const networkCtx = networkCanvas.getContext("2d");

// // Create a road instance
// const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

// // Number of cars to generate in each generation
// const N = 2000;

// // Maximum number of generations
// const maxGenerations = 100;

// // Current generation counter
// let generation = 1;

// // Array to hold the cars of the current generation
// let currentGenerationCars = [];

// // Best car of the current generation
// let bestCar;

// // Function to save the best car's brain in localStorage
// function saveBestBrain() {
//   localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
// }

// // Function to discard the saved brain in localStorage
// function discardBestBrain() {
//   localStorage.removeItem("bestBrain");
// }

// // Function to generate N cars and return an array of cars
// function generateCars(N) {
//   const cars = [];
//   for (let i = 1; i <= N; i++) {
//     cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
//   }
//   return cars;
// }

// // Function to perform selection and crossover to create the next generation of cars
// function createNextGeneration() {
//   // Sort cars of the current generation based on their fitness (distance traveled)
//   currentGenerationCars.sort((a, b) => b.distanceTraveled - a.distanceTraveled);

//   // Select the top-performing cars (50% of the current generation) to be parents for crossover
//   const topPerformers = currentGenerationCars.slice(0, N / 2);

//   // Create the next generation of cars through crossover
//   const nextGenerationCars = [];
//   for (let i = 0; i < N; i++) {
//     const parent1 = topPerformers[Math.floor(Math.random() * topPerformers.length)];
//     const parent2 = topPerformers[Math.floor(Math.random() * topPerformers.length)];
//     const child = NeuralNetwork.crossover(parent1.brain, parent2.brain);
//     NeuralNetwork.mutate(child, 0.1);
//     nextGenerationCars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI", child));
//   }

//   // Update the current generation cars with the new generation cars
//   currentGenerationCars = nextGenerationCars;
//   generation++;
// }

// // Function to animate the cars and update the canvas
// function animate(time) {
//   for (let i = 0; i < traffic.length; i++) {
//     traffic[i].set_name("traffic");
//     traffic[i].update(road.borders, []);
//   }

//   for (let i = 0; i < currentGenerationCars.length; i++) {
//     currentGenerationCars[i].update(road.borders, traffic);
//   }

//   // Find the best car of the current generation (highest distance traveled)
//   bestCar = currentGenerationCars.reduce((prev, curr) =>
//     curr.distanceTraveled > prev.distanceTraveled ? curr : prev
//   );

//   // Set canvas heights to match window height
//   carCanvas.height = window.innerHeight;
//   networkCanvas.height = window.innerHeight;

//   // Clear the car canvas
//   carCtx.clearRect(0, 0, carCanvas.width, carCanvas.height);

//   // Translate the canvas to follow the best car
//   carCtx.save();
//   carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

//   // Draw the road on the canvas
//   road.draw(carCtx);

//   // Draw traffic cars in red
//   for (let i = 0; i < traffic.length; i++) {
//     traffic[i].draw(carCtx, "red");
//   }

//   // Reduce opacity and draw off-screen cars in blue
//   carCtx.globalAlpha = 0.2;
//   const carsToRender = currentGenerationCars.filter(
//     (c) => Math.abs(c.y - bestCar.y) < carCanvas.height * 0.8
//   );

//   for (let i = 0; i < carsToRender.length; i++) {
//     carsToRender[i].draw(carCtx, "blue");
//   }

//   // Restore full opacity and draw the best car in blue
//   carCtx.globalAlpha = 1;
//   bestCar.draw(carCtx, "blue", true);
//   carCtx.restore();

//   // Adjust the line dash offset for the network canvas
//   networkCtx.lineDashOffset = -time / 50;
//   Visualizer.drawNetwork(networkCtx, bestCar.brain);

//   // Check if the current generation has reached the maximum number of generations
//   if (generation < maxGenerations) {
//     // Request the next animation frame
//     requestAnimationFrame(animate);
//   } else {
//     // The evolution process is complete, save the best car's brain and start over with a new generation
//     saveBestBrain();
//     generation = 1;
//     createNextGeneration();
//     // Request the next animation frame to start the new generation's animation
//     requestAnimationFrame(animate);
//   }
// }

// // Initialize the first generation of cars
// currentGenerationCars = generateCars(N);

// // Check if there's a saved brain in the localStorage and apply it to the first car
// if (localStorage.getItem("bestBrain")) {
//   currentGenerationCars[0].brain = JSON.parse(localStorage.getItem("bestBrain"));
// }

// // Array of traffic cars
// const traffic = [

//   new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2)
// ];

// // Call the animate function to start the animation
// animate();

// JavaScript
// const carCanvas = document.getElementById("carCanvas");
// carCanvas.width = 200;

// const networkCanvas = document.getElementById("networkCanvas");
// networkCanvas.width = 300;

// const carCtx = carCanvas.getContext("2d");
// const networkCtx = networkCanvas.getContext("2d");

// const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

// const N = 1000;
// const cars = generateCars(N);
// let bestCar = cars[0];

// if (localStorage.getItem("bestBrain")) {
//     for (let i = 0; i < cars.length; i++) {
//         cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
//         if (i !== 0) {
//             NeuralNetwork.mutate(cars[i].brain, 0.1);
//         }
//     }
// }

// const traffic = [
//     new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
//     new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
//     new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2),
//     new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2),
//     new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2),
//     new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2),
//     new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2),
//     new Car(road.getLaneCenter(0), -900, 30, 50, "DUMMY", 1.5),
//     new Car(road.getLaneCenter(1), -800, 30, 50, "DUMMY", 1.5)
// ];

// animate();

// function save() {
//     localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
// }

// function discard() {
//     localStorage.removeItem("bestBrain");
// }

// function generateCars(N) {
//     const cars = [];
//     for (let i = 1; i <= N; i++) {
//         cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
//     }
//     return cars;
// }

// function animate(time) {
//     for (let i = 0; i < traffic.length; i++) {
//         traffic[i].set_name("traffic");
//         traffic[i].update(road.borders, []);
//     }

//     for (let i = 0; i < cars.length; i++) {
//         cars[i].update(road.borders, traffic);
//     }

//     bestCar = cars.find(
//         c => c.y === Math.min(...cars.map(c => c.y))
//     );

//     carCanvas.height = window.innerHeight;
//     networkCanvas.height = window.innerHeight;

//     carCtx.clearRect(0, 0, carCanvas.width, carCanvas.height);

//     carCtx.save();
//     carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

//     road.draw(carCtx);

//     for (let i = 0; i < traffic.length; i++) {
//         traffic[i].draw(carCtx, "red");
//     }

//     carCtx.globalAlpha = 0.2;
//     for (let i = 0; i < cars.length; i++) {
//         cars[i].draw(carCtx, "blue");
//     }
//     carCtx.globalAlpha = 1;

//     bestCar.draw(carCtx, "blue", true);
//     carCtx.restore();

//     networkCtx.lineDashOffset = -time / 50;
//     Visualizer.drawNetwork(networkCtx, bestCar.brain);
//     requestAnimationFrame(animate);
// }