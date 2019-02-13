/* Stylesheet by Peter Newman, 2019 */

//initialize function called when the script loads
function initialize(){
    cities();
	jQueryAjax();
	debugAjax();
};

//function to create a table with cities and their populations
function cities(){
    //define two arrays for cities and population
    var cityPop = [
        {
            city: 'New York',
            population: 8622698
        },
        {
            city: 'Los Angeles',
            population: 3999759
        },
        {
            city: 'Chicago',
            population: 2716450
        },
        {
            city: 'Houston',
            population: 2312717
        }
    ];

    //append the table element to the div
    $("#mydiv").append("<table>");

    //append a header row to the table
    $("table").append("<tr>");

    //add the "City" and "Population" columns to the header row
    $("tr").append("<th>City</th><th>Population</th>");

    //loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };

    addColumns(cityPop);
    addEvents();
};

function addColumns(cityPop){

    $('tr').each(function(i){
		//assign the city a size based on its population
		//and display the size in a new column
        if (i == 0){

            $(this).append('<th>City Size</th>');
        } else {

            var citySize;

            if (cityPop[i-1].population < 100000){
                citySize = 'Small';

            } else if (cityPop[i-1].population < 500000){
                citysize = 'Medium';

            } else {
                citySize = 'Large';
            };

            $(this).append('<td>' + citySize + '</td>');
        };
    });
};

function addEvents(){

	//pick 3 random values to generate a random color
    $('table').mouseover(function(){

        var color = "rgb(";

        for (var i=0; i<3; i++){

            var random = Math.round(Math.random() * 255);

            color += random;

            if (i<2){
                color += ",";

            } else {
                color += ")";
            };

        $(this).css('color', color);
        };


    });
	
	//message that displays when an object is clicked
    function clickme(){
        alert('Hey, you clicked me!');
    };

    $('table').on('click', clickme);
}

//define AJAX function
function jQueryAjax(){
    //define a variable to hold the data
    var mydata;

    //basic jQuery ajax method
    $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        success: function(response){
            mydata = response;

            //check the data, it will be able to be accessed
            console.log(mydata);
        }
    });

    //check the data, will be undefined
    console.log(mydata);
};

//define callback function
function callback(response){

    var mydata = response;

    //pass data to another function
    nextFunction(mydata);
};

function nextFunction(data){

    console.log(data); //contains response data held by mydata in callback, data can be accessed
};

function debugCallback(response){
	
	//mydata must be defined
	mydata = response
	
	$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));
};

function debugAjax(){
	
	var mydata;

	$.ajax("data/MegaCities.geojson", {
		dataType: "json",
		success: function(response){
			mydata = response;
			debugCallback(mydata);
		}
	});

	$(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));
};



//call the initialize function when the document has loaded
$(document).ready(initialize);