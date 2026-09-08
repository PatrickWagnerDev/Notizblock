// To-Dos:

// display notes
// -> I need notes
let notes = ["banana", "rasen mähen"];

// -> when should they be displayed?
function renderNotes() {
    // -> I need to define where they should be displayed
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let i = 0; i < notes.length; i++) {
        contentRef.innerHTML += getNoteTemplate(i);
    }

}

function getNoteTemplate(note) {
    return /*html*/`
        <p>+ ${notes[note]} <button onclick="deleteNote(${note})">X</button></p>
    `;
}

// add notes
function addNote() {
    // -> define user input
    let noteInputRef = document.getElementById('note_input');

    // -> read user input
    let noteInput = noteInputRef.value;

    // -> add input to notes
    notes.push(noteInput);

    // -> show input
    renderNotes();

    noteInputRef.value = "";
}

// delete notes
function deleteNote(indexNote) {
    // -> which note needs to be deleted?
    notes.splice(indexNote, 1);

    // -> when should the note be deleted? -> done

    // -> update the display
    renderNotes();
}

// archive notes