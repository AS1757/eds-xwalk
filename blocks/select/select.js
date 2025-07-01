async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Response status: ${error.status}`);
  }
}

export default function decorate(block) {
  const optionsURL = block.children[0].querySelector('a')?.href;
  const selectElement = document.createElement('select');
  if (optionsURL) {
    fetchData(optionsURL).then((optionsData) => {
      const options = optionsData.data;
      options.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.textContent = option.value;
        optionElement.value = option.key;
        selectElement.append(optionElement);
      });
    });
  }
  block.append(selectElement);
}
