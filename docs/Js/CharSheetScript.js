var DEBUG = false;

function DnDCharacter (obj) {

    //core info
    this.playerName = "User";
    this.characterName = "Unnamed";
    this.class = "Fighter";
    this.level = 1;
    this.background = "";
    this.race = "Human";
    this.alignment = "Neutral";
    this.experiencePoints = 0;
    this.skills = [];
    this.attributes = [];
    this.passiveWisdomPerception = 0;
    this.proficiencyBonus = 2;
    this.inspiration = 0;
    this.armorClass = 0;
    this.initiative = 0;
    this.speed = 30;
    this.maxHitPoints = 0;
    this.currentHitPoints = 0;
    this.temporaryHitPoints = 0;
    this.maxTemporaryHitPoints = 0;
    this.hitDiceValue = 4;
    this.hitDiceTotal = 1;
    this.copperPieces = 0;
    this.silverPieces = 0;
    this.electrumPieces = 0;
    this.goldPieces = 0;
    this.platinumPieces = 0;
    this.equipment = "";

    //items to be implemented later (extras)
/*    {   this.deathSaveSuccesses = 0;
        this.deathDaveFailures = 0;
        this.proficiences = "";
        this.languages = "";
        this.attacks = "";
        this.spells = "";
        this.personalityTraits = "";
        this.ideals = "";
        this.bonds = "";
        this.flaws = "";
        this.featuresAndTraits = "";
        this.age = 0;
        this.height = "";
        this.weight = "";
        this.eyeColour = "";
        this.skinColour = "";
        this.hairColour = "";
        this.appearance = "";
        this.backstory = "";
        this.allies = "";
        this.organisations = "";
        this.treasure = "";
        this.spellcastingClass = 0;
        this.spellcastingAbility = 0;
        this.spellSaveDC = 0;
        this.spellAttackBonus = 0;
        this.spellLevel0KnownCantrips = 0;
        this.spellLevel1KnownSpells = 0;
        this.spellLevel1Slots = 0;
        this.spellLevel1SlotsExpended = 0;
        this.spellLevel2KnownSpells = 0;
        this.spellLevel2Slots = 0;
        this.spellLevel2SlotsExpended = 0;
        this.spellLevel3KnownSpells = 0;
        this.spellLevel3Slots = 0;
        this.spellLevel3SlotsExpended = 0;
        this.spellLevel4KnownSpells = 0;
        this.spellLevel4Slots = 0;
        this.spellLevel4SlotsExpended = 0;
        this.spellLevel5KnownSpells = 0;
        this.spellLevel5Slots = 0;
        this.spellLevel5SlotsExpended = 0;
        this.spellLevel6KnownSpells = 0;
        this.spellLevel6Slots = 0;
        this.spellLevel6SlotsExpended = 0;
        this.spellLevel7KnownSpells = 0;
        this.spellLevel7Slots = 0;
        this.spellLevel7SlotsExpended = 0;
        this.spellLevel8KnownSpells = 0;
        this.spellLevel8Slots = 0;
        this.spellLevel8SlotsExpended = 0;
        this.spellLevel9KnownSpells = 0;
        this.spellLevel9Slots = 0;
        this.spellLevel9SlotsExpended = 0;
    }*/
    //handles initialising/creating from JSON
    for (var prop in obj) {if (obj.hasOwnProperty(prop)) {this[prop] = obj[prop];}}

    this.initialise = function() {
        if (DEBUG) console.log("\n\nBeginning base character initialisation.\n");

        //attribute defaults
        this.attributes.push(new Attribute("Strength", "STR", 10, false, ["Athletics"]));
        this.attributes.push(new Attribute("Dexterity", "DEX", 10, false, ["Acrobatics", "Sleight of Hand", "Stealth"]));
        this.attributes.push(new Attribute("Constitution", "CON", 10, false, []));
        this.attributes.push(new Attribute("Intelligence", "INT", 10, false, ["Arcana", "History", "Investigation", "Nature", "Religion"]));
        this.attributes.push(new Attribute("Wisdom", "WIS", 10, false, ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"]));
        this.attributes.push(new Attribute("Charisma", "CHA", 10, false, ["Deception", "Intimidation", "Performance", "Persuasion"]));

        this.attributes.forEach(function(current) {
            current.calculateModifier();
            if (DEBUG) console.log(current.toString());});
        console.log("\n");

        //skill defaults
        var skillList =
            ["Acrobatics","Animal Handling","Arcana","Athletics","Deception","History","Insight","Intimidation","Investigation",
            "Medicine","Nature","Perception","Performance","Persuasion","Religion","Sleight of Hand","Stealth","Survival"];
        var sks = this.skills;
        skillList.forEach(function (current) {
            sks.push(new Skill(current.toString(), 0, false));});
        if (DEBUG) this.skills.forEach(function(current){
            console.log(current.toString());});

        this.updateStats();


        console.log("\nEnding base character initialisation.\n\n");
    };
    this.updateStats = function() {
        this.passiveWisdomPerception = this.getAttribute("Wisdom")[0].calculateModifier() + 10;
        this.initiative = this.getAttribute("Dexterity")[0].mod + 10;
    };
    this.getAttribute = function(attributeName){
        var filtered = this.attributes.filter(function(current) {
                return current.attrName === attributeName;});
        return filtered;
    };

    this.getSkill = function(skillName){
        var filtered = this.skills.filter(function(current) {
            return current.skillName === skillName;});
        return filtered;
    };
    this.displayCoreInfo = function(){
        return "        <!-- List Header -->\n" +
            "                <div class=\"ui-bar-a\" data-role=\"collapsible\" data-collapsed=\"false\">\n" +
            "                    <h1 class=\"ui-bar\">Core Info</h1>\n" +
            "                    <div class=\"ui-body ui-body-a character-list\">" +
            "                        <div>\n" +
            "                            <table style=\"width: 100%\">\n" +
            "                                <tr>\n" +
            "                                    <td><label for=\"playerName\">Player:</label></td>\n" +
            "                                    <td><label><input type=\"text\" id=\"playerName\" value=\"" + this.playerName + "\"></label></td>\n" +
            "                                </tr>\n" +
            "                                <tr>\n" +
            "                                    <td><label for=\"characterName\">Name:</label></td>\n" +
            "                                    <td><label><input type=\"text\" id=\"characterName\" value=\"" + this.characterName + "\"></label></td>\n" +
            "                                </tr>\n" +
            "                                <tr>\n" +
            "                                    <td><label for=\"level\">Level:</label></td>\n" +
            "                                    <td><label><input type=\"number\" id=\"level\" value=\"" + this.level + "\"></label></td>\n" +
            "                                </tr>\n" +
            "                                <tr>\n" +
            "                                    <td><label for=\"race\">Race:</label></td>\n" +
            "                                    <td><label><input type=\"text\" id=\"race\" value=\"" + this.race + "\"></label></td>\n" +
            "                                </tr>\n" +
            "                                <tr>\n" +
            "                                    <td><label for=\"class\">Class:</label></td>\n" +
            "                                    <td><label><input type=\"text\" id=\"class\" value=\"" + this.class + "\"></label></td>\n" +
            "                                </tr>\n" +
            "                                <tr>\n" +
            "                                    <td><label for=\"background\">Background:</label></td>\n" +
            "                                    <td><label><input type=\"text\" id=\"background\" value=\"" + this.background + "\"></label></td>\n" +
            "                                </tr>\n" +
            "                                <tr>\n" +
            "                                    <td><label for=\"alignnment\">Alignment:</label></td>\n" +
            "                                    <td><label><input type=\"text\" id=\"alignnment\" value=\"" + this.alignment + "\"></label></td>\n" +
            "                                </tr>\n" +
            "                                <tr>\n" +
            "                                    <td><label for=\"experiencePoints\">Experience:</label></td>\n" +
            "                                    <td><label><input type=\"number\" id=\"experiencePoints\" value=\"" + this.experiencePoints + "\"></label></td>\n" +
            "                                </tr>\n" +
            "                            </table>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "            </div>";
    };
    this.displayQuickCard = function(){
        return "        <h1 class=\"ui-bar\">Quick Card</h1>\n" +
            "        <div class=\"ui-body ui-body-a character-list\">\n" +
            "            <div class=\"ui-grid-a ui-responsive\">\n" +
            "                <div class=\"ui-grid-a\">" +
            "<div id=\"" + this.armorclass + "\" class=\"ui-block-a\">AC:<input type=\"number\" value=\"" + this.armorClass + "\"></div>\n" +
            "<div id=\"" + this.initiative + "\" class=\"ui-block-b\">INIT:<input type=\"number\" value=\"" + this.initiative + "\"></div>\n" +
            "<div id=\"" + this.speed + "\" class=\"ui-block-a\">SPEED:<input type=\"number\" value=\"" + this.speed + "\"></div>\n" +
            "<div id=\"" + this.passiveWisdomPerception + "\" class=\"ui-block-b\">PERC:<input type=\"number\" value=\"" + this.passiveWisdomPerception + "\"></div>\n" +
            "\n" +
            "<div id=\"" + this.currentHitPoints + "\" class=\"ui-block-a\">HP:<input type=\"number\" value=\"" + this.currentHitPoints + "\"></div>\n" +
            "<div id=\"" + this.maxHitPoints + "\" class=\"ui-block-b\">MAX HP:<input type=\"number\" value=\"" + this.maxHitPoints + "\"></div>\n" +
            "<div id=\"" + this.temporaryHitPoints + "\" class=\"ui-block-a\">TEMP HP:<input type=\"number\" value=\"" + this.temporaryHitPoints + "\"></div>\n" +
            "<div id=\"" + this.maxTemporaryHitPoints + "\" class=\"ui-block-b\">MAX TEMP HP:<input type=\"number\" value=\"" + this.maxTemporaryHitPoints + "\"></div>\n" +
            "\n" +
            "<div id=\"" + this.hitDiceValue + "\" class=\"ui-block-a\">HIT DICE:<input type=\"text\" value=\"d" + this.hitDiceValue + "\"></div>\n" +
            "<div id=\"" + this.hitDiceTotal + "\" class=\"ui-block-b\">TOTAL HIT DICE:<input type=\"number\" value=\"" + this.hitDiceTotal + "\"></div>\n" +
            "\n" +
            "<div id=\"" + this.inspiration + "\" class=\"ui-block-a\">INSP:<input type=\"number\" value=\"" + this.inspiration + "\"></div>\n" +
            "<div id=\"" + this.proficiencyBonus + "\" class=\"ui-block-b\">PROF BONUS:<input type=\"number\" value=\"" + this.proficiencyBonus + "\"></div>";

    };
    //issues regarding saving / loading of Attributes and Skills could not be resolved in time allowed.
    //This may require further thought and some redesign of the class structure.
    /*    this.displayAttributes = function(){
        var attributeDisplay = "<!-- List Header -->\n" +
            "        <div class=\"ui-bar-a\" data-role=\"collapsible\" data-collapsed=\"false\">\n" +
            "            <h1 class=\"ui-bar\">Primary Attributes</h1>\n" +
            "            <div class=\"ui-body ui-body-a character-list\">\n" +
            "                <div class=\"ui-grid-b ui-responsive\" >\n";

        this.attributes.forEach(function(current){
            return attributeDisplay += current.displayAttribute();
        });

        attributeDisplay +=
            "                </div>\n" +
            "            </div>\n" +
            "        </div>\n";

        return attributeDisplay;

    };
    this.displaySkills = function() {
        var skillsList = "                    <div>\n" +
            "                        <table style=\"width: 100%\">\n";

        this.skills.forEach(function (current) {
            return skillsList += current.displayTableRow();
        });

        skillsList += "                        </table>\n" +
            "                    </div>";

        return skillsList;
    };*/
    this.displayInventory = function(){
        return "<!-- List Header -->" +
        "    <div class=\"ui-bar-a\" data-role=\"collapsible\" data-collapsed=\"true\">\n" +
        "            <h1 class=\"ui-bar\">Inventory</h1>\n" +
        "            <!--<div class=\"ui-grid-a\">-->\n" +
        "            <div class=\"ui-grid-b ui-responsive\">\n" +
        "                <div class=\"ui-block-a\">Cp\n" +
        "                    <input id=\"copperPieces\" type=\"number\" value=\"" + this.copperPieces + "\">\n" +
        "                </div>\n" +
        "                <div  class=\"ui-block-b\">Sp\n" +
        "                    <input id=\"silverPieces\" type=\"number\" value=\"" + this.silverPieces + "\">\n" +
        "                </div>\n" +
        "                <div  class=\"ui-block-a\">Ep\n" +
        "                    <input id=\"electrumPieces\" type=\"number\" value=\"" + this.electrumPieces + "\">\n" +
        "                </div>\n" +
        "                <div  class=\"ui-block-b\">Gp\n" +
        "                    <input id=\"goldPieces\" type=\"number\" value=\"" + this.goldPieces + "\">\n" +
        "                </div>\n" +
        "                <div  class=\"ui-block-a\">Pp\n" +
        "                    <input id=\"platinumPieces\" type=\"number\" value=\"" + this.platinumPieces + "\">\n" +
        "                </div>\n" +
        "                <div class=\"ui-block-a\">Items\n" +
        "                    <textarea id=\"equipment\" name=\"equipment\">" + this.equipment + "</textarea>\n" +
        "                </div>\n" +
        "            </div>" +
            "</div>"
    };

    this.saveChar = function(){
        props = Object.getOwnPropertyNames(this);
        //var inputs = document.getElementsByTagName('input');
        for (var i = 0; i < props.length; ++i) {
            if ((typeof props[i] !== "function") && (document.getElementById(props[i].toString())))
            {
                this[props[i].toString()] = document.getElementById(props[i].toString()).value;
            }
        }
        current = JSON.stringify(this);
        console.log(current);
    };

    //Saving to file not currently tested/implemented, localstorage saving works for now.
/*    this.saveToFile = function(filename){
        var str = JSON.stringify(this);
        var date = new Date();
        var f = new File(["test file"], "test.txt", {type: "text/plain", lastModified: date})
    };*/

    this.toString = function(){
        return this.characterName + "/n" + JSON.stringify(this);
    }
};

var chars = [];
chars.push(new DnDCharacter());
chars[0].initialise();
saveCharacter = function(){
  chars[0].saveChar();
};
saveCharacterToLocalStorage = function(){
    chars[0].saveChar();
    localStorage.setItem("character", JSON.stringify(chars[0]));
    Update();
};
loadCharacter = function(){
    temp = new DnDCharacter(JSON.parse(localStorage.getItem("character")));
    chars[0] = temp;
    Update();
};

function Skill (name, value, isProficient) {
    this.skillName = name;
    this.value = value;
    this.isProficient = isProficient;

    this.displayTableRow = function () {
        var tableRow =
            "<tr>\n" +
            "<td><label for=\"" + this.skillName + "\">" + this.skillName + "</label></td>" +
            "<td><label><input type=\"number\" id=\"" + this.skillName + "\" class=\"skill\" value=\"" + this.value + "\"></label></td>\n" +
            "<td><label>Profficient<input type=\"checkbox\" id=\"" + this.skillName + ".isProficient\" value=\"" + this.isProficient + "\"></label></td>\n" +
            "</tr>\n";
        return tableRow;
    };

    this.toString = function (){
        return this.skillName + " : " + this.value + " : " + this.isProficient;
    };
}
function Attribute (fullName, shortName, currentValue, isProficient, dependentSkills) {

    this.attrName = fullName;
    this.shortName = shortName;
    this.attrValue = currentValue;
    this.isProficient = isProficient;

    this.mod = 0;
    this.save = 0;

    this.calculateModifier = function () {
        return Math.round( ((this.attrValue - 10) / 2) - 0.5 );
    };

    this.dependentSkills = dependentSkills;

    this.updateDependentValues = function () {
        mod = this.calculateModifier();
        save = this.calculateModifier();

        //TODO add skills updating using dependent skills list
    };

    this.onclick = function(){
        //this.updateDependentValues();
    };
    this.onchange = function(){
        this.updateDependentValues()
    };

    this.toString = function(){
        return this.attrName + " : " + this.shortName + " : " + this.attrValue;
    };

    this.displayAttribute = function() {
        return "<div class=\"ui-block-a\"><b>" + this.shortName+ "</b>\n" +
            "<input type=\"number\" value=\"" + this.attrValue + "\">\n" +
            "<div class=\"ui-grid-a\">\n" +
            "<div class=\"ui-block-a\">MOD:<br>\n" +
            "<input type=\"number\" value=\"" + this.mod + "\"></div>\n" +
            "<div class=\"ui-block-b\">SAVE:<input type=\"number\" value=\"" + this.save + "\"></div>\n" +
            "</div>\n" +
            "</div>\n";
    };
}

Update = function (){
    var currentChar = chars[0];
    var header = document.getElementById("title");
    header.innerHTML = "<h1 class=\"ui-title\">" + currentChar.characterName + "</h1>";

    document.getElementById("coreInfo").innerHTML = currentChar.displayCoreInfo();
    document.getElementById("quickCard").innerHTML = currentChar.displayQuickCard();
    //document.getElementById("primaryAttributes").innerHTML = currentChar.displayAttributes();
    //document.getElementById("skills").innerHTML = currentChar.displaySkills();
    document.getElementById("inventory").innerHTML = currentChar.displayInventory();
};
document.onready = Update;
document.onchange = function() {
    saveCharacter();
};
