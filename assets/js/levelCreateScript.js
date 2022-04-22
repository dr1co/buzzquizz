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
