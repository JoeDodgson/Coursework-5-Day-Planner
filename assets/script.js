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

function updateTimeSlotColour(){
    $(".description").each(function(){
        let hourID = parseInt($(this).parent().attr("id"));
        $(this).removeClass("past present future");
        if(hourID < moment().hour()){
            $(this).addClass("past");
        }else if(hourID === moment().hour()){
            $(this).addClass("present");
        }else{
            $(this).addClass("future");
        }
    })
};

function renderDescriptions(){
    $(".description").each(function(){
        let hourID = $(this).parent().attr("id");
        hourDescription = localStorage.getItem(hourID);
        $(this).val(hourDescription);
    })
};

function updateCurrentDay(){
    var dayDateMonth = moment().format("ddd, Do MMMM YY");
    var hrsMinsSecs = moment().format("h:mm:ss a");
    currentDay.text(dayDateMonth);
    currentTime.text(hrsMinsSecs);
};

$(".saveBtn").click(function() {
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
    localStorage.setItem(time,value);
});