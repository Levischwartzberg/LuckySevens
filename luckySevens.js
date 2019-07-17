//roll dice rolls two six sided dice by generating two random numbers between 0 and 5, rounding down, and then adding one.
function rollDice() {
  var d1 = 0;
  var d2 = 0;

  d1 = Math.floor(Math.random()*6) + 1;
  d2 = Math.floor(Math.random()*6) + 1;

  return d1 + d2;
}

//playGame plays the whole game until the money is gone
function playGame() {
  var money = document.getElementById("bet").value;
  //multiplying by one to ensure that the program treats money as a number and not a string
  money = money * 1;
  //check to ensure that the user enters in an appropriate bet
  if (money <= 0) {
    alert("You must enter a number greater than zero");
    document.forms["sevens"]["bet"].focus();
    exit;
  }

  //adds the starting money value to the table before it drops to zero
  document.getElementById("money").innerText = "$" + money;

  //initiates plays, array of all plays, and the value measuring the amount of plays until the max amount
  var plays = 0;
  var allPlays = [money];
  var tillMax = 0;

  //while loop runs the game until the money runs out
  while (money > 0) {
    var roll = rollDice();
    if (roll == 7) {
      money = money + 4;
      allPlays.push(money);
      plays++;
      //console logs for bug testing
      //console.log(money + ",   " + roll);
    }
    else {
      money = money - 1;
      allPlays.push(money);
      plays++;
      //console.log(money + ",   " + roll);
    }
  }

    //returns/resets all appropriate values
    document.getElementById("results").style.display = "block";
    document.getElementById("results_table").style.display = "block";
    document.getElementById("resetButton").style.display = "block";
    document.getElementById("submitButton").style.display = "none";

    document.getElementById("plays").innerText = plays;
    document.getElementById("max").innerText = "$" + getMax(allPlays);
    document.getElementById("till_max").innerText = getMaxIndex(allPlays);

    document.getElementById("bet").value = 0;

    return false;
}

//finds the maximum in an array
function getMax(array) {
  var max = 0;
  for (var i = 0; i < array.length; i++){
    if (array[i] > max) {
      max = array[i];
    }
    else {
      max = max;
    }
  }
  return max;
}

//essentially the same as the find max function, except we track and return the index of the maximum instead of the value
function getMaxIndex(array) {
  var index = 0;
  var max = 0;
  for (var i = 0; i < array.length; i++){
    if (array[i] > max) {
      max = array[i];
      index = i;
    }
    else {
      max = max;
      index = index;
    }
  }
  return index;
}

//resets the form when the play again button is pressed
function resetForm() {
    document.getElementById("results").style.display = "none";
    document.getElementById("submitButton").style.display = "block";
    document.getElementById("results_table").style.display = "none";
    document.getElementById("resetButton").style.display = "none";
    document.getElementById("resetButton").innerText = "Play Again";
    document.getElementById("submitButton").innerText = "Play";
    document.forms["sevens"]["bet"].focus();
}

//announces the rules/idea of the game 
function welcome() {
  alert("This is Lucky Sevens. Enter a starting bet higher than zero (risking one dollar per play) and witness how long it takes for your money to dwindle." +
" Also see stats on how much money you could have ended with were you smart enough to quit at the optimal moment!");
  return false;
}
