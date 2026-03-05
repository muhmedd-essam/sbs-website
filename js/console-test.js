/**
 * SBS Console Recommendation Test
 * 15-question bilingual (EN/AR) test → recommends one of 6 Learning Councils.
 * Scoring: ai | flutter | social | hr | entrepreneurship | accounting
 */

(function () {
  "use strict";

  const CONSOLES = {
    ai: {
      nameEn: "AI Council",
      nameAr: "كاونسل الـ AI",
      explanation: "You like structure, data, and solving problems with logic. You're curious about how systems learn and improve.",
      description: "Build a strong foundation in machine learning and practical AI tools. From intro to ML workflows to building simple models with Python and Scikit-learn.",
    },
    flutter: {
      nameEn: "Flutter Council",
      nameAr: "كاونسل Flutter",
      explanation: "You enjoy building things people can touch and use. You care about clean design and making ideas real on screen.",
      description: "Learn to design and build cross-platform mobile apps from idea to store-ready prototype. Dart, Flutter widgets, and state management.",
    },
    social: {
      nameEn: "Social Media Council",
      nameAr: "كاونسل السوشيال ميديا",
      explanation: "You think in stories and audiences. You like creating content that connects and grows communities.",
      description: "Master content planning, audience growth, and performance analytics for real campaigns. Content pillars, platform strategies, and insights.",
    },
    hr: {
      nameEn: "HR Functions Council",
      nameAr: "كاونسل الموارد البشرية",
      explanation: "You care about people and how teams work. You're organized and good at listening and giving feedback.",
      description: "Understand recruitment, onboarding, evaluations, and engagement. Interview basics, onboarding flows, and feedback culture.",
    },
    entrepreneurship: {
      nameEn: "Entrepreneurship Council",
      nameAr: "كاونسل الستارتابات وريادة الأعمال",
      explanation: "You like turning ideas into action. You're comfortable with uncertainty and enjoy pitching and validating.",
      description: "Take an idea from problem to pitch. Problem and customer discovery, lean validation, and storytelling.",
    },
    accounting: {
      nameEn: "Accounting & Banking Council",
      nameAr: "كاونسل المحاسبة والبنوك",
      explanation: "You like numbers, clarity, and systems. You want to understand how money and organizations work.",
      description: "Learn financial statements, budgeting, and the banking ecosystem. Core accounting concepts and reading reports.",
    },
  };

  const QUESTIONS = [
    {
      id: 1,
      en: "When working on a project, I prefer to:",
      ar: "لما أشتغل على مشروع، بفضل:",
      options: [
        { en: "Break it into data and logic steps", ar: "تقسيمه لخطوات ومنطق وبيانات", console: "ai" },
        { en: "Build something visual and interactive", ar: "أبني حاجة مرئية وتفاعلية", console: "flutter" },
        { en: "Share it and get people talking", ar: "أشاركه وأخلي الناس تتكلم عنه", console: "social" },
        { en: "Organize the team and roles first", ar: "أنضّم الفريق والأدوار من الأول", console: "hr" },
      ],
    },
    {
      id: 2,
      en: "My ideal weekend activity is:",
      ar: "نشاط العطلة المثالي ليا:",
      options: [
        { en: "Learning a new tool or course online", ar: "أتعلم أداة أو كورس جديد أونلاين", console: "ai" },
        { en: "Designing or prototyping an app idea", ar: "أصمم أو أعمل بروتوتايب لفكرة تطبيق", console: "flutter" },
        { en: "Creating content or managing a page", ar: "أعمل محتوى أو أدير صفحة", console: "social" },
        { en: "Helping friends plan an event", ar: "أساعد أصحابي في تنظيم حدث", console: "hr" },
      ],
    },
    {
      id: 3,
      en: "I'm most motivated when:",
      ar: "أنا متحفز أكتر لما:",
      options: [
        { en: "I solve a tricky technical problem", ar: "أحل مشكلة تقنية صعبة", console: "ai" },
        { en: "I see my design working on a device", ar: "أشوف التصميم يشتغل على جهاز", console: "flutter" },
        { en: "Something I posted gets real engagement", ar: "حاجة نزلتها تاخد تفاعل حقيقي", console: "social" },
        { en: "I bring people together and align goals", ar: "أجمع ناس وأوحد الأهداف", console: "hr" },
      ],
    },
    {
      id: 4,
      en: "In a team, I usually end up:",
      ar: "في الفريق، أنا غالباً:",
      options: [
        { en: "Handling the technical or data side", ar: "أتعامل مع الجزء التقني أو البيانات", console: "ai" },
        { en: "Building the product or prototype", ar: "أبني المنتج أو البروتوتايب", console: "flutter" },
        { en: "Spreading the word and messaging", ar: "أوزّع الكلمة والرسالة على الناس", console: "social" },
        { en: "Coordinating tasks and follow-ups", ar: "أنسق المهام والمتابعات", console: "hr" },
      ],
    },
    {
      id: 5,
      en: "I'd rather spend time on:",
      ar: "أفضل أقضي وقت في:",
      options: [
        { en: "Understanding how algorithms work", ar: "فهم إزاي الخوارزميات تشتغل", console: "ai" },
        { en: "Making interfaces smooth and clear", ar: "أخلي الواجهات سلسة وواضحة", console: "flutter" },
        { en: "Growing an audience or community", ar: "تكبير جمهور أو مجتمع", console: "social" },
        { en: "Making sure everyone is on the same page", ar: "أتأكد إن الكل على نفس الصفحة", console: "hr" },
      ],
    },
    {
      id: 6,
      en: "When I hear about a new idea, I first think:",
      ar: "لما أسمع عن فكرة جديدة، أول حاجة بيفوت على بالي:",
      options: [
        { en: "Can we validate it with data?", ar: "نقدر نثبتها ببيانات؟", console: "entrepreneurship" },
        { en: "What would the numbers and budget look like?", ar: "الأرقام والميزانية هتبقى إيه؟", console: "accounting" },
        { en: "How would we build an MVP?", ar: "نبني الـ MVP إزاي؟", console: "flutter" },
        { en: "Who do we need on the team?", ar: "مين اللي محتاجينهم في الفريق؟", console: "hr" },
      ],
    },
    {
      id: 7,
      en: "I'm most comfortable:",
      ar: "أنا مرتاح أكتر:",
      options: [
        { en: "With spreadsheets and clear numbers", ar: "مع جداول وأرقام واضحة", console: "accounting" },
        { en: "Pitching and explaining ideas to others", ar: "أعرض وأشرح الأفكار لغيري", console: "entrepreneurship" },
        { en: "Testing and improving a product", ar: "أختبر وأحسن منتج", console: "flutter" },
        { en: "Running experiments and models", ar: "أشغل تجارب وموديلات", console: "ai" },
      ],
    },
    {
      id: 8,
      en: "My strength is:",
      ar: "قوتي إن أنا:",
      options: [
        { en: "Seeing the big picture and taking risks", ar: "أشوف الصورة الكبيرة وأخد مخاطرات", console: "entrepreneurship" },
        { en: "Keeping records and things in order", ar: "أحافظ على السجلات والترتيب", console: "accounting" },
        { en: "Making complex things simple to use", ar: "أخلي الحاجات المعقدة بسيطة للاستخدام", console: "flutter" },
        { en: "Finding patterns in data", ar: "ألاقي أنماط في البيانات", console: "ai" },
      ],
    },
    {
      id: 9,
      en: "In a debate, I usually:",
      ar: "في نقاش، أنا غالباً:",
      options: [
        { en: "Use data to back my point", ar: "أجيب بيانات تدعم كلامي", console: "ai" },
        { en: "Focus on the user and the experience", ar: "أركز على المستخدم والتجربة", console: "flutter" },
        { en: "Try to get everyone aligned", ar: "أحاول أوحد الرأي بين الكل", console: "hr" },
        { en: "Think about feasibility and resources", ar: "أفكر في الإمكانيات والفلوس", console: "accounting" },
      ],
    },
    {
      id: 10,
      en: "I'd love to learn more about:",
      ar: "أحب أتعلم أكتر عن:",
      options: [
        { en: "Machine learning and automation", ar: "التعلم الآلي والأتمتة", console: "ai" },
        { en: "Mobile and web product design", ar: "تصميم منتجات الموبايل والويب", console: "flutter" },
        { en: "Content strategy and analytics", ar: "استراتيجية المحتوى والأناليتكس", console: "social" },
        { en: "Startups and pitching ideas", ar: "الستارتابات وعرض الأفكار", console: "entrepreneurship" },
      ],
    },
    {
      id: 11,
      en: "When something fails, I tend to:",
      ar: "لما حاجة تفشل، أنا:",
      options: [
        { en: "Analyze what went wrong in the process", ar: "أحلل إيه اللي حصل وإيه اللي غلط", console: "ai" },
        { en: "Iterate quickly and try another version", ar: "أعدل بسرعة وأجرب نسخة تانية", console: "flutter" },
        { en: "Communicate and adjust the message", ar: "أتواصل وأعدل الرسالة", console: "social" },
        { en: "Check the plan and resources again", ar: "أراجع الخطة والموارد من تاني", console: "accounting" },
      ],
    },
    {
      id: 12,
      en: "I enjoy:",
      ar: "أنا بحب:",
      options: [
        { en: "Building something from zero to one", ar: "أبني حاجة من صفر لواحد", console: "entrepreneurship" },
        { en: "Making sure numbers add up", ar: "أتأكد إن الأرقام متجمعة صح", console: "accounting" },
        { en: "Connecting people and ideas", ar: "أوصل ناس وأفكار", console: "social" },
        { en: "Improving how the team works", ar: "أحسن إزاي الفريق يشتغل", console: "hr" },
      ],
    },
    {
      id: 13,
      en: "My friends would say I'm:",
      ar: "أصحابي هيقولوا إني:",
      options: [
        { en: "Logical and good with systems", ar: "منطقي ومرتب مع السستم", console: "ai" },
        { en: "Creative and product-minded", ar: "خلاق ومركز على المنتج", console: "flutter" },
        { en: "Outgoing and good at communication", ar: "منفتح وبتواصل مع الناس بسهولة", console: "social" },
        { en: "Organized and reliable", ar: "منظم وموثوق", console: "hr" },
      ],
    },
    {
      id: 14,
      en: "I care most about:",
      ar: "أهم حاجة عندي:",
      options: [
        { en: "Innovation and trying new things", ar: "الابتكار وتجربة حاجات جديدة", console: "entrepreneurship" },
        { en: "Accuracy and clear documentation", ar: "الدقة والتنضيم والورق واضح", console: "accounting" },
        { en: "User experience and design", ar: "تجربة المستخدم والتصميم", console: "flutter" },
        { en: "Team culture and feedback", ar: "جو الفريق والملاحظات بيننا", console: "hr" },
      ],
    },
    {
      id: 15,
      en: "In 2 years, I see myself:",
      ar: "بعد سنتين أشوف نفسي:",
      options: [
        { en: "Working with AI/ML or data products", ar: "أشتغل في الـ AI أو منتجات البيانات", console: "ai" },
        { en: "Building apps or digital products", ar: "أبني تطبيقات أو منتجات رقمية", console: "flutter" },
        { en: "Leading content or community", ar: "أقود محتوى أو مجتمع", console: "social" },
        { en: "Running a startup or a project", ar: "أدير ستارتاب أو مشروع", console: "entrepreneurship" },
      ],
    },
  ];

  const TOTAL_QUESTIONS = QUESTIONS.length;
  const progressWrap = document.getElementById("progressWrap");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const screenHero = document.getElementById("screenHero");
  const screenQuestions = document.getElementById("screenQuestions");
  const screenResult = document.getElementById("screenResult");
  const questionTitleEn = document.getElementById("questionTitleEn");
  const questionTitleAr = document.getElementById("questionTitleAr");
  const optionsList = document.getElementById("optionsList");
  const questionError = document.getElementById("questionError");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const resultTitle = document.getElementById("resultTitle");
  const resultTitleAr = document.getElementById("resultTitleAr");
  const resultExplanation = document.getElementById("resultExplanation");
  const resultDescription = document.getElementById("resultDescription");
  const startBtn = document.getElementById("startBtn");
  const retakeBtn = document.getElementById("retakeBtn");

  let state = {
    currentIndex: 0,
    answers: [],
    scores: { ai: 0, flutter: 0, social: 0, hr: 0, entrepreneurship: 0, accounting: 0 },
  };

  function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.add("active");

    if (screenId === "screenQuestions") {
      progressWrap.classList.add("visible");
      screenQuestions.setAttribute("aria-hidden", "false");
      renderQuestion();
    } else if (screenId === "screenHero") {
      progressWrap.classList.remove("visible");
      screenQuestions.setAttribute("aria-hidden", "true");
      screenResult.setAttribute("aria-hidden", "true");
    } else if (screenId === "screenResult") {
      progressWrap.classList.remove("visible");
      screenQuestions.setAttribute("aria-hidden", "true");
      screenResult.setAttribute("aria-hidden", "false");
    }
  }

  function updateProgress() {
    const pct = Math.round(((state.currentIndex + 1) / TOTAL_QUESTIONS) * 100);
    if (progressFill) progressFill.style.width = pct + "%";
    const progressBar = document.querySelector(".progress-bar[role='progressbar']");
    if (progressBar) progressBar.setAttribute("aria-valuenow", pct);
    if (progressText) progressText.textContent = "Question " + (state.currentIndex + 1) + " of " + TOTAL_QUESTIONS;
  }

  function clearQuestionError() {
    if (questionError) questionError.textContent = "";
  }

  function renderQuestion() {
    const q = QUESTIONS[state.currentIndex];
    if (!q) return;

    questionTitleEn.textContent = q.en;
    questionTitleAr.textContent = q.ar;
    if (optionsList) {
      optionsList.innerHTML = "";
      optionsList.setAttribute("aria-label", "Question " + (state.currentIndex + 1));
      const selectedIndex = state.answers[state.currentIndex];
      q.options.forEach((opt, i) => {
        const label = document.createElement("label");
        label.className = "option" + (selectedIndex === i ? " selected" : "");
        label.setAttribute("role", "radio");
        label.setAttribute("aria-checked", selectedIndex === i ? "true" : "false");
        label.setAttribute("tabindex", "0");
        label.innerHTML =
          '<span class="option-label-en">' +
          escapeHtml(opt.en) +
          "</span>" +
          (opt.ar ? '<span class="option-label-ar">' + escapeHtml(opt.ar) + "</span>" : "");
        label.dataset.index = String(i);
        label.addEventListener("click", () => selectOption(i));
        label.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            selectOption(i);
          }
        });
        optionsList.appendChild(label);
      });
    }

    if (prevBtn) {
      prevBtn.disabled = state.currentIndex === 0;
    }
    if (nextBtn) {
      nextBtn.textContent = state.currentIndex === TOTAL_QUESTIONS - 1 ? "See Result" : "Next";
    }
    updateProgress();
    clearQuestionError();
  }

  function escapeHtml(s) {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function selectOption(index) {
    state.answers[state.currentIndex] = index;
    const labels = optionsList.querySelectorAll(".option");
    labels.forEach((l, i) => l.classList.toggle("selected", i === index));
    labels.forEach((l, i) => l.setAttribute("aria-checked", i === index ? "true" : "false"));
    clearQuestionError();
  }

  function validateCurrentAnswer() {
    if (state.answers[state.currentIndex] === undefined) {
      if (questionError) questionError.textContent = "Please choose one option before continuing.";
      return false;
    }
    return true;
  }

  function goNext() {
    if (!validateCurrentAnswer()) return;
    if (state.currentIndex < TOTAL_QUESTIONS - 1) {
      state.currentIndex++;
      renderQuestion();
    } else {
      calculateResult();
      showScreen("screenResult");
    }
  }

  function goPrev() {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderQuestion();
    }
  }

  function calculateResult() {
    state.scores = { ai: 0, flutter: 0, social: 0, hr: 0, entrepreneurship: 0, accounting: 0 };
    QUESTIONS.forEach((q, qi) => {
      const answerIndex = state.answers[qi];
      if (answerIndex !== undefined && q.options[answerIndex]) {
        const c = q.options[answerIndex].console;
        if (state.scores.hasOwnProperty(c)) state.scores[c]++;
      }
    });

    let maxScore = 0;
    let recommended = "ai";
    Object.keys(state.scores).forEach((key) => {
      if (state.scores[key] > maxScore) {
        maxScore = state.scores[key];
        recommended = key;
      }
    });

    const info = CONSOLES[recommended];
    if (!info) return;
    resultTitle.textContent = info.nameEn;
    resultTitleAr.textContent = info.nameAr;
    resultExplanation.textContent = info.explanation;
    resultDescription.textContent = info.description;
  }

  function resetTest() {
    state = { currentIndex: 0, answers: [], scores: { ai: 0, flutter: 0, social: 0, hr: 0, entrepreneurship: 0, accounting: 0 } };
    showScreen("screenQuestions");
  }

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      state.currentIndex = 0;
      state.answers = [];
      state.scores = { ai: 0, flutter: 0, social: 0, hr: 0, entrepreneurship: 0, accounting: 0 };
      showScreen("screenQuestions");
    });
  }

  if (nextBtn) nextBtn.addEventListener("click", goNext);
  if (prevBtn) prevBtn.addEventListener("click", goPrev);
  if (retakeBtn) retakeBtn.addEventListener("click", resetTest);
})();
