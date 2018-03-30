//CREATED BY DAMIAN SLOCOMBE

//Function for the whole html element group
function NewCharacter()
    {
    var CharList = $(".charInitList");  //Character List
    var CharLast = $(".charInitList li").last();

    var newChar = CharLast.clone().appendTo(CharList);
    //CharList.append(CharLast.clone());

    //Get the div needed
    var getData = newChar.children(".character-box");

    //Get and recycle the variable to find the h1 elements
    var charInfo = getData.children().not("span");
    charInfo = charInfo.children();

    //Set default values
    charInfo.eq(0).html("New Character");
    charInfo.eq(1).html("0");
    charInfo.eq(2).html("0");

    console.log("Added Character");
    }

