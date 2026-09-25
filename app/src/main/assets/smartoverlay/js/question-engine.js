let questions = [];
let currentIndex = -1;

const QUESTION_FIELDS = [
  "No",
  "Question",
  "A",
  "B",
  "C",
  "D",
  "Answer",
  "Explanation"
];

export function setQuestions(data) {
  if (!Array.isArray(data)) {
    questions = [];
    currentIndex = -1;
    return [];
  }

  questions =
    data.map(
      (item, index) => normalizeQuestion(
        item,
        index
      )
    );

  currentIndex =
    questions.length
      ? 0
      : -1;

  return getQuestions();
}

export function getQuestions() {
  return JSON.parse(
    JSON.stringify(questions)
  );
}

export function getQuestion(index) {
  const item =
    questions[index];

  return item
    ? JSON.parse(
        JSON.stringify(item)
      )
    : null;
}

export function getCurrentQuestion() {
  return getQuestion(
    currentIndex
  );
}

export function getCurrentIndex() {
  return currentIndex;
}

export function setCurrentQuestion(
  index
) {
  const nextIndex =
    Number(index);

  if (
    !Number.isInteger(nextIndex) ||
    nextIndex < 0 ||
    nextIndex >= questions.length
  ) {
    return null;
  }

  currentIndex =
    nextIndex;

  const question =
    getCurrentQuestion();

  window.dispatchEvent(
    new CustomEvent(
      "smartoverlay:question-changed",
      {
        detail: question
      }
    )
  );

  return question;
}

export function nextQuestion() {
  if (!questions.length) {
    return null;
  }

  if (
    currentIndex <
    questions.length - 1
  ) {
    currentIndex++;
  }

  return setCurrentQuestion(
    currentIndex
  );
}

export function previousQuestion() {
  if (!questions.length) {
    return null;
  }

  if (currentIndex > 0) {
    currentIndex--;
  }

  return setCurrentQuestion(
    currentIndex
  );
}

export function goToQuestion(
  number
) {
  const index =
    Number(number) - 1;

  return setCurrentQuestion(
    index
  );
}

export function randomQuestion() {
  if (!questions.length) {
    return null;
  }

  const index =
    Math.floor(
      Math.random() *
      questions.length
    );

  return setCurrentQuestion(
    index
  );
}

export function clearQuestions() {
  questions = [];
  currentIndex = -1;

  window.dispatchEvent(
    new CustomEvent(
      "smartoverlay:questions-cleared"
    )
  );
}

export function normalizeQuestion(
  item = {},
  index = 0
) {
  return {
    No:
      item.No ??
      item.no ??
      index + 1,

    Question:
      item.Question ??
      item.question ??
      "",

    A:
      item.A ??
      item.a ??
      "",

    B:
      item.B ??
      item.b ??
      "",

    C:
      item.C ??
      item.c ??
      "",

    D:
      item.D ??
      item.d ??
      "",

    Answer:
      item.Answer ??
      item.answer ??
      "",

    Explanation:
      item.Explanation ??
      item.explanation ??
      ""
  };
}

export function parseCSV(
  csvText
) {
  if (!csvText?.trim()) {
    return [];
  }

  const rows =
    parseCSVRows(csvText);

  if (!rows.length) {
    return [];
  }

  const headers =
    rows[0].map(
      (header) =>
        String(header)
          .trim()
    );

  return rows
    .slice(1)
    .filter(
      (row) =>
        row.some(
          (value) =>
            String(value).trim()
        )
    )
    .map((row, index) => {
      const item = {};

      headers.forEach(
        (header, column) => {
          item[header] =
            row[column] ?? "";
        }
      );

      return normalizeQuestion(
        item,
        index
      );
    });
}

function parseCSVRows(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (
    let i = 0;
    i < text.length;
    i++
  ) {
    const char = text[i];
    const next = text[i + 1];

    if (
      char === '"' &&
      quoted &&
      next === '"'
    ) {
      value += '"';
      i++;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (
      char === "," &&
      !quoted
    ) {
      row.push(value);
      value = "";
      continue;
    }

    if (
      (char === "\n" ||
        char === "\r") &&
      !quoted
    ) {
      if (
        char === "\r" &&
        next === "\n"
      ) {
        i++;
      }

      row.push(value);
      rows.push(row);

      row = [];
      value = "";

      continue;
    }

    value += char;
  }

  if (
    value.length ||
    row.length
  ) {
    row.push(value);
    rows.push(row);
  }

  return rows;
}

export function validateQuestion(
  question
) {
  if (!question) {
    return {
      valid: false,
      missing: QUESTION_FIELDS
    };
  }

  const missing =
    QUESTION_FIELDS.filter(
      (field) =>
        field !== "No" &&
        !String(
          question[field] ?? ""
        ).trim()
    );

  return {
    valid:
      missing.length === 0,
    missing
  };
}

window.smartOverlayQuestions = {
  setQuestions,
  getQuestions,
  getQuestion,
  getCurrentQuestion,
  getCurrentIndex,
  setCurrentQuestion,
  nextQuestion,
  previousQuestion,
  goToQuestion,
  randomQuestion,
  clearQuestions,
  normalizeQuestion,
  parseCSV,
  validateQuestion
};

console.log(
  "SmartOverlay Question Engine initialized"
);
