const noteForm = document.getElementById('note-form');
// const homeBtn = document.getElementById('home-btn');

// homeBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   window.location.href = '/';
// });

const saveButton = document.getElementById('save-btn');


// Handle when a user submits feedback

if (noteForm) {
  console.log('noteForm exists');
  noteForm
    .addEventListener('submit', (e) => {
      e.preventDefault();

      // Get the feedback text from the DOM and assign it to a variable
      let noteTitle = document.getElementById('note-title').value;
      // Get the username text and add it to a variable
      let noteText = document.getElementById('note-text').value.trim();

      // Create an object with the username and feedback
      const newNote = {
        noteTitle,
        noteText,
      };
      console.log(newNote);
      const postNote = (note) =>
        fetch('/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(note),
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data);
            postNote(newNote);
            createCard(note);
          })
          .catch((error) => {
            console.error('Error:', error);
          })

    })
}
