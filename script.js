let allNotes = {
    'notesTitle':['ba', 'Aufgabe'],
    'notes':["banana", "rasen mähen"],
    'trashNotesTitle':[],
    'trashNotes':[]
}

function init() {
    getNotesFromLocalStorage();
    getTrashNotesFromLocalStorage();
    renderNotes();
    renderTrashNotes();
}

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let i = 0; i < allNotes.notes.length; i++) {
        contentRef.innerHTML += getNoteTemplate(i);
    }
}

function renderTrashNotes() {
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";

    for (let i = 0; i < allNotes.trashNotes.length; i++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(i);
    }
}

function getNoteTemplate(note) {
    return /*html*/`
        <h3>Title: ${allNotes.notesTitle[note]}</h3>
        <p>+ ${allNotes.notes[note]} <button onclick="moveNote(${note}, 'notes', 'trashNotes')">X</button></p>
    `;
}

function getTrashNoteTemplate(note) {
    return /*html*/`
        <h3>Title: ${allNotes.trashNotesTitle[note]}</h3>
        <p>+ ${allNotes.trashNotes[note]} <button onclick="deleteNote(${note})">X</button> <button onclick="moveNote(${note}, 'trashNotes', 'notes')">+</button></p>
    `;
}

function addNote() {
    let noteInputRef = document.getElementById('note_input');
    let noteInput = noteInputRef.value;
    allNotes.notes.push(noteInput);
    saveNotesToLocalStorage();
    renderNotes();
    noteInputRef.value = "";
}


function moveNote(indexNote, startKey, destinationKey) {
    let note = allNotes[startKey].splice(indexNote, 1);
    allNotes[destinationKey].push(note[0]);
    let noteTitle = allNotes[startKey + "Title"].splice(indexNote, 1);
    allNotes[destinationKey + "Title"].push(noteTitle[0]);

    localStorage.setItem("notes", JSON.stringify(allNotes.notes));
    localStorage.setItem("notesTitle", JSON.stringify(allNotes.notesTitle));
    localStorage.setItem("trashNotes", JSON.stringify(allNotes.trashNotes));
    localStorage.setItem("trashNotesTitle", JSON.stringify(allNotes.trashNotesTitle));
    renderNotes();
    renderTrashNotes();
}

function deleteNote(indexNote) {
    allNotes.trashNotes.splice(indexNote, 1);
    allNotes.trashNotesTitle.splice(indexNote, 1);
    localStorage.setItem("trashNotes", JSON.stringify(allNotes.trashNotes));
    localStorage.setItem("trashNotesTitle", JSON.stringify(allNotes.trashNotesTitle));
    renderTrashNotes();
}

function saveNotesToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(allNotes.notes));
    localStorage.setItem("notesTitle", JSON.stringify(allNotes.notesTitle));
    localStorage.setItem("trashNotes", JSON.stringify(allNotes.trashNotes));
    localStorage.setItem("trashNotesTitle", JSON.stringify(allNotes.trashNotesTitle));
}

function getNotesFromLocalStorage() {
    let myArray = JSON.parse(localStorage.getItem("notes"));
    let myTitleArray = JSON.parse(localStorage.getItem("notesTitle"));

    if (myArray != null) {
        allNotes.notes = myArray;
        allNotes.notesTitle = myTitleArray;
    }
}

function getTrashNotesFromLocalStorage() {
    let myArray = JSON.parse(localStorage.getItem("trashNotes"));
    let myTitleArray = JSON.parse(localStorage.getItem("trashNotesTitle"));

    if (myArray != null) {
        allNotes.trashNotes = myArray;
        allNotes.trashNotesTitle = myTitleArray;
    }
}