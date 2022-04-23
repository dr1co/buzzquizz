function getInputsAndVerify() {
  const levelTitles = document.getElementsByName('level-title');
  const levelAccurates = document.getElementsByName('level-accurate');
  const levelImages = document.getElementsByName('level-image');
  const levelDescriptions = document.getElementsByName('level-description');

  saveLevelData(levelTitles, levelAccurates, levelImages, levelDescriptions);
}

function saveLevelData(levelTitles, levelAccurates, levelImages, levelDescriptions) {
  const attributes = [];

  levelTitles.forEach(title => {
    const obj = {};

    obj[title.dataset.level] = {
      title: title.value,
    }

    attributes.push(obj);
  });

  levelAccurates.forEach(accurate => {
    const obj = {};

    obj[accurate.dataset.level] = {
      minValue: accurate.value,
    }

    attributes.push(obj);
  });

  levelImages.forEach(image => {
    const obj = {};

    obj[image.dataset.level] = {
      image: image.value,
    }

    attributes.push(obj);
  });

  levelDescriptions.forEach(description => {
    const obj = {};

    obj[description.dataset.level] = {
      description: description.value,
    }

    attributes.push(obj);
  });

  const levels = [];
  const obj = {};

  attributes.forEach(level => {
    for (const levelKey in level) {
      Object.assign(obj, level[levelKey]);
    }
  })

  levels.push(obj);
}

function createLevelsInputs() {
  const { numberLevels } = JSON.parse(
    localStorage.getItem("quizzConfigObject")
  );

  const levels = document.getElementById("levels");

  for (let i = 1; i <= numberLevels; i++) {
    levels.innerHTML += levelTemplate(i);
  }
}

function levelTemplate(levelIndex) {
  return `<div class="level">
             <span class="default-title">Nível ${levelIndex}</span>
             <div data-level="nivel${levelIndex}" class="inputs default-input-group-width flex flex-direction-column justify-content-center align-items-center">
             <input data-level="nivel${levelIndex}" class="default-input-style" name="level-title" type="text" placeholder="Título do nível">
             <input data-level="nivel${levelIndex}" class="default-input-style" name="level-accurate" type="text" placeholder="% de acerto mínima">
             <input data-level="nivel${levelIndex}" class="default-input-style" name="level-image" type="text" placeholder="URL da imagem do nível">
             <input data-level="nivel${levelIndex}" class="default-input-style" name="level-description" type="text" placeholder="Descrição do nível">
             </div>
          </div>`;
}
