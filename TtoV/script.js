const dropdown = document.getElementById('dropdown');
const listenButton = document.getElementById('listen-button');

// Populate dropdown with available voices
function populateVoiceList() {
  if (typeof speechSynthesis === 'undefined') {
    return;
  }

  let voices = speechSynthesis.getVoices();
  if (voices.length === 0) {
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices();
      populateDropdown(voices);
    };
  } else {
    populateDropdown(voices);
  }
}

function populateDropdown(voices) {
  const uniqueLanguages = [...new Set(voices.map(voice => `${voice.name} (${voice.lang})`))]; // Get unique voices

  dropdown.innerHTML = uniqueLanguages
    .map(lang => `<option value="${lang}">${lang}</option>`)
    .join('');
}

// Event listener for the listen button
listenButton.addEventListener('click', () => {
  const text = document.getElementById('textbox').value;
  const selectedVoiceName = dropdown.value;
  const utterance = new SpeechSynthesisUtterance(text);

  // Find the appropriate voice
  const voice = speechSynthesis.getVoices().find(voice => `${voice.name} (${voice.lang})` === selectedVoiceName);
  if (voice) {
    utterance.voice = voice;
  }

  speechSynthesis.speak(utterance);
});

// Populate the voice list when the voices are loaded
populateVoiceList();