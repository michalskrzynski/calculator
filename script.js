const expressionElem = document.querySelector('#expression');
const currNumElem = document.querySelector('#current-number');

const inputDigitList = document.querySelectorAll('button.input-digit'); //digits and '.'
const inputFunctionList = document.querySelectorAll('button.input-function');
const inputDot = document.querySelector('button.input-dot');
const inputEquals = document.querySelector('button.input-equals');

let expression = '';
let currNum = '0';
let lastResult = 0;
let expressionInProgress = true;
let useLastResult = false;
let noDigitClicked = true;

/// 
/// Util functions
///

const displayExpression = () => {
  expressionElem.textContent = expression;
}

const displayCurrNum = () => {
  currNumElem.textContent = currNum;
}

const resetExpression = () => {
  expression = '';
}

const getCurrNum = () => {
  return currNum;
}

const clearCurrNum = () => {
  currNum = '0';
  noDigitClicked = true;
}

const currNumEval = () => {
  return eval( getCurrNum() );
}


///
/// We're separating the logic from display 
/// Functions provide funcionality of calculator on just global vars without DOM
///
const takeDigit = (d) => {
  if( !expressionInProgress ) expression = '';

  useLastResult = false; 
  noDigitClicked = false;
  expressionInProgress = true;

  currNum = currNum  === '0' ? d : currNum + d;
}


const takeFunction = (f) => {
  const num = useLastResult ? lastResult : currNum;
  if( noDigitClicked && !lastResult ) num = '';

  if( expressionInProgress ) expression = expression + num + ' ' + f + ' ';
  else expression = num + ' ' + f + ' ';
  
  expressionInProgress = true;
}


const takeDot = () => {
  useLastResult = false;
  noDigitClicked = false;
  expressionInProgress = true;

  currNum = currNum.includes('.') ? currNum : currNum + '.';
}


const hitEquals = () => {
  if( noDigitClicked ) return;
  //only expressions that are in progress are to be evaluated
  if( !expressionInProgress ) return; 
  

  expression += currNum;
  lastResult = eval( expression );
  expression += ' = ' + lastResult;
  expressionInProgress = false;
  useLastResult = true;
}



///
/// All event handlers
///
const inputDigitClicked = (e) => { 
  takeDigit( e.srcElement.dataset.value ) 

  displayCurrNum();
  displayExpression();
}
const inputFunctionClicked = (e) => { 
  takeFunction( e.srcElement.dataset.value ); 

  displayExpression();
  clearCurrNum();
  displayCurrNum();
}

const inputEqualsClicked = (e) => {
  hitEquals();

  displayExpression();
  clearCurrNum();
  displayCurrNum();
}

const clearClicked = (e) => {
  if( expressionInProgress ) {
    resetExpression();
    displayExpression();
  }

  clearCurrNum(); 
  displayCurrNum();
}

const deleteClicked = (e) => {
  console.log('delete');
}




const inputDotClicked = (e) => {
  takeDot();
  displayCurrNum();
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

