const searchInput = document.querySelector(`input[type="text"]`)
const form = document.querySelector("form")
const selectBox = document.querySelector(".selectBox")
const resultBox = document.querySelector(".resultBox")

function getData(url) {
    return fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else if (res.status === 400) {
                console.log("Error");
                throw new Error("Not Found This City in API !!!")
            }
        })
}

form.addEventListener("submit", search)

function search(e) {
    e.preventDefault()
    getData(`https://api.weatherapi.com/v1/current.json?key=6bc15cfb31414fbda9f95625221905&q=${searchInput.value}`)
        .then((data) => {
            resultBox.innerHTML = `
            <p>City: <span>${data.location.name}</span></p>
            <p>Country: <span>${data.location.country}</span></p>
            <p>Weather Forecast: <span>${data.current[selectBox.value]}</span></p>
            <p>Sky Condition: <span><img src="https:${data.current.condition.icon}" alt=""></span> <span>${data.current.condition.text}</span></p>`
        })
        .catch(error => {
            console.error(error);
            resultBox.innerHTML = `<p class="text-danger">This City Not Found !!!</p>`
        })
}