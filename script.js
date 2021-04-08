var pad = document.querySelectorAll('.pad')
// var pad1 = document.querySelector('#pad1')
// var pad2 = document.querySelector('#pad2')
// var pad3 = document.querySelector('#pad3')
// var pad4 = document.querySelector('#pad4')
const newGame = document.querySelector('#newGame')

newGame.addEventListener('click', startSequence)

//Sequence handler function
//Calls the pad recorder function at a certain speed/time
//May require recursion to clearInterval once recording is done
function startSequence(){
    setInterval(recordPad, 2000)
}

//Hits random pads for a certain interval, records pads as it goes
//Uses recursion to clearInterval once 
function recordPad(){
    const n = Math.floor((Math.random() * 4) + 1)
    const pad = document.querySelector(`#pad${n}`)
    console.log(pad.id)
    
    const activate = (p) => p.classList.add('on')
    activate(pad)

    const deactivate = (p) => p.classList.remove('on')
    setTimeout(deactivate, 1000, pad)


    //Pass the recorded pad sequence into "pad check" function
}

//Pad Check Function
//Is called each time the player hits a pad
//Takes the value of the correct pad sequence, checks against it every time player hits a pad
//May use incrementation to check through the correct value, or hold in the same data type and compare
