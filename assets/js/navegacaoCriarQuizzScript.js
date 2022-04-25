function getAllQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
    promise.then(loadAllQuizzes);
    promise.catch(function () {
        console.warn("Houve um problema ao carregar os quizzes");
    });
}

function getUserQuizzes() {
    const quizzIds = JSON.parse(localStorage.getItem("quizzIds"));
    let promise;
    for(let i = 0 ; i < quizzIds.length ; i++)
    {
        promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${quizzIds[i]}`);
        promise.then(loadUserQuizzes);
    }
    promise.then(printNewQuizzButton);
}

function loadAllQuizzes(element) {
    const quizzIds = JSON.parse(localStorage.getItem("quizzIds"));
    const allQuizzes = document.querySelector(".quizzes-list");
    allQuizzes.innerHTML = "";
    for(let i = 0 ; i < element.data.length ; i++)
    {
        if(quizzIds.indexOf(element.data[i].id) === -1)
        {
            allQuizzes.innerHTML += `<li class="quizz" onclick="viewQuizz(${element.data[i].id})">
            <div class="image-background">
                <p> ${element.data[i].title} </p>
            </div>
            <img src=${element.data[i].image} alt="imagem do quizz" />
        </li>`;
        }
    }
    getUserQuizzes();
}

function loadUserQuizzes(element) {
    const userQuizzes = document.querySelector(".user-quizzes-list");
    userQuizzes.innerHTML += `<li class="quizz" onclick="viewQuizz(${element.data.id})">
    <div class="image-background">
        <p> ${element.data.title} </p>
    </div>
    <img src=${element.data.image} alt="imagem do quizz" />
    <div class="quizz-action-buttons">
        <button onclick="updateQuizz(${element.data.id})">
           <ion-icon name="create"></ion-icon>
        </button>
        <button onclick="deleteQuizz(${element.data.id})">
            <ion-icon name="trash"></ion-icon>
        </button>
    </div>
</li>`;
}

function printNewQuizzButton() {
    const userQuizzes = document.querySelector(".user-quizzes");
    userQuizzesList = userQuizzes.querySelectorAll("li");
    if(userQuizzesList.length === 0)
    {
        userQuizzes.innerHTML = `<div class="create-quizz flex flex-direction-column justify-content-center align-items-center">
        <p> Você não criou nenhum <br> quizz ainda :( </p>
        <button onclick="createQuizz()"> Criar quizz </button>
    </div>`;
    }
    else
    {
        userQuizzes.innerHTML = `<div class="quizzes-title flex align-items-center">
        <h3> Seus Quizzes </h3>
        <ion-icon name="add-circle" onclick="createQuizz()"></ion-icon>
    </div>
    ` + userQuizzes.innerHTML;
    }
}

function viewQuizz(id) {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`);
    promise.then(function () {
        document.getElementById("exibicao-quizz").style.display = "inline";
        document.getElementById("navegacao").style.display = "none";
    });
}

function createQuizz() {
    document.getElementById("navegacao").style.display = "none";
    document.getElementById("criacao-infos-basicas").style.display = "inline";
}

function showHomePage() {
    const sections = document.querySelectorAll("section");
    const homePage = document.getElementById("navegacao");
    for(let i = 0 ; i < sections.length ; i++)
    {
        sections[i].style.display = "none";
    }
    document.querySelector(".user-quizzes").innerHTML = `<ul class="user-quizzes-list"></ul>`;
    document.querySelector(".all-quizzes").innerHTML = `<div class="quizzes-title">
    <h3>Todos os Quizzes</h3>
  </div>
  <ul class="quizzes-list"></ul>`
    homePage.style.display = "block";
    getAllQuizzes();
}

showHomePage();