const canvas = document.querySelector("canvas")
    , ctx = canvas.getContext("2d")


var started = false
var keys = {
    "ArrowLeft": false,
    "ArrowRight": false
}

var totalImages = 0
var loadedImages = 0

class Image2
{
    constructor(src, width, height)
    {
        totalImages++

        const image = new Image(width, height)
        image.src = src

        image.addEventListener("load", () => {
            loadedImages++
        })

        this.image = image
        this.width = width
        this.height = height
    }
    draw(x, y, scalex = 1, scaley = 1, rotation = 0)
    {
        rotation = rotation * (Math.PI/180)
        
        ctx.translate(x, y)
        ctx.rotate(rotation)
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width * scalex, this.height * scaley)
        ctx.rotate(-rotation)
        ctx.translate(-x, -y)
    }
}

class Car
{
    constructor()
    {
        this.angle = 0

        this.x = canvas.width / 2
        this.y = canvas.height / 2

        this.image = new Image2("car.png", 48, 48)
    }
    update()
    {
        if (keys.ArrowLeft) this.angle -= 2
        if (keys.ArrowRight) this.angle += 2

        this.x += Math.cos(this.angle * (Math.PI/180)) * 4
        this.y += Math.sin(this.angle * (Math.PI/180)) * 4

        if (this.x > canvas.width) this.x = canvas.width
        if (this.x < 0           ) this.x = 0
        if (this.y > canvas.height) this.y = canvas.height
        if (this.y < 0           ) this.y = 0
    }
    frame()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (started)
        {
            car.update()
            car.image.draw(car.x, car.y, 1, 1, car.angle)
            requestAnimationFrame(car.frame)
        }
        else
        {
            menuImage.draw(canvas.width / 2, canvas.height / 2)
            requestAnimationFrame(car.frame)
        }
    }
}

const car = new Car
const menuImage = new Image2("menu.png", 1920, 1080)

document.addEventListener("keydown", event => {
    if (!started) started = true
    if (event.key === "ArrowLeft")  keys.ArrowLeft = true
    if (event.key === "ArrowRight") keys.ArrowRight = true
})

document.addEventListener("keyup", event => {
    if (event.key === "ArrowLeft")  keys.ArrowLeft = false
    if (event.key === "ArrowRight") keys.ArrowRight = false
})


function waitUntilImagesLoaded()
{
    if (loadedImages != totalImages) requestAnimationFrame(waitUntilImagesLoaded)
    else
    {
        console.log("%s images loaded", loadedImages)
        requestAnimationFrame(car.frame)
    }
}

requestAnimationFrame(waitUntilImagesLoaded)

