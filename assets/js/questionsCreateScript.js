function createQuestionsInputs() {
  const quizzObjectRequest = JSON.parse(
    localStorage.getItem("quizzConfigObject")
  );
  const questions = document.getElementById("questions");

  for (let i = 1; i <= quizzObjectRequest.numberQuestions; i++) {
    questions.innerHTML += questionTemplate(i);
  }
}

function saveObjectData() {
  const quizzObjectRequest = JSON.parse(
    localStorage.getItem("quizzConfigObject")
  );

  const generalQuestionsInfo = document.querySelectorAll(
    ".general-question-info"
  );
  const correctQuestionAnwswers = document.querySelectorAll(".correct-anwswer");
  const incorrectQuestionAnswers = document.querySelectorAll(
    ".incorrect-answers .incorrect-item"
  );

  const questions = [];

  generalQuestionsInfo.forEach((info) => {
    const obj = {};
    obj[info.childNodes[3].dataset.question] = {
      title: info.childNodes[3].value,
      image: info.childNodes[5].value,
      answers: []
    };

    questions.push(obj);
  });

  const answers = [];
  correctQuestionAnwswers.forEach((correct) => {
    const obj = {};
    obj[correct.childNodes[3].dataset.question] = {
      text: correct.childNodes[3].value,
      image: correct.childNodes[5].value,
      isCorrectAnswer: true,
    };

    answers.push(obj);
  });

  incorrectQuestionAnswers.forEach((incorrect) => {
    const obj = {};
    obj[incorrect.childNodes[1].dataset.question] = {
      text: incorrect.childNodes[1].value,
      image: incorrect.childNodes[3].value,
      isCorrectAnswer: false,
    };

    answers.push(obj);
  });

  for (const question of questions) {
    for (const answer of answers) {
      if (Object.getOwnPropertyNames(answer)[0] === Object.getOwnPropertyNames(question)[0]) {
        for (const answerKey in answer) {
          if (answer[answerKey].text) {
            question[Object.getOwnPropertyNames(question)[0]].answers.push(answer[answerKey]);
          }
        }
      }
    }
  }

  const quizzObjectCreationRequest = {
    title: quizzObjectRequest.title,
    image: quizzObjectRequest.image,
    questions: []
  };

  questions.forEach((question) => {
    for (const questionKey in question) {
      quizzObjectCreationRequest.questions.push(question[questionKey]);
    }
  })

  localStorage.setItem('quizzObjectCreationRequest', JSON.stringify(quizzObjectCreationRequest));
}

function openQuestionInputs(el) {
  el.classList.add("d-none");
  const questions = document.querySelectorAll("[data-question]");
  questions.forEach((question) => {
    if (question.dataset.question === el.id) {
      question.classList.remove("d-none");
    }
  });
}

function questionTemplate(index) {
  return `<div data-question="pergunta${index}" class="question flex flex-direction-column align-items-center">
          <div onclick="openQuestionInputs(this)" class="question-label" id="pergunta${index}">
            <span class="default-title">Pergunta ${index}</span>
            <img src="./assets/img/question-icon.png" alt="Expandir pergunta">
          </div> 
          <div data-question="pergunta${index}" class="default-input-group-width flex flex-direction-column d-none">  
            <div data-question="pergunta${index}" class="general-question-info flex flex-direction-column">
              <span class="default-title">Pergunta ${index}</span>
              <input
              data-question="pergunta${index}"
                class="default-input-style"
                type="text"
                name="question-text"
                placeholder="Texto da pergunta"
              />
              <input
              data-question="pergunta${index}"
                class="default-input-style"
                type="text"
                name="question-background-color"
                placeholder="Cor de fundo da pergunta"
              />
            </div>
            <div data-question="pergunta${index}" class="correct-anwswer flex flex-direction-column">
              <span class="default-title">Resposta correta</span>
              <input
              data-question="pergunta${index}"
                class="default-input-style"
                type="text"
                name="answer-label"
                placeholder="Resposta correta"
              />
              <input
              data-question="pergunta${index}"
                class="default-input-style"
                type="text"
                name="image-url"
                placeholder="URL da imagem"
              />
            </div>
            <div data-question="pergunta${index}" class="incorrect-answers flex flex-direction-column">
              <span class="default-title">Respostas incorretas</span>
              <div
                class="incorrect-item incorrect-group-input-margin flex flex-direction-column"
              >
                <input
                data-question="pergunta${index}"
                  class="default-input-style"
                  type="text"
                  name="answer-label"
                  placeholder="Resposta incorreta 1"
                />
                <input
                data-question="pergunta${index}"
                  class="default-input-style"
                  type="text"
                  name="image-url"
                  placeholder="URL da imagem 1"
                />
              </div>
              <div
                class="incorrect-item incorrect-group-input-margin flex flex-direction-column"
              >
                <input
                data-question="pergunta${index}"
                  class="default-input-style"
                  type="text"
                  name="answer-label"
                  placeholder="Resposta incorreta 2"
                />
                <input
                  data-question="pergunta${index}"
                  class="default-input-style"
                  type="text"
                  name="image-url"
                  placeholder="URL da imagem 2"
                />
              </div>
              <div class="incorrect-item flex flex-direction-column">
                <input
                  data-question="pergunta${index}"
                  class="default-input-style"
                  type="text"
                  name="answer-label"
                  placeholder="Resposta incorreta 3"
                />
                <input
                  data-question="pergunta${index}"
                  class="default-input-style"
                  type="text"
                  name="image-url"
                  placeholder="URL da imagem 3"
                />
              </div>
            </div>
          </div>
        </div>`;
}

function verifyInputs() {
  const answersLabels = document.getElementsByName("answer-label");
  const questionsText = document.getElementsByName("question-text");
  const questionsBackgroundColor = document.getElementsByName(
    "question-background-color"
  );
  const imagesUrl = document.getElementsByName("image-url");
  const answerLabelWarning = document.getElementById("answer-label-warning");
  const questionTextWarning = document.getElementById("question-text-warning");
  const questionBackgroundColorWarning = document.getElementById(
    "question-background-color-warning"
  );
  const imagesUrlWarning = document.getElementById("image-url-warning");
  const generalWarning = document.getElementById("warning");

  const allInputs = [
    ...answersLabels,
    ...questionsText,
    ...questionsBackgroundColor,
    ...imagesUrl,
  ];
  const warnings = [
    answerLabelWarning,
    questionTextWarning,
    questionBackgroundColorWarning,
    imagesUrlWarning,
    generalWarning,
  ];

  resetVerify(allInputs, warnings);

  try {
    verifyQuestionsText(questionsText, questionTextWarning);
    verifyQuestionsBackgroundColor(
      questionsBackgroundColor,
      questionBackgroundColorWarning
    );
    verifyAnswersLabels(answersLabels, answerLabelWarning);
    verifyImagesUrl(imagesUrl, imagesUrlWarning);
    saveObjectData();
  } catch (e) {
    showWarningMessage(generalWarning);
  }
}

function resetVerify(allInputs, warnings) {
  allInputs.forEach((el) => {
    el.style.borderColor = "#D1D1D1";
    el.style.backgroundColor = "#FFFFFF";
  });

  warnings.forEach((warning) => {
    warning.style.display = "none";
  });
}

function showWarningMessage(labelError) {
  labelError.style.display = "block";
}

function setLabelWarning(label) {
  label.style.borderColor = "#EC362D";
  label.style.backgroundColor = "#FFE9E9";
}

function verifyAnswersLabels(answersLabels, answerLabelWarning) {
  let error = 0;

  answersLabels.forEach((label) => {
    if (error < 2) {
      if (
        !label.value &&
        (label.placeholder === "Resposta correta" ||
          label.placeholder.includes("Resposta incorreta 1"))
      ) {
        setLabelWarning(label);
        error++;
      }
    }
  });

  if (error > 0) {
    showWarningMessage(answerLabelWarning);
    throw new Error();
  }
}

function verifyQuestionsText(questionsText, questionTextWarning) {
  let error = 0;

  questionsText.forEach((label) => {
    if (label.value.length < 20) {
      setLabelWarning(label);
      error++;
    }
  });

  if (error > 0) {
    showWarningMessage(questionTextWarning);
    throw new Error();
  }
}

function verifyQuestionsBackgroundColor(
  questionsBackgroundColor,
  questionsBackgroundColorWarning
) {
  let error = 0;
  const regex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";

  questionsBackgroundColor.forEach((label) => {
    if (label.value.search(regex) < 0) {
      setLabelWarning(label);
      error++;
    }
  });

  if (error > 0) {
    showWarningMessage(questionsBackgroundColorWarning);
    throw new Error();
  }
}

function verifyImagesUrl(imagesUrl, imagesUrlWarning) {
  let error = 0;
  const regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  imagesUrl.forEach((label) => {
    if (error < 2) {
      if (label.value.search(regex) < 0 && label.value) {
        setLabelWarning(label);
        error++;
      }
    }
  });

  if (error > 0) {
    showWarningMessage(imagesUrlWarning);
    throw new Error();
  }
}
