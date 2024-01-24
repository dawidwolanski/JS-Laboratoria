let notes = JSON.parse(localStorage.getItem('notes')) || [];
// local storage

function displayNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.style.backgroundColor = note.color;
//kolor
        const pinned = note.pin ? 'Pinned' : '';
//pin
        noteElement.innerHTML = `
            <h2>${note.title} - ${pinned}</h2>
            <p>${note.content}</p>
            <p>Tags: ${note.tags.join(', ')}</p>
            <p>Created: ${new Date(note.createdAt).toLocaleString()}</p>
            <button onclick="deleteNote(${index})">Usuń</button>
        `;
//dodaj
        notesList.appendChild(noteElement);
    });
}

//wypełnianie danymi
function addNote() {
    const title = document.getElementById('titleInput').value;
    const content = document.getElementById('contentInput').value;
    const color = document.getElementById('colorInput').value;
    const pin = document.getElementById('pinInput').checked;
    const tags = document.getElementById('tagsInput').value.split(',').map(tag => tag.trim());
    const createdAt = Date.now();

    const newNote = {
        title,
        content,
        color,
        pin,
        tags,
        createdAt
    };

    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));

    displayNotes();
}


function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}
//poprawione usuwanie 

function searchNotes() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
//pobieranie wartosci

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchValue) ||
        note.content.toLowerCase().includes(searchValue) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchValue))
    );

    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    filteredNotes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.style.backgroundColor = note.color;

        const pinned = note.pin ? 'Pinned' : '';

        noteElement.innerHTML = `
            <h2>${note.title} - ${pinned}</h2>
            <p>${note.content}</p>
            <p>Tags: ${note.tags.join(', ')}</p>
            <p>Created: ${new Date(note.createdAt).toLocaleString()}</p>
            <button onclick="deleteNote(${notes.indexOf(note)})">Usuń</button>
        `;

        notesList.appendChild(noteElement);
    });
}


displayNotes();