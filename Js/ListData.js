//CREATED BY DAMIAN SLOCOMBE

var charactersInfo = [];

function Character(name, init, mod)
    {
    this.name = name;
    this.init = init;
    this.mod = mod;
    }

function saveList()
    {
    /* Old version - not needed and useless.
    //TODO - Sort out implicit deceleration issues to stop needing to re-declare here
    characters = $(".charInitList li");
    var charCounter =  $(".charInitList li").length;*/


    //Recycle the variable to get the children of children
    //Get info per character and set into an enum stored into an array
    var charInfo = $(".charInitList .character-box");
    charInfo = charInfo.find("h1");

    for (var i = 0; i < charInfo.length/3 ; i++)
        {
        var inc = (i * 3);

        var name = charInfo.eq(inc).html();
        var mod  = charInfo.eq(1 + inc).html();
        var init = charInfo.eq(2 + inc).html();

        var charData = new Character(name, mod, init);

        charactersInfo.push(charData);
        }
    console.log(charactersInfo);

    charCounter =  $(".charInitList li").length;

    if (charCounter > 0)
        {
        //Save the Contact List
        localStorage.setItem("Char Data", JSON.stringify(charactersInfo));

        //Write to log
        console.log(localStorage.getItem("Char Data"));
        }
    else
        {
        alert("No data to save!");
        }
    }

function loadList()
    {
    if (localStorage.getItem("Char Data") !== null)
        {
        //$(".charInitList li").not(':first').remove();
        var data = localStorage.getItem("Char Data");
        data = JSON.parse(data);

        //Get the parent
        var CharListPar = $(".charInitList");  //Character List

        //Get the list and the last one (after clearing - meaning the only one there)
        var CharList = $(".charInitList li");
        CharList.not(':first').remove();

        for (var i = 0; i < data.length - 1; i++)
            {
            //Get the element left over and duplicate
            var CharLast = $(".charInitList li").last();
            var newChar = CharLast.clone().appendTo(CharListPar);
            }

        for (var j = 0; j < data.length; j ++)
            {
            var inc = j * 3;

            //Set the correct data
            var charInfo = $(".charInitList .character-box");
            charInfo = charInfo.find("h1");

            charInfo.eq(inc).html(data[j].name);
            charInfo.eq(1 + inc).html(data[j].mod);
            charInfo.eq(2 + inc).html(data[j].init);
            }
        console.log("Loaded Array Data");
        console.table(data);
        }
    else
        {
        alert("No data to load");
        }
    }