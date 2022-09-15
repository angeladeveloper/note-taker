const noteForm = document.getElementById('note-form');


// fbBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   window.location.href = '/feedback';
// });

const createCard = (note) => {
  // Create card
  const cardEl = document.createElement('div');
  cardEl.classList.add('card', 'mb-3', 'm-3');
  cardEl.setAttribute('key', note.note_id);

  // Create card header
  const cardHeaderEl = document.createElement('h4');
  cardHeaderEl.classList.add(
    'card-header',
    'bg-primary',
    'text-light',
    'p-2',
    'm-0'
  );
  cardHeaderEl.innerHTML = `${note.title} </br>`;

  // Create card body
  const cardBodyEl = document.createElement('div');
  cardBodyEl.classList.add('card-body', 'bg-light', 'p-2');
  cardBodyEl.innerHTML = `<p>${note.text}</p>`;

  // Append the header and body to the card element
  cardEl.appendChild(cardHeaderEl);
  cardEl.appendChild(cardBodyEl);

  // Append the card element to the tips container in the DOM
  // tipsContainer.appendChild(cardEl);
};

// Get a list of existing tips from the server
const getNotes = () =>
  fetch('/api/note', {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error:', error);
    });

// Post a new tip to the page
const postNote = (note) =>
  fetch('/api/notes/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data);
      createCard(note);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

// When the page loads, get all the tips
getNotes().then((data) => data.forEach((note) => createCard(note)));

// Function to validate the tips that were submitted
const validateTip = (newNote) => {
  const { title, text } = newNote;
  // Object to hold our error messages until we are ready to return
  const errorState = {
    title: '',
    text: '',
  };

  // Bool value if the username is valid
  const tTest = title.length >= 1;
  if (!tTest) {
    errorState.username = 'Invalid username!';
  }

  // Bool value to see if the tip being added is at least 15 characters long
  const textTest = text.length > 15;
  if (!textTest) {
    errorState.note = 'Tip must be at least 15 characters';
  }


  const result = {
    isValid: !!(tTest && textTest),
    errors: errorState,
  };

  // Return result object with a isValid boolean and an errors object for any errors that may exist
  return result;
};

// Helper function to deal with errors that exist in the result

const showErrors = (errorObj) => {
  const errors = Object.values(errorObj);
  errors.forEach((error) => {
    if (error.length > 0) {
      alert(error);
    }
  });
};


// Function to handle when a user submits the feedback form
const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log('Form submit invoked');

  // Get the value of the tip and save it to a variable
  const noteTitle = document.getElementById('note-title').value;

  // get the value of the username and save it to a variable
  const noteText = document.getElementById('note-text').value.trim();

  // Create an object with the tip and username
  const newNote = {
    text: noteText,
    title: noteTitle,
  };

  // Run the tip object through our validator function
  const submission = validateTip(newNote);

  // If the submission is valid, post the tip. Otherwise, handle the errors.
  return submission.isValid ? postNote(newNote) : console.log(showErrors(submission.errors));
};

// Listen for when the form is submitted
noteForm.addEventListener('submit', handleFormSubmit);
