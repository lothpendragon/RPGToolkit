
/*
    so when the algorithim starts it sets a loop the size of the dice rolls, it will then
    going throught the loop generate a random number the within a range of the dice side value.
    at each loop it will put the roll result into the lower output field, showing the rolls.
    when each roll is done all numbers rolled will be added together and the modifier will be added
    to the value and this will be displayed in the upper output field.
 */
//COMP08068
function rolldice(elem, rollClass, diceClass, modClass)
{
    //Get the parent div
    var par = elem.parent();

    var rolls = par.siblings(rollClass).find('input');
    var dice = par.siblings(diceClass).find('input');
    var mod = par.siblings(modClass).find('input');

    rolls = parseInt(rolls.val());
    dice = parseInt(dice.val());
    mod = parseInt(mod.val());

    var randomNumber = [];
    var totalNum = 0;
    var seperateRolls="";

    for(var i = 0; i < rolls; i++)
    {
         randomNumber.push(Math.floor(Math.random() * dice)+1);
         totalNum += randomNumber[i];
        // display roll to list in seperate roll field
        //alert("value "+ (i+1) + ": " + randomNumber[i]);
        seperateRolls += randomNumber[i]+", ";
    }

    var endNum = totalNum + mod;
    par.siblings(".seperateRolls").find(".SeperateResults").html("Rolls: " +'<br>'+ seperateRolls);
    par.siblings(".TotalRoll").find(".RollResult").html("Total: "+ endNum);
}






