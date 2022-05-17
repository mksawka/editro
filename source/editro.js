/*
 *
 *  editro.js - a code editor.
 *  Main module.
 *
 */



/*
 *
 *  Global constants.
 *
 */
const CURRENT_VERSION = '0.0.03';

//  Editor interface DOM elements.
const WELCOME_MSG = document.querySelector('.welcome-msg');
const VERSION_DISPLAY = document.querySelector('#ver');
const EDITOR_SCREEN = document.querySelector('.editor__screen');



//  Set version number in welcome message.
VERSION_DISPLAY.textContent = CURRENT_VERSION;

function hideWelcomeMsg() {
    WELCOME_MSG.style.display = 'none';
}

function showEditorScreen() {
    EDITOR_SCREEN.style.display = 'block';
}

function startEditing() {
    hideWelcomeMsg();
    showEditorScreen();
    EDITOR_SCREEN.focus();
}



window.addEventListener("load", () => {
    //  When user begin typing.
    window.addEventListener('keydown', startEditing, { once: true });
});