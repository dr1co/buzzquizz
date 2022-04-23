import axios from "axios";

async function createQuizzRequest() {
  const quizzObjectCreationRequest = localStorage.getItem(
    "quizzObjectCreationRequest"
  );
  const { data } = await axios.post(
    "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes",
    quizzObjectCreationRequest
  );

  return data;
}
