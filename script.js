// Get darkmode checkbox and add event listener
document.getElementById("darkmode").addEventListener("change", function () {
  // Toggle darkmode class on body
  document.querySelector("body").classList.toggle("dark");
});

// Function for authenticating user
function authenticate() {
  // Decalare valid email
  var validEmail = "admin@gmit.com";
  // Decalare valid password
  var validPassword = "iloved3";
  // Get value of email input
  var email = document.getElementById("email").value;
  // Get value of password input
  var password = document.getElementById("password").value;
  // Check if email and password are correct
  if (validEmail === email && validPassword === password) {
    // Allow user to navigate to home page
    return true;
  }
  // Feedback HTML element
  var feedback = document.getElementById("feedback");
  // Set feedback message
  feedback.innerHTML = "Username or password invalid";
  // Prevent user from navigating
  return false;
}
