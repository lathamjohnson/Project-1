const pad = document.querySelector('#pad1')

pad.addEventListener('click', animate)

function activate(pad, status='on'){pad.classList.add(status)}
function deactivate(pad, status='on'){pad.classList.remove(status)}

function animate(){
    activate(pad)
    setTimeout(deactivate, 300, pad)
}