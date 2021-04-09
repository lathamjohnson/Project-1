var pad = document.querySelectorAll('.pad')
// var pad1 = document.querySelector('#pad1')
// var pad2 = document.querySelector('#pad2')
// var pad3 = document.querySelector('#pad3')
// var pad4 = document.querySelector('#pad4')
const newGame = document.querySelector('#newGame')
var counter = 3

function recordPadsInterval(callback, delay, reps){
    console.log('function called')
    var L = 0
    var interval = setInterval(function(){
                recordPadsInterval()
                if(L === reps){clearInterval(interval)}
    }, delay)
}

// recordPadsInterval(function(){
//     const n = Math.floor((Math.random() * 4) + 1)
//     const pad = document.querySelector(`#pad${n}`)
//     const activate = (p) => p.classList.add('on')
//     activate(pad)
//     const deactivate = (p) => p.classList.remove('on')
//     setTimeout(deactivate, 1000, pad)
//     console.log(pad.id)
// }, 1000, 5)


newGame.addEventListener('click', 
recordPadsInterval(function(){
    const n = Math.floor((Math.random() * 4) + 1)
    const pad = document.querySelector(`#pad${n}`)
    const activate = (p) => p.classList.add('on')
    activate(pad)
    const deactivate = (p) => p.classList.remove('on')
    setTimeout(deactivate, 1000, pad)
}, 1000, 5)
)

//Sequence handler function
//Calls the pad recorder function at a certain speed/time
//May require recursion to clearInterval once recording is done

function startSequence(){
    interval = setInterval(recordPad, 1000)
}

//Hits random pads for a certain interval, records pads as it goes
//Uses recursion to clearInterval once 
// l, s=''
function recordPad(l=5, s=''){
    // const n = Math.floor((Math.random() * 4) + 1)
    // const pad = document.querySelector(`#pad${n}`)
    console.log(pad.id)
    // const activate = (p) => p.classList.add('on')
    // activate(pad)
    // const deactivate = (p) => p.classList.remove('on')
    // setTimeout(deactivate, 1000, pad)

    // clearInterval(interval)

    s += pad.id.charAt(3)
    l--
    console.log(s)
    console.log(l)

    // recordPad(l, s)
    //Pass the recorded pad sequence into "pad check" function
}

function stop(){
    clearInterval()
}
//Pad Check Function
//Is called each time the player hits a pad
//Takes the value of the correct pad sequence, checks against it every time player hits a pad
//May use incrementation to check through the correct value, or hold in the same data type and compare
