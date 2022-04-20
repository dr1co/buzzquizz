function verifyInputs() {
    const answersLabels = document.getElementsByName('answer-label');
    const questionsText = document.getElementsByName('question-text');
    const questionsBackgroundColor = document.getElementsByName('question-background-color');
    const imagesUrl = document.getElementsByName('image-url');
    const answerLabelWarning = document.getElementById('answer-label-warning');
    const questionTextWarning = document.getElementById('question-text-warning');
    const questionBackgroundColorWarning = document.getElementById('question-background-color-warning');
    const imagesUrlWarning = document.getElementById('image-url-warning');
    const generalWarning = document.getElementById('warning');

    const allInputs = [...answersLabels, ...questionsText, ...questionsBackgroundColor, ...imagesUrl];
    const warnings = [answerLabelWarning, questionTextWarning, questionBackgroundColorWarning, imagesUrlWarning, generalWarning];

    resetVerify(allInputs, warnings);
    verifyAnswersLabels(answersLabels, answerLabelWarning, generalWarning);
    verifyQuestionsText(questionsText, questionTextWarning, generalWarning);
    verifyQuestionsBackgroundColor(questionsBackgroundColor, questionBackgroundColorWarning, generalWarning);
    verifyImagesUrl(imagesUrl, imagesUrlWarning, generalWarning);
}

function resetVerify(allInputs, warnings) {
    allInputs.forEach(el => {
        el.style.borderColor = '#D1D1D1';
    });

    warnings.forEach(warning => {
        warning.style.display = 'none';
    });
}

function showWarningMessage(labelError) {
    labelError.style.display = 'block';
    return true;
}

function setBorderLabelWarning(label) {
    label.style.borderColor = '#EC362D';
}

function verifyAnswersLabels(answersLabels, answerLabelWarning, generalWarning) {
    let error = 0;

    answersLabels.forEach(label => {
        if (!label.value) {
            setBorderLabelWarning(label);
            error++;
        }
    });

    if (error > 0) {
        showWarningMessage(answerLabelWarning);
        showWarningMessage(generalWarning);
    }

    return true;
}

function verifyQuestionsText(questionsText, questionTextWarning, generalWarning) {
    let error = 0;

    questionsText.forEach(label => {
        if (label.value.length < 20) {
            setBorderLabelWarning(label)
            error++;
        }
    });

    if (error > 0) {
        showWarningMessage(questionTextWarning);
        showWarningMessage(generalWarning);
    }

    return true;
}

function verifyQuestionsBackgroundColor(questionsBackgroundColor, questionsBackgroundColorWarning, generalWarning) {
    let error = 0;

    questionsBackgroundColor.forEach(label => {
        if (label.value.length < 7 || label.value.indexOf('#') < 0) {
            setBorderLabelWarning(label)
            error++;
        }
    });

    if (error > 0) {
        showWarningMessage(questionsBackgroundColorWarning);
        showWarningMessage(generalWarning);
    }

    return true;
}

function verifyImagesUrl(imagesUrl, imagesUrlWarning, generalWarning) {
    let error = 0;

    imagesUrl.forEach(label => {
        if (label.value.length === 0 || label.value.indexOf('https://') < 0) {
            setBorderLabelWarning(label)
            error++;
        }
    });

    if (error > 0) {
        showWarningMessage(imagesUrlWarning);
        showWarningMessage(generalWarning);
    }

    return true;
}