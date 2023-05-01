const form = document.querySelector('form');
const imageContainer = document.querySelector('#image_container');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const prompt = formData.get('prompt');

  try {
    const response = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const imageUrl = data.data[0].url;
      imageContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
    } else {
      const err = await response.text();
      imageContainer.innerHTML = '<p>Something went wrong</p>';
      console.error(err);
    }
  } catch (error) {
    console.error(error);
  }
});
