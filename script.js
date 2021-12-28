class Calculator { // for storing input & displaying input
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear() //.this is so when it first starts up, the screen is blank
    }
  
    clear() { // clears out variables
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() { // for deleting variables
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) { //this occurs every time a user clicks on a number. It is a function
      if (number === '.' && this.currentOperand.includes('.')) return //so there is only 1 period
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return //so if no numbers are entered, will not work.
      if (this.previousOperand !== '') {
        this.compute() //updates all variables as needed.
      }
      this.operation = operation
      this.previousOperand = this.currentOperand //tells it that we are done typing the current number
      this.currentOperand = '' //clears the operand so you can type in a new value 
    }
  
    compute() {
      let computation //the result of the compute function
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return //if the user enters no numbers, but clicks the equal button, the code will not run. Will cancel the function.
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation // equal to the result of our computation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    getDisplayNumber(number) { //helper function - adds commas to large numbers
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) { //so it the there are decimal digits, use a decimal 
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() { // allows the display to update
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` //creates Concatenation (ei 2 + 2)
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  // info in [] pull from html elements
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  // this creates a new calculator object, something to act upon
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) // this is passing this objects into the calculator
  
  numberButtons.forEach(button => { // it will loop thru all to the buttons
    button.addEventListener('click', () => { // do something when button is clicked
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay() // lets the display update, every time a button is clicked
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => { //waits for click
    calculator.compute() // tells it to call the compute function, when clicked
    calculator.updateDisplay() //tells it to update the display of the calculator
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear() // lets you clear the output field after performing a calculation.
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })