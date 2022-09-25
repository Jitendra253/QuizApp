// print quiz user name
printname = () => {
  let input = document.querySelector(".input_value").value;
  document.querySelector("#user_message").innerHTML = "Hey!" + " " + input;
  document.querySelector("#wish_name").innerHTML = input;
};
// loading Main page
let categories = document.querySelector(".welcome_section");
categories.classList.add("activeCategories"); //show categories box
let answer_option = document.querySelector(".answer_option");
let mainPage = document.querySelector(".mainPage");
let seeresult = document.querySelector(".see_result_btn");
let question_category;
let question_count = 0;
let slNo = 1;
// selecting one category category and fetch questions.
let questions = document.querySelector("#question_page .questions");
let categoryButtons = document.querySelectorAll(".questionsCategory");
let question_page = document.querySelector("#question_page");
categoryButtons.forEach((button) => {
  button.onclick = (event) => {
    question_category = QUESTIONS[event.currentTarget.dataset["category"]];
    mainPage.style.display = "none";
    categories.classList.remove("activeCategories");
    categories.classList.remove("next");
    question_page.removeAttribute("hidden");
    showQuestion(
      0,
      questions,
      QUESTIONS[event.currentTarget.dataset["category"]]
    );

    questionCount(1, QUESTIONS[event.currentTarget.dataset["category"]]);
    let categoryName = document.querySelector("#categoryName");
    categoryName.innerHTML = event.currentTarget.dataset["category"];
    // display next buton when clicken on any option. and show see result button when clicked on last question option
    answer_option.onclick = () => {
      if (question_count < question_category.length - 1) {
        next.style.display = "block";
      } else {
        seeresult.removeAttribute("hidden");
      }
    };
    // next button for each questions and hide next question button when getting a new question
    let next_btn = document.querySelector("#next");
    next_btn.onclick = () => {
      next.style.display = "none";
      if (question_count < question_category.length - 1) {
        question_count++;
        slNo++;
        showQuestion(question_count, questions, question_category);
        questionCount(slNo, question_category);
      } else if ((question_count = question_category.length - 1)) {
        next.style.display = "none";
      }
    };
  };
});
let optionds = document.querySelector(".answer_option");
//question couunter
let option_list = document.querySelector(".answer_option");
let question_box = document.querySelector(".question_box");
let button = document.querySelector(".option");
button.disable = true;

questionCount = (index, myApp) => {
  let top_ques_counter = question_box.querySelector(".question_count");
  let totalQuestioncount = "<span>" + index + " / " + myApp.length + "</span>";
  top_ques_counter.innerHTML = totalQuestioncount;
};
//getting question
showQuestion = (index, elementId, myApp) => {
  let questionNumber = myApp[index].slNo;
  let question = myApp[index].question;
  counter();
  let que_tag = "<span>" + questionNumber + "." + question + "</span>";
  let option_tag =
    '<span class="option">' +
    myApp[index].options[0] +
    "</span>" +
    '<span class="option">' +
    myApp[index].options[1] +
    "</span>" +
    '<span class="option">' +
    myApp[index].options[2] +
    "</span>" +
    '<span class="option">' +
    myApp[index].options[3] +
    "</span>";
  elementId.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  // finding correct answer
  let option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
};
//creating scores
let score = 0;
let correctAns = 0;

optionSelected = (answer) => {
  let userAns = answer.textContent;
  let correctAns = question_category[question_count].answer;
  let scoreShow = document.querySelector("#score");
  scoreShow.innerText = "score";
  let allOptions = option_list.children.length;
  if (userAns == correctAns) {
    answer.classList.add("correct");
    console.log("Answer is correct.");
    score++;
    scoreShow.innerHTML = "Score :" + score;
    correctAns++;
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is wrong.");
    scoreShow.innerHTML = "Score :" + score;
    //if answer is incorrect  then automatically select the correct answer
    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute("class", "option correct");
      }
    }
  }
};

//timer section
var timeleft = 300;
var element = document.querySelector("#timer");
var timerId = setInterval(counter, 1000);
function counter() {
  if (timeleft == 00) {
    clearTimeout(timerId);
    showResult();
  } else {
    element.innerHTML = timeleft;
    timeleft--;
  }
}

//show result box after all questions
let result_box = document.querySelector(".result_box");
showResult = () => {
  mainPage.style.display = "none";
  mainPage.classList.remove("activeInfo");
  question_box.classList.remove("activeQuestion");
  result_box.classList.add("activeResult");
  //user name define in result box
  let name = document.getElementById("user_name");
  let input = document.querySelector(".input_value").value;
  name.innerHTML = input;
  //Total time take for this quiz
  let time_taken = 300 - timeleft;
  result_box.querySelector("#total_time_taken").innerHTML =
    time_taken + " Seconds";
  //correct answer answered
  correct = score;
  correctAns = document.querySelector("#correct_answers").innerHTML = correct;
  //total no of wrong answers
  let totalQuestion = 10;
  let wrong = totalQuestion - score;
  document.querySelector("#wrong_answers").innerHTML = wrong;
  // score in percentage
  let percentage = (score / totalQuestion) * 100 + " %";
  document.querySelector("#result_in_percent").innerHTML = percentage;
};
// Go back home page
let homePage = document.querySelector(".homePage");
homePage.onclick = () => {
  location.reload();
};
// Restart Page.
let restart = document.querySelector(".restart");
restart.onclick = () => {
  location.reload();
};
