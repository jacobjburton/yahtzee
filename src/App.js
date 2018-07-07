import React, { Component } from 'react';
import './App.css';
//import roll from './diceRoll.js';

class App extends Component 
{
  constructor()
  {
    super();

    this.state = 
    {
      rolls: [],
      dice: 5,
      sides: 8,
      rolledYet: false
    };
  }

  rollDice = () =>
  {
    this.resetValues();
    var rolled = [];

    for (let i = 0; i < this.state.dice; i++)
    {
        rolled.push(Math.ceil(Math.random() * this.state.sides));
    }
    console.table(rolled);
    this.setState({ rolls: rolled, rolledYet: true });
  }

  resetValues = () =>
  {
    this.setState(
    {
      rolls: [],
      rolledYet: false
    });
  }


  render() 
  {
    let { rolls, rolledYet } = this.state;
    var ones = 0,
      twos = 0,
      threes = 0,
      fours = 0,
      fives = 0,
      sixes = 0,
      sevens = 0,
      eights = 0,
      arrayOfValues = [],
      threeOfAKind = 0,
      fourOfAKind = 0,
      fiveOfAKind = 0,
      noneOfAKind = 0,
      fullHouse = 0,
      sortedRolls = [],
      smStraight = 0,
      lgStraight = 0,
      chance = 0,
      highestScore = {};


    let displayRolls = rolls.map((roll, i) => 
    {  
      return (
        <h4 className="roll" key={i}>{roll}</h4>
      )
    });

    var rollButton = rolledYet ? <button className='button' onClick={this.rollDice}>Roll Again</button> : <button className='button' onClick={this.rollDice}>Roll Dice</button>;

    if (rolledYet)
    {
      var displayResults =
      <div className="rollResults">
        <h2>You rolled:</h2>
        {displayRolls}
      </div>

      chance = rolls.reduce((sum, i) => sum + i, 0);

      var resetButton = <button className='button' onClick={this.resetValues}>Reset</button>
      

      for (let i = 0; i < rolls.length; i++)
      {
        if (rolls[i] === 1) ones++;
        if (rolls[i] === 2) twos++;
        if (rolls[i] === 3) threes++;
        if (rolls[i] === 4) fours++;
        if (rolls[i] === 5) fives++;
        if (rolls[i] === 6) sixes++;
        if (rolls[i] === 7) sevens++;
        if (rolls[i] === 8) eights++;
      }
      arrayOfValues = [ones, twos, threes, fours, fives, sixes, sevens, eights];
      console.table({ones, twos, threes, fours, fives, sixes, sevens, eights});

      

      var noDuplicates = true;
      var twoDuplicates = false;
      var threeDuplicates = false;
      var highest = {};

      for (let i = 0; i < arrayOfValues.length; i++)
      {
        arrayOfValues[i] === 2 ? twoDuplicates = true : twoDuplicates = false;
        if (arrayOfValues[i] === 3)
        {
          threeDuplicates = true;
          threeOfAKind = rolls.reduce((sum, i) => sum + i, 0);
        }
        arrayOfValues[i] === 4 ? fourOfAKind = rolls.reduce((sum, i) => sum + i, 0) : fourOfAKind = 0;
        arrayOfValues[i] === 5 ? fiveOfAKind = rolls.reduce((sum, i) => sum + i, 0): fiveOfAKind = 0;
        arrayOfValues[i] > 1 ? noDuplicates = false : '';
        // arrayOfValues[i] < arrayOfValues[i + 1] ? highest = {arrayOfValues[i + 1]} : highest = {arrayOfValues[i]}

      }

      twoDuplicates && threeDuplicates ? fullHouse = 25 : fullHouse = 0;

      noDuplicates ? noneOfAKind = 40 : noneOfAKind = 0;

      sortedRolls = rolls.slice();
      sortedRolls.sort((a, b) => a - b);
      var numberInOrder = 1;

      for (let i = 0; i < sortedRolls.length - 1; i++)
      {
        if (sortedRolls[i] + 1 === sortedRolls[i+1])
        {
          ++numberInOrder;
        }
  
      }
      numberInOrder === 4 ? smStraight = 30 : smStraight = 0;
      numberInOrder === 5 ? lgStraight = 40 : lgStraight = 0;      
      
    }


    return (
      <div className="App">
        {rollButton}
        {displayResults}
        <div className='score'>
          <div className='sums'>
            {ones > 0 ? <h6 className="results">Ones: {ones} Score: {1 * ones}</h6> : ''}
            {twos > 0 ? <h6 className="results">Twos: {twos} Score: {2 * twos}</h6> : ''}
            {threes > 0 ? <h6 className="results">Threes: {threes} Score: {3 * threes}</h6> : ''}
            {fours > 0 ? <h6 className="results">Fours: {fours} Score: {4 * fours}</h6> : ''}
            {fives > 0 ? <h6 className="results">Fives: {fives} Score: {5 * fives}</h6> : ''}
            {sixes > 0 ? <h6 className="results">Sixes: {sixes} Score: {6 * sixes}</h6> : ''}
            {sevens > 0 ? <h6 className="results">Sevens: {sevens} Score: {7 * sevens}</h6> : ''}
            {eights > 0 ? <h6 className="results">Eights: {eights} Score: {8 * eights}</h6> : ''}
          </div>
          <div className='sets'>
            {threeOfAKind > 0 ? <h6 className="results">Three Of A Kind Found.  Score: {threeOfAKind}</h6> : ''}
            {fourOfAKind > 0 ? <h6 className="results">Four Of A Kind Found.  Score: {fourOfAKind}</h6> : ''}
            {fiveOfAKind > 0 ? <h6 className="results">Five Of A Kind Found.  Score: {fiveOfAKind}</h6> : ''}
            {noneOfAKind > 0 ? <h6 className="results">No duplicates.  Score: {noneOfAKind}</h6> : ''}
            {fullHouse > 0 ? <h6 className="results">Full House!  Score: 25</h6>: ''}
          </div>
          <div className='straights'>
            {smStraight > 0 ? <h6 className="results">Small Straight!  Score: {smStraight}</h6> : ''}
            {lgStraight > 0 ? <h6 className="results">Large Straight!  Score: {lgStraight}</h6> : ''}
          </div>
          <div className='chance'>
            {chance > 0 ? <h6 className="results">Chance Score: {chance}</h6> : ''}
          </div>
          <div className='highScore'>
          </div>
        </div>

        {resetButton}
      </div>
    );
  }
}

export default App;
