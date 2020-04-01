$(document).ready(function() {

    //get todays date, get all of the descriptions from local,
    //get the colors based on the time, start a timer that checks to see
    //if the hour changed.
    getTodaysDate();
    getSavedDescriptions();
    getTimeSetColors();
    setTimeInterval();

    //if any of the save buttons are clicked, save the data for that row
    $('button').click(function(){
        //get the entered input....
        var enteredInput = $(this).siblings('.description').val();       

        //...and if something has been entered, save it
        if (enteredInput !== "") {
            var parentRowId = $(this).parent().attr('id'); 
            saveData(enteredInput, parentRowId);
        }
    })

    //get todays date
    function getTodaysDate() {
        var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

        var d = new Date();
        $("#currentDay").text(monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear());
    };

    //get all of the saved descriptions for each hour
    function getSavedDescriptions() {
        $('div').each(function(index, value) {
            //console.log(`div${index}: ${this.id}`);
            var divId = this.id;
            if (divId.includes("time")){                
                var savedValue = window.localStorage.getItem(divId)
                if (savedValue != null) {
                    // console.log(savedValue);
                    $(this).children('.description').val(savedValue);
                }
            }
          });


    };

    //get the current time and set the colors accordingly
    function getTimeSetColors() {
        //loop through all the divs
        $('div').each(function(index, value) {
            //for the ones that have 'time' in them...
            var divId = this.id;
            if (divId.includes("time")){
                //...get the current hour block, and get the hour from the Id name
                var divTime = parseInt(divId);                
                
                //compare the current hour to the block hour and do some class changing.
                var h = new Date();

                if (divTime < h.getHours()){
                    //console.log("past");
                    $(this).children('.description').attr("class","col-md-10 description past");
                }
                else if (divTime == h.getHours()) {
                    //console.log("present");
                    $(this).children('.description').attr("class","col-md-10 description present");                    
                }
                else {
                    //console.log("future");
                    $(this).children('.description').attr("class","col-md-10 description future");                                        
                }
            }
        });
    };

    //check every 30 seconds to see if the hour has changed, causing the colors to change.
    function setTimeInterval () {
        window.setInterval(getTimeSetColors, 30000);
    };

    //save the data in the text area on the row the button clicked is on
    function saveData(enteredInput, parentRowId){
         window.localStorage.removeItem(parentRowId);
         window.localStorage.setItem(parentRowId,enteredInput);
    };

    


    




});