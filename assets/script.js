// Declare variables
var currentDay = $("#currentDay");
var currentTime = $("#currentTime");


// Upon loading, update the time slot colours and start updating the display each half a second
$(document).ready(function(){
    updateTimeSlotColour();
    renderDescriptions();
    setInterval(function(){
        updateCurrentDay();
        updateTimeSlotColour();
    }, 500);
});


// Function to apply classes to the time-slot description boxes, depending on the current time
function updateTimeSlotColour(){

    // Go through each element with .description class
    $(".description").each(function(){
        
        // Parse the parent's ID to a number and store as blockHour (note parent div IDs are the hour)
        let blockHour = parseInt($(this).parent().attr("id"));
        
        // Remove past, present and future classes from the description element
        $(this).removeClass("past present future");
        
        // Compare the blockHour against the current hour and apply the relevant styling
        if(blockHour < moment().hour()){
            $(this).addClass("past");
        }else if(blockHour === moment().hour()){
            $(this).addClass("present");
        }else{
            $(this).addClass("future");
        }
    })
};


// Function to display the descriptions saved in local storage
function renderDescriptions(){
    
    // Go through each element with .description class
    $(".description").each(function(){
        
        // Store the parent's ID as hour (note parent div IDs are the hour)
        let hour = $(this).parent().attr("id");

        // Retrieve the description from local storage, using the hour as the index
        hourDescription = localStorage.getItem(hour);

        // Set the value of the description class to the description returned from local storage
        $(this).val(hourDescription);
    })
};


// Function to display the current date and time (at the top of the page) by pulling from moment.js
function updateCurrentDay(){
    var dayDateMonth = moment().format("ddd, Do MMMM YY");
    var hrsMinsSecs = moment().format("h:mm:ss a");
    currentDay.text(dayDateMonth);
    currentTime.text(hrsMinsSecs);
};


// Function to save the text entered in the textarea to local storage.
$(".saveBtn").click(function() {
    var hour = $(this).parent().attr("id");
    var hourDescription = $(this).siblings(".description").val();
    
    // Data is stored locally as hour:description index:value pairs
    localStorage.setItem(hour,hourDescription);
});