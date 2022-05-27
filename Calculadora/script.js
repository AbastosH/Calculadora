//Classe Calculadora para guardar os currentNumbers e previousNumbers
class Calculator {
  //setando os valores dentro da Classe
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }
  //Operações que a Calculadora ira fazer

  //Limpar tudo
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  //Deletar ultimo numero
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  //Adicionar o numero a tela
  //Acrescentar o proximo numero clicado no display em String por o + em JS ira fazer a operação
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  //Escolher a operação
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
  //Calculo das operações
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '÷':
        computation = prev / current
        break
      case '*':
        computation = prev * current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])  //split vai transformar o numero em array sendo dividio pelo '.' antes [0] e depois[1] do ponto 
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDisplay)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    }// else {return integerDisplay    }
  }

  //Botar o resultado da operação no 'Display'
  //Se a operação não for null concatenar o previousOperand e o simbolo da operação
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand
    if (this.operation != null) {
    this.previousOperandTextElement.innerText = 
    `${this.previousOperand} ${this.operation}`
    } else {
      return this.previousOperand = ''
    }
  }
}

//Criando as variaves das operações da calculadora
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
)
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
)

//Criando uma calculadora definindo 'new' para definir uma classe
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
)

//Implementando o EventListener para cada botão e declarando as funções e argumentos

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButtons.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButtons.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButtons.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
