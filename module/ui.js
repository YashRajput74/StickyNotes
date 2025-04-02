import {addDate} from "./date.js"
import {locallyRetrieveNote, locallyStoreNote} from "./localStorage.js"

export function renderNote([uniqueId, note]){
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.dataset.id = uniqueId;
    const randomTop = Math.floor(Math.random() * 55) + 10;    const randomLeft = Math.floor(Math.random() * 50) + 10;
    noteDiv.style.position = 'absolute';
    noteDiv.style.top = `${randomTop}vh`;
    noteDiv.style.left = `${randomLeft}vw`;
    noteDiv.innerHTML = `
        <div>
            <div contenteditable="true">${note.title}</div>
            <div>${note.date}</div>
        </div>
        <div class="stickyContent" contenteditable="true">${note.content}</div>
        <div>
            <button class="saveBtn">Save</button>
            <button class="deleteBtn">Delete</button>
        </div>
    `;
    document.querySelector("main").appendChild(noteDiv);
}

export function addNewNote(){
    const uniqueId = new Date().getTime();
    const note={
        title: "New Note",
        content: "Add the content of the note here.",
        date: addDate()
    }
    renderNote([uniqueId, note]);
    let stickyNotesData = locallyRetrieveNote();
    stickyNotesData[uniqueId] = note;
    console.log("Notes after adding new one:", stickyNotesData);
    locallyStoreNote(stickyNotesData);
}