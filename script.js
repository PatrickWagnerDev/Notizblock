let notes = ["banana", "rasen mähen"];
let trashNotes = [];
let notesTitle = ['ba', 'Aufgabe'];
let trashNotesTitle = [];

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let i = 0; i < notes.length; i++) {
        contentRef.innerHTML += getNoteTemplate(i);
    }
}

function renderTrashNotes() {
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";

    for (let i = 0; i < trashNotes.length; i++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(i);
    }
}

function getNoteTemplate(note) {
    return /*html*/`
        <h3>Title: ${notesTitle[note]}</h3>
        <p>+ ${notes[note]} <button onclick="pushToArchiv(${note})">X</button></p>
    `;
}

function getTrashNoteTemplate(note) {
    return /*html*/`
        <h3>Title: ${trashNotesTitle[note]}</h3>
        <p>+ ${trashNotes[note]} <button onclick="deleteNote(${note})">X</button> <button onclick="recoverNote(${note})">+</button></p>
    `;
}

function addNote() {
    let noteInputRef = document.getElementById('note_input');
    let noteInput = noteInputRef.value;
    notes.push(noteInput);
    renderNotes();
    noteInputRef.value = "";
}

function pushToArchiv(indexNote) {
    let trashNote = notes.splice(indexNote, 1);
    trashNotes.push(trashNote[0]);
    let trashNoteTitle = notesTitle.splice(indexNote, 1);
    trashNotesTitle.push(trashNoteTitle[0]);
    renderNotes();
    renderTrashNotes();
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