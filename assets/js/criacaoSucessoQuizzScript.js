const quizzBasicInfos = JSON.parse(localStorage.getItem("quizzObjectRequest"));

function setBasicInfos() {
  document.querySelector(
    ".quizz-image"
  ).style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url("${quizzBasicInfos.image}")`;
  document.querySelector(
    ".quizz-image p"
  ).innerHTML = `${quizzBasicInfos.title}`;
}

function viewQuizz() {
  document.getElementById("sucesso-do-quizz").style.display = "none";
  //document.getElementById("visualizar-quizz").style.display = "block"; -- Seria para mostrar a página de visualização do quizz, ainda não sei como passar os parâmetros uma vez que essa página não está definida ainda...
}

function toHome() {
  document.getElementById("sucesso-do-quizz").style.display = "none";
  //document.getElementBById("página-home").style.display = "block"; -- Para mostrar a página home
}

setBasicInfos();
