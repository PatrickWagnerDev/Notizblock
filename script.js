let notes = ["banana", "rasen mähen"];
let trashNotes = [];
let notesTitle = ['ba', 'Aufgabe'];
let trashNotesTitle = [];

function init() {
    getNotesFromLocalStorage();
    getTrashNotesFromLocalStorage();
    renderNotes();
    renderTrashNotes();
}

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
    saveNotesToLocalStorage();
    renderNotes();
    noteInputRef.value = "";
}

function pushToArchiv(indexNote) {
    let trashNote = notes.splice(indexNote, 1);
    trashNotes.push(trashNote[0]);
    let trashNoteTitle = notesTitle.splice(indexNote, 1);
    trashNotesTitle.push(trashNoteTitle[0]);
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("notesTitle", JSON.stringify(notesTitle));
    saveTrashNotesToLocalStorage();
    renderNotes();
    renderTrashNotes();
}

function deleteNote(indexNote) {
    trashNotes.splice(indexNote, 1);
    trashNotesTitle.splice(indexNote, 1);
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
    localStorage.setItem("trashNotesTitle", JSON.stringify(trashNotesTitle));
    renderTrashNotes();
}

function recoverNote(indexNote) {
    let note = trashNotes.splice(indexNote, 1);
    notes.push(note[0]);
    let noteTitle = trashNotesTitle.splice(indexNote, 1);
    notesTitle.push(noteTitle[0]);
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("notesTitle", JSON.stringify(notesTitle));
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
    localStorage.setItem("trashNotesTitle", JSON.stringify(trashNotesTitle));
    renderNotes();
    renderTrashNotes();
}

function saveNotesToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("notesTitle", JSON.stringify(notesTitle));
}

function saveTrashNotesToLocalStorage() {
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
    localStorage.setItem("trashNotesTitle", JSON.stringify(trashNotesTitle));
}

function getNotesFromLocalStorage() {
    let myArray = JSON.parse(localStorage.getItem("notes"));
    let myTitleArray = JSON.parse(localStorage.getItem("notesTitle"));

    if (myArray != null) {
        notes = myArray;
        notesTitle = myTitleArray;
    }
}

function getTrashNotesFromLocalStorage() {
    let myArray = JSON.parse(localStorage.getItem("trashNotes"));
    let myTitleArray = JSON.parse(localStorage.getItem("trashNotesTitle"));

    if (myArray != null) {
        trashNotes = myArray;
        trashNotesTitle = myTitleArray;
    }
}