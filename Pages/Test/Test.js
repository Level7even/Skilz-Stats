window.addEventListener('DOMContentLoaded', function() {
  // Wait for the DOM to be fully loaded
  var upperLeftElement = document.getElementById('UpperLeft'); // Select the UpperLeft element
  
  if (upperLeftElement) { // Check if the element exists
    fetch('https://www.example.com/page.html') // Load the contents of https://www.example.com/page.html
      .then(response => response.text())
      .then(data => {
        upperLeftElement.innerHTML = data; // Set the content of UpperLeft element with the loaded data
      })
      .catch(error => {
        console.error('Failed to fetch page.html:', error);
      });
  }

  console.log('TESTING') // Move this inside the event listener block
});





