import {
  getCurrentQuestion
} from "./question-engine.js";

const DEFAULT_QUIZ = {
  mode: "practice",

  timerEnabled: false,
  timePerQuestion: 30,

  negativeMarking: false,
  negativeMarks: 0,

  marksPerQuestion: 1,

  showQuestion: true,
  showOptions: true,
  showAnswer: false,
  showExplanation: false,

  autoNext: false,
  autoRevealAnswer: false,
  autoRevealExplanation: false
};

let quizState = {
  ...DEFAULT_QUIZ,

  total: 0,
  attempted: 0,
  correct: 0,
  wrong: 0,
  skipped: 0,

  score: 0,
  negativeScore: 0,

  currentAnswer: null,
  answerRevealed: false,
  explanationRevealed: false,

  questionStartTime: null,
  totalTimeUsed: 0
};

export function configureQuiz(
  settings = {}
) {
  quizState = {
    ...quizState,
    ...DEFAULT_QUIZ,
    ...settings
  };

  return getQuizState();
}

export function getQuizState() {
  return JSON.parse(
    JSON.stringify(quizState)
  );
}

export function startQuiz() {
  quizState.total = 0;
  quizState.attempted = 0;
  quizState.correct = 0;
  quizState.wrong = 0;
  quizState.skipped = 0;

  quizState.score = 0;
  quizState.negativeScore = 0;

  quizState.currentAnswer = null;
  quizState.answerRevealed = false;
  quizState.explanationRevealed = false;

  quizState.totalTimeUsed = 0;
  quizState.questionStartTime =
    Date.now();

  const question =
    getCurrentQuestion();

  if (question) {
    quizState.total = 1;
  }

  emitState();

  return getQuizState();
}

export function submitAnswer(
  answer
) {
  const question =
    getCurrentQuestion();

  if (!question) {
    return null;
  }

  const normalizedAnswer =
    String(answer || "")
      .trim()
      .toUpperCase();

  const correctAnswer =
    String(
      question.Answer || ""
    )
      .trim()
      .toUpperCase();

  if (!normalizedAnswer) {
    return skipQuestion();
  }

  quizState.currentAnswer =
    normalizedAnswer;

  quizState.attempted++;

  const isCorrect =
    normalizedAnswer ===
    correctAnswer;

  if (isCorrect) {
    quizState.correct++;
    quizState.score +=
      Number(
        quizState.marksPerQuestion
      ) || 0;
  } else {
    quizState.wrong++;

    if (
      quizState.negativeMarking
    ) {
      const penalty =
        Number(
          quizState.negativeMarks
        ) || 0;

      quizState.negativeScore +=
        penalty;

      quizState.score -=
        penalty;
    }
  }

  quizState.answerRevealed =
    true;

  quizState.explanationRevealed =
    Boolean(
      quizState.autoRevealExplanation
    );

  updateTimeUsed();
  emitState();

  return {
    correct: isCorrect,
    selected: normalizedAnswer,
    correctAnswer,
    state: getQuizState()
  };
}

export function skipQuestion() {
  quizState.skipped++;

  updateTimeUsed();

  quizState.currentAnswer =
    null;

  quizState.answerRevealed =
    false;

  quizState.explanationRevealed =
    false;

  emitState();

  return getQuizState();
}

export function revealAnswer() {
  quizState.answerRevealed =
    true;

  emitState();

  return getQuizState();
}

export function revealExplanation() {
  quizState.explanationRevealed =
    true;

  emitState();

  return getQuizState();
}

export function resetQuestionState() {
  quizState.currentAnswer =
    null;

  quizState.answerRevealed =
    false;

  quizState.explanationRevealed =
    false;

  quizState.questionStartTime =
    Date.now();

  emitState();
}

export function updateTimeUsed() {
  if (
    !quizState.questionStartTime
  ) {
    return;
  }

  const elapsed =
    Date.now() -
    quizState.questionStartTime;

  quizState.totalTimeUsed +=
    Math.max(
      0,
      Math.round(elapsed / 1000)
    );

  quizState.questionStartTime =
    Date.now();
}

export function getStats() {
  const total =
    quizState.total;

  const attempted =
    quizState.attempted;

  const accuracy =
    attempted > 0
      ? (quizState.correct /
          attempted) *
        100
      : 0;

  return {
    total,
    attempted,
    remaining:
      Math.max(
        0,
        total -
          attempted -
          quizState.skipped
      ),
    correct:
      quizState.correct,
    wrong:
      quizState.wrong,
    skipped:
      quizState.skipped,
    score:
      quizState.score,
    negativeMarks:
      quizState.negativeScore,
    accuracy:
      Number(
        accuracy.toFixed(2)
      ),
    timeUsed:
      quizState.totalTimeUsed
  };
}

function emitState() {
  window.dispatchEvent(
    new CustomEvent(
      "smartoverlay:quiz-state",
      {
        detail: {
          state:
            getQuizState(),
          stats:
            getStats()
        }
      }
    )
  );
}

window.smartOverlayQuiz = {
  configureQuiz,
  getQuizState,
  startQuiz,
  submitAnswer,
  skipQuestion,
  revealAnswer,
  revealExplanation,
  resetQuestionState,
  updateTimeUsed,
  getStats
};

console.log(
  "SmartOverlay Quiz Engine initialized"
);
