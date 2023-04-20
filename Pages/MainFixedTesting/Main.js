// Renderer process
const { ipcRenderer } = require("electron");



// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get references to the buttons
  const closeButton = document.getElementById("closeButton");
  const maximizeButton = document.getElementById("maximizeButton");
  const minimizeButton = document.getElementById("minimizeButton");
  const Test1 = document.getElementById("Test1");
  const Test2 = document.getElementById("Test2");
  const Test3 = document.getElementById("Test3");
  const Settings = document.getElementById("SettingButton"); 
  // Add click listeners to the buttons
  closeButton.addEventListener("click", () => {
    ipcRenderer.send("close-window");
  });

  maximizeButton.addEventListener("click", () => {
    ipcRenderer.send("toggle-maximize");
  });

  minimizeButton.addEventListener("click", () => {
    ipcRenderer.send("minimize-window");
  });

  Test1.addEventListener("click", () => {
    ipcRenderer.send("Test1");
  });

  Test2.addEventListener("click", () => {
    ipcRenderer.send("Test2");
  });

  Test3.addEventListener("click", () => {
    ipcRenderer.send("Test3");
  });

  Settings.addEventListener("click", () => {
    ipcRenderer.send("Settings");
  });
});

window.onload = function () {
  var xmlhttp = new XMLHttpRequest();
  var url = "../Test/Test.html";

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      document.getElementById("user-Area").innerHTML = this.responseText;
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

};
