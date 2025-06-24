/**
 * EduConnect Frontend Script
 *
 * Handles all client-side logic for the EduConnect platform including:
 * - Navigation between sections
 * - Dynamic rendering of courses and quizzes
 * - Quiz interaction and scoring
 */
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    console.log("EduConnect script initialized and DOM fully loaded.");

    // =========================================================================
    // Configuration & Constants
    // =========================================================================

    const APP_SECTIONS = {
        HOME: 'home',
        COURSES: 'courses',
        COURSE_DETAIL: 'course-detail',
        QUIZZES: 'quizzes',
        QUIZ_START: 'quiz-start',
        QUIZ_PLAY: 'quiz-play',
        QUIZ_RESULT: 'quiz-result',
        PROFILE: 'profile',
        CONTACT: 'contact'
    };

    // =========================================================================
    // DOM Element References
    // =========================================================================

    const domElements = {
        // Navigation & Page Sections
        navLinks: document.querySelectorAll('.nav-link'),
        homeLogo: document.getElementById('home-logo'),
        pageSections: document.querySelectorAll('.page-section'),
        contentArea: document.getElementById('content-area'),

        // Courses
        coursesContainer: document.getElementById('courses-container'),
        courseDetailContent: document.getElementById('course-detail-content'),
        backToCoursesBtn: document.getElementById('back-to-courses'),

        // Quizzes
        quizzesContainer: document.getElementById('quizzes-container'),
        quizStartContent: document.getElementById('quiz-start-content'),
        backToQuizzesBtn: document.getElementById('back-to-quizzes'),

        // Quiz Play
        quizPlaySection: document.getElementById('quiz-play'),
        quizTitleDisplay: document.getElementById('quiz-title-display'),
        quizQuestionContainer: document.getElementById('quiz-question-container'),
        quizOptionsContainer: document.getElementById('quiz-options-container'),
        quizQuestionNumber: document.getElementById('quiz-question-number'),
        nextQuestionBtn: document.getElementById('next-question-btn'),

        // Quiz Result
        quizResultSection: document.getElementById('quiz-result'),
        quizScoreDisplay: document.getElementById('quiz-score-display'),
        retakeQuizBtn: document.getElementById('retake-quiz-btn'),
        backToQuizListBtn: document.getElementById('back-to-quiz-list-btn')
    };

    // =========================================================================
    // State Variables
    // =========================================================================

    let state = {
        currentQuiz: null,          // Stores the currently selected quiz object
        currentQuestionIndex: 0,  // Tracks the current question index within a quiz
        userScore: 0                // Tracks the user's score for the current quiz
    };

    // =========================================================================
    // Data (Courses, Quizzes, Questions)
    // =========================================================================

    const data = {
        courses: [
            {
                id: 'python-intro',
                title: 'Introduction to Python Programming',
                description: 'Learn the basics of Python, from variables to functions. Perfect for beginners!',
                difficulty: 'Beginner',
                duration: '8 Weeks',
                modules: 12,
                instructor: 'Dr. Anya Sharma',
                colorClass: 'bg-blue-50',
                textColorClass: 'text-blue-700',
                buttonColorClass: 'bg-blue-600 hover:bg-blue-700'
            },
            {
                id: 'web-dev-fundamentals',
                title: 'Web Development Fundamentals (HTML, CSS, JS)',
                description: 'Master the building blocks of the web: HTML for structure, CSS for style, and JavaScript for interactivity.',
                difficulty: 'Beginner',
                duration: '10 Weeks',
                modules: 15,
                instructor: 'Prof. David Lee',
                colorClass: 'bg-green-50',
                textColorClass: 'text-green-700',
                buttonColorClass: 'bg-green-600 hover:bg-green-700'
            },
            {
                id: 'data-science-sql',
                title: 'Data Science with SQL',
                description: 'Dive into data analysis and manipulation using powerful SQL queries. Learn to extract insights from databases.',
                difficulty: 'Intermediate',
                duration: '6 Weeks',
                modules: 8,
                instructor: 'Ms. Emily Chen',
                colorClass: 'bg-purple-50',
                textColorClass: 'text-purple-700',
                buttonColorClass: 'bg-purple-600 hover:bg-purple-700'
            },
            {
                id: 'csharp-basics',
                title: 'C# Programming for Beginners',
                description: 'Explore the fundamentals of C# programming, essential for game development (Unity) and Windows applications.',
                difficulty: 'Beginner',
                duration: '7 Weeks',
                modules: 10,
                instructor: 'Mr. John Doe',
                colorClass: 'bg-indigo-50',
                textColorClass: 'text-indigo-700',
                buttonColorClass: 'bg-indigo-600 hover:bg-indigo-700'
            },
            {
                id: 'react-native-mobile-apps',
                title: 'Building Mobile Apps with React Native',
                description: 'Learn to create cross-platform mobile applications for iOS and Android using JavaScript and React.',
                difficulty: 'Intermediate',
                duration: '9 Weeks',
                modules: 14,
                instructor: 'Dr. Sarah Patel',
                colorClass: 'bg-pink-50',
                textColorClass: 'text-pink-700',
                buttonColorClass: 'bg-pink-600 hover:bg-pink-700'
            },
            {
                id: 'php-web-development',
                title: 'PHP for Dynamic Web Applications',
                description: 'Understand server-side scripting with PHP to build robust and interactive web experiences.',
                difficulty: 'Intermediate',
                duration: '8 Weeks',
                modules: 11,
                instructor: 'Mr. Robert Green',
                colorClass: 'bg-orange-50',
                textColorClass: 'text-orange-700',
                buttonColorClass: 'bg-orange-600 hover:bg-orange-700'
            }
        ],
        quizzes: [
            {
                id: 'python-basics-quiz',
                title: 'Python Basics Quiz',
                description: 'Test your understanding of fundamental Python concepts.',
                questions: 5, // Number of questions, could be derived from questionsData
                difficulty: 'Easy',
                topic: 'Python',
                colorClass: 'bg-yellow-50',
                textColorClass: 'text-yellow-700',
                buttonColorClass: 'bg-yellow-600 hover:bg-yellow-700',
                questionsDataId: 'python-basics-quiz' // Links to the key in quizQuestionsData
            },
            {
                id: 'html-css-quiz',
                title: 'HTML & CSS Fundamentals',
                description: 'Are you a master of web structure and styling? Find out!',
                questions: 5,
                difficulty: 'Medium',
                topic: 'Web Development',
                colorClass: 'bg-red-50',
                textColorClass: 'text-red-700',
                buttonColorClass: 'bg-red-600 hover:bg-red-700',
                questionsDataId: 'html-css-quiz'
            },
            {
                id: 'sql-query-quiz',
                title: 'SQL Query Challenge',
                description: 'Prove your SQL skills by answering complex database queries.',
                questions: 5,
                difficulty: 'Hard',
                topic: 'SQL',
                colorClass: 'bg-gray-50',
                textColorClass: 'text-gray-700',
                buttonColorClass: 'bg-gray-600 hover:bg-gray-700',
                questionsDataId: 'sql-query-quiz'
            },
            {
                id: 'javascript-dom-quiz',
                title: 'JavaScript DOM Manipulation Quiz',
                description: 'How well do you know JavaScript and interacting with the webpage?',
                questions: 5,
                difficulty: 'Medium',
                topic: 'JavaScript',
                colorClass: 'bg-cyan-50',
                textColorClass: 'text-cyan-700',
                buttonColorClass: 'bg-cyan-600 hover:bg-cyan-700',
                questionsDataId: 'javascript-dom-quiz'
            }
        ],
        quizQuestionsData: {
            'python-basics-quiz': [
                { question: 'What is the correct file extension for Python files?', options: ['.py', '.java', '.js', '.html'], correctAnswer: '.py' },
                { question: 'Which keyword is used to define a function in Python?', options: ['func', 'define', 'def', 'function'], correctAnswer: 'def' },
                { question: 'What is the output of `print(2 + 3 * 4)` in Python?', options: ['20', '14', '24', '54'], correctAnswer: '14' },
                { question: 'Which of the following is NOT a Python data type?', options: ['list', 'tuple', 'dictionary', 'array'], correctAnswer: 'array' },
                { question: 'How do you comment a single line in Python?', options: ['// This is a comment', '# This is a comment', '/* This is a comment */', '-- This is a comment'], correctAnswer: '# This is a comment' }
            ],
            'html-css-quiz': [
                { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'Hyperlink and Text Markup Language', 'Home Tool Markup Language', 'Hyper Transfer Markup Language'], correctAnswer: 'Hyper Text Markup Language' },
                { question: 'Which HTML tag is used for the largest heading?', options: ['<head>', '<h6>', '<heading>', '<h1>'], correctAnswer: '<h1>' },
                { question: 'Which CSS property is used to change the background color?', options: ['color', 'bgcolor', 'background-color', 'background'], correctAnswer: 'background-color' },
                { question: 'Which is the correct CSS syntax?', options: ['body {color: black;}', '{body;color:black;}', 'body:color=black;', '{body:color=black;}'], correctAnswer: 'body {color: black;}' },
                { question: 'Which HTML tag is used to define an internal style sheet?', options: ['<script>', '<style>', '<css>', '<link>'], correctAnswer: '<style>' }
            ],
            'sql-query-quiz': [
                { question: 'Which SQL keyword is used to extract data from a database?', options: ['GET', 'OPEN', 'SELECT', 'EXTRACT'], correctAnswer: 'SELECT' },
                { question: 'Which SQL statement is used to update data in a database?', options: ['MODIFY', 'SAVE', 'UPDATE', 'CHANGE'], correctAnswer: 'UPDATE' },
                { question: 'Which SQL keyword is used to sort the result-set?', options: ['SORT BY', 'ORDER BY', 'ARRANGE BY', 'SEQUENCE BY'], correctAnswer: 'ORDER BY' },
                { question: 'What does SQL stand for?', options: ['Structured Query Language', 'Standard Question Language', 'Simple Query Logic', 'Sequential Query Language'], correctAnswer: 'Structured Query Language' },
                { question: 'Which clause is used to filter records?', options: ['SORT', 'FILTER', 'WHERE', 'HAVING'], correctAnswer: 'WHERE' }
            ],
            'javascript-dom-quiz': [
                { question: 'Which HTML element do we put the JavaScript in?', options: ['<js>', '<script>', '<javascript>', '<src>'], correctAnswer: '<script>' },
                { question: 'Where is the correct place to insert a JavaScript?', options: ['The <head> section', 'The <body> section', 'Both the <head> and the <body> section are correct', 'The <footer> section'], correctAnswer: 'Both the <head> and the <body> section are correct' },
                { question: 'How do you write "Hello World" in an alert box?', options: ['msg("Hello World");', 'alert("Hello World");', 'msgBox("Hello World");', 'console.log("Hello World");'], correctAnswer: 'alert("Hello World");' },
                { question: 'How do you call a function named "myFunction"?', options: ['call myFunction()', 'myFunction()', 'call function myFunction()', 'run myFunction()'], correctAnswer: 'myFunction()' },
                { question: 'How do you add a comment in JavaScript?', options: ['# This is a comment', '// This is a comment', '/* This is a comment */', 'Both // and /* */ are correct'], correctAnswer: 'Both // and /* */ are correct' }
            ]
        }
    };

    // =========================================================================
    // Navigation Logic
    // =========================================================================

    /**
     * Shows a specific section by its ID and hides all other sections.
     * Also scrolls the content area to the top.
     * @param {string} sectionId - The ID of the HTML section to display.
     */
    function showSection(sectionId) {
        if (!domElements.contentArea) {
            console.error("Content area element not found.");
            return;
        }
        domElements.pageSections.forEach(section => {
            section.classList.toggle('hidden', section.id !== sectionId);
        });
        domElements.contentArea.scrollTop = 0; // Reset scroll position
        console.log(`Navigated to section: ${sectionId}`);
    }

    /**
     * Initializes navigation event listeners for main navigation links and logo.
     */
    function initNavigation() {
        domElements.navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const targetSectionId = this.getAttribute('href').substring(1);
                if (Object.values(APP_SECTIONS).includes(targetSectionId)) {
                    showSection(targetSectionId);
                } else {
                    console.warn(`Attempted to navigate to unknown section: ${targetSectionId}`);
                    showSection(APP_SECTIONS.HOME); // Fallback to home
                }
            });
        });

        if (domElements.homeLogo) {
            domElements.homeLogo.addEventListener('click', function(event) {
                event.preventDefault();
                showSection(APP_SECTIONS.HOME);
            });
        }

        if (domElements.backToCoursesBtn) {
            domElements.backToCoursesBtn.addEventListener('click', () => showSection(APP_SECTIONS.COURSES));
        }

        if (domElements.backToQuizzesBtn) {
            domElements.backToQuizzesBtn.addEventListener('click', () => showSection(APP_SECTIONS.QUIZZES));
        }
    }

    // =========================================================================
    // Course Rendering Logic
    // =========================================================================

    /**
     * Renders all available courses into the courses container.
     */
    function renderCourses() {
        if (!domElements.coursesContainer) {
            console.warn("Courses container not found. Skipping course rendering.");
            return;
        }
        domElements.coursesContainer.innerHTML = ''; // Clear existing content

        if (data.courses.length === 0) {
            domElements.coursesContainer.innerHTML = '<p class="text-gray-500 text-center col-span-full">No courses available at the moment.</p>';
            return;
        }

        data.courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = `${course.colorClass || 'bg-gray-50'} p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between`;
            courseCard.innerHTML = `
                <div>
                    <h3 class="text-xl font-semibold ${course.textColorClass || 'text-gray-800'} mb-2">${course.title}</h3>
                    <p class="text-gray-600 mb-4">${course.description}</p>
                    <div class="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <span>Difficulty: <span class="font-medium">${course.difficulty}</span></span>
                        <span>Duration: <span class="font-medium">${course.duration}</span></span>
                    </div>
                </div>
                <button class="view-course-btn ${course.buttonColorClass || 'bg-blue-600 hover:bg-blue-700'} text-white py-2 px-4 rounded-md transition duration-300 mt-4" data-course-id="${course.id}">View Course</button>
            `;
            domElements.coursesContainer.appendChild(courseCard);
        });
    }

    /**
     * Renders the detailed view for a specific course.
     * @param {string} courseId - The ID of the course to display.
     */
    function renderCourseDetail(courseId) {
        const course = data.courses.find(c => c.id === courseId);
        if (!domElements.courseDetailContent) {
            console.error('Course detail container missing.');
            return;
        }
        if (!course) {
            console.error(`Course with ID '${courseId}' not found.`);
            domElements.courseDetailContent.innerHTML = '<p class="text-red-500 text-center">Course details could not be loaded.</p>';
            showSection(APP_SECTIONS.COURSE_DETAIL);
            return;
        }

        domElements.courseDetailContent.innerHTML = `
            <h2 class="text-4xl font-extrabold ${course.textColorClass || 'text-gray-800'} mb-4">${course.title}</h2>
            <p class="text-lg text-gray-700 mb-6">${course.description}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-gray-800">
                <p><strong>Difficulty:</strong> <span class="font-medium">${course.difficulty}</span></p>
                <p><strong>Duration:</strong> <span class="font-medium">${course.duration}</span></p>
                <p><strong>Modules:</strong> <span class="font-medium">${course.modules}</span></p>
                <p><strong>Instructor:</strong> <span class="font-medium">${course.instructor}</span></p>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">What You'll Learn:</h3>
            <ul class="list-disc list-inside text-gray-700 mb-8 ml-4">
                <li>Deep dive into core concepts</li>
                <li>Hands-on coding exercises</li>
                <li>Practical project development</li>
                <li>Best practices and industry tips</li>
            </ul>
            <button class="${course.buttonColorClass || 'bg-blue-700'} text-white py-3 px-6 rounded-md hover:opacity-90 transition duration-300 text-xl font-semibold">Enroll Now</button>
        `;
        showSection(APP_SECTIONS.COURSE_DETAIL);
    }

    /**
     * Initializes event listeners for course-related interactions.
     */
    function initCourseInteractions() {
        if (domElements.coursesContainer) {
            domElements.coursesContainer.addEventListener('click', function(event) {
                const button = event.target.closest('.view-course-btn');
                if (button && button.dataset.courseId) {
                    renderCourseDetail(button.dataset.courseId);
                }
            });
        }
    }

    // =========================================================================
    // Quiz Rendering & Logic
    // =========================================================================

    /**
     * Renders all available quizzes into the quizzes container.
     */
    function renderQuizzes() {
        if (!domElements.quizzesContainer) {
            console.warn("Quizzes container not found. Skipping quiz rendering.");
            return;
        }
        domElements.quizzesContainer.innerHTML = ''; // Clear existing content

        if (data.quizzes.length === 0) {
            domElements.quizzesContainer.innerHTML = '<p class="text-gray-500 text-center col-span-full">No quizzes available at the moment.</p>';
            return;
        }

        data.quizzes.forEach(quiz => {
            const quizCard = document.createElement('div');
            quizCard.className = `${quiz.colorClass || 'bg-gray-50'} p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between`;
            quizCard.innerHTML = `
                <div>
                    <h3 class="text-xl font-semibold ${quiz.textColorClass || 'text-gray-800'} mb-2">${quiz.title}</h3>
                    <p class="text-gray-600 mb-4">${quiz.description}</p>
                    <div class="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <span>Questions: <span class="font-medium">${data.quizQuestionsData[quiz.questionsDataId]?.length || quiz.questions}</span></span>
                        <span>Difficulty: <span class="font-medium">${quiz.difficulty}</span></span>
                    </div>
                </div>
                <button class="start-quiz-btn ${quiz.buttonColorClass || 'bg-green-600 hover:bg-green-700'} text-white py-2 px-4 rounded-md transition duration-300 mt-4" data-quiz-id="${quiz.id}">Start Quiz</button>
            `;
            domElements.quizzesContainer.appendChild(quizCard);
        });
    }

    /**
     * Renders the start screen for a specific quiz.
     * @param {string} quizId - The ID of the quiz to start.
     */
    function renderQuizStart(quizId) {
        state.currentQuiz = data.quizzes.find(q => q.id === quizId);
        if (!domElements.quizStartContent) {
            console.error('Quiz start container missing.');
            return;
        }
        if (!state.currentQuiz) {
            console.error(`Quiz with ID '${quizId}' not found.`);
            domElements.quizStartContent.innerHTML = '<p class="text-red-500 text-center">Quiz details could not be loaded.</p>';
            showSection(APP_SECTIONS.QUIZ_START);
            return;
        }

        const numQuestions = data.quizQuestionsData[state.currentQuiz.questionsDataId]?.length || state.currentQuiz.questions;
        domElements.quizStartContent.innerHTML = `
            <h2 class="text-4xl font-extrabold ${state.currentQuiz.textColorClass || 'text-gray-800'} mb-4">${state.currentQuiz.title}</h2>
            <p class="text-lg text-gray-700 mb-6">${state.currentQuiz.description}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-gray-800">
                <p><strong>Questions:</strong> <span class="font-medium">${numQuestions}</span></p>
                <p><strong>Difficulty:</strong> <span class="font-medium">${state.currentQuiz.difficulty}</span></p>
                <p><strong>Topic:</strong> <span class="font-medium">${state.currentQuiz.topic}</span></p>
                <p><strong>Time Limit:</strong> <span class="font-medium">N/A</span></p>
            </div>
            <p class="text-gray-700 text-center text-xl font-semibold mb-8">Are you ready to test your knowledge?</p>
            <div class="text-center">
                <button id="begin-quiz-btn" class="${state.currentQuiz.buttonColorClass || 'bg-green-600 hover:bg-green-700'} text-white py-3 px-6 rounded-md hover:opacity-90 transition duration-300 text-xl font-semibold">Begin Quiz</button>
            </div>
        `;
        showSection(APP_SECTIONS.QUIZ_START);

        const beginQuizBtn = document.getElementById('begin-quiz-btn');
        if (beginQuizBtn) {
            beginQuizBtn.addEventListener('click', startQuiz);
        } else {
            console.error("Begin quiz button not found after rendering quiz start page.");
        }
    }

    /**
     * Starts the current quiz, resets state, and renders the first question.
     */
    function startQuiz() {
        if (!state.currentQuiz) {
            console.error("No current quiz selected to start.");
            showSection(APP_SECTIONS.QUIZZES); // Go back to quiz list
            return;
        }
        console.log(`Starting quiz: ${state.currentQuiz.title}`);
        state.currentQuestionIndex = 0;
        state.userScore = 0;

        if (domElements.quizTitleDisplay) {
            domElements.quizTitleDisplay.textContent = state.currentQuiz.title;
        }
        showSection(APP_SECTIONS.QUIZ_PLAY);
        renderCurrentQuestion();
    }

    /**
     * Renders the current question and its options for the active quiz.
     * If no more questions, ends the quiz.
     */
    function renderCurrentQuestion() {
        if (!state.currentQuiz || !data.quizQuestionsData[state.currentQuiz.questionsDataId]) {
            console.error('Quiz data or current quiz not found for rendering question.');
            endQuizWithError();
            return;
        }

        const questions = data.quizQuestionsData[state.currentQuiz.questionsDataId];
        if (state.currentQuestionIndex >= questions.length) {
            endQuiz(); // All questions answered
            return;
        }

        const question = questions[state.currentQuestionIndex];
        if (!domElements.quizQuestionNumber || !domElements.quizQuestionContainer || !domElements.quizOptionsContainer || !domElements.nextQuestionBtn) {
            console.error("One or more quiz play elements are missing from the DOM.");
            endQuizWithError();
            return;
        }

        domElements.quizQuestionNumber.textContent = `Question ${state.currentQuestionIndex + 1} of ${questions.length}`;
        domElements.quizQuestionContainer.textContent = question.question;
        domElements.quizOptionsContainer.innerHTML = ''; // Clear previous options

        // Shuffle options for variability
        const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);

        shuffledOptions.forEach(optionText => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'w-full bg-blue-100 text-blue-800 p-4 rounded-md mb-3 text-left hover:bg-blue-200 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 option-btn';
            optionBtn.textContent = optionText;
            optionBtn.dataset.option = optionText; // Store option text for checking answer
            domElements.quizOptionsContainer.appendChild(optionBtn);
        });

        domElements.nextQuestionBtn.textContent = (state.currentQuestionIndex === questions.length - 1) ? 'Finish Quiz' : 'Next Question →';
        domElements.nextQuestionBtn.classList.add('hidden'); // Hide until an option is chosen
    }

    /**
     * Handles the user's selection of a quiz answer.
     * @param {Event} event - The click event from an option button.
     */
    function handleAnswerSelection(event) {
        const selectedButton = event.target.closest('.option-btn');
        if (!selectedButton || !state.currentQuiz) return;

        const currentQuestionsSet = data.quizQuestionsData[state.currentQuiz.questionsDataId];
        if (!currentQuestionsSet || !currentQuestionsSet[state.currentQuestionIndex]) {
            console.error("Current question data not found during answer selection.");
            return;
        }
        const currentQuestion = currentQuestionsSet[state.currentQuestionIndex];

        // Disable all option buttons after selection and remove hover effects
        domElements.quizOptionsContainer.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            btn.classList.remove('hover:bg-blue-200'); // Ensure hover style is removed
            btn.classList.add('cursor-not-allowed', 'opacity-75'); // Indicate disabled state
        });

        const selectedOption = selectedButton.dataset.option;
        if (selectedOption === currentQuestion.correctAnswer) {
            state.userScore++;
            selectedButton.classList.remove('bg-blue-100', 'text-blue-800');
            selectedButton.classList.add('bg-green-200', 'text-green-800', 'border-2', 'border-green-500');
        } else {
            selectedButton.classList.remove('bg-blue-100', 'text-blue-800');
            selectedButton.classList.add('bg-red-200', 'text-red-800', 'border-2', 'border-red-500');
            // Highlight the correct answer
            domElements.quizOptionsContainer.querySelectorAll('.option-btn').forEach(btn => {
                if (btn.dataset.option === currentQuestion.correctAnswer) {
                    btn.classList.remove('bg-blue-100', 'text-blue-800');
                    btn.classList.add('bg-green-200', 'text-green-800', 'border-2', 'border-green-500');
                }
            });
        }
        if (domElements.nextQuestionBtn) domElements.nextQuestionBtn.classList.remove('hidden');
    }

    /**
     * Ends the current quiz and displays the results.
     */
    function endQuiz() {
        showSection(APP_SECTIONS.QUIZ_RESULT);
        if (!domElements.quizScoreDisplay || !state.currentQuiz) {
            console.error("Quiz score display or current quiz data missing for endQuiz.");
            if (domElements.quizScoreDisplay) domElements.quizScoreDisplay.textContent = "Could not display score.";
            return;
        }

        const totalQuestions = data.quizQuestionsData[state.currentQuiz.questionsDataId]?.length || 0;
        let scoreMessage = `You scored ${state.userScore} out of ${totalQuestions}!`;
        let scoreClass = 'text-gray-800'; // Default

        if (totalQuestions > 0) {
            if (state.userScore === totalQuestions) {
                scoreMessage += " Excellent work!";
                scoreClass = 'text-green-700';
            } else if (state.userScore >= totalQuestions * 0.7) { // e.g. 70% or more
                scoreMessage += " Good effort!";
                scoreClass = 'text-orange-600'; // Using Tailwind's orange
            } else {
                scoreMessage += " Keep practicing!";
                scoreClass = 'text-red-700';
            }
        } else {
            scoreMessage = "Quiz had no questions.";
        }

        domElements.quizScoreDisplay.textContent = scoreMessage;
        domElements.quizScoreDisplay.className = `text-xl mb-6 ${scoreClass}`; // Reset classes and apply new one
    }

    /**
     * Ends the quiz due to an error and shows a generic error message.
     */
    function endQuizWithError() {
        showSection(APP_SECTIONS.QUIZ_RESULT);
         if (domElements.quizScoreDisplay) {
            domElements.quizScoreDisplay.textContent = "An error occurred during the quiz. Please try again.";
            domElements.quizScoreDisplay.className = 'text-xl text-red-700 mb-6';
        }
        console.error("Quiz ended due to an error.");
    }


    /**
     * Initializes event listeners for quiz-related interactions.
     */
    function initQuizInteractions() {
        if (domElements.quizzesContainer) {
            domElements.quizzesContainer.addEventListener('click', function(event) {
                const button = event.target.closest('.start-quiz-btn');
                if (button && button.dataset.quizId) {
                    renderQuizStart(button.dataset.quizId);
                }
            });
        }

        if (domElements.quizOptionsContainer) {
            domElements.quizOptionsContainer.addEventListener('click', handleAnswerSelection);
        }

        if (domElements.nextQuestionBtn) {
            domElements.nextQuestionBtn.addEventListener('click', () => {
                state.currentQuestionIndex++;
                renderCurrentQuestion();
            });
        }

        if (domElements.retakeQuizBtn) {
            domElements.retakeQuizBtn.addEventListener('click', () => {
                if (state.currentQuiz) { // Ensure there was a quiz to retake
                    startQuiz();
                } else {
                    showSection(APP_SECTIONS.QUIZZES); // If no current quiz, go to list
                }
            });
        }

        if (domElements.backToQuizListBtn) {
            domElements.backToQuizListBtn.addEventListener('click', () => showSection(APP_SECTIONS.QUIZZES));
        }
    }

    // =========================================================================
    // Initialization
    // =========================================================================

    /**
     * Main initialization function. Sets up the application.
     */
    function initializeApp() {
        // Check for essential DOM elements
        if (!domElements.contentArea || domElements.pageSections.length === 0) {
            console.error("Essential layout elements (contentArea or pageSections) are missing. App cannot initialize properly.");
            document.body.innerHTML = '<p style="color: red; text-align: center; font-size: 1.5em; margin-top: 2em;">Error: Application failed to load. Required HTML structure is missing.</p>';
            return;
        }

        initNavigation();
        renderCourses();
        initCourseInteractions();
        renderQuizzes();
        initQuizInteractions();

        // Determine initial section from URL hash or default to home
        const initialSectionId = window.location.hash ? window.location.hash.substring(1) : APP_SECTIONS.HOME;
        if (Object.values(APP_SECTIONS).includes(initialSectionId)) {
            showSection(initialSectionId);
        } else {
            console.warn(`Initial section '${initialSectionId}' from hash is invalid. Defaulting to home.`);
            showSection(APP_SECTIONS.HOME);
        }
    }

    // Start the application
    initializeApp();

});
