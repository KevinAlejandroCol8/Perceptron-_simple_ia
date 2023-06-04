// Definicion de la funcion de activacion (en este caso, la funcion escalon)
function activationFunction(sum) {
    return sum < 0 ? 0 : 1;
  }
  
  // Clase para representar una neurona artificial
  class Neuron {
    constructor(numInputs, learningRate) {
      this.weights = [];
      this.bias = Math.random();
      this.learningRate = learningRate;
  
      // Inicializacion aleatoria de los pesos sinapticos
      for (let i = 0; i < numInputs; i++) {
        this.weights.push(Math.random());
      }
    }
  
    // Funcion para calcular la salida de la neurona
    calculateOutput(inputs) {
      let sum = this.bias;
      for (let i = 0; i < inputs.length; i++) {
        sum += inputs[i] * this.weights[i];
      }
      return activationFunction(sum);
    }
  
    // Funcion para ajustar los pesos sinapticos y el umbral segun el resultado obtenido
    adjustWeights(inputs, target) {
      const output = this.calculateOutput(inputs);
      const error = output - target;
      for (let i = 0; i < this.weights.length; i++) {
        this.weights[i] += this.learningRate * error * inputs[i];
      }
      this.bias += this.learningRate * error;
    }
  
    // Funcion para obtener los parametros aprendidos por la neurona
    getLearnedParameters() {
      return this.weights;
    }
  }
  
  // Funcion para manejar el evento de envío del formulario
  function handleFormSubmit(event) {
    event.preventDefault();
  
    const inputLabels = ["X1", "X2", "Valor"];
  
    const numInputs = inputLabels.length; // Numero de entradas
  
    // Obtener el factor de aprendizaje del formulario
    const learningRate = parseFloat(document.getElementById("learning-rate").value);
  
    const neuron = new Neuron(numInputs, learningRate);
  
    // Entrada de datos
    const inputs = [];
    for (let i = 0; i < numInputs; i++) {
      const inputValue = parseFloat(document.getElementById(`input-${i}`).value);
      inputs.push(inputValue);
    }
  
    // Etiqueta de clase (1 para apto, 0 para no apto)
    const target = parseInt(document.getElementById("target").value);
  
    // Calcular la salida de la neurona
    const output = neuron.calculateOutput(inputs);
  
    // Verificar si la prediccion es correcta
    const isPredictionCorrect = output === target;
    const resultMessage = `Lo valores  ${isPredictionCorrect ? "aprobados" : "no aprobados"} .`;
    document.getElementById("result").textContent = resultMessage;
  
    // Mostrar los parametros aprendidos por la neurona
    const learnedParameters = neuron.getLearnedParameters();
    const learnedParamsList = document.getElementById("learned-parameters");
    learnedParamsList.innerHTML = "";
    /*for (let i = 0; i < learnedParameters.length; i++) {
      const listItem = document.createElement("li");
      listItem.textContent = `Pesos sinapticos ${i + 1}: ${learnedParameters[i]}`;
      learnedParamsList.appendChild(listItem);
    }*/
    for (let i = 0; i < learnedParameters.length; i++) {
        const listItem = document.createElement("li");
        const roundedValue = learnedParameters[i].toFixed(2);
        listItem.textContent = `Pesos sinápticos ${i + 1}: ${roundedValue}`;
        learnedParamsList.appendChild(listItem);
      }
  }
  
  // Asociar la funcion de manejo del evento al formulario
  document.getElementById("input-form").addEventListener("submit", handleFormSubmit);
  