import {addDate} from "./date.js"
import {locallyRetrieveNote, locallyStoreNote} from "./localStorage.js"
import { makeNoteDraggable } from "./drag.js";
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
    //makeNoteDraggable(noteDiv, uniqueId);
}

export function renderNotesList(){
    const stickyNotesData = locallyRetrieveNote();
    const allNotesDiv = document.querySelector(".allNotes>div");
    allNotesDiv.innerHTML = '';
    for (const [uniqueId, note] of Object.entries(stickyNotesData)) {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("notePreview");
        noteDiv.innerHTML = `
            <div class="noteTitle">${note.title}</div>
            <div class="noteDate">${note.date}</div>
        `;
        noteDiv.addEventListener("click", () => {
            console.log(`Clicked on note with ID: ${uniqueId}`);
        });
        allNotesDiv.appendChild(noteDiv);
    }
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
    renderNotesList();
}
