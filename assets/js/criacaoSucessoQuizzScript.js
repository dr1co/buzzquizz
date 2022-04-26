function setBasicInfos() {
  const quizzConfigObject = JSON.parse(localStorage.getItem("quizzConfigObject"));
  const quizzIds = JSON.parse(localStorage.getItem("quizzIds"));
  document.querySelector(
    ".quizz-image > img"
  ).src = `${quizzConfigObject.image}`;
  document.querySelector(
    ".quizz-image p"
  ).innerHTML = `${quizzConfigObject.title}`;
  document.querySelector(
    ".show-quizz-buttons"
  ).innerHTML = `<button class="view-quizz-button" onclick="viewQuizz(${quizzIds[quizzIds.length - 1]})">
    Acessar Quizz
  </button>
  <button class="home-button" onclick="returnHomePage()">
    Voltar para home
  </button>`;
}

function viewQuizz() {
  document.getElementById("sucesso-do-quizz").style.display = "none";
  document.getElementById("exibicao-quizz").style.display = "block";
}