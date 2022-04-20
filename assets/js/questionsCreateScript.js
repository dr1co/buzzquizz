function verifyInputs() {
    const answersLabels = document.getElementsByName('answer-label');
    const questionsText = document.getElementsByName('question-text');
    const questionsBackgroundColor = document.getElementsByName('question-background-color');
    const imagesUrl = document.getElementsByName('image-url');

    verifyAnswersLabels(answersLabels);
    verifyQuestionsText(questionsText);
}

function verifyAnswersLabels(answersLabels) {
    let error = 0;

    answersLabels.forEach(label => {
        if (!label.value) {
            label.style.borderColor = '#EC362D';
            error++;
        }
    });

    if (error > 0) {
        const answersLabelsError = document.getElementById('answer-label-warning');
        const generalWarning = document.getElementById('warning');

        answersLabelsError.style.display = 'block';
        generalWarning.style.display = 'block';
    }
}

function verifyQuestionsText(questionsText) {
    let error = 0;

    questionsText.forEach(label => {
        if (label.value.length < 20) {
            label.style.borderColor = '#EC362D';
            error++;
        }
    });

    if (error > 0) {
        const questionsTextError = document.getElementById('question-text-warning');
        const generalWarning = document.getElementById('warning');

        questionsTextError.style.display = 'block';
        generalWarning.style.display = 'block';
    }
}