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

    try {
        verifyQuestionsText(questionsText, questionTextWarning);
        verifyQuestionsBackgroundColor(questionsBackgroundColor, questionBackgroundColorWarning);
        verifyAnswersLabels(answersLabels, answerLabelWarning);
        verifyImagesUrl(imagesUrl, imagesUrlWarning);
    } catch (e) {
        showWarningMessage(generalWarning);
    }
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
}

function setLabelBorderWarning(label) {
    label.style.borderColor = '#EC362D';
}

function verifyAnswersLabels(answersLabels, answerLabelWarning) {
    let error = 0;

    answersLabels.forEach(label => {
        if (!label.value) {
            setLabelBorderWarning(label);
            error++;
        }
    });

    if (error > 0) {
        showWarningMessage(answerLabelWarning);
        throw new Error();
    }
}

function verifyQuestionsText(questionsText, questionTextWarning) {
    let error = 0;

    questionsText.forEach(label => {
        if (label.value.length < 20) {
            setLabelBorderWarning(label)
            error++;
        }
    });

    if (error > 0) {
        showWarningMessage(questionTextWarning);
        throw new Error();
    }
}

function verifyQuestionsBackgroundColor(questionsBackgroundColor, questionsBackgroundColorWarning) {
    let error = 0;
    const regex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";

    questionsBackgroundColor.forEach(label => {
        if (label.value.search(regex) < 0) {
            setLabelBorderWarning(label)
            error++;
        }
    });

    if (error > 0) {
        showWarningMessage(questionsBackgroundColorWarning);
        throw new Error();
    }
}

function verifyImagesUrl(imagesUrl, imagesUrlWarning) {
    let error = 0;
    const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

    imagesUrl.forEach(label => {
        if (label.value.search(regex) < 0) {
            setLabelBorderWarning(label)
            error++;
        }
    });

    if (error > 0) {
        showWarningMessage(imagesUrlWarning);
        throw new Error();
    }
}