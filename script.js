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
        <h3>Title: ${notesTitle[note]}</h3>
        <p>+ ${notes[note]} <button onclick="pushToArchiv(${note})">X</button></p>
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
function pushToArchiv(indexNote) {
    // -> which note needs to be deleted?
    let trashNote = notes.splice(indexNote, 1);
    trashNotes.push(trashNote[0]);
    let trashNoteTitle = notesTitle.splice(indexNote, 1);
    trashNotesTitle.push(trashNoteTitle[0]);
    // -> when should the note be deleted? -> done

    // -> update the display
    renderNotes();
    renderTrashNotes();
}

// archive notes
let trashNotes = [];

function renderTrashNotes() {
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";

    for (let i = 0; i < trashNotes.length; i++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(i);
    }

}

function getTrashNoteTemplate(note) {
    return /*html*/`
        <h3>Title: ${trashNotesTitle[note]}</h3>
        <p>+ ${trashNotes[note]} <button onclick="deleteNote(${note})">X</button> <button onclick="recoverNote(${note})">+</button></p>
    `;
}

function deleteNote(indexNote) {
    trashNotes.splice(indexNote, 1);
    trashNotesTitle.splice(indexNote, 1);
    renderTrashNotes();
}

function recoverNote(indexNote) {
    let note = trashNotes.splice(indexNote, 1);
    notes.push(note);
    let noteTitle = trashNotesTitle.splice(indexNote, 1);
    notesTitle.push(noteTitle);
    renderNotes();
    renderTrashNotes();
}

// add Notes title
let notesTitle = ['ba', 'Aufgabe'];
let trashNotesTitle = [];