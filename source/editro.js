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

const CURRENT_VERSION = '0.0.1';
const INPUT_LINES = [];
const UNPRINTABLE_CHARS = [
    // Prevent keyboardParser from printing these chars:
    'Enter',
    'Backspace',
    'Tab',
    'Shift',
    'Control',
    'Alt',
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
];



/*
 *
 *  Editor interface DOM elements.
 *
 */

const WELCOME_MSG = document.querySelector('.welcome-msg');
const VERSION_DISPLAY = document.querySelector('#ver');
const EDITOR_SCREEN = document.querySelector('.editor__screen');
const CURSOR = createCursor();


// Set version number in welcome message.
VERSION_DISPLAY.textContent = CURRENT_VERSION;

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

function initEdit() {
    hideWelcomeMsg();
    showEditorScreen();
    insertNewLine();
}

function clearCurrentLn() {
    for (let ln of INPUT_LINES) ln.id = '';
}

function insertNewLine() {
    const line = document.createElement('div');
    clearCurrentLn();
    line.id = 'current-line';
    INPUT_LINES.push(line);
    EDITOR_SCREEN.appendChild(line);
}

function insertChar(keyEvent) {
    const currentLine = document.querySelector('#current-line');
    currentLine.textContent += keyEvent.key;
}

function deleteChar() {
    const currentLine = document.querySelector('#current-line');
    currentLine.textContent = '';
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
