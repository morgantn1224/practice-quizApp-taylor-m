 const questions = [
    {
        text: "4 + 4 = ?",
        choices: ["2","6","8","10"],
        correctAnswerIndex: 2
    },
    {
        text: "6 / 3 = ?",
        choices: ["2","7","0",'3'],
        correctAnswerIndex: 0
    },
    {
        text: "10 - 5 = ?",
        choices: ["0","5","8",'4'],
        correctAnswerIndex: 1
    },
    {
        text: "5 x 5 = ?",
        choices: ["2","10","8","25"],
        correctAnswerIndex: 3
    }
 ];

const question = document.getElementById("question");
const answerChoices = document.getElementsByName("choices");

// const radioOne = document.getElementById("choice1");
// const radioTwo = document.getElementById("choice2");
// const radioThree = document.getElementById("choice3");
// const radioFour = document.getElementById("choice4");

const labels = [
    document.getElementById("l1"),
    document.getElementById("l2"),
    document.getElementById("l3"),
    document.getElementById("l4"),
]

const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");

submitButton.addEventListener("click", uponSubmit);
nextButton.addEventListener("click", nextQuestion);


//question = questions[0].text
// radioOne.innerText = questions[0].choices[0];
// radioTwo.innerText = questions[0].choices[1];
// radioThree.innerText = questions[0].choices[2];
// radioFour.innerText = questions[0].choices[3];

let currentIndex = 0;
let count = 0;
askQuestion();

function askQuestion() {
    const questionAsked = questions[currentIndex];
    question.textContent = questionAsked.text;

    questionAsked.choices.forEach((choice,i) => {
        labels[i].innerHTML = `<input type="radio" id="choice ${i+1}" name="choices" value="${i}"> ${choice}`;
    });

    // reset radio and buttons
    for (const choice of answerChoices) {
        choice.disabled = false;
        choice.check = false;
    }
    submitButton.disabled = false;
    nextButton.disabled = true;
}

function uponSubmit() {

    let selected = null;
    
    for (const choice of answerChoices) {
        if (choice.checked) {
            selected = Number(choice.value);
            break;
        }
    }

    if (selected === null) {
        alert("Please make a choice");
        return;
    }

    const correctAnswer = questions[currentIndex].correctAnswerIndex;
    if (selected === correctAnswer) {
        alert("Correct!");
        count++;
    } else {
        alert("Not correct!");
    }

    // lock it after choice selection
    for (const choice of answerChoices) {
        choice.disabled = true;
    }

    submitButton.disabled = true; //hide submit button after answer submission
    nextButton.disabled = false; //leave only next question button
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < questions.length) {
        askQuestion();
    } else {
        let total = questions.length;
        let score = (count / total ) * 100;
        question.textContent = `All Done! Your score was ${score}%`;
        submitButton.disabled = true;
        nextButton.disabled = true;
    }
}

