// run `node index.js` in the terminal
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const button = document.querySelector("button");
const weatherButton = document.querySelector("#fetchBtn");
const weatherContainer = document.querySelector("#alertContainer")
const transpoButton = document.getElementById("#transpoButton");
const addTodoBtn = document.getElementById("addTodo");
const deleteTodoBtn = document.getElementById("deleteTodo");
const toDoInput = document.getElementById("todoInput");
const todoDisplayContainer = document.querySelector(".todoDisplayContainer");
const cityArray = [
    'denver', 'los angeles', 'new york', 
    'dallas', 'fort worth', 'austin', 
    'st. louis', 'nashville', 'newark',
    'lakewood', 'topeka', 'lawrence',
    'albequerque', 'los angeles', 'san diego',
    'san fransico', 'salem', 'seattle',
    'bend', 'portland', 'seattle', 'bellevue',
    'redmond', 'salt lake city'
];
const searchBarInput = document.getElementById("searchBar");
const countyInput = document.getElementById("inputCounty");
const countyDisplayContainer = document.querySelector("#countyDisplay");
const countyButton = document.getElementById("countyButton");
const searchResultsContainer = document.querySelector(".searchResultsContainer");


searchBarInput.addEventListener('input', () => {
    let searchTerm = searchBarInput.value.toLowerCase();
    if(searchBarInput.value === '') return;
    let results = cityArray.filter(item => item.includes(searchTerm))
    searchResultsContainer.innerHTML = results.map(item => `<li>${item}</li>`).join('');
})

countyButton.addEventListener('click', () => {
    const zip = document.getElementById('inputCounty').value.trim();
    if (!/^\d{5}$/.test(zip)) {
        displayResult("Please enter a valid 5-digit ZIP Code.");
        return;
    }
    fetchCountyByZipCode(zip);
})

async function fetchCountyByZipCode(zip) {
    const url = `https://geocoding.geo.census.gov/geocoder/geographies/address?benchmark=Public_AR_Current&vintage=Current_Current&format=json&zip=${zip}`

    try {
        const response = await fetch(url);
        const data = await response.json();

        const matches = data.result.addressMatches;

        if(matches.length === 0) {
            displayResult('No county found for that ZIP Code');
            return;
        }
        const county = matches[0].geographies['Counties'][0].NAME;
        const state = matches[0].geographies['States'][0].NAME;
        displayResult(`${county}, ${state}`);
    }catch(error){
        displayResult('Something went wrong. Please try again.');
        console.error(error);
    }
}
function displayResult(message){
    document.getElementById('countyDisplay').textContent = message;
}


// button.addEventListener('click', function() {
//     if(button.innerText == "James button"){
//         button.innerText = "clicked";
//     }else{
//         button.innerText = "James button"
//     }
// })

weatherButton.addEventListener("click", function() {
    fetch("https://api.weather.gov/alerts?status=actual&message_type=alert&region_type=land&urgency=Immediate&severity=Extreme,Severe,Moderate&certainty=Observed&limit=2")
    .then(response => response.json())
    .then(data => {
        const alerts = data.features;
        weatherContainer.innerHTML = alerts.map(alert => `
            <p><strong>${alert.properties.headline}</strong></p>
            <p>${alert.properties.description}</p>
            <hr>
        `).join("");
    });
});

// transpoButton.addEventListener("click", function(){
//     if()
// });

function displayRadioValue (){
    let element = document.getElementsByName('vehicle');
    for (let i = 0; i < element.length; i++){
        if(element[i].checked)
            document.getElementById("result").innerHTML = " " + element[i].value;
    }
}


addTodoBtn.addEventListener('click', function() {
    const inputValue = toDoInput.value.trim();

    if(inputValue === "") return; //don't add empty spaces

    const newItem = document.createElement("p");
    newItem.textContent = inputValue;
    todoDisplayContainer.appendChild(newItem);

    toDoInput.value = ""; //clearing input after adding
});

deleteTodoBtn.addEventListener('click', function(){
    const lastItem = todoDisplayContainer.lastElementChild;
    if (lastItem) {
        todoDisplayContainer.removeChild(lastItem);
    }
});




