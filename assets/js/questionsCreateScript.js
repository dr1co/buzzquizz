function createQuestionsInputs() {
  const quizzObjectRequest = JSON.parse(
    localStorage.getItem("quizzObjectRequest")
  );
  const questions = document.getElementById("questions");

  for (let i = 1; i <= quizzObjectRequest.numberQuestions; i++) {
    questions.innerHTML += questionTemplate(i);
  }
}

function openQuestionInputs(el) {
  console.log(el.id);
}

function questionTemplate(index) {
  return `<div data-question="pergunta${index}" class="question flex flex-direction-column align-items-center">
          <div onclick="openQuestionInputs(this)" class="question-label" id="pergunta${index}">
            <span class="default-title">Pergunta ${index}</span>
            <img src="./assets/img/question-icon.png" alt="Expandir pergunta">
          </div> 
          <div data-question="pergunta${index}" class="default-input-group-width flex flex-direction-column d-none">  
            <div class="flex flex-direction-column">
              <span class="default-title">Pergunta ${index}</span>
              <input
                class="default-input-style"
                type="text"
                name="question-text"
                placeholder="Texto da pergunta"
              />
              <input
                class="default-input-style"
                type="text"
                name="question-background-color"
                placeholder="Cor de fundo da pergunta"
              />
            </div>
            <div class="flex flex-direction-column">
              <span class="default-title">Resposta correta</span>
              <input
                class="default-input-style"
                type="text"
                name="answer-label"
                placeholder="Resposta correta"
              />
              <input
                class="default-input-style"
                type="text"
                name="image-url"
                placeholder="URL da imagem"
              />
            </div>
            <div class="flex flex-direction-column">
              <span class="default-title">Respostas incorretas</span>
              <div
                class="incorrect-group-input-margin flex flex-direction-column"
              >
                <input
                  class="default-input-style"
                  type="text"
                  name="answer-label"
                  placeholder="Resposta incorreta 1"
                />
                <input
                  class="default-input-style"
                  type="text"
                  name="image-url"
                  placeholder="URL da imagem 1"
                />
              </div>
              <div
                class="incorrect-group-input-margin flex flex-direction-column"
              >
                <input
                  class="default-input-style"
                  type="text"
                  name="answer-label"
                  placeholder="Resposta incorreta 2"
                />
                <input
                  class="default-input-style"
                  type="text"
                  name="image-url"
                  placeholder="URL da imagem 2"
                />
              </div>
              <div class="flex flex-direction-column">
                <input
                  class="default-input-style"
                  type="text"
                  name="answer-label"
                  placeholder="Resposta incorreta 3"
                />
                <input
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
  } catch (e) {
    showWarningMessage(generalWarning);
  }
}

function resetVerify(allInputs, warnings) {
  allInputs.forEach((el) => {
    el.style.borderColor = "#D1D1D1";
  });

  warnings.forEach((warning) => {
    warning.style.display = "none";
  });
}

function showWarningMessage(labelError) {
  labelError.style.display = "block";
}

function setLabelBorderWarning(label) {
  label.style.borderColor = "#EC362D";
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
        setLabelBorderWarning(label);
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
      setLabelBorderWarning(label);
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
      setLabelBorderWarning(label);
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
    if (label.value.search(regex) < 0) {
      setLabelBorderWarning(label);
      error++;
    }
  });

  if (error > 0) {
    showWarningMessage(imagesUrlWarning);
    throw new Error();
  }
}
