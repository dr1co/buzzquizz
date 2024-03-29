async function getInputsAndVerify(quizz = null) {
  const levelTitles = document.getElementsByName("level-title");
  const levelAccurates = document.getElementsByName("level-accurate");
  const levelImages = document.getElementsByName("level-image");
  const levelDescriptions = document.getElementsByName("level-description");

  const allInputs = [
    ...levelTitles,
    ...levelAccurates,
    ...levelImages,
    ...levelDescriptions,
  ];

  resetAllVerifications(allInputs);

  try {
    verifyTitles(levelTitles);
    verifyMinValue(levelAccurates);
    verifyLevelImagesUrl(levelImages);
    verifyDescriptions(levelDescriptions);

    await saveLevelData(quizz);

    goToSuccesfullyCreatedQuizz();
  } catch (e) {
    console.log(e.message);
  }
}

function goToSuccesfullyCreatedQuizz() {
  const levelsCreation = document.getElementById("levels-creation");
  const sucessoDoQuizz = document.getElementById("sucesso-do-quizz");

  levelsCreation.style.display = "none";
  sucessoDoQuizz.style.display = "flex";
  setBasicInfos();
}

function resetAllVerifications(allInputs) {
  allInputs.forEach((input) => {
    input.style.borderColor = "#D1D1D1";
    input.style.backgroundColor = "#FFFFFF";

    const warnings = document.querySelectorAll(`.${input.name}`);

    warnings.forEach((warning) => {
      warning.style.display = "none";
    });
  });
}

function verifyTitles(levelTitles) {
  let error = 0;
  levelTitles.forEach((title) => {
    if (title.value.length < 10) {
      setLabelWarning(title);
      showInputWarnings(title.name);
      error++;
    }
  });

  if (error > 0) {
    throw new Error();
  }
}

function verifyMinValue(levelAccurates) {
  let count = 0;
  let error = 0;

  levelAccurates.forEach((accurate) => {
    if (
      !accurate.value ||
      Number(accurate.value) < 0 ||
      Number(accurate.value) > 100
    ) {
      setLabelWarning(accurate);
      showInputWarnings(accurate.name);
      error++;
    }
    if (Number(accurate.value) === 0) {
      count++;
    }
  });

  if (count === 0) {
    levelAccurates.forEach((accurate) => {
      setLabelWarning(accurate);
      showInputWarnings(accurate.name);
    });
    throw new Error();
  }

  if (error > 0) {
    throw new Error();
  }
}

function verifyLevelImagesUrl(levelImages) {
  let error = 0;
  const regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  levelImages.forEach((url) => {
    if (url.value.search(regex) < 0 || !url.value) {
      setLabelWarning(url);
      showInputWarnings(url.name);
      error++;
    }
  });

  if (error > 0) {
    throw new Error();
  }
}

function verifyDescriptions(levelDescriptions) {
  let error = 0;
  levelDescriptions.forEach((description) => {
    if (description.value.length < 30) {
      setLabelWarning(description);
      showInputWarnings(description.name);
      error++;
    }
  });

  if (error > 0) {
    throw new Error();
  }
}

function showInputWarnings(elClasseName) {
  const selectEls = document.querySelectorAll(`.${elClasseName}`);
  selectEls.forEach((el) => {
    el.style.display = "block";
  });
}

async function saveLevelData(quizz = null) {
  const inputs = document.querySelectorAll("[data-level].inputs");

  const quizzObjectCreationRequest = JSON.parse(
    localStorage.getItem("quizzObjectCreationRequest")
  );

  const levels = [];

  inputs.forEach((input) => {
    const obj = {
      title: input.childNodes[1].value,
      minValue: input.childNodes[5].value,
      image: input.childNodes[9].value,
      text: input.childNodes[13].value,
    };

    levels.push(obj);
  });

  quizzObjectCreationRequest.levels = levels;

  localStorage.setItem(
    "quizzObjectCreationRequest",
    JSON.stringify(quizzObjectCreationRequest)
  );

  if (!quizz) {
    await createQuizzRequest();
  } else {
    const quizzObjectCreationRequest = JSON.parse(
        localStorage.getItem("quizzObjectCreationRequest")
    );
    await updateQuizzRequest(quizz, quizzObjectCreationRequest);
  }
}

function createLevelsInputs() {
  const { numberLevels } = JSON.parse(
    localStorage.getItem("quizzConfigObject")
  );

  const levels = document.getElementById("levels");

  for (let i = 1; i <= numberLevels; i++) {
    levels.innerHTML += levelTemplate(i);
  }

  const apiQuizz = JSON.parse(localStorage.getItem('apiQuizz'));

  if (apiQuizz) {
    goToLevelsCreationAndCompleteValues(apiQuizz);
    localStorage.removeItem('apiQuizz');
  }
}

function openLevelsInputs(el) {
  el.classList.add("d-none");
  const levels = document.querySelectorAll("[data-level]");
  levels.forEach((question) => {
    if (question.dataset.level === el.id) {
      question.classList.remove("d-none");
    }
  });
}

function levelTemplate(levelIndex) {
  return `<div onclick="openLevelsInputs(this)" class="level-label" id="nivel${levelIndex}">
            <span class="default-title">Nível ${levelIndex}</span>
            <img src="./assets/img/question-icon.png" alt="Expandir nível">
          </div> 
          <div data-level="nivel${levelIndex}" id="level-${levelIndex}" class="level d-none">
             <span class="default-title">Nível ${levelIndex}</span>
             <div data-level="nivel${levelIndex}" class="inputs default-input-group-width flex flex-direction-column justify-content-center">
             <input data-level="nivel${levelIndex}" class="default-input-style" name="level-title" type="text" placeholder="Título do nível">
             <small class="level-title">O título do nível deve ter pelo menos 10 caracteres</small>
             <input data-level="nivel${levelIndex}" class="default-input-style" name="level-accurate" type="text" placeholder="% de acerto mínima">
             <small class="level-accurate">A porcentagem de acerto deve ser um número entre 0 e 100, sendo obrigatória que haja pelo menos um nível com 0</small>
             <input data-level="nivel${levelIndex}" class="default-input-style" name="level-image" type="text" placeholder="URL da imagem do nível">
             <small class="level-image">Esta URL não é válida</small>
             <input data-level="nivel${levelIndex}" class="default-input-style" name="level-description" type="text" placeholder="Descrição do nível">
             <small class="level-description">A descrição do nível deve possuir no mínimo 30 caracteres</small>
             </div>
          </div>`;
}
