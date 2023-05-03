window.onload = function() {
    // add theme functionality
    const styleButtons = document.getElementsByClassName("theme-button");
    styleButtons[0].addEventListener("click", changeTheme0);
    styleButtons[1].addEventListener("click", changeTheme1);
    styleButtons[2].addEventListener("click", changeTheme2);
    styleButtons[0].click();

    function changeTheme1() {
        hideButtons(this);
        const myBody = document.getElementsByTagName('body')[0];
        myBody.classList.remove('neon');
        myBody.classList.add('light');
    }
    
    function changeTheme2() {
        hideButtons(this);
        const myBody = document.getElementsByTagName('body')[0];
        myBody.classList.remove('light');
        myBody.classList.add('neon');
    }
    
    function changeTheme0() {
        hideButtons(this);
        const myBody = document.getElementsByTagName('body')[0];
        myBody.classList.remove('light');
        myBody.classList.remove('neon');
    }
    
    function hideButtons(btn) {
        const styleButtons = document.getElementsByClassName(btn.classList[0])
        for(let i = 0; i < 3; i++){
            styleButtons[i].style.backgroundColor = "transparent";
        }
        btn.style.backgroundColor = "var(--equal)";
    }
    

    // Get the HTML elements
    const valueDisplay = document.getElementById('value');
    const numberButtons = document.querySelectorAll('.num');
    const operatorButtons = document.querySelectorAll('.operator');
    const resetButton = document.getElementById('reset');
    const equalButton = document.getElementById('equal');
    const delButton = document.getElementById('del');
    const dotButton = document.getElementById('dot');

    // Initialize the calculator state
    let currentOperator = null;
    let firstValue = null;
    let secondValue = null;
    let shouldClearDisplay = false;
    let shouldResetOnNum = false;

    // Update the display with the current value
    function updateDisplay(value) {
        valueDisplay.textContent = value.toLocaleString();
    }

    function handleNumberClick(number) {
        console.log(valueDisplay)
        if (shouldClearDisplay) {
          updateDisplay(0);
        }
        // after pressing the equal sign, any press on a number will reset the calculator
        if(shouldResetOnNum){
            resetButton.click();
        }
        
        // if operator is null, there is no value to operate with, so it updates the first value
        if (currentOperator === null) {
            if (firstValue === null) {
                firstValue = number;
            } 
            else {
                firstValue = parseFloat(firstValue.toString() + number.toString());
            }
            updateDisplay(firstValue);
        } 
        else {
            if (secondValue === null) {
                secondValue = number;
            } 
            else {
                secondValue = parseFloat(secondValue.toString() + number.toString());
            }
            updateDisplay(secondValue);
        }
        console.log(firstValue);
        // console.log(currentOperator);
        // console.log(secondValue)
    }

    // Attach event listeners
    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
        handleNumberClick(parseInt(button.textContent));
        });
    });

    // Handle operator button clicks
    function handleOperatorClick(operator) {
        if (currentOperator !== null) {
            calculate();
        }
        currentOperator = operator;
        shouldClearDisplay = true;
        shouldResetOnNum = false;
    }

    // console.log(operatorButtons)
    operatorButtons.forEach((button) => {
        button.addEventListener('click', () => {
            handleOperatorClick(button.textContent);
        });
    });

    // Handle the equals button click
    function handleEqualClick() {
        if (currentOperator === null || secondValue === null) {
        return;
        }
        calculate();
        currentOperator = null;
        shouldClearDisplay = true;
        shouldResetOnNum = true;
    }
    equalButton.addEventListener('click', handleEqualClick);
        
    // Handle the reset button click
    function handleResetClick() {
        firstValue = null;
        secondValue = null;
        currentOperator = null;
        shouldClearDisplay = true;
        shouldResetOnNum = false;
        updateDisplay(0);
    }
    resetButton.addEventListener('click', handleResetClick);
        
    // Handle the delete button click
    function handleDeleteClick() {
        const currentValue = valueDisplay.textContent;
        if (currentValue.length > 1) {
            const newValue = currentValue.slice(0, -1);
            valueDisplay.textContent = newValue;
      
            if (currentValue.includes('.')) {
                // If the current value contains a decimal point, remove only the last character after the decimal point
                console.log(currentValue)
                const decimalIndex = currentValue.indexOf('.');
                const integerPart = currentValue.slice(0, decimalIndex);
                const decimalPart = currentValue.slice(decimalIndex + 1);
                console.log(integerPart)
                console.log(decimalPart)

                // if decimalPart exists, keep integer unchanged, lest it will be sliced
                const newIntegerPart = decimalPart ? integerPart : integerPart.slice(0, -1);
                const newDecimalPart = decimalPart ? decimalPart.slice(0, -1) : '';
                const newNumber = parseFloat(newIntegerPart + '.' + newDecimalPart);
                if (secondValue === null) {
                    firstValue = newNumber;
                    updateDisplay(firstValue);
                } else {
                    secondValue = newNumber;
                    updateDisplay(secondValue);
                }
            } 
            else {
                // If the current value doesn't contain a decimal point, update the number as an integer
                if (secondValue === null) {
                firstValue = Math.floor(firstValue / 10);
                updateDisplay(firstValue);
                } else {
                secondValue = Math.floor(secondValue / 10);
                updateDisplay(secondValue);
                }
            }
        } 
        else {
            valueDisplay.textContent = '0';
            if (secondValue === null) {
                firstValue = null;
            } else {
                secondValue = null;
            }
        }
        shouldResetOnNum = false;
      }
    delButton.addEventListener('click', handleDeleteClick);

    function handleDotClick() {
        // Check if the current value already contains a decimal point
        if (valueDisplay.textContent.includes('.')) {
            return;
        }
    
        // If there is no current value or the current value is 0, display '0.'
        if (valueDisplay.textContent === '' || valueDisplay.textContent === '0') {
            updateDisplay('0.');
        } else {
            // Otherwise, add the decimal point to the current value
            updateDisplay(`${valueDisplay.textContent}.`);
        }
        
        // Reset shouldClearDisplay so that the user can continue typing numbers
        shouldClearDisplay = false;
    }
    dotButton.addEventListener('click', handleDotClick);
    // Perform the calculation
    function calculate() {
        switch (currentOperator) {
        case '+':
            // console.log("test")
            firstValue += secondValue;
            break;
        case '-':
            firstValue -= secondValue;
            break;
        case 'x':
            firstValue *= secondValue;
            break;
        case '/':
            firstValue /= secondValue;
            break;
        }
        secondValue = null;
        updateDisplay(firstValue);
    }
}




  