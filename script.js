var currentDisplay = document.getElementById('currentDisplay');

window.onload = function() {
    // add theme functionality
    const styleButtons = document.getElementsByClassName("theme-button");
    currentDisplay = document.getElementById('currentDisplay');

    styleButtons[0].addEventListener("click", changeTheme0);
    styleButtons[1].addEventListener("click", changeTheme1);
    styleButtons[2].addEventListener("click", changeTheme2);
    styleButtons[0].click();

    function changeTheme1() {
        hideButtons(this);
        const myBody = document.getElementsByTagName('body')[0];
        myBody.classList.remove('neon');
        myBody.classList.add('light');
    }
    
    function changeTheme2() {
        hideButtons(this);
        const myBody = document.getElementsByTagName('body')[0];
        myBody.classList.remove('light');
        myBody.classList.add('neon');
    }
    
    function changeTheme0() {
        hideButtons(this);
        const myBody = document.getElementsByTagName('body')[0];
        myBody.classList.remove('light');
        myBody.classList.remove('neon');
    }
    
    function hideButtons(btn) {
        const styleButtons = document.getElementsByClassName(btn.classList[0])
        for(let i = 0; i < 3; i++){
            styleButtons[i].style.backgroundColor = "transparent";
        }
        btn.style.backgroundColor = "var(--equal)";
    }
    

    
}

function reset() {
    currentDisplay.value = '';
}
function append(i){
    currentDisplay.value += i;
}
function detach(){
    currentDisplay.value = currentDisplay.value.slice(0, -1);
}
function calc() {
    currentDisplay.value = eval(currentDisplay.value)
}



  