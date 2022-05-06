/**
    editro.js -- a KISS web-based code editor.

    @author mksawka (github.com/mksawka)
    @version 0.2.1
*/

// TODO:
// znak kursora @range.insertNode();
// na dole ekranu liczba znaków i linii

function initEditro(editorScreen) {

    const version = '0.2.1';
    const welcomeMsg = document.querySelector('.welcome-msg');
    
    /* Set version number in welcome message. */
    document.querySelector('#ver').textContent = version;

    function hideWelcomeMsg() {
        welcomeMsg.style.display = 'none';
    }

    function showEditorScreen() {
        editorScreen.style.display = 'block';
    }

    function startEditing() {
        hideWelcomeMsg();
        showEditorScreen();
        editorScreen.focus();
    }

    function doSyntaxHL(editorScreen) {
        const lines = editorScreen.children;
        for (const line of lines) {
            const txtAfterSyntaxHL = line.innerText.replace(/\b(new|if|else|do|while|switch|for|in|of|continue|break|return|typeof|function|var|const|let|\.length|\.\w+)(?=[^\w])/g, "<strong>$1</strong>");
            line.innerHTML = txtAfterSyntaxHL;
        }
    }

    /**
        Get caret position inside given element.

        From @link https://developer.mozilla.org/en-US/docs/Web/API/Range
        range.endContainer - returns the Node within which the range ends.
        range.endOffset - returns a number representing where in the endContainer the range ends.
        range.toString() - returns text in that range.
    */
    function getCaretPosition(element) {
        const range = new Range();
        range.selectNodeContents(element);
        range.setEnd(range.endContainer, range.endOffset);
        return range.toString().length;
    }

    /**
        Set caret position inside given element, on given position.
    */
    function setCaretPosition(position, element) {
        // Code.
    }

    window.addEventListener("load", () => {
        /* 
            When user start typing.
        */
        window.addEventListener('keydown', startEditing, { once: true });
        screen.addEventListener('keyup', () => {
                const pos = getCaretPosition(editorScreen);
                doSyntaxHL(editorScreen);
                console.log(`Caret pos: ${pos}`);
                setCaretPosition(pos, editorScreen);
        });
    });
}

const screen = document.querySelector('.editor__screen');
initEditro(screen);