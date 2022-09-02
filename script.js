const expressionElem = document.querySelector('#expression');
const currNumElem = document.querySelector('#current-number');

const inputDigitList = document.querySelectorAll('button.input-digit'); //digits and '.'
const inputFunctionList = document.querySelectorAll('button.input-function');
const inputDot = document.querySelector('button.input-dot');
const inputEquals = document.querySelector('button.input-equals');

let expression = '';

let lastResult = 0;
let useLastResult = false;

/// 
/// Util functions
///

const displayExpression = () => {
  expressionElem.textContent = expression;
}

const resetExpression = () => {
  expression = '';
  displayExpression();
}

const isExpressionInProgress = () => {
  return !(expressionElem.textContent.includes('=') || expressionElem.textContent === '' );
}

const getCurrNum = () => {
  return currNumElem.textContent;
}

const clearCurrNum = () => {
  currNumElem.textContent = '0';
  useLastResult = true;
}

const currNumEval = () => {
  return eval( getCurrNum() );
}




///
/// All event handlers
///
const clearClicked = (e) => {
  console.log('CLEAR');
  resetExpression();
  clearCurrNum(); 
}

const deleteClicked = (e) => {
  console.log('delete');
}




const inputDigitClicked = (e) => {
  //if user clicked 0, we dont want to use last result when function pressed
  useLastResult = false; 


  const digit = e.srcElement.dataset.value;
  console.log('Digit:' + digit );
 

  currNumElem.textContent = getCurrNum() === '0' ? digit : getCurrNum() + digit;
  console.log('Current number eval:' + currNumEval() );
}

const inputDotClicked = (e) => {
  currNumElem.textContent = getCurrNum().includes('.') ? getCurrNum() : getCurrNum() + '.';
  
  console.log('Current number eval:' + currNumEval() );
}




const inputFunctionClicked = (e) => {
  const func = e.srcElement.dataset.value;
  const num = useLastResult ? lastResult : getCurrNum();

  if( isExpressionInProgress() ) expression = expression + num + ' ' + func + ' ';
  else {
    expression = num + ' ' + func + ' ';
  }

  displayExpression();
  clearCurrNum();
}




const inputEqualsClicked = (e) => {
  console.log('equals');
  //expression = expression + currNumElem.textContent;
  expressionElem.textContent += currNumElem.textContent;
  lastResult = eval( expressionElem.textContent );
  expressionElem.textContent += ' = ' + lastResult;
  clearCurrNum();
}


///
/// Registering event handlers
///
document.querySelector('#button-clear').addEventListener('click', clearClicked);
document.querySelector('#button-delete').addEventListener('click', deleteClicked);
inputDigitList.forEach( id => id.addEventListener('click', inputDigitClicked) );
inputFunctionList.forEach( ifun => ifun.addEventListener('click', inputFunctionClicked ) );
inputDot.addEventListener('click', inputDotClicked );
inputEquals.addEventListener('click', inputEqualsClicked );

