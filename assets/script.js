// Declare variables
var currentDay = $("#currentDay");
var currentTime = $("#currentTime");

// Declare functions

function updateDisplay() {
    setInterval(function(){
        updateCurrentDay();
        updateTimeSlotColour();
    }, 500);
}

$(document).ready(function(){
    updateTimeSlotColour();
    updateDisplay();
});

function updateCurrentDay(){
    var dayDateMonth = moment().format("ddd, Do MMMM YY");
    var hrsMinsSecs = moment().format("h:mm:ss a");
    currentDay.text(dayDateMonth);
    currentTime.text(hrsMinsSecs);
};

function updateTimeSlotColour(){
    $(".description").each(function(){
        let id = parseInt($(this).parent().attr("id"));
        // console.log(id);
        $(this).removeClass("past present future");
        if(id < moment().hour()){
            $(this).addClass("past");
        }else if(id === moment().hour()){
            $(this).addClass("present");
        }else{
            $(this).addClass("future");
        }
    })
};

$(".saveBtn").click(function() {
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
    localStorage.setItem(time,value);
});