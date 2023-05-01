const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');
const imageContainer = document.querySelector('#image_container');

let loadInterval;

async function handleSubmit(e) {
  e.preventDefault();

  const data = new FormData(form);

  const prompt = data.get('prompt');
  const theme = data.get('theme');
  const resolution = data.get('resolution');
  const format = data.get('format');

  const message = `Please create a seamless, tiling texture with the following specifications:
- Theme: ${theme}
- Resolution: ${resolution}
- Format: ${format}
${prompt}`;

  const response = await fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: message,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    const imageUrl = data.imageUrl;
    imageContainer.innerHTML = `<img src="${imageUrl}" alt="Generated texture" />`;
  } else {
    const err = await response.text();
    alert(err);
  }
}

form.addEventListener('submit', handleSubmit);
