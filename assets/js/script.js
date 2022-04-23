async function createQuizzRequest() {
  const quizzObjectCreationRequest = JSON.parse(localStorage.getItem(
    "quizzObjectCreationRequest"
  ));
  const { data } = await axios.post(
    "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes",
    quizzObjectCreationRequest
  );

    console.log(data);

  return data;
}
