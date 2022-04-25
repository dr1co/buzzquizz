async function createQuizzRequest() {
  const quizzObjectCreationRequest = JSON.parse(
    localStorage.getItem("quizzObjectCreationRequest")
  );

  const { data } = await axios.post(
    "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes",
    quizzObjectCreationRequest
  );

  const quizzIds = JSON.parse(localStorage.getItem("quizzIds"));

  if (!quizzIds) {
    const ids = [];
    ids.push(data.id);
    localStorage.setItem(`quizzIds`, JSON.stringify(ids));
  } else {
    quizzIds.push(data.id);
    localStorage.setItem(`quizzIds`, JSON.stringify(quizzIds));
  }

  return data;
}
