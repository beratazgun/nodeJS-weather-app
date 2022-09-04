
const wheatherForm = document.querySelector(".search-button")
const search = document.querySelector(".form-control")
const weatherResult = document.querySelector(".weather-result")

wheatherForm.addEventListener("click", (e) => {
    e.preventDefault()
    const location = search.value
    fetch('https://bero-weather-app.herokuapp.com/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                console.log("The city you entered was not found!");
            }
            else {
                console.log(data.location)
                console.log(data.degrees)
                console.log(data.summary)
                weatherResult.innerHTML = "Today, " + data.location + " is " + data.degrees + " degress" + " and " + data.summary
            }
        })
    })
})