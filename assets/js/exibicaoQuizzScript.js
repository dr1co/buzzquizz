let promise;

function viewQuizz(id) {
    promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`);
    promise.then(loadQuizz);
    const homePage = document.getElementById("navegacao");
    const quizzPage = document.getElementById("exibicao-quizz");
    homePage.style.display = "none";
    quizzPage.style.display = "block";
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
        getResults();
    }
    else
    {
        setTimeout(function () {questions[selectedAnswers.length].scrollIntoView()}, 2000);
    }
}

function getResults() {
    promise.then(showResults);
    console.log("passei por aqui")
}

function showResults(element) {
    const levelBox = document.getElementById("exibicao-quizz");
    const questions = levelBox.querySelectorAll(".content-box");
    const correctAnswers = document.getElementById("exibicao-quizz").querySelectorAll(".selected.correct");
    const result = Math.round(100*correctAnswers.length / questions.length);
    let j = 0;
    for(let i = 0 ; i < element.data.levels.length ; i++)
    {
        j = i + 1;
        if(j < element.data.levels.length)
        {
            if(result >= element.data.levels[i].minValue && result <= element.data.levels[j].minValue && j <= element.data.levels.length)
            {
                levelBox.innerHTML += `<div class="content-box">
                    <div class="level-title">
                    <p> ${element.data.levels[i].title} </p>
                    </div>
                    <div class="level-description flex">
                    <img src="${element.data.levels[i].image}" alt="imagem do nível" />
                    <p> ${element.data.levels[i].text} </p>
                    </div>
                    </div>`;
            }
        }
        else
        {
            levelBox.innerHTML += `<div class="content-box">
                <div class="level-title">
                <p> ${element.data.levels[i].title} </p>
                </div>
                <div class="level-description flex">
                <img src="${element.data.levels[i].image}" alt="imagem do nível" />
                <p> ${element.data.levels[i].text} </p>
                </div>
                </div>`;
        }
    }
    console.log("e por aqui");
}

function comparator() {
    return Math.random() - 0.5;
}