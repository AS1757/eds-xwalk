export default function decorate(block) {
  const min = block.children[0].textContent.trim();
  const max = block.children[1].textContent.trim();
  const step = block.children[2].textContent.trim();
  const value = block.children[3].textContent.trim();
  const rangeInput = document.createElement('input');
  rangeInput.type = 'range';
  rangeInput.min = min;
  rangeInput.max = max;
  rangeInput.value = value;
  rangeInput.step = step;

  block.append(rangeInput);

  const rangeInputValue = document.createElement('p');
  block.append(rangeInputValue);
  rangeInputValue.innerText = rangeInput.value;
  rangeInput.addEventListener('change', (e) => {
    rangeInputValue.innerText = e.target.value;
  });
}
