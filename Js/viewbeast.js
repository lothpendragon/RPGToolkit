
var ref = firebase.database().ref("Bestiary/");
ref.on("value", gotData);

function gotData(data) {
    var beasts = data.val();
    var keys = Object.keys(beasts);
    console.log(beasts);
    for (var i = 0; i < keys.length; i++)
    {
        var k = keys[i];
        var name = beasts[k].Name;
        var stats = beasts[k].Stat;
        var description =beasts[k].Desc;
        document.getElementById("beasts").innerHTML +=("<b>Beast Name: </b>" + name + "<br> " + "<b> Stats: </b>" +  stats +"<br>" + "<b> Description: </b>" + description + "<br><br>");


    }
}