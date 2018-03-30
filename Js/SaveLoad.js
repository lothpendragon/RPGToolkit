var diceList = [];

function DiceSet(rolls, dice, mod)
{
    this.rollCount = rolls;
    this.diceSides = dice;
    this.modNum = mod;
}

function SavePage()
{
    //Clear data to stop ... overflow
    diceList = [];

    //Get the classes
    var rolls = $(".rolls input");
    var dice = $(".dice input");
    var mod = $(".modifier input");

    /* DEBUG
    alert(rolls.length);
    alert(dice.length);
    alert(mod.length);
   */

    for (var i = 0; i < rolls.length; i++)
    {
        //Inc to each div for data
        var rl = rolls.eq(i).val();
        var dc = dice.eq(i).val();
        var md = mod.eq(i).val();

        //Create object
        var diceData = new DiceSet(rl, dc, md);

        //Push array
        diceList.push(diceData);
    }

    //Show Data
    console.warn("Do not mess with the array unless you know what you're doing!")
    console.log(diceList);

    diceLength = $(".rolls input").length;

    //Make sure there is actually data to save
    if (diceLength > 0)
    {
        localStorage.setItem("Dice Data", JSON.stringify(diceList));
        console.log(localStorage.getItem("Dice Data"));
    }
    else
    {
        alert("No data to save!");
    }
}

function loadList()
    {
    if (localStorage.getItem("Dice Data") !== null)
        {
        var data = localStorage.getItem("Dice Data");
        data = JSON.parse(data);

        var par = $(".dice-list");
        par.not(":first").remove();


        for (var i = 0; i < data.length - 1; i++)
            {
            var diceLast = $(".dice-list").last();
            diceLast.clone().appendTo(".dice-wrapper");
            }

        for (var j = 0; j < data.length; j++)
            {
            var rolls = $(".rolls input");
            var dice = $(".dice input");
            var mod = $(".modifier input");

            //Inc to each div for data
            rolls.eq(j).val(data[j].rollCount);
            dice.eq(j).val(data[j].diceSides);
            mod.eq(j).val(data[j].modNum);
            }
        }
    }
