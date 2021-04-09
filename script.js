var pad = document.querySelectorAll('.pad')
const newGame = document.querySelector('#newGame')
const levelCount = document.querySelector('#levelCount')
var level = 3
var playerMove = 0
var playerString = ''
var computerMove = 0
var computerString = ''
var recording
var currentSequence = setInterval(recordPad, 1000, 0)
clearInterval(currentSequence)

pad.forEach(p => {
    p.addEventListener('click', scorePlayer)
    p.addEventListener('click', animate)
})

newGame.addEventListener('click', startSequence)

function startSequence(){
    reset(3)
    currentSequence = setInterval(recordPad, 1500)
}

function setStatus(message){document.querySelector('#status').innerHTML = message}
function activate(pad, status='on'){pad.classList.add(status)}
function deactivate(pad, status='on'){pad.classList.remove(status)}

function animate(pad){
    if(pad.isTrusted && recording == false){
    activate(pad.toElement)
    setTimeout(deactivate, 200, pad.toElement)       
    }
    else{
    activate(pad)
    setTimeout(deactivate, 1000, pad)
    }
}

function scorePlayer(e){
    if(recording){return}
    else{
    playerString += e.toElement.id.charAt(3)
    if(playerString.charAt(playerMove) !== computerString.charAt(playerMove)){
        endGame()
    }
    else if(playerString === computerString){
        setStatus('Correct! Next level...')
        reset()
        level ++
        levelCount.innerText = `Level: ${level-2}`
        setTimeout(setStatus, 1000, `Level: ${level - 2}` )
        startSequence()
    }
    else{
    playerMove ++
    }
}
}

function recordPad(){
    if(computerMove==level){
        clearInterval(currentSequence)
        recording = false
        setTimeout(setStatus, 500, `Repeat it!`)
    }
    else{
    recording = true
    setStatus('Listen...')
    const n = Math.floor((Math.random() * 4) + 1)
    const pad = document.querySelector(`#pad${n}`)
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
    pad.forEach(p =>{
        deactivate(p, 'wrong')
    })
    levelCount.innerText = `Level: ${level-2}`
}

function endGame(){
    pad.forEach(p => {
        activate(p, 'wrong')
    })
    setStatus('Thats not what simon said...')
    setTimeout(setStatus, 1500, 'Click above to start a new game')
}


//Pad Check Function
//Is called each time the player hits a pad
//Takes the value of the correct pad sequence, checks against it every time player hits a pad
//May use incrementation to check through the correct value, or hold in the same data type and compare
