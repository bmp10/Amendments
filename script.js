let outer = document.getElementById('outer')
let verticalspread = 5
let texts = [
    [1791, 'Bill of Rights', "{First ten amendments dropdown here}"],
    [1795, '11th Amendment', "{11th Amendment description here}"],
    [1804, '12th Amendment', "{12th Amendment description here}"],
    [1865, '13th Amendment', "{13th Amendment description here}"],
    [1868, '14th Amendment', "{14th Amendment description here}"],
    [1870, '15th Amendment', "{15th Amendment description here}"],
    [1913, '16th & 17th Amendments', "{16th & 17th amendments dropdown here}"],
]

let startingtime = texts[0][0]
let endingtime = texts[texts.length - 1][0]
let timelinelength = endingtime - startingtime

texts.reverse()

let containers = []

let timelabels = []

for (let i = Math.round(timelinelength / 10) * 10; i >= 0; i -= 10) {
    let time = i + startingtime
    
    let text = document.createElement('p')
    text.offsettime = time - startingtime
    text.time = time
    text.style.position = 'absolute'
    text.style.fontSize = '50px'
    text.style.left = '-50px'
    text.style.top = (text.offsettime * verticalspread + 50) + 'px'
    text.style.background = 'white'
    text.style.opacity = '90%'
    text.innerHTML = time
    text.style.display = 'flex'
    text.style.justifyContent = 'center'

    outer.appendChild(text)
    timelabels.push(text)
}


texts.forEach(function(val) {
    let time = val[0]
    let name = val[1]
    let info = val[2]
    let container = document.createElement('div')
    container.offsettime = time - startingtime
    container.time = time
    container.style.position = 'absolute'
    container.style.width = '100px'
    container.style.left = '-50px'
    container.style.top = (container.offsettime * verticalspread) + 'px'
    container.style.background = 'white'

    let maintext = document.createElement('button')
    maintext.style.position = 'relative'
    maintext.style.width = '100px'
    maintext.style.height = '100px'
    maintext.style.background = 'rgb(200, 0, 0)'
    maintext.style.display = 'flex'
    maintext.style.color = 'white'
    maintext.style.justifyContent = 'center'
    maintext.style.alignItems = 'center'

    let dropdown = document.createElement('div')
    dropdown.style.position = 'absolute'
    dropdown.style.height = '100px'
    dropdown.style.top = '100px'
    dropdown.style.background = 'rgb(200, 0, 0)'
    dropdown.style.opacity = '0%'
    dropdown.style.display = 'flex'
    dropdown.style.color = 'white'
    dropdown.style.justifyContent = 'center'
    dropdown.style.alignItems = 'center'

    maintext.addEventListener('click', function() {
        dropdown.style.opacity = dropdown.style.opacity == 0 ? '100%' : '0%'
    })
    maintext.addEventListener('mouseover', function() {
        maintext.style.background = 'rgb(255, 0, 0)'
    })
    maintext.addEventListener('mouseout', function() {
        maintext.style.background = 'rgb(200, 0, 0)'
    })


    
    let text = document.createElement('p')
    text.offsettime = time - startingtime
    text.time = time
    text.style.position = 'absolute'
    text.style.fontSize = '50px'
    text.style.left = '-50px'
    text.style.top = (text.offsettime * verticalspread - 100) + 'px'
    text.style.opacity = '90%'
    text.innerHTML = time
    text.style.display = 'flex'
    text.style.justifyContent = 'center'

    outer.appendChild(text)
    timelabels.push(text)



    maintext.innerHTML = name
    dropdown.innerHTML = info

    container.appendChild(dropdown)
    container.appendChild(maintext)
    outer.appendChild(container)
    containers.push(container)
})
document.body.style.height = ((timelinelength * verticalspread * 20)) + 'px'

let times = containers.map((val) => val.time)

let targettimeindex = containers.length - 1
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
    let diff = containers[targettimeindex].offsettime - scrolltime
    let diffpercent = diff / containers[0].offsettime
    window.scrollBy(0, scrollpercenttoamt(diffpercent) / 15)

    containers.forEach(function(val, i) {
        if (i == targettimeindex) {
            val.getElementsByTagName('button')[0].background = 'rgb(200, 0, 0)'
            return
        }
        val.getElementsByTagName('button')[0].background = 'rgb(100, 0, 0)'
    })
})

function scrollpercenttoamt(percent) {
    return percent * (document.documentElement.scrollHeight - document.documentElement.clientHeight)
}

// let instructions = document.getElementById('instructions')
// instructions.style.position = 'absolute'
// instructions.style.top = scrollpercenttoamt(texts[0][0] / endingtime) + 'px'
// console.log(scrollpercenttoamt(texts[0][0] / endingtime));

function onscroll() {
    scrollamt = document.scrollingElement.scrollTop

    let scrollpercent = scrollamt / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    scrolltime = scrollpercent * timelinelength

    containers.forEach(function(val) {
        let n = ((1 + (scrolltime - val.offsettime) / 100) % 1)
        let ndeg = (n * 360) + "deg"
        val.style["-webkit-transform"] = "rotate3d(0, -1, 0, " + ndeg + ") translate3d(0px, " + (-scrolltime * verticalspread) + "px, 750px)"
    })

    timelabels.forEach(function(val) {
        let n = ((1 + (scrolltime - val.offsettime) / 100) % 1)
        let ndeg = (n * 360) + "deg"
        val.style["-webkit-transform"] = "rotate3d(0, -1, 0, " + ndeg + ") translate3d(0px, " + (-scrolltime * verticalspread) + "px, 750px)"
    })
}

document.addEventListener('scroll', onscroll)
onscroll()
