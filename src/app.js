const path = require("path")
const express = require("express")
const hbs = require("hbs")
const request = require("request")


app = express()

// templates dosyasının konumu ayarlanıyor
const viewsPath = path.join(__dirname, "../templates/views")
app.set("views", viewsPath)

const partialsPath = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partialsPath)

const publicPath = path.join(__dirname, "../public")
app.use(express.static(publicPath))

// hbs' yi kullanabilmek için gerekli
app.set("view engine", "hbs")

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Berat Azgün"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Berat Azgün"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Do you need help?",
        mail: "brtazgun@gmail.com"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.location) {
        res.send({
            error: "You must provide a search term"
        })
    }
    const access_key = 'd9ee1e6a9e84b5a067208e6e818c970b'
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${req.query.location}`

    request({ url: url, json: true }, (error, response) => {
        const currentPath = response.body.current
        const locationPath = response.body.location
        if (error) {
            res.send(
                "<h1>Unable to connect to weather service!</h1>"
            )
        }
        else {
            res.send({
                location: locationPath.name,
                degrees: currentPath.temperature,
                summary: currentPath.weather_descriptions[0],
            })
        }
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Berat Azgün",
        errorMassage: "This page is not found!"
    })
})


app.listen(3000, () => {
    console.log("server is running at 3000 port")
})




















