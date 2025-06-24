// Ensure the DOM (Document Object Model) is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript is running and DOM is loaded!");

    // --- Navigation Logic ---
    const navLinks = document.querySelectorAll('.nav-link');
    const homeLogo = document.getElementById('home-logo');
    const pageSections = document.querySelectorAll('.page-section');
    const coursesContainer = document.getElementById('courses-container');
    const quizzesContainer = document.getElementById('quizzes-container');
    const courseDetailContent = document.getElementById('course-detail-content');
    const quizStartContent = document.getElementById('quiz-start-content');
    const backToCoursesBtn = document.getElementById('back-to-courses');
    const backToQuizzesBtn = document.getElementById('back-to-quizzes');

    // Quiz Play elements (newly added references)
    const quizPlaySection = document.getElementById('quiz-play');
    const quizTitleDisplay = document.getElementById('quiz-title-display'); // NEW: Reference for quiz title
    const quizQuestionContainer = document.getElementById('quiz-question-container');
    const quizOptionsContainer = document.getElementById('quiz-options-container');
    const quizQuestionNumber = document.getElementById('quiz-question-number');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const quizResultSection = document.getElementById('quiz-result');
    const quizScoreDisplay = document.getElementById('quiz-score-display');
    const retakeQuizBtn = document.getElementById('retake-quiz-btn');
    const backToQuizListBtn = document.getElementById('back-to-quiz-list-btn');

    let currentQuiz = null; // Store the currently selected quiz object
    let currentQuestionIndex = 0; // Track the current question number
    let userScore = 0; // Track the user's score

    // Function to show a specific section and hide others
    function showSection(sectionId) {
        pageSections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
        document.getElementById('content-area').scrollTop = 0;
    }

    // Add event listeners for main navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetSectionId = this.getAttribute('href').substring(1);
            showSection(targetSectionId);
        });
    });

    // Add event listener for the home logo to return to the home section
    if (homeLogo) {
        homeLogo.addEventListener('click', function(event) {
            event.preventDefault();
            showSection('home');
        });
    }

    // Add event listeners for "Back" buttons
    if (backToCoursesBtn) {
        backToCoursesBtn.addEventListener('click', function() {
            showSection('courses');
        });
    }
    if (backToQuizzesBtn) {
        backToQuizzesBtn.addEventListener('click', function() {
            showSection('quizzes');
        });
    }

    // --- Course Data and Rendering Logic (unchanged) ---
    const courses = [
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
    ];

    function renderCourses() {
        if (!coursesContainer) return;
        coursesContainer.innerHTML = '';

        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = `${course.colorClass} p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between`;
            courseCard.innerHTML = `
                <div>
                    <h3 class="text-xl font-semibold ${course.textColorClass} mb-2">${course.title}</h3>
                    <p class="text-gray-600 mb-4">${course.description}</p>
                    <div class="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <span>Difficulty: <span class="font-medium">${course.difficulty}</span></span>
                        <span>Duration: <span class="font-medium">${course.duration}</span></span>
                    </div>
                </div>
                <button class="view-course-btn ${course.buttonColorClass} text-white py-2 px-4 rounded-md transition duration-300 mt-4" data-course-id="${course.id}">View Course</button>
            `;
            coursesContainer.appendChild(courseCard);
        });
    }

    function renderCourseDetail(courseId) {
        const course = courses.find(c => c.id === courseId);
        if (!course || !courseDetailContent) {
            console.error('Course not found or course detail container missing.');
            return;
        }

        courseDetailContent.innerHTML = `
            <h2 class="text-4xl font-extrabold ${course.textColorClass} mb-4">${course.title}</h2>
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
            <button class="bg-blue-700 text-white py-3 px-6 rounded-md hover:bg-blue-800 transition duration-300 text-xl font-semibold">Enroll Now</button>
        `;
        showSection('course-detail');
    }

    if (coursesContainer) {
        coursesContainer.addEventListener('click', function(event) {
            const button = event.target.closest('.view-course-btn');
            if (button) {
                const courseId = button.dataset.courseId;
                renderCourseDetail(courseId);
            }
        });
    }

    // --- Quiz Questions Data (unchanged) ---
    const quizQuestionsData = {
        'python-basics-quiz': [
            {
                question: 'What is the correct file extension for Python files?',
                options: ['.py', '.java', '.js', '.html'],
                correctAnswer: '.py'
            },
            {
                question: 'Which keyword is used to define a function in Python?',
                options: ['func', 'define', 'def', 'function'],
                correctAnswer: 'def'
            },
            {
                question: 'What is the output of `print(2 + 3 * 4)` in Python?',
                options: ['20', '14', '24', '54'],
                correctAnswer: '14'
            },
            {
                question: 'Which of the following is NOT a Python data type?',
                options: ['list', 'tuple', 'dictionary', 'array'],
                correctAnswer: 'array' // Python uses lists, not arrays in the traditional sense
            },
            {
                question: 'How do you comment a single line in Python?',
                options: ['// This is a comment', '# This is a comment', '/* This is a comment */', '-- This is a comment'],
                correctAnswer: '# This is a comment'
            }
        ],
        'html-css-quiz': [
            {
                question: 'What does HTML stand for?',
                options: ['Hyper Text Markup Language', 'Hyperlink and Text Markup Language', 'Home Tool Markup Language', 'Hyper Transfer Markup Language'],
                correctAnswer: 'Hyper Text Markup Language'
            },
            {
                question: 'Which HTML tag is used for the largest heading?',
                options: ['<head>', '<h6>', '<heading>', '<h1>'],
                correctAnswer: '<h1>'
            },
            {
                question: 'Which CSS property is used to change the background color?',
                options: ['color', 'bgcolor', 'background-color', 'background'],
                correctAnswer: 'background-color'
            },
            {
                question: 'Which is the correct CSS syntax?',
                options: ['body {color: black;}', '{body;color:black;}', 'body:color=black;', '{body:color=black;}'],
                correctAnswer: 'body {color: black;}'
            },
            {
                question: 'Which HTML tag is used to define an internal style sheet?',
                options: ['<script>', '<style>', '<css>', '<link>'],
                correctAnswer: '<style>'
            }
        ],
        'sql-query-quiz': [
            {
                question: 'Which SQL keyword is used to extract data from a database?',
                options: ['GET', 'OPEN', 'SELECT', 'EXTRACT'],
                correctAnswer: 'SELECT'
            },
            {
                question: 'Which SQL statement is used to update data in a database?',
                options: ['MODIFY', 'SAVE', 'UPDATE', 'CHANGE'],
                correctAnswer: 'UPDATE'
            },
            {
                question: 'Which SQL keyword is used to sort the result-set?',
                options: ['SORT BY', 'ORDER BY', 'ARRANGE BY', 'SEQUENCE BY'],
                correctAnswer: 'ORDER BY'
            },
            {
                question: 'What does SQL stand for?',
                options: ['Structured Query Language', 'Standard Question Language', 'Simple Query Logic', 'Sequential Query Language'],
                correctAnswer: 'Structured Query Language'
            },
            {
                question: 'Which clause is used to filter records?',
                options: ['SORT', 'FILTER', 'WHERE', 'HAVING'],
                correctAnswer: 'WHERE'
            }
        ],
        'javascript-dom-quiz': [
            {
                question: 'Which HTML element do we put the JavaScript in?',
                options: ['<js>', '<script>', '<javascript>', '<src>'],
                correctAnswer: '<script>'
            },
            {
                question: 'Where is the correct place to insert a JavaScript?',
                options: ['The <head> section', 'The <body> section', 'Both the <head> and the <body> section are correct', 'The <footer> section'],
                correctAnswer: 'Both the <head> and the <body> section are correct'
            },
            {
                question: 'How do you write "Hello World" in an alert box?',
                options: ['msg("Hello World");', 'alert("Hello World");', 'msgBox("Hello World");', 'console.log("Hello World");'],
                correctAnswer: 'alert("Hello World");'
            },
            {
                question: 'How do you call a function named "myFunction"?',
                options: ['call myFunction()', 'myFunction()', 'call function myFunction()', 'run myFunction()'],
                correctAnswer: 'myFunction()'
            },
            {
                question: 'How do you add a comment in JavaScript?',
                options: ['# This is a comment', '// This is a comment', '/* This is a comment */', 'Both // and /* */ are correct'],
                correctAnswer: 'Both // and /* */ are correct'
            }
        ]
    };

    // --- Quiz Data (unchanged) ---
    const quizzes = [
        {
            id: 'python-basics-quiz',
            title: 'Python Basics Quiz',
            description: 'Test your understanding of fundamental Python concepts.',
            questions: 5,
            difficulty: 'Easy',
            topic: 'Python',
            colorClass: 'bg-yellow-50',
            textColorClass: 'text-yellow-700',
            buttonColorClass: 'bg-yellow-600 hover:bg-yellow-700',
            questionsDataId: 'python-basics-quiz'
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
    ];

    function renderQuizzes() {
        if (!quizzesContainer) return;
        quizzesContainer.innerHTML = '';

        quizzes.forEach(quiz => {
            const quizCard = document.createElement('div');
            quizCard.className = `${quiz.colorClass} p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between`;
            quizCard.innerHTML = `
                <div>
                    <h3 class="text-xl font-semibold ${quiz.textColorClass} mb-2">${quiz.title}</h3>
                    <p class="text-gray-600 mb-4">${quiz.description}</p>
                    <div class="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <span>Questions: <span class="font-medium">${quiz.questions}</span></span>
                        <span>Difficulty: <span class="font-medium">${quiz.difficulty}</span></span>
                    </div>
                </div>
                <button class="start-quiz-btn ${quiz.buttonColorClass} text-white py-2 px-4 rounded-md transition duration-300 mt-4" data-quiz-id="${quiz.id}">Start Quiz</button>
            `;
            quizzesContainer.appendChild(quizCard);
        });
    }

    function renderQuizStart(quizId) {
        currentQuiz = quizzes.find(q => q.id === quizId);
        if (!currentQuiz || !quizStartContent) {
            console.error('Quiz not found or quiz start container missing.');
            return;
        }

        quizStartContent.innerHTML = `
            <h2 class="text-4xl font-extrabold ${currentQuiz.textColorClass} mb-4">${currentQuiz.title}</h2>
            <p class="text-lg text-gray-700 mb-6">${currentQuiz.description}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-gray-800">
                <p><strong>Questions:</strong> <span class="font-medium">${currentQuiz.questions}</span></p>
                <p><strong>Difficulty:</strong> <span class="font-medium">${currentQuiz.difficulty}</span></p>
                <p><strong>Topic:</strong> <span class="font-medium">${currentQuiz.topic}</span></p>
                <p><strong>Time Limit:</strong> <span class="font-medium">N/A (no time limit for now)</span></p>
            </div>
            <p class="text-gray-700 text-center text-xl font-semibold mb-8">Are you ready to test your knowledge?</p>
            <div class="text-center">
                <button id="begin-quiz-btn" class="${currentQuiz.buttonColorClass} text-white py-3 px-6 rounded-md hover:opacity-90 transition duration-300 text-xl font-semibold">Begin Quiz</button>
            </div>
        `;
        showSection('quiz-start');

        const beginQuizBtn = document.getElementById('begin-quiz-btn');
        if (beginQuizBtn) {
            beginQuizBtn.addEventListener('click', startQuiz);
        }
    }

    if (quizzesContainer) {
        quizzesContainer.addEventListener('click', function(event) {
            const button = event.target.closest('.start-quiz-btn');
            if (button) {
                const quizId = button.dataset.quizId;
                renderQuizStart(quizId);
            }
        });
    }

    // --- Quiz Play & Result Logic ---

    function startQuiz() {
        console.log("Starting quiz:", currentQuiz.title);
        currentQuestionIndex = 0; // Reset for new quiz
        userScore = 0; // Reset score for new quiz
        showSection('quiz-play'); // Show the quiz play section
        // NEW: Display the quiz title in the quiz play section
        if (quizTitleDisplay && currentQuiz) {
            quizTitleDisplay.textContent = currentQuiz.title;
        }
        renderQuestion(); // Render the first question
    }

    function renderQuestion() {
        if (!currentQuiz || !quizQuestionsData[currentQuiz.questionsDataId]) {
            console.error('Quiz data not found for current quiz.');
            return;
        }

        const questions = quizQuestionsData[currentQuiz.questionsDataId];
        if (currentQuestionIndex >= questions.length) {
            // All questions answered, go to results
            endQuiz();
            return;
        }

        const question = questions[currentQuestionIndex];
        quizQuestionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        quizQuestionContainer.textContent = question.question;
        quizOptionsContainer.innerHTML = ''; // Clear previous options

        // Shuffle options (optional, but good for quizzes)
        const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);

        shuffledOptions.forEach(option => {
            const optionBtn = document.createElement('button');
            // Added 'relative' and 'overflow-hidden' for potential future visual effects
            optionBtn.className = 'w-full bg-blue-100 text-blue-800 p-4 rounded-md mb-3 text-left hover:bg-blue-200 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 option-btn relative overflow-hidden';
            optionBtn.textContent = option;
            optionBtn.dataset.option = option; // Store option text for checking answer
            quizOptionsContainer.appendChild(optionBtn);
        });

        // NEW: Update Next Question button text based on whether it's the last question
        if (currentQuestionIndex === questions.length - 1) {
            nextQuestionBtn.textContent = 'Finish Quiz';
        } else {
            nextQuestionBtn.textContent = 'Next Question →';
        }
        nextQuestionBtn.classList.add('hidden'); // Hide until an option is chosen
    }

    function handleAnswerSelection(event) {
        const selectedButton = event.target.closest('.option-btn');
        if (!selectedButton) return;

        // Ensure current question is valid
        const currentQuestion = quizQuestionsData[currentQuiz.questionsDataId][currentQuestionIndex];
        if (!currentQuestion) return;

        // Disable all option buttons after selection
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            btn.classList.remove('hover:bg-blue-200');
        });

        const selectedOption = selectedButton.dataset.option;

        if (selectedOption === currentQuestion.correctAnswer) {
            userScore++;
            selectedButton.classList.add('bg-green-200', 'border-2', 'border-green-500');
        } else {
            selectedButton.classList.add('bg-red-200', 'border-2', 'border-red-500');
            // Show the correct answer
            document.querySelectorAll('.option-btn').forEach(btn => {
                if (btn.dataset.option === currentQuestion.correctAnswer) {
                    btn.classList.add('bg-green-200', 'border-2', 'border-green-500');
                }
            });
        }
        nextQuestionBtn.classList.remove('hidden'); // Show next button
    }

    if (quizOptionsContainer) {
        quizOptionsContainer.addEventListener('click', handleAnswerSelection);
    }

    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', function() {
            currentQuestionIndex++;
            renderQuestion();
        });
    }

    function endQuiz() {
        showSection('quiz-result');
        if (quizScoreDisplay && currentQuiz) {
            const totalQuestions = quizQuestionsData[currentQuiz.questionsDataId].length;
            quizScoreDisplay.textContent = `You scored ${userScore} out of ${totalQuestions}!`;
            // NEW: Give simple feedback based on score
            if (userScore === totalQuestions) {
                quizScoreDisplay.textContent += " Excellent work!";
                quizScoreDisplay.classList.remove('text-red-800');
                quizScoreDisplay.classList.add('text-green-800');
            } else if (userScore >= totalQuestions / 2) {
                quizScoreDisplay.textContent += " Good effort!";
                quizScoreDisplay.classList.remove('text-red-800', 'text-green-800');
                quizScoreDisplay.classList.add('text-orange-800');
            } else {
                quizScoreDisplay.textContent += " Keep practicing!";
                quizScoreDisplay.classList.remove('text-green-800', 'text-orange-800');
                quizScoreDisplay.classList.add('text-red-800');
            }
        }
    }

    if (retakeQuizBtn) {
        retakeQuizBtn.addEventListener('click', function() {
            startQuiz();
        });
    }
    if (backToQuizListBtn) {
        backToQuizListBtn.addEventListener('click', function() {
            showSection('quizzes');
        });
    }

    // --- Initial Load Logic ---
    renderCourses();
    renderQuizzes();

    const initialSection = window.location.hash ? window.location.hash.substring(1) : 'home';
    showSection(initialSection);
});
