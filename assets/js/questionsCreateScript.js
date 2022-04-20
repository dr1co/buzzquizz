function verifyInputs() {
    const answersLabels = document.getElementsByName('answer-label');
    const questionsText = document.getElementsByName('question-text');
    const questionsBackgroundColor = document.getElementsByName('question-background-color');
    const imagesUrl = document.getElementsByName('image-url');

    resetVerify(answersLabels, questionsText, questionsBackgroundColor, imagesUrl);
    verifyAnswersLabels(answersLabels);
    verifyQuestionsText(questionsText);
    verifyQuestionsBackgroundColor(questionsBackgroundColor);
    verifyImagesUrl(imagesUrl);
}

function resetVerify(answersLabels, questionsText, questionsBackgroundColor, imagesUrl) {
    const all = [...answersLabels, ...questionsText, ...questionsBackgroundColor, ...imagesUrl];
    const warnings = [
        document.getElementById('warning'),
        document.getElementById('answer-label-warning'),
        document.getElementById('image-url-warning'),
        document.getElementById('question-background-color-warning'),
        document.getElementById('question-text-warning')
    ];

    all.forEach(el => {
        el.style.borderColor = '#D1D1D1';
    })

    warnings.forEach(warning => {
        warning.style.display = 'none';
    })
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

        return false;
    }

    return true;
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

        return false;
    }

    return true;
}

function verifyQuestionsBackgroundColor(questionsBackgroundColor) {
    let error = 0;

    questionsBackgroundColor.forEach(label => {
        if (label.value.length < 7 || label.value.indexOf('#') < 0) {
            label.style.borderColor = '#EC362D';
            error++;
        }
    });

    if (error > 0) {
        const questionBackgroundColorError = document.getElementById('question-background-color-warning');
        const generalWarning = document.getElementById('warning');

        questionBackgroundColorError.style.display = 'block';
        generalWarning.style.display = 'block';

        return false;
    }

    return true;
}

function verifyImagesUrl(imagesUrl) {
    let error = 0;

    imagesUrl.forEach(label => {
        if (label.value.length === 0 || label.value.indexOf('https://') < 0) {
            label.style.borderColor = '#EC362D';
            error++;
        }
    });

    if (error > 0) {
        const imagesUrlError = document.getElementById('image-url-warning');
        const generalWarning = document.getElementById('warning');

        imagesUrlError.style.display = 'block';
        generalWarning.style.display = 'block';

        return false;
    }

    return true;
}