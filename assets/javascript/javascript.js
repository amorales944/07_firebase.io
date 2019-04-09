var config = {
    apiKey: "AIzaSyAFuFla4eRwgbppfCsY1N6xLSaBJrYcJbc",
    authDomain: "myfirstproject-91710.firebaseapp.com",
    databaseURL: "https://myfirstproject-91710.firebaseio.com",
    projectId: "myfirstproject-91710",
    storageBucket: "myfirstproject-91710.appspot.com",
    messagingSenderId: "518095171221"
};
firebase.initializeApp(config);

var database = firebase.database();
// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs train info
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    // Creates local "temporary" object for holding data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    // Uploads data to database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("Employee successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var empName = childSnapshot.val().name;
    var empRole = childSnapshot.val().destination;
    var empStart = childSnapshot.val().time;
    var empRate = childSnapshot.val().frequency;

    // Employee Info
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);

    // Prettify the employee start
    var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(empStart, "X"), "months");
    console.log(empMonths);

    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(empName),
        $("<td>").text(empRole),
        $("<td>").text(empStartPretty),
        $("<td>").text(empMonths),
        $("<td>").text(empRate),
        $("<td>").text(empBilled)
    );

    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
