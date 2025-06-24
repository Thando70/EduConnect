# Agent Instructions for EduConnect Repository

This document provides guidance for AI agents working on the EduConnect codebase.

## Project Overview

EduConnect is a client-side web application for an educational platform. It features course listings, interactive quizzes, and basic page navigation. The primary technologies are HTML, CSS (Tailwind CSS), and vanilla JavaScript.

## Coding Conventions

*   **JavaScript**:
    *   Follow standard modern JavaScript (ES6+) practices.
    *   Use JSDoc for documenting functions, especially public-facing or complex ones. Example:
        ```javascript
        /**
         * Brief description of the function.
         * @param {string} paramName - Description of the parameter.
         * @returns {boolean} Description of the return value.
         */
        function exampleFunction(paramName) {
            // ...
            return true;
        }
        ```
    *   Keep JavaScript organized. The `script.js` file is structured into logical sections (DOM elements, state, data, navigation, courses, quizzes, initialization). Maintain this organization.
    *   Prefer `const` for variables that are not reassigned, and `let` for variables that are.
    *   Use strict equality (`===` and `!==`) over loose equality (`==` and `!=`).
    *   Ensure error handling is considered, especially for DOM manipulations and data access (even if data is currently local).
*   **HTML**:
    *   Use semantic HTML5 tags where appropriate (`<nav>`, `<main>`, `<section>`, `<article>`, etc.).
    *   Ensure accessibility best practices (e.g., `alt` attributes for images, `aria-labels` for icon buttons or non-descriptive interactive elements).
    *   Maintain clean and readable HTML structure.
*   **CSS**:
    *   This project uses Tailwind CSS extensively. Prioritize using Tailwind utility classes for styling.
    *   The `style.css` file is for:
        *   Global font imports.
        *   Base HTML element styling (e.g., `font-family`, `scroll-behavior`).
        *   Custom CSS rules that are genuinely difficult or too verbose to achieve with Tailwind utilities.
        *   Minimal overrides of Tailwind, if absolutely necessary.
    *   Keep `style.css` lean.

## Development Environment

*   No complex build setup is currently in place.
*   The application can be run by opening `index.html` in a web browser.
*   Tailwind CSS is included via a CDN link in `index.html`.

## Running the Application

1.  Ensure you have a modern web browser.
2.  Open the `index.html` file directly in the browser.

## Testing

*   Currently, there are no automated tests in this repository.
*   **Manual Testing**: Thoroughly test any changes in major browsers (Chrome, Firefox, Safari, Edge).
    *   Verify navigation between all sections.
    *   Check rendering of course lists and details.
    *   Test full quiz functionality: starting a quiz, selecting answers, progressing through questions, viewing results, retaking a quiz, and navigating back.
    *   Ensure responsive design by testing on different screen sizes.
*   If you add new features, consider if manual testing steps need to be updated or if simple unit tests could be introduced (though setting up a test runner is out of scope for minor changes unless specified).

## Committing Changes

*   Follow conventional commit message formats if possible (e.g., `feat: Add dark mode toggle`, `fix: Correct quiz scoring logic`).
*   Ensure your code is well-formatted and linted (even if no formal linter is set up, adhere to common style guides).

## Future Considerations (For Agent Awareness)

*   The data for courses and quizzes is currently hardcoded in `script.js`. Future work might involve fetching this data from an API.
*   User profiles and progress tracking are placeholder sections and would require significant backend and frontend work.
*   A build system (e.g., Vite, Webpack) and a JavaScript framework/library (e.g., React, Vue, Svelte) might be introduced in the future for more complex features.

By following these guidelines, you can help maintain the quality and consistency of the EduConnect codebase.
