const pad = document.querySelectorAll('.pad')
const newGame = document.querySelector('#newGame')
const levelCount = document.querySelector('#levelCount')
const difficulty = document.querySelector('#difficulty')
const board = document.querySelector('.board')
const score = document.querySelector('#score')
const mute = document.querySelector('#mute')

var muted = false
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

mute.addEventListener('click', checkMute)
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
    if(e.target.id == 'easy'){gameSpeed = 1200; levelCount.style.color='green'}
    else if(e.target.id == 'medium'){gameSpeed = 600; levelCount.style.color='goldenrod'}
    else if(e.target.id == 'hard'){gameSpeed = 300; levelCount.style.color='red'}
    else{return}
}

function startSequence(click=false){
    if(click){reset(1)}
    setStatus('Watch...')
    setTimeout(function(){currentSequence = setInterval(recordPad, gameSpeed)}, 300)
    
}

function setStatus(message){document.querySelector('#status').innerHTML = message}
function activate(pad, status='on'){pad.classList.add(status)}
function deactivate(pad, status='on'){pad.classList.remove(status)}

function checkMute(){
    if(muted){muted=false; mute.src='/assets/unmuted.png'}
    else{muted=true; mute.src='/assets/muted.png'}
}

function playSound (element){
    element.style.display = 'block'
    setTimeout(element.style.display = 'none', .500)
}

function animate(pad){
    if(pad.isTrusted && recording == false){
    var mp3 = pad.target.firstElementChild
    if(!muted){mp3.play()}
    activate(pad.target)
    setTimeout(deactivate, 150, pad.target)       
    } else if(pad.isTrusted){}
    else{
    var mp3 = pad.firstElementChild
    if(!muted){mp3.play()}
    activate(pad)
    setTimeout(deactivate, (gameSpeed/2), pad)
    }
}

function scorePlayer(e){
    if(recording){return}
    else{
    playerString += e.target.id.charAt(3)
    if(playerString.charAt(playerMove) !== computerString.charAt(playerMove)){
        rankScore(`highscore=${level-1}`)
        endGame()
    }
    else if(playerString === computerString){
        setStatus('Correct! Next level...')
        setTimeout(function(){
            reset(++level)
            startSequence()
        }, 1000)
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
    const n = Math.floor((Math.random() * 4) + 1)
    const pad = document.querySelector(`#pad${n}`)
    animate(pad)
    computerString += pad.id.charAt(3)
    computerMove ++
    }
}

function reset(l){
    clearInterval(currentSequence)
    playerMove = 0
    playerString = ''
    computerMove = 0
    computerString = ''
    level = l
    deactivate(board, 'wrong')
    levelCount.innerText = `Level ${level}`
}

function endGame(){
    recording=true
    score.innerText = document.cookie.substring(10)
    activate(board, 'wrong')
    setStatus('Thats not what simon said...')
    setTimeout(setStatus, 2000, 'Click above to start a new game')
}

