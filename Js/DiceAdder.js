var diceLength;

function NewDice()
{
    var diceList = $(".dice-list").last();

    diceList.clone().appendTo(".dice-wrapper");

   diceLength = $(".rolls input").length;

}

function RemoveDice()
{
    if (diceLength > 1)
        {
        var diceList = $(".dice-list").last();
        diceList.remove();
        }
}