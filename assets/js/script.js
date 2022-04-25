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

async function updateQuizz(id) {
  event.stopPropagation();
  const apiQuizz = await getQuizz(id);

  goToBasicInfoCreation(apiQuizz);

  console.log(apiQuizz);

  const quizz = findQuizz(id);
}

function goToBasicInfoCreation(quizz) {
  const criacaoInfosBasicas = document.getElementById('criacao-infos-basicas');
  const navegacao = document.getElementById('navegacao');
  const quizzTitle = document.getElementById("quizzTitle");
  const quizzImage = document.getElementById("quizzImage");
  const quizzNumberQuestions = document.getElementById("quizzNumberQuestions");
  const quizzNumberLevels = document.getElementById("quizzNumberLevels");

  quizzTitle.value = quizz.title;
  quizzImage.value = quizz.image;
  quizzNumberQuestions.value = quizz.questions.length;
  quizzNumberLevels.value = quizz.levels.length;

  navegacao.style.display = 'none';
  criacaoInfosBasicas.style.display = 'block';
}

async function getQuizz(id) {
  const { data } = await axios.get(
    `https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`
  );

  return data;
}

async function deleteQuizz(id) {}

function findQuizz(id) {
  const quizzIdAndKeys = JSON.parse(localStorage.getItem("quizzIdAndKey"));
  return quizzIdAndKeys.find((quizzIdAndKey) => quizzIdAndKey.id === id);
}
