//CREATED BY DAMIAN SLOCOMBE

//Element that's being edited - used to simplify transferring data to save.click
var currentElements;
var par; //Parent - needed for refs of other elements

var charCounter = 0;

var editing = false;

//$(".edit").click(function()
function editCharacter(element)
    {
    $(".cake").show();

    if (!editing)
        {
        par = element.parent();

        //Recycle variable to get children OF children
        currentElements = par.children().not("span");
        currentElements = currentElements.children();

        //Set new class and attributes
        currentElements.addClass("editable");
        currentElements.attr("contenteditable", "true");

        charCounter =  $(".charInitList li").length;

        //Switch Spans
        //$(".save").show();
        par.find(".save").show();

        if (charCounter > 1)
            $(".btn-charDelete").show();
        else
            $(".btn-charDelete").hide();

        $(".btn-charAddNew").hide();

        element.hide();
        editing = true;

        console.log("Editing character");
        }
    }

function saveCharacter(element)
    {
    //Remove the attributes/classes from the edited element
    currentElements.removeAttr("contenteditable");
    currentElements.removeClass("editable");

    //Hide this button since it's not needed anymore
    element.hide();
    par.find(".edit").show();

    closeEditing();

    console.log("Saving Character");
    }

function deleteCharacter()
    {
    if (charCounter > 1)
        {
        par.parent().remove();

        closeEditing();
        }
    }

function closeEditing()
    {
    editing = false;

    $(".btn-charAddNew").show();
    $(".btn-charDelete").hide();

    par.find(".edit").show();
    }