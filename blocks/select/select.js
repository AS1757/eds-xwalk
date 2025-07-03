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

function addOptionElement(parent, value, key) {
  const optionElement = document.createElement('option');
  optionElement.textContent = value;
  optionElement.value = key;
  parent.append(optionElement);
}

export default function decorate(block) {
  const optionsURL = block.children[0].querySelector('a')?.href;
  const allowMultiple = block.children[1].textContent.trim();
  const selectElement = document.createElement('select');
  addOptionElement(selectElement, '---Select---', '');
  if (allowMultiple) {
    selectElement.multiple = true;
  }
  [...block.children].forEach((option, index) => {
    if (index > 1) {
      const optionKey = option.children[0]?.textContent.trim();
      const optionValue = option.children[1]?.textContent.trim();
      if (optionKey && optionValue) {
        addOptionElement(selectElement, optionValue, optionKey);
      }
    }
  });
  if (optionsURL) {
    fetchData(optionsURL).then((optionsData) => {
      const options = optionsData.data;
      options.forEach((option) => {
        addOptionElement(selectElement, option.value, option.key);
      });
    });
  }
  block.append(selectElement);
}
