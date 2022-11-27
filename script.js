const canvas = document.getElementById("root")
const start = document.getElementById("start")
const reset = document.getElementById("reset")

const context = canvas.getContext("2d")
let dpi = window.devicePixelRatio

function fix_dpi(el) {
	let style_height = +getComputedStyle(el).getPropertyValue("height").slice(0, -2)
	let style_width = +getComputedStyle(el).getPropertyValue("width").slice(0, -2)
	el.setAttribute("height", style_height * dpi)
	el.setAttribute("width", style_width * dpi)
}

fix_dpi(canvas)

context.beginPath()

let x = 800
let y = 200
let circleWidth = 200
let circleHeight = circleWidth
let circleRadius = 50
let clashOffset = 10
let circleX = circleWidth + circleRadius + clashOffset
let arrowCrossed = false
let timer

window.onload = draw()

start.addEventListener("click", () => {
	if (x > circleX) {
		timer = setInterval(() => {
			x -= 50
			draw()
			if (x < circleX) {
				arrowCrossed = true
				clearInterval(timer)
				draw()
			}
		}, 50)
	}
})
reset.addEventListener("click", () => {
	window.location.reload()
})

function draw() {
	
	context.reset()
	context.arc(circleWidth, circleHeight, circleRadius, 0, 2 * Math.PI)

	context.fillStyle = arrowCrossed ? "red" : "green"

	context.moveTo(x, y)
	context.lineTo(x + 15, y + 20)

	context.moveTo(x, y)
	context.lineTo(x + 15, y - 20)

	context.moveTo(x + 15, y - 20)
	context.lineTo(x + 15, y - 5)

	context.moveTo(x + 15, y + 20)
	context.lineTo(x + 15, y + 5)

	context.moveTo(x + 15, y + 5)
	context.lineTo(x + 50, y + 5)

	context.moveTo(x + 15, y - 5)
	context.lineTo(x + 50, y - 5)

	context.moveTo(x + 50, y - 5)
	context.lineTo(x + 50, y + 5)

	context.stroke()
	context.fill()
}
