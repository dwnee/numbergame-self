// 랜덤번호 지정
// 유저가 번호 입력하고 go 버튼 누름
// 맞추면 맞췄습니다 출력
// 랜덤번호 < 입력 번호 Down
// 랜덤번호 > 입력 번호 Up
// Reset누르면 게임 리셋
// 5번 기회 소진 시 게임 끝남 (더 이상 추측 불가, 버튼 disabled)
// 유저가 1~100 범위 밖의 숫자 입력하면 알려준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
document.addEventListener("DOMContentLoaded", function() {
  let comMakeRandomNum = 0;
  let answer = document.getElementById("answer");
  let goBtn = document.getElementById("btn-go");
  let userInput = document.getElementById("user-input");
  let resultArea = document.getElementById("result-area");
  let chanceArea = document.getElementById("chance-area");
  let chances = 3;
  let gameOver = false;
  let resetBtn = document.getElementById("btn-reset");
  let history = [];

  goBtn.addEventListener("click", play);
  resetBtn.addEventListener("click", reset);
  
  function pickRandomNum(){
    comMakeRandomNum = Math.floor(Math.random()*100)+1
    console.log("랜덤숫자", comMakeRandomNum)
    answer.textContent=comMakeRandomNum;
  }
  pickRandomNum();
  
  function play(){
    let userValue = userInput.value; 
    console.log("사용자가 입력한 숫자", userValue);
    
    //유효성 검사
    if(userValue < 1 || userValue > 100){
      resultArea.textContent="1과 100사이 숫자를 입력해주세요"
      return;
    }
    if(history.includes(userValue)){
      resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해주세요";
      return;
    }
    
    chances--;
    chanceArea.textContent = `${chances}번`
    if(userValue > comMakeRandomNum){
      resultArea.textContent = "Down"
    } else if (userValue < comMakeRandomNum){
      resultArea.textContent = "Up"
    } else {
      resultArea.textContent = "맞추셨습니다."
      gameOver = true;
    }
    history.push(userValue);
    
    
    if(chances < 1){
      gameOver = true;
    }
    
    if(gameOver) {
      goBtn.disabled = true;
      if(userValue != comMakeRandomNum)
      resultArea.textContent = `정답은 ${comMakeRandomNum}입니다`
    }
  }
  
  function reset(){
    //input 창 정리
    userInput.value="";
    pickRandomNum()
    resultArea.textContent="결과값이 여기 나옵니다."
    chances = 3;
    chanceArea.textContent = `${chances}번`;
    goBtn.disabled = false;
    history=[];
    answer.textContent=comMakeRandomNum;
    gameOver = false;
  }
  
  userInput.addEventListener("focus", function(){
    userInput.value=""
  })
})