$(document).ready(function () {

    var database = firebase.database();
    // Live Time of The Day 

  var updateTime = function(){
    var now = moment().format("HH:mm");
    updateTime();
    setInterval(updateTime, 1000);
}
    // button for adding trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();
        // console.log("yo")
        // grabs form input
        var trainName = $("#train-name-input").val().trim();
        var trainDest = $("#destination-input").val().trim();
        var trainFirst = $("#first-train-input").val().trim();
        var trainFreq = $("#frequency-input").val().trim();
        // creates local "temp" object for holding train data
        var newTrain = {
            name: trainName,
            destination: trainDest,
            start: trainFirst,
            frequency: trainFreq
        };
        // upload train data to firebase
        database.ref().push(newTrain);

        // console.log(newTrain.name);
        // console.log(newTrain.destination);
        // console.log(newTrain.start);
        // console.log(newTrain.frequency);

        alert("Train successfully added");
        // clears all form boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");

        return false;
    });
    // create firebase event for adding train to database and row in the html when user adds train
    database.ref().on("child_added", function (childSnapshot) {
        // console.log(childSnapshot.val());
        // store contents into var
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var trainFirst = childSnapshot.val().start;
        var trainFreq = childSnapshot.val().frequency;
        // train info
        // console.log(trainName);
        // console.log(trainDest);
        // console.log(trainFirst);
        // console.log(trainFreq);

        var trainFirstMoment = moment(trainFirst, "HH:mm");
        // current  time
        var currentMoment = moment();
        // difference between times
        var diffTime = moment().diff(moment(trainFirstMoment), "minutes");
        // time remaining
        var timeRemainder = diffTime % trainFreq;
        // minutes until next train
        var minutes = trainFreq - timeRemainder;
        // next train
        var nextTrain = moment().add(minutes, "minutes");
        var formatNextTrain = moment(nextTrain).format("HH:mm");

        // append train info table
        $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "mins" + "</td><td>" + formatNextTrain + "</td><td>" + minutes + "</td></tr>");

    })

})