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

const EDITRO_VERSION = '0.1.0';

//  Prevent keyboardParser from printing these chars.
const UNPRINTABLE_CHARS = [
    'Enter',
    'Backspace',
    'Tab',
    'Shift',
    'Control',
    'Alt',
    'AltGraph',
    'Pause',
    'CapsLock',
    'Escape',
    'PageUp',
    'PageDown',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'PrintScreen',
    'Insert',
    'Delete',
    'Meta',
    'ContextMenu',
    'NumLock',
    'ScrollLock',
    'AudioVolumeMute',
    'AudioVolumeDown',
    'AudioVolumeUp',
    'LaunchMediaPlayer',
    'LaunchApplication2',
    'LaunchApplication2',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
    'OS',
];


//  Editor interface DOM elements.

const WELCOME_MSG = document.querySelector('.welcome-msg');
const VERSION_DISPLAY = document.querySelector('#ver');
const EDITOR_SCREEN = document.querySelector('.editor__screen');
const INPUT_LINES = [];
const CURSOR = createCursor();


//  Set version number in welcome message.
VERSION_DISPLAY.textContent = EDITRO_VERSION;

function getCurrentLine() {
    return document.querySelector('#current-line');
}

function setCurrentLine(line) {
    clearLinesHL();
    line.id = 'current-line';
    setCursor();
}

function createCursor() {
    const cursor = document.createElement('div');
    cursor.id = 'cursor';
    return cursor;
}

function hideWelcomeMsg() {
    WELCOME_MSG.style.display = 'none';
}

function showEditorScreen() {
    EDITOR_SCREEN.style.display = 'block';
}

function setCursor() {
    CURSOR.remove();
    getCurrentLine().appendChild(CURSOR);
}

function insertNewLine() {
    const line = document.createElement('div');
    clearLinesHL();
    line.id = 'current-line';
    INPUT_LINES.push(line);
    EDITOR_SCREEN.appendChild(line);
    setCursor();
}

function initEdit() {
    hideWelcomeMsg();
    showEditorScreen();
    insertNewLine();
}

function clearLinesHL() {
    for (let line of INPUT_LINES) line.id = '';
}

function removeCurrentLine() {
    if (EDITOR_SCREEN.childElementCount > 1) {
        getCurrentLine().remove();
    } 
}

function jumpToPrevLine() {
    const prevLine = getCurrentLine().previousElementSibling;
    removeCurrentLine();
    if (prevLine !== null) setCurrentLine(prevLine);
}

function insertChar(keyEvent) {
    const char = document.createElement('span');
    char.classList.add('char');
    char.textContent += keyEvent.key;
    getCurrentLine().insertBefore(char, CURSOR);
}

function deleteChar() {
    if (CURSOR.previousElementSibling !== null) {
        CURSOR.previousElementSibling.remove();
    } else {
        jumpToPrevLine();
    }
}



function keyboardParser(keyEvent) {
    if (keyEvent.key === 'Enter') insertNewLine();
    if (keyEvent.key === 'Backspace') deleteChar();
    if (!UNPRINTABLE_CHARS.includes(keyEvent.key)) {
            insertChar(keyEvent);
    }
}

window.addEventListener("load", () => {
    //  When user begin typing.
    window.addEventListener('keydown', initEdit, { once: true });
    window.addEventListener('keydown', (event) => {
        keyboardParser(event);
    });
});