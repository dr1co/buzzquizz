function printNewQuizzButton() {
    const userQuizzes = document.querySelector(".user-quizzes");
    const userQuizzesList = userQuizzes.querySelectorAll(".user-quizzes-list > li");
    console.log(userQuizzesList);
    if(userQuizzesList.length === 0)
    {
        userQuizzes.innerHTML = `<div class="create-quizz flex flex-direction-column justify-content-center align-items-center">
        <p> Você não criou nenhum <br> quizz ainda :( </p>
        <button onclick="createQuizz()"> Criar quizz </button>
    </div>`;
    }
    else
    {
        userQuizzes.innerHTML = `<div class="user-quizzes-title flex align-items-center">
        <h3> Seus Quizzes </h3>
        <ion-icon name="add-circle"></ion-icon>
    </div>` + userQuizzes.innerHTML;
    }
}

printNewQuizzButton();