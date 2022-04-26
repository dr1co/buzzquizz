let quizzLevels, currentQuizzId;

function viewQuizz(id) {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`);
    promise.then(loadQuizz);
    const homePage = document.getElementById("navegacao");
    const quizzPage = document.getElementById("exibicao-quizz");
    const successQuizzPage = document.getElementById("sucesso-do-quizz");
    quizzPage.innerHTML = `<div class="quizz-header flex align-items-center justify-content-center">
    <img alt="Imagem do quizz" />
    <div class="image-background flex justify-content-center align-items-center">
    <p></p>
    </div>
    </div>`;
    homePage.style.display = "none";
    quizzPage.style.display = "block";
    successQuizzPage.style.display = "none";
    currentQuizzId = id;
}

function loadQuizz(element) {
    const quizzImage = document.querySelector(".quizz-header img");
    const quizzTitle = document.querySelector(".quizz-header p");
    const questionBoxes = document.getElementById("exibicao-quizz");
    let questionBox, answerBox, answers;
    quizzTitle.innerHTML = `${element.data.title}`;
    quizzImage.src = `${element.data.image}`;
    for(let i = 0 ; i < element.data.questions.length ; i++)
    {
        questionBoxes.innerHTML += `<div class="content-box">
            <div class="question">
            <p> ${element.data.questions[i].title} </p>
            </div>
            </div>`;
        questionBox = questionBoxes.querySelector(".content-box:last-of-type");
        questionBox.querySelector(".question").style.backgroundColor = `${element.data.questions[i].color}`;
        answers = element.data.questions[i].answers;
        answers.sort(comparator);
        questionBox.innerHTML += `<div class="answers flex"></div>`;
        answerBox = questionBox.querySelector(".answers");
        for(let j = 0 ; j < answers.length ; j++)
        {
            if(answers[j].isCorrectAnswer)
            {
                answerBox.innerHTML += `<div class="correct answer flex flex-direction-column" onclick="selectAnswer(this)">
                    <img src="${answers[j].image}" alt="imagem da resposta 1" />
                    <p> ${answers[j].text} </p>
                    </div>`;
            }
            else
            {
                answerBox.innerHTML += `<div class="wrong answer flex flex-direction-column" onclick="selectAnswer(this)">
                    <img src="${answers[j].image}" alt="imagem da resposta 1" />
                    <p> ${answers[j].text} </p>
                    </div>`;
            }
        }
    }
    quizzLevels = element.data.levels;
}

function selectAnswer(element) {
    const answers = element.parentNode.querySelectorAll(".answer");
    for(let i = 0 ; i < answers.length ; i++)
    {
        answers[i].classList.add("locked");
        answers[i].onclick = "";
        if(answers[i].classList.contains("correct"))
        {
            answers[i].querySelector("p").style.color = "#009C22";
        }
        else
        {
            answers[i].querySelector("p").style.color = "#FF4B4B";
        }
    }
    element.classList.remove("locked");
    element.classList.add("selected");
    checkResults();
}

function checkResults() {
    const questions = document.getElementById("exibicao-quizz").querySelectorAll(".content-box");
    const selectedAnswers = document.getElementById("exibicao-quizz").querySelectorAll(".selected.answer");
    if(questions.length === selectedAnswers.length)
    {
        showResults();
    }
    else
    {
        setTimeout(function () {questions[selectedAnswers.length].scrollIntoView()}, 2000);
    }
}

function showResults() {
    const levelBox = document.getElementById("exibicao-quizz");
    const questions = levelBox.querySelectorAll(".content-box");
    const correctAnswers = document.getElementById("exibicao-quizz").querySelectorAll(".selected.correct");
    const result = Math.round(100*correctAnswers.length / questions.length);
    let printed = false;
    for(let i = 0 ; i < quizzLevels.length - 1 ; i++)
    {
        if(result >= quizzLevels[i].minValue && result <= quizzLevels[i+1].minValue)
        {
            printed = true;
            levelBox.innerHTML += `<div class="content-box">
                <div class="level-title">
                <p> ${result}% de acerto: ${quizzLevels[i].title} </p>
                </div>
                <div class="level flex">
                <img src="${quizzLevels[i].image}" alt="imagem do nível" />
                <p> ${quizzLevels[i].text} </p>
                </div>
                </div>`;
        }
    }
    if(!printed)
    {
        levelBox.innerHTML += `<div class="content-box">
                <div class="level-title">
                <p> ${result}% de acerto: ${quizzLevels[quizzLevels.length - 1].title} </p>
                </div>
                <div class="level flex">
                <img src="${quizzLevels[quizzLevels.length - 1].image}" alt="imagem do nível" />
                <p> ${quizzLevels[quizzLevels.length - 1].text} </p>
                </div>
                </div>`;
    }
    levelBox.querySelector(".content-box:last-of-type").scrollIntoView();
    levelBox.innerHTML += `<div class="buttons-list flex flex-direction-column justify-content-center align-items-center">
        <button class="restart-button" onclick="viewQuizz(currentQuizzId)"> Reiniciar Quizz </button>
        <button class="home-button" onclick="returnHomePage()"> Ir para home </button>
        </div>`;
}

function comparator() {
    return Math.random() - 0.5;
}