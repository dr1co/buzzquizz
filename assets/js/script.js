async function createQuizzRequest() {
  const quizzObjectCreationRequest = JSON.parse(
    localStorage.getItem("quizzObjectCreationRequest")
  );

  const { data } = await axios.post(
    "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes",
    quizzObjectCreationRequest
  );

  const quizzIds = JSON.parse(localStorage.getItem("quizzIds"));
  const quizzIdAndKeys = JSON.parse(localStorage.getItem("quizzIdAndKey"));

  if (!quizzIds) {
    const ids = [];
    ids.push(data.id);
    localStorage.setItem(`quizzIds`, JSON.stringify(ids));
  } else {
    quizzIds.push(data.id);
    localStorage.setItem(`quizzIds`, JSON.stringify(quizzIds));
  }

  if (!quizzIdAndKeys) {
    const idsAndKeys = [];
    idsAndKeys.push({
      id: data.id,
      key: data.key,
    });
    localStorage.setItem(`quizzIdAndKey`, JSON.stringify(idsAndKeys));
  } else {
    quizzIdAndKeys.push({
      id: data.id,
      key: data.key,
    });
    localStorage.setItem(`quizzIds`, JSON.stringify(quizzIdAndKeys));
  }

  return data;
}

async function updateQuizzRequest(quizzInfo, quizzObjectCreationRequest) {
  const response = await axios({
    method: 'put',
    url: `https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${quizzInfo.id}`,
    data: quizzObjectCreationRequest,
    headers: {
      "Secret-Key": quizzInfo.key,
    }
  })
  const finishButton = document.getElementById('finish-quizz');
  finishButton.style.display = 'block';

  return response;
}

async function deleteQuizz(id) {
  const quizz = findQuizz(id);

  await axios.delete(
    `https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`,
    {
      headers: {
        "Secret-Key": quizz.key,
      },
    }
  );
}

async function updateQuizz(id) {
  event.stopPropagation();
  const apiQuizz = await getQuizz(id);
  localStorage.setItem("apiQuizz", JSON.stringify(apiQuizz));

  goToBasicInfoCreationAndCompleteValues(apiQuizz);

  const finishButton = document.getElementById("finish-quizz");
  const levelsCreation = document.getElementById("levels-creation");

  finishButton.style.display = "none";
  levelsCreation.innerHTML += updateButton(id);
}

async function updateData(id) {
  const quizz = findQuizz(id);
  await getInputsAndVerify(quizz);
}

function updateButton(id) {
  return `<button id="update-quizz" onclick="updateData(${id})">Atualizar Quizz</button>`;
}

function goToBasicInfoCreationAndCompleteValues(quizz) {
  const criacaoInfosBasicas = document.getElementById("criacao-infos-basicas");
  const navegacao = document.getElementById("navegacao");
  const quizzTitle = document.getElementById("quizzTitle");
  const quizzImage = document.getElementById("quizzImage");
  const quizzNumberQuestions = document.getElementById("quizzNumberQuestions");
  const quizzNumberLevels = document.getElementById("quizzNumberLevels");

  quizzTitle.value = quizz.title;
  quizzImage.value = quizz.image;
  quizzNumberQuestions.value = quizz.questions.length;
  quizzNumberLevels.value = quizz.levels.length;

  navegacao.style.display = "none";
  criacaoInfosBasicas.style.display = "block";
}

function goToQuestionsCreationAndCompleteValues(quizz) {
  quizz.questions.forEach((question, index) => {
    const pergunta = document.getElementById(`pergunta-${index + 1}`);

    pergunta.childNodes[1].childNodes[3].value = question.title;
    pergunta.childNodes[1].childNodes[5].value = question.color;
    question.answers.forEach((answer, index) => {
      if (answer.isCorrectAnswer) {
        pergunta.childNodes[3].childNodes[3].value = answer.text;
        pergunta.childNodes[3].childNodes[5].value = answer.image;
      }
      if (!answer.isCorrectAnswer && index === 1) {
        pergunta.childNodes[5].childNodes[3].childNodes[1].value = answer.text;
        pergunta.childNodes[5].childNodes[3].childNodes[3].value = answer.image;
      }
      if (!answer.isCorrectAnswer && index === 2) {
        pergunta.childNodes[5].childNodes[5].childNodes[1].value = answer.text;
        pergunta.childNodes[5].childNodes[5].childNodes[3].value = answer.image;
      }
      if (!answer.isCorrectAnswer && index === 3) {
        pergunta.childNodes[5].childNodes[7].childNodes[1].value = answer.text;
        pergunta.childNodes[5].childNodes[7].childNodes[3].value = answer.image;
      }
    });
  });
}

function goToLevelsCreationAndCompleteValues(quizz) {
  quizz.levels.forEach((level, index) => {
    const nivel = document.getElementById(`level-${index + 1}`);

    nivel.childNodes[3].childNodes[1].value = level.title;
    nivel.childNodes[3].childNodes[5].value = level.minValue;
    nivel.childNodes[3].childNodes[9].value = level.image;
    nivel.childNodes[3].childNodes[13].value = level.text;
  });
}

async function getQuizz(id) {
  const { data } = await axios.get(
    `https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`
  );

  return data;
}

function findQuizz(id) {
  const quizzIdAndKeys = JSON.parse(localStorage.getItem("quizzIdAndKey"));
  return quizzIdAndKeys.find((quizzIdAndKey) => quizzIdAndKey.id === id);
}
