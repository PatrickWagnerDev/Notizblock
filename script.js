// To-Dos:

// display notes
// -> I need notes
let notes = ["banana", "rasen mähen"];

// -> when should they be displayed?
function renderNotes() {
    // -> I need to define where they should be displayed
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = notes;
}

// add notes
// delete notes
// archive notes