let outer = document.getElementById('outer')
let verticalspread = 5
let texts = [
    [0,   '1st Amendment', "{1st Amendment description here}"],
    [25,  '2nd Amendment', "{2nd Amendment description here}"],
    [50,  '3rd Amendment', "{3rd Amendment description here}"],
    [75,  '4th Amendment', "{4th Amendment description here}"],
    [100, '5th Amendment', "{5rd Amendment description here}"],
    [110, '6th Amendment', "{6th Amendment description here}"],
    [150, '7th Amendment', "{7th Amendment description here}"],
]
texts.reverse()

let containers = []

texts.forEach(function(val) {
    let time = val[0]
    let name = val[1]
    let info = val[2]
    let container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.width = '100px'
    container.style.left = '-50px'
    container.style.top = (time * verticalspread) + 'px'
    container.style.background = 'rgba(0, 0, 255, 0.7)'
    container.time = time

    let maintext = document.createElement('button')
    maintext.style.position = 'relative'
    maintext.style.height = '100px'
    maintext.style.background = 'rgba(255, 0, 0, 0.7)'
    maintext.style.display = 'flex'
    maintext.style.color = 'white'
    maintext.style.justifyContent = 'center'
    maintext.style.alignItems = 'center'

    let dropdown = document.createElement('div')
    dropdown.style.position = 'absolute'
    dropdown.style.height = '100px'
    dropdown.style.top = '100px'
    dropdown.style.background = 'rgba(255, 0, 0, 0.7)'
    dropdown.style.opacity = '0%'
    dropdown.style.display = 'flex'
    dropdown.style.color = 'white'
    dropdown.style.justifyContent = 'center'
    dropdown.style.alignItems = 'center'

    maintext.addEventListener('click', function() {
        dropdown.style.opacity = dropdown.style.opacity == 0 ? '100%' : '0%'
    })
    maintext.addEventListener('mouseover', function() {
        maintext.style.background = 'rgba(255, 0, 0, 0.8)'
    })
    maintext.addEventListener('mouseout', function() {
        maintext.style.background = 'rgba(255, 0, 0, 0.7)'
    })

    maintext.innerHTML = name
    dropdown.innerHTML = info

    container.appendChild(dropdown)
    container.appendChild(maintext)
    outer.appendChild(container)
    containers.push(container)
})

document.body.style.height = ((containers[0].time * verticalspread * 20)) + 'px'

let times = containers.map((val) => val.time)

let targettimeindex = 0
let scrollamt
let scrolltime

document.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowRight') {
        targettimeindex --
    }
    if (e.key == 'ArrowLeft') {
        targettimeindex ++
    }

    targettimeindex = Math.min(containers.length - 1, Math.max(0, targettimeindex))
})

setInterval(function() {
    let diff = scrolltime - containers[targettimeindex].time
    window.scrollBy(0, -2 * diff)
})

function onscroll() {
    scrollamt = document.scrollingElement.scrollTop

    let scrollpercent = (containers[0].time / 100) * scrollamt / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    scrolltime = scrollpercent * 100

    containers.forEach(function(val) {
        let n = ((1 + scrollpercent - val.time / 100) % 1)
        let ndeg = (n * 360) + "deg"
        val.style["-webkit-transform"] = "rotate3d(0, -1, 0, " + ndeg + ") translate3d(0px, " + (-scrolltime * verticalspread) + "px, 200px)"
    })
}

document.addEventListener('scroll', onscroll)
onscroll()