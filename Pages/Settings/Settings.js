const { ipcRenderer } = require('electron');
const fs = require("fs");

const form = document.querySelector("#color-form");
const colorSelectorsContainer = document.querySelector(".color-selectors");
// Load colors from settings.json file
fs.readFile("settings.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const settings = JSON.parse(data);
  if (settings.colors) {
    const colors = settings.colors;
    for (let key in colors) {
      const colorSelector = document.createElement("div");
      colorSelector.className = "color-selector";
      const colorText = document.createElement("div");
      colorText.className = "ColorText";
      colorText.innerText = `${key}: `;
      const colorInput = document.createElement("input");
      colorInput.type = "color";
      colorInput.value = colors[key];
      const selectedColor = document.createElement("div");
      selectedColor.className = "selected-color";
      selectedColor.style.backgroundColor = colors[key];
      colorSelectorsContainer.appendChild(colorSelector);
      colorSelector.appendChild(colorText);
      colorSelector.appendChild(colorInput);
      colorSelector.appendChild(selectedColor);
    }
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  // Save selected colors to settings.json file
  fs.readFile("./settings.json", "utf8", (err, fileData) => {
    if (err) {
      console.error(err);
      return;
    }
    const settings = JSON.parse(fileData);
    settings.colors = data;
    fs.writeFile("./settings.json", JSON.stringify(settings), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Colors saved to settings.json file");
      // Send message to main process to reload the settings
      ipcRenderer.send("reload-settings");
    });
  });
});


//document.addEventListener("DOMContentLoaded", () => {



// Settings.js

// Get the slider elements by their IDs
const mainSlider = document.getElementById("slider-main");
const sfxSlider = document.getElementById("slider-sfx");

// Add event listeners to the sliders
mainSlider.addEventListener("input", handleMainSliderChange);
sfxSlider.addEventListener("input", handleSfxSliderChange);

// Define event handler functions for the sliders
function handleMainSliderChange(event) {
  const sliderValue = event.target.value;
  ipcRenderer.send(`Main Slider value changed: ${sliderValue}`);
}

function handleSfxSliderChange(event) {
  const sliderValue = event.target.value;
  ipcRenderer.send(`SFX Slider value changed: ${sliderValue}`);
}
//});