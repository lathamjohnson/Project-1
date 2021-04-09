var pad = document.querySelectorAll('.pad')
const newGame = document.querySelector('#newGame')

var currentSequence = setInterval(recordPad, 1000, 0)
clearInterval(currentSequence)

var level = 3
var playerMove = 0
var playerString = ''
var computerMove = 0
var computerString = ''
var recording

pad.forEach(p => {
    p.addEventListener('click', scorePlayer)
    p.addEventListener('click', animate)
})

newGame.addEventListener('click', startSequence)

function startSequence(){
    currentSequence = setInterval(recordPad, 1500)
}

function animate(pad){
    const activate = (p) => p.classList.add('on')
    const deactivate = (p) => p.classList.remove('on')
    if(pad.isTrusted && recording == false){
    console.log(pad)
    activate(pad.toElement)
    setTimeout(deactivate, 200, pad.toElement)       
    }
    else{
    activate(pad)
    setTimeout(deactivate, 1000, pad)
    }
}

function setStatus(message){
    document.querySelector('#status').innerHTML = message
}

function scorePlayer(e){
    if(recording){return}
    else{
    playerString += e.toElement.id.charAt(3)
    if(playerString.charAt(playerMove) !== computerString.charAt(playerMove)){
        setStatus('Thats not what simon said...')
        setTimeout(setStatus, 1500, 'Click above to start a new game')
        reset(3)
    }
    else if(playerString === computerString){
        setStatus('Correct! Next level...')
        reset()
        level ++
        setTimeout(setStatus, 1000, `Level: ${level - 2}` )
        // console.log(`Level: ${level}`)
        // console.log(`Computer: ${computerString}, ${computerMove}`)
        // console.log(`Player: ${playerString}, ${playerMove}`)
        startSequence()
    }
    else{
    playerMove ++
    console.log(playerString)
    }
}
}

function recordPad(){
    if(computerMove==level){
        clearInterval(currentSequence)
        recording = false
        setTimeout(setStatus, 500, `Repeat it!`)
        console.log(computerString)
    }
    else{
    recording = true
    setStatus('Listen...')
    const n = Math.floor((Math.random() * 4) + 1)
    const pad = document.querySelector(`#pad${n}`)
    console.log(pad.id)
    animate(pad)
    computerString += pad.id.charAt(3)
    computerMove ++
    }
}

function reset(l=level){
    playerMove = 0
    playerString = ''
    computerMove = 0
    computerString = ''
    level = l
}


//Pad Check Function
//Is called each time the player hits a pad
//Takes the value of the correct pad sequence, checks against it every time player hits a pad
//May use incrementation to check through the correct value, or hold in the same data type and compare
