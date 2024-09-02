let gameseq=[];
let userseq=[];
let started = false; 
let level = 0;
let btns = ["yellow","red","green","purple"];
let h2 = document.querySelector("h2");
let highestscore = localStorage.getItem('highestscore') || 0;
let h3=document.querySelector('h3');
    h3.innerText=`Highest Score: ${highestscore}`;

document.addEventListener("keydown",function(){
    if(started == false){
        document.querySelector("body").style.background=`linear-gradient(135deg,#f326ff,#f9f9f9)`;
        console.log("game started");
        started=true;
        lvlup();
    }
})

function gameflash(btn){
    btn.classList.add("flash")
    setTimeout(() =>{
        btn.classList.remove("flash");
    },250)
}

function userflash(btn){
    btn.classList.add("userflash")
    setTimeout(() =>{
        btn.classList.remove("userflash");
    },250)
}

function lvlup(){
    userseq=[];
    level++;
    h2.innerText=`level ${level}`;
    let randIdx = Math.floor(Math.random() * 3);
    let rancolor = btns[randIdx];
    let randbtn =  document.querySelector(`.${rancolor}`);
    // console.log(rancolor);
    // console.log(randbtn);
    gameseq.push(rancolor);
    console.log(gameseq);
    gameflash(randbtn);
}

function checkans(idx){
    if(gameseq[idx]=== userseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(lvlup,1000);
        }
    }else{
        h2.innerHTML=`Game over! Your score was <b>${level}</b> <br> Press any key to Start Game`;
        document.querySelector("body").style.background="linear-gradient(315deg, #acabb0 0%, #e01c34 74%)";
        h2.style.color='white';
        if (level > highestscore) {
            highestscore = level;
            localStorage.setItem('highestscore',highestscore);
        }
        let h3=document.querySelector('h3');
        h3.innerText=`Highest Score: ${highestscore}`;
        console.log(`Higest score is ${highestscore}`);
        reset();
    }
}

function btnpress(){
    let btn = this;
    userflash(btn);
    let usercolor = btn.getAttribute("id");
    console.log(usercolor);
    userseq.push(usercolor)
    checkans(userseq.length-1);
}

let albtns = document.querySelectorAll("button");
for(btn of albtns){
    btn.addEventListener("click",btnpress )
}

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}