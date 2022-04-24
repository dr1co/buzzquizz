function getQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
    promise.then(loadQuizzes);
    promise.catch(function () {
        console.warn("Houve um problema ao carregar os quizzes");
    });
}

function loadQuizzes(element){
    const userQuizzes = document.querySelector(".user-quizzes-list");
    const allQuizzes = document.querySelector(".quizzes-list");
    /* const quizzId = JSON.parse(localStorage.getItem("quizzId")); */
    for(let i = 0 ; i < element.data.length ; i++)
    {
        /* for(let j = 0 ; j < quizzId.length ; j++)
        {
            if(element.data[i].id === quizzId[j])
            {
                userQuizzes.innerHTML += `<li class="quizz" onclick="viewQuizz(${element.data[i].id})">
                <div class="image-background">
                    <p> ${element.data[i].title} </p>
                </div>
                <img src=${element.data[i].image} alt="imagem do quizz" />
            </li>`;
            }
            else
            { */
                allQuizzes.innerHTML += `<li class="quizz" onclick="viewQuizz(${element.data[i].id})">
                <div class="image-background">
                    <p> ${element.data[i].title} </p>
                </div>
                <img src=${element.data[i].image} alt="imagem do quizz" />
            </li>`; /*
            }
        } */
    }
    printNewQuizzButton();
}

function printNewQuizzButton() {
    const userQuizzes = document.querySelector(".user-quizzes");
    const userQuizzesList = userQuizzes.querySelectorAll(".user-quizzes-list > li");
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
    </div>` + userQuizzes.innerHTML;
    }
}

function viewQuizz(id) {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`);
    promise.then(function () {
        // document.getElementById("exibicao-quizz").style.display = "inline";
        document.getElementById("navegacao").style.display = "none";
    });
}

function createQuizz() {
    document.getElementById("navegacao").style.display = "none";
    // document.getElementById("criar-quizz").style.display = "inline";
}
getQuizzes();