const handleSubmit = async (e) => {
  e.preventDefault()

  const data = new FormData(form)

  const userPrompt = data.get('prompt');
  const imageResolution = data.get('resolution');
  const imageFormat = data.get('format');
  const imageTheme = data.get('theme');

  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, userPrompt)

  // to clear the textarea input 
  form.reset()

  // bot's chatstripe
  const uniqueId = generateUniqueId()
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

  // to focus scroll to the bottom 
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // specific message div 
  const messageDiv = document.getElementById(uniqueId)

  // messageDiv.innerHTML = "..."
  loader(messageDiv)

  const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          prompt: userPrompt,
          resolution: imageResolution,
          format: imageFormat,
          theme: imageTheme
      })
  })

  clearInterval(loadInterval)
  messageDiv.innerHTML = " "

  if (response.ok) {
      const data = await response.blob();
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `image.${imageFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  } else {
      const err = await response.text()

      messageDiv.innerHTML = "Something went wrong"
      alert(err)
  }
}
