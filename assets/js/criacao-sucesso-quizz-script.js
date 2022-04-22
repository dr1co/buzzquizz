const quizzBasicInfos = JSON.parse(localStorage.getItem("quizzObjectRequest"))

function setBasicInfos() {
    document.querySelector(".quizz-image").src = `${quizzBasicInfos.image}`;
    document.querySelector(".image-background p").innerHTML = `${quizzBasicInfos.title}`;
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