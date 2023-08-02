// class NeuralNetwork {
//     constructor(neuronCounts) {
//       this.levels = [];
//       for (let i = 0; i < neuronCounts.length - 1; i++) {
//         this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
//       }
//     }
  
//     static feedForward(givenInputs, network) {
//       let outputs = Level.feedForward(givenInputs, network.levels[0]);
//       for (let i = 1; i < network.levels.length; i++) {
//         outputs = Level.feedForward(outputs, network.levels[i]);
//       }
//       return outputs;
//     }
  
//     static mutate(network, amount = 1) {
//       network.levels.forEach((level) => {
//         for (let i = 0; i < level.biases.length; i++) {
//           level.biases[i] = lerp(level.biases[i], Math.random() * 2 - 1, amount);
//         }
//         for (let i = 0; i < level.weights.length; i++) {
//           for (let j = 0; j < level.weights[i].length; j++) {
//             level.weights[i][j] = lerp(level.weights[i][j], Math.random() * 2 - 1, amount);
//           }
//         }
//       });
//     }
//   }
  
//   class Level {
//     constructor(inputCount, outputCount) {
//       this.inputs = new Array(inputCount);
//       this.outputs = new Array(outputCount);
//       this.biases = new Array(outputCount);
//       this.weights = new Array(inputCount).fill().map(() => new Array(outputCount));
//       this.randomize();
//     }
  
//     randomize() {
//       for (let i = 0; i < this.inputs.length; i++) {
//         for (let j = 0; j < this.outputs.length; j++) {
//           this.weights[i][j] = (Math.random() * 2) - 1;
//         }
//       }
  
//       for (let i = 0; i < this.biases.length; i++) {
//         this.biases[i] = (Math.random() * 2) - 1;
//       }
//     }
  
//     static feedForward(givenInputs, level) {
//       for (let i = 0; i < level.inputs.length; i++) {
//         level.inputs[i] = givenInputs[i];
//       }
  
//       for (let i = 0; i < level.outputs.length; i++) {
//         let sum = 0;
//         for (let j = 0; j < level.inputs.length; j++) {
//           sum += level.inputs[j] * level.weights[j][i];
//         }
//         level.outputs[i] = sum > level.biases[i] ? 1 : 0;
//       }
  
//       return level.outputs;
//     }
//   }
// class Level {
//     constructor(inputCount, outputCount) {
//       this.inputs = new Float32Array(inputCount);
//       this.outputs = new Float32Array(outputCount);
//       this.biases = new Float32Array(outputCount);
//       this.weights = new Array(inputCount).fill().map(() => new Float32Array(outputCount));
//       this.randomize();
//     }
  
//     randomize() {
//       for (let i = 0; i < this.inputs.length; i++) {
//         for (let j = 0; j < this.outputs.length; j++) {
//           this.weights[i][j] = (Math.random() * 2) - 1;
//         }
//       }
  
//       for (let i = 0; i < this.biases.length; i++) {
//         this.biases[i] = (Math.random() * 2) - 1;
//       }
//     }
  
//     static feedForward(givenInputs, level) {
//       const { inputs, outputs, weights, biases } = level;
//       for (let i = 0; i < inputs.length; i++) {
//         inputs[i] = givenInputs[i];
//       }
  
//       for (let i = 0; i < outputs.length; i++) {
//         let sum = 0;
//         for (let j = 0; j < inputs.length; j++) {
//           sum += inputs[j] * weights[j][i];
//         }
//         outputs[i] = sum > biases[i] ? 1 : 0;
//       }
  
//       return outputs;
//     }
//   }
  
//   class NeuralNetwork {
//     constructor(neuronCounts) {
//       this.levels = [];
//       for (let i = 0; i < neuronCounts.length - 1; i++) {
//         this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
//       }
//     }
  
//     static feedForward(givenInputs, network) {
//       let outputs = new Float32Array(givenInputs);
//       for (let i = 0; i < network.levels.length; i++) {
//         outputs = Level.feedForward(outputs, network.levels[i]);
//       }
//       return outputs;
//     }
  
//     static mutate(network, amount = 1) {
//       network.levels.forEach((level) => {
//         for (let i = 0; i < level.biases.length; i++) {
//           level.biases[i] = lerp(level.biases[i], Math.random() * 2 - 1, amount);
//         }
//         for (let i = 0; i < level.weights.length; i++) {
//           for (let j = 0; j < level.weights[i].length; j++) {
//             level.weights[i][j] = lerp(level.weights[i][j], Math.random() * 2 - 1, amount);
//           }
//         }
//       });
//     }
  
//     static crossover(parentA, parentB) {
//       const child = new NeuralNetwork([]);
//       for (let i = 0; i < parentA.levels.length; i++) {
//         const parentAWeights = parentA.levels[i].weights.flat();
//         const parentBWeights = parentB.levels[i].weights.flat();
//         const childWeights = [];
//         for (let j = 0; j < parentAWeights.length; j++) {
//           childWeights.push(Math.random() < 0.5 ? parentAWeights[j] : parentBWeights[j]);
//         }
//         const inputCount = parentA.levels[i].inputs.length;
//         const outputCount = parentA.levels[i].outputs.length;
//         child.levels.push(new Level(inputCount, outputCount));
//         child.levels[i].weights = chunkArray(childWeights, outputCount);
//         child.levels[i].biases = Math.random() < 0.5 ? parentA.levels[i].biases.slice() : parentB.levels[i].biases.slice();
//       }
//       return child;
//     }
//   }
  
//   // Helper function to split an array into chunks
//   function chunkArray(arr, size) {
//     const chunkedArr = [];
//     for (let i = 0; i < arr.length; i += size) {
//       chunkedArr.push(arr.slice(i, i + size));
//     }
//     return chunkedArr;
//   }
  

class NeuralNetwork {
    constructor(neuronCounts) {
        this.levels = [];
        for (let i = 0; i < neuronCounts.length - 1; i++) {
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
        }
    }

    static feedForward(givenInputs, network) {
        let outputs = Level.feedForward(givenInputs, network.levels[0]);
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(outputs, network.levels[i]);
        }
        return outputs;
    }

    static mutate(network, mutationRate) {
        network.levels.forEach((level) => {
            for (let i = 0; i < level.biases.length; i++) {
                if (Math.random() < mutationRate) {
                    level.biases[i] = Math.random() * 2 - 1;
                }
            }
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    if (Math.random() < mutationRate) {
                        level.weights[i][j] = Math.random() * 2 - 1;
                    }
                }
            }
        });
    }

    static crossover(parentA, parentB) {
        const child = new NeuralNetwork([parentA.levels[0].inputs.length, ...parentA.levels.map(level => level.outputs.length)]);
        for (let i = 0; i < child.levels.length; i++) {
            const parentSource = Math.random() < 0.5 ? parentA : parentB;
            const parentTarget = child.levels[i];

            for (let j = 0; j < parentTarget.biases.length; j++) {
                parentTarget.biases[j] = parentSource.levels[i].biases[j];
            }
            for (let j = 0; j < parentTarget.weights.length; j++) {
                for (let k = 0; k < parentTarget.weights[j].length; k++) {
                    parentTarget.weights[j][k] = parentSource.levels[i].weights[j][k];
                }
            }
        }
        return child;
    }
}

class Level {
    constructor(inputCount, outputCount) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);
        this.weights = new Array(inputCount).fill().map(() => new Array(outputCount));
        this.randomize();
    }

    randomize() {
        for (let i = 0; i < this.inputs.length; i++) {
            for (let j = 0; j < this.outputs.length; j++) {
                this.weights[i][j] = (Math.random() * 2) - 1;
            }
        }

        for (let i = 0; i < this.biases.length; i++) {
            this.biases[i] = (Math.random() * 2) - 1;
        }
    }

    static feedForward(givenInputs, level) {
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = givenInputs[i];
        }

        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }
            level.outputs[i] = sum > level.biases[i] ? 1 : 0;
        }

        return level.outputs;
    }
}

module.exports = {
    NeuralNetwork,
};

  
  