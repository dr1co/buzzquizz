function submitQuizzBasicInfos() {
  const quizzTitle = document.getElementById("quizzTitle").value;
  const quizzImage = document.getElementById("quizzImage").value;
  const quizzNumberQuestions = document.getElementById(
    "quizzNumberQuestions"
  ).value;

  const quizzNumberLevels = document.getElementById("quizzNumberLevels").value;

  if (
    adequateTitle(quizzTitle) &&
    isUrl(quizzImage) &&
    adequateNumberQuestions(quizzNumberQuestions) &&
    adequateNumberLevels(quizzNumberLevels)
  ) {
    document.getElementById("quizzTitle").value = "";
    document.getElementById("quizzImage").value = "";
    document.getElementById("quizzNumberQuestions").value = "";
    document.getElementById("quizzNumberLevels").value = "";

    const quizzObjectRequest = {
      title: quizzTitle.toString(),
      image: quizzImage.toString(),
      numberQuestions: Number(quizzNumberQuestions),
      numberLevels: Number(quizzNumberLevels),
    };

    localStorage.setItem(
      "quizzObjectRequest",
      JSON.stringify(quizzObjectRequest)
    );
  } else {
    alert(`Atenção, preencha corretamente os campos abaixo:
Título do quizz: deve ter entre 20 a 65 caracteres
URL da imagem: deve ser uma URL válida
Quantidade de perguntas do quizz: pelo menos 3
Quantidade de níveis do quizz: pelo menos 2`);
  }
}

function adequateTitle(title) {
  return title.length >= 20 && title.length <= 65;
}

function isUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function adequateNumberQuestions(number) {
  return !isNaN(number) && number >= 3;
}

function adequateNumberLevels(number) {
  return !isNaN(number) && number >= 2;
}
