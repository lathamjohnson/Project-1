var pad = document.querySelectorAll('.pad')
const newGame = document.querySelector('#newGame')
const levelCount = document.querySelector('#levelCount')
const difficulty = document.querySelector('#difficulty')
const board = document.querySelector('.board')
const score = document.querySelector('#score')
var gameSpeed = 1200
var recording = true
var level = 1
var playerMove = 0
var playerString = ''
var computerMove = 0
var computerString = ''

score.innerText = document.cookie.substring(10)

var currentSequence = setInterval(recordPad, 1000, 0)
clearInterval(currentSequence)

pad.forEach(p => {
    p.addEventListener('click', scorePlayer)
    p.addEventListener('click', animate)
})


difficulty.addEventListener('click', setSpeed)
newGame.addEventListener('click', startSequence)


function rankScore(cookie){
    const docScore = parseInt(document.cookie.substring(10), 10)
    const score = parseInt(cookie.substring(10), 10)
    if(score > docScore){document.cookie = `highscore=${score}`}
    else if(score < docScore){return}
    else{document.cookie = cookie}
}

function setSpeed(e){
    if(e.target.id == 'easy'){gameSpeed = 1200}
    else if(e.target.id == 'medium'){gameSpeed = 600}
    else if(e.target.id == 'hard'){gameSpeed = 300}
    else{return}
}

function startSequence(click=false){
    if(click){reset(1)}
    currentSequence = setInterval(recordPad, gameSpeed)
}

function setStatus(message){document.querySelector('#status').innerHTML = message}
function activate(pad, status='on'){pad.classList.add(status)}
function deactivate(pad, status='on'){pad.classList.remove(status)}

function animate(pad){
    if(pad.isTrusted && recording == false){
    activate(pad.toElement)
    setTimeout(deactivate, 150, pad.toElement)       
    }
    else{
    activate(pad)
    setTimeout(deactivate, (gameSpeed/2), pad)
    }
}

function scorePlayer(e){
    if(recording){return}
    else{
    playerString += e.toElement.id.charAt(3)
    if(playerString.charAt(playerMove) !== computerString.charAt(playerMove)){
        rankScore(`highscore=${level-1}`)
        endGame()
    }
    else if(playerString === computerString){
        setStatus('Correct! Next level...')
        reset(++level)
        levelCount.innerText = `Level: ${level}`
        startSequence()
    }
    else{
    playerMove ++
    }
}
}

function recordPad(){
    if(computerMove==(level)){
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

function reset(l){
    console.log(document.cookie)
    playerMove = 0
    playerString = ''
    computerMove = 0
    computerString = ''
    level = l
    deactivate(board, 'wrong')
    levelCount.innerText = `Level: ${level}`
}

function endGame(){
    recording=true
    score.innerText = document.cookie.substring(10)
    activate(board, 'wrong')
    setStatus('Thats not what simon said...')
    setTimeout(setStatus, 1500, 'Click above to start a new game')
}

function printInfo(info){
    console.log(info)
    console.log(`playerMove: ${playerMove}`)
    console.log(`playerString: ${playerString}`)
    console.log(`computerMove: ${computerMove}}`)
    console.log(`computerString: ${computerString}}`)
    console.log(`Level: ${level}`)
    }
