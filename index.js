// run `node index.js` in the terminal
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const button = document.querySelector("button");
const weatherButton = document.querySelector("#fetchBtn");
const weatherContainer = document.querySelector("#alertContainer")
const transpoButton = document.getElementById("#transpoButton");



button.addEventListener('click', function() {
    if(button.innerText == "James button"){
        button.innerText = "clicked";
    }else{
        button.innerText = "James button"
    }
})

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
            document.getElementById("result").innerHTML = "Good choice " + element[i].value;
    }
}




