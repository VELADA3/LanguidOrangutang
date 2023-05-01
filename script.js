const form = document.querySelector('form');
const imageContainer = document.querySelector('#image_container');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const training = "use tessalating geometry. limit the color pallette to a few complimentary colors when constructing the tessalation. both horizontally or vertically, ensure the colors along the left and right edges match with one another; ensure the colors along the top and bottom edges match with one another; ensure the top and bottom edges line up if placed end to end; ensure the left and right edges line up if placed end to end. do not use text."
  const prompt = "create a seamless, tiling texture from a photo of " + formData.get('prompt') + " in the style of " + formData.get('style') + ". " + training;
  console.log(prompt)

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
