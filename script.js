
// ================================
// ظهور الأقسام أثناء التمرير
// ================================

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {
    threshold: 0.12
});

sections.forEach(section => {
    observer.observe(section);
});


// ================================
// زر العودة إلى الأعلى
// ================================

const topButton = document.getElementById("top-btn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ================================
// اختبار حرب أكتوبر
// ================================

const questions = [

    {
        question: "في أي عام وقعت حرب أكتوبر؟",

        answers: [
            "1967",
            "1973",
            "1982",
            "1990"
        ],

        correct: 1,

        explanation: "حرب أكتوبر وقعت في السادس من أكتوبر عام 1973."
    },

    {
        question: "ما اسم القناة التي عبرتها القوات المصرية؟",

        answers: [
            "قناة السويس",
            "قناة بنما",
            "قناة النيل",
            "قناة البحر الأحمر"
        ],

        correct: 0,

        explanation: "عبرت القوات المصرية قناة السويس للوصول إلى سيناء."
    },

    {
        question: "ما اسم الخط الدفاعي الإسرائيلي الشهير؟",

        answers: [
            "خط ماجينو",
            "خط بارليف",
            "خط الدفاع الأول",
            "خط النصر"
        ],

        correct: 1,

        explanation: "كان خط بارليف مجموعة من التحصينات الإسرائيلية شرق قناة السويس."
    },

    {
        question: "من كان رئيس مصر أثناء حرب أكتوبر؟",

        answers: [
            "جمال عبدالناصر",
            "محمد حسني مبارك",
            "محمد أنور السادات",
            "محمد نجيب"
        ],

        correct: 2,

        explanation: "كان الرئيس محمد أنور السادات رئيسًا لمصر خلال حرب أكتوبر."
    },

    {
        question: "ما رقم قرار مجلس الأمن الصادر في 22 أكتوبر 1973؟",

        answers: [
            "242",
            "338",
            "425",
            "1701"
        ],

        correct: 1,

        explanation: "صدر قرار مجلس الأمن رقم 338 في 22 أكتوبر 1973."
    },

    {
        question: "ما الشهر الهجري الذي وافق بداية حرب أكتوبر؟",

        answers: [
            "شعبان",
            "رمضان",
            "محرم",
            "رجب"
        ],

        correct: 1,

        explanation: "بدأت الحرب في العاشر من رمضان 1393 هـ."
    }

];

let currentQuestion = 0;

let totalScore = 0;

let answered = false;


// عناصر الاختبار

const questionElement = document.getElementById("question");

const answersElement = document.getElementById("answers");

const questionNumber = document.getElementById("question-number");

const scoreElement = document.getElementById("score");

const feedback = document.getElementById("feedback");

const nextButton = document.getElementById("next-btn");

const progressBar = document.getElementById("progress-bar");


// عرض السؤال

function showQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    questionNumber.textContent =
        `السؤال ${currentQuestion + 1} من ${questions.length}`;

    scoreElement.textContent = `النتيجة: ${totalScore}`;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    feedback.textContent = "";

    nextButton.hidden = true;

    answersElement.innerHTML = "";

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;

        button.addEventListener("click", () => {

            checkAnswer(index, button);

        });

        answersElement.appendChild(button);

    });

}


// التحقق من الإجابة

function checkAnswer(selected, selectedButton) {

    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];

    const allButtons =
        answersElement.querySelectorAll(".answer-btn");

    allButtons.forEach(button => {

        button.disabled = true;

    });

    if (selected === q.correct) {

        totalScore++;

        selectedButton.classList.add("correct");

        feedback.textContent = "✓ إجابة صحيحة! أحسنت.";

        feedback.style.color = "#55d98a";

    } else {

        selectedButton.classList.add("wrong");

        allButtons[q.correct].classList.add("correct");

        feedback.textContent =
            "إجابة غير صحيحة. " + q.explanation;

        feedback.style.color = "#ff7777";

    }

    scoreElement.textContent = `النتيجة: ${totalScore}`;

    nextButton.hidden = false;

}


// الانتقال للسؤال التالي

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


// عرض النتيجة النهائية

function showResult() {

    questionNumber.textContent = "انتهى الاختبار";

    questionElement.textContent =
        `حصلت على ${totalScore} من ${questions.length}`;

    answersElement.innerHTML = "";

    progressBar.style.width = "100%";

    feedback.textContent =
        totalScore === questions.length
            ? "ممتاز! لديك معرفة رائعة بتاريخ حرب أكتوبر 🇪🇬"
            : "شكرًا لمشاركتك! يمكنك مراجعة أحداث الموقع والمحاولة مرة أخرى.";

    feedback.style.color = "#d6a84b";

    nextButton.textContent = "إعادة الاختبار";

    nextButton.hidden = false;

    nextButton.onclick = () => {

        currentQuestion = 0;

        totalScore = 0;

        nextButton.textContent = "السؤال التالي";

        nextButton.onclick = null;

        showQuestion();

    };

}


// تشغيل الاختبار

showQuestion();


// ================================
// تأثير الترحيب في الموقع
// ================================

console.log(
    "مرحبًا بك في مشروع ملحمة أكتوبر 1973 🇪🇬"
);

console.log(
    "إعداد فريق سعيد محمد السعيد"
);
