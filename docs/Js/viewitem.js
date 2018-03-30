
var ref = firebase.database().ref("Items/");
ref.on("value", gotData);

function gotData(data)
{

   // alert( document.getElementById("Items"));

    var items = data.val();
    var keys = Object.keys(items);


    console.log(items);


    for (var i = 0; i < keys.length; i++)
    {
        var k = keys[i];
        var name = items[k].Name;
        var stats = items[k].Stat;
        var description =items[k].Desc;
        document.getElementById("Items").innerHTML +=("<b>Item Name: </b>" + name + "<br> " + "<b> Stats: </b>" +  stats +"<br>" + "<b> Description: </b>" + description + "<br><br>");


    }
}