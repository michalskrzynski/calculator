const expressionElem = document.querySelector('#expression');
const currNumElem = document.querySelector('#current-number');

const inputDigitList = document.querySelectorAll('button.input-digit'); //digits and '.'
const inputFunctionList = document.querySelectorAll('button.input-function');
const inputDot = document.querySelector('button.input-dot');
const inputEquals = document.querySelector('button.input-equals');

let lastResult = 0;
let expressionInProgress = true;
let useLastResult = false;
let noDigitClicked = true;

/// 
/// Expression and current number globals + resetters
///
let expression = '';
let currNum = '0';


const resetExpression = () => {
  expression = '';
}

const resetCurrNum = () => {
  currNum = '0';
  noDigitClicked = true;
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



const applyDelete = () => {
  if( currNum.length === 1 ) currNum = '0';
  else currNum = currNum.slice( 0, currNum.length - 1 );
}


////////
////////  Calculator working on globals ends HERE ^^^^^^
////////  The above part allows to JEST it!
////////



///
/// DOM display functions
///
const displayExpression = () => {
  expressionElem.textContent = expression;
}

const displayCurrNum = () => {
  currNumElem.textContent = currNum;
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
  resetCurrNum();
  displayCurrNum();
}


const inputEqualsClicked = (e) => {
  hitEquals();

  displayExpression();
  resetCurrNum();
  displayCurrNum();
}


const inputDotClicked = (e) => {
  takeDot();
  displayCurrNum();
}


const clearClicked = (e) => {
  if( expressionInProgress ) {
    resetExpression();
    displayExpression();
  }

  resetCurrNum(); 
  displayCurrNum();
}


const deleteClicked = (e) => {
  applyDelete();
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

