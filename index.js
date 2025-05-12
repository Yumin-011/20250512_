const quizData = [
  {
    question: "스불재의 의미는?",
    options: ["스스로 불안한 재정상태", "스스로 불러온 재앙", "스스로 불러온 재미", "스쳐간 불도 재확인하자"],
    answer: "스스로 불러온 재앙",
  },
  {
    question:
      "콜건적의 의미는?",
    options: [
      "콜택시만 고집하는 사람들",
      "콜라를 혐오하는 사람들",
      "제로콜라만 고집하는 사람들",
      "콜라를 사랑하는 사람들",
    ],
    answer: "제로콜라만 고집하는 사람들",
  },
  {
    question: "종노플예의 의미는?",
    options: ["종이 빨대 no! 플라스틱 빨대 yes!", "종이박스 no! 플라스틱 박스 yes!", "종이컵 no! 플라스틱 텀블러 yes!", "종이 포장 no! 플라스틱 용기 yes!"],
    answer: "종이 빨대 no! 플라스틱 빨대 yes!",
  },
  {
    question: "막나귀의 의미는?",
    options: ["막히는 길을 귀신처럼 빠져나갔다", "막걸리에 나물무침 귀엽게 냠냠", "막막한 나의 상황 귀찮아진다", "막상 나가려하니 귀찮다"],
    answer: "막상 나가려하니 귀찮다",
  },
  {
    question: "구구족의 의미는?",
    options: ["치킨을 좋아하는 사람들", "구매하고 또 구매하는 쇼핑중독자", "주먹구구식으로 일을 처리하는 사람들", "구구단을 못 외우는 사람들"],
    answer: "구매하고 또 구매하는 쇼핑중독자",
  },
];

const startBtn = document.getElementById("start-btn");
const quizForm = document.getElementById("quiz-form");
const quizContainer = document.getElementById("quiz-questions");
const resultScreen = document.getElementById("result-screen");
const scoreText = document.getElementById("score-text");
const retryBtn = document.getElementById("retry-btn");
const formContainer = document.getElementById("form-container");

let userAnswers = [];

startBtn.addEventListener("click", () => {
  document.getElementById("start-screen").classList.add("hidden");
  quizForm.classList.remove("hidden");
  renderQuiz();
});

function renderQuiz() {
  quizData.forEach((data, qIdx) => {
    const block = document.createElement("div");
    block.className = "question-block";

    const question = document.createElement("div");
    question.className = "question";
    question.textContent = data.question;

    const answers = document.createElement("div");
    answers.className = "answers";

    data.options.forEach((option) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.type = "button";
      btn.addEventListener("click", () => selectAnswer(qIdx, option, btn));
      answers.appendChild(btn);
    });

    block.appendChild(question);
    block.appendChild(answers);
    quizContainer.appendChild(block);
  });
}

function selectAnswer(questionIndex, selectedOption, btn) {
  userAnswers[questionIndex] = selectedOption;
  const answerButtons = btn.parentNode.querySelectorAll("button");
  answerButtons.forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");
}

quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let score = 0;

  quizData.forEach((q, index) => {
    const userAnswer = userAnswers[index];
    const block = quizContainer.children[index];
    const buttons = block.querySelectorAll("button");

    buttons.forEach((btn) => {
      btn.disabled = true;
      if (btn.textContent === q.answer) {
        btn.classList.add("correct");
      } else if (
        btn.textContent === userAnswer &&
        btn.textContent !== q.answer
      ) {
        btn.classList.add("incorrect");
      }
    });

    if (userAnswer === q.answer) score++;
  });

  const resultMsg = document.createElement("div");
  resultMsg.className = "result-screen";
  resultMsg.textContent = `${score}/${quizData.length} 개 맞추셨어요!`;

  const playAgain = document.createElement("button");
  playAgain.textContent = "다시하기";
  playAgain.addEventListener("click", () => location.reload());

  quizForm.appendChild(resultMsg);
  quizForm.appendChild(playAgain);

  // ✅ 5초 후에 퀴즈 폼 숨기고 경품 폼만 보이게
  setTimeout(() => {
    quizForm.classList.add("hidden");
    showPrizeForm();
  }, 5000);
});

function showPrizeForm() {
  if (!formContainer) return;

  formContainer.classList.remove("hidden");

  const title = document.createElement("h2");
  title.textContent = "젊은 세대에서 유행하는 여행지를 갈 수 있는 기회!";

  const form = document.createElement("form");
  form.onsubmit = (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();

    const nameRegex = /^[가-힣]{2,4}$/; // 한글 2~4자만
    const phoneRegex = /^010\d{8}$/; // 010으로 시작하고 11자리로 끝나야 함

    if (!nameRegex.test(name)) {
      alert("이름을 정확히 입력해주세요");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("전화번호를 정확히 입력해주세요");
      return;
    }

    if (!validateEmail(email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    alert("응모가 정상적으로 제출되었습니다!");
  };

  const createField = (labelText, inputType, inputName) => {
    const label = document.createElement("label");
    label.innerHTML = `${labelText}:<br>`;
    const input = document.createElement("input");
    input.type = inputType;
    input.name = inputName;
    input.required = true;
    label.appendChild(input);
    return label;
  };

  const nameField = createField("성함", "text", "name");
  const emailField = createField("Email", "email", "email");
  const phoneField = createField("연락처", "tel", "phone");

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "신청하기";

  form.appendChild(nameField);
  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br"));
  form.appendChild(emailField);
  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br"));
  form.appendChild(phoneField);
  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br"));
  form.appendChild(submitBtn);

  formContainer.innerHTML = "";
  formContainer.appendChild(title);
  formContainer.appendChild(form);
}

// 이메일 형식 검사를 위한 함수
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
