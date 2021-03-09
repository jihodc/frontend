// Weatherbit.io Account
// Use jQuery AJAX method
// my Master API Key: 7eb1d75bf50c438a82fb335aa9fef498

// looked into https://www.weatherbit.io/api/weather-current
let apiUrl = "https://api.weatherbit.io/v2.0/current"
let APIkey = "7eb1d75bf50c438a82fb335aa9fef498"

// for local storage
let storedCity; 
let storedList;

// localStorage.clear();

// local storage - when the user visits the website for the first time set Los Angeles as the default city
if (localStorage.getItem("storedEntireList") == null) {
	// do nothing
} else {
	// Turn JSON file into String
	storedList = JSON.parse(localStorage.getItem("storedEntireList"));
	// console.log(storedList);
	// Clear List
	$("#list").empty();
	// Append array elements to #List
	for (let i = 0; i < storedList.length; i++) {
		$(storedList[i]).appendTo("#list")
	}
}

if (localStorage.getItem("storedCityName") == null) {
	storedCity = "losangeles"
} else {
	// get city name in local storage
	storedCity = localStorage.getItem("storedCityName");
	// get select city in local storage
	$("#cities").val(localStorage.getItem("storedCityName"))
}

$.ajax({
	method: "GET",
	url: apiUrl,
	data: {
		city: storedCity,
		country: "US",
		key: APIkey,
		units: "I",
		include: "minutely"
	}
})
.done(function(results) {
	displayResults(results);
})
	.fail(function() {
		console.log("ERROR")
});




// Changing the city in the select value will also show matching weather information to the city
$("#cities").on("click", function(){
	// get the value of the selected city
	let cityOption = $("#cities").val();
	// console.log(cityOption)

	$.ajax({
		method: "GET",
		// the endpoint
		url: apiUrl,
		// parameters that will be sent to the weatherbit.io api
		// look into request parameters: https://www.weatherbit.io/api/weather-current
		data: {
			city: cityOption, // will nee variable
			country: "US",
			key: APIkey,
			units: "I",
			include: "minutely"
		}

	})
	.done(function(results) {
		// if response is received, run below
		// results is not a pre-defined variable
		// console.log(results);
		displayResults(results);
	})
		.fail(function() {
		// if there is an error. run below
		console.log("ERROR");
	});

	// store data in local storage
	localStorage.setItem("storedCityName", cityOption);
});

function displayResults(info) {
	// current temperature
	// description of apparent temperature
	let cityName = info.data[0].city_name;
	let temperature = info.data[0].temp;
	let weather = info.data[0].weather.description;
	let appTemp = info.data[0].app_temp;
	// console.log(cityName)
	// console.log(temperature)
	// console.log(weather)
	// console.log(appTemp)

	$("#weather-detail #weatherText2").text(": " + temperature + "°F, " + weather + ". Feels like " + appTemp + "°F.");
}

// Cross out items on list
$("#list").on("click", "li", function() {
	if ($(this).hasClass("removed")) {
		$(this).removeClass("removed");
	} else {
		$(this).addClass("removed");
	}

	updateLocalStorage()

})

// Remove item from list if clicked on the left bullet/icon
// https://learn.jquery.com/events/event-delegation/
// ".box" created due to event delegation
// $("#list . box") does not work on newly created lists
$("#list").on("click", ".box", function() {
	// since .box is within the li, it is the child of li
	$(this).parent("li").remove();

	updateLocalStorage()

})

// Add item after entering in something to the form box
$("#form-id").on("submit", function(select) {
	select.preventDefault()
	// get value from input
	let inputText = $("input").val();
	// console.log("inputText")
	// empty the text field
	$("input").val("");
	// console.log(inputText);
	// create element
	let newIcon = $("<span></span>").addClass("box");
	// Font Awesome icon
	$("<i></i>").addClass("far fa-minus-square").appendTo(newIcon);
	// console.log(newIcon)
	let newList = $("<li></li>").append(newIcon, " " + inputText);
	// console.log(newList);
	$(newList).appendTo("#list");

	updateLocalStorage()

})

// hide input text field when clickin on the arrow icon on top right
$(".arrow").on("click", function() {
	if ($(this).hasClass("fa-chevron-up")) {
		$(this).removeClass("fa-chevron-up");
		$(this).addClass("fa-chevron-down");
		// hide input text field
		$("input").slideUp("fast");
	} else {
		$(this).removeClass("fa-chevron-down");
		$(this).addClass("fa-chevron-up");
		// show text field
		$("input").slideDown("fast");
	}

	updateLocalStorage()

})

// a function to store updated list into local storage
// Should be added to any function that updates the DOM in #to-do-list
function updateLocalStorage() {
	let entireList = $("#list")
	// console.log(entireList)
	let elementArray = []
	for (let i = 0; i < entireList[0].children.length; i++) {
		elementArray[i] = entireList[0].children[i].outerHTML;
		// console.log(entireList[0].children[i].outerHTML);
	}
	// console.log(elementArray)
	// Because localStorage only handles string formmat convert it!
	localStorage.setItem("storedEntireList", JSON.stringify(elementArray));
}