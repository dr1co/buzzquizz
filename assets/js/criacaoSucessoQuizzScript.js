const quizzConfigObject = JSON.parse(localStorage.getItem("quizzConfigObject",));

function setBasicInfos() {
  document.querySelector(
    ".quizz-image > img"
  ).src = `${quizzConfigObject.image}`;
  document.querySelector(
    ".quizz-image p"
  ).innerHTML = `${quizzConfigObject.title}`;
}

function viewQuizz() {
  document.getElementById("sucesso-do-quizz").style.display = "none";
  document.getElementById("exibicao-quizz").style.display = "block";
}