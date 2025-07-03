export default function decorate(block) {
  const min = block.children[0].textContent.trim() || 0;
  const max = block.children[1].textContent.trim() || 10;
  const step = block.children[2].textContent.trim() || 1;
  const value = block.children[3].textContent.trim() || 6;
  const rangeInput = document.createElement('input');
  const rangeInputValue = document.createElement('p');
  rangeInput.type = 'range';
  rangeInput.min = min;
  rangeInput.max = max;
  rangeInput.value = value;
  rangeInput.step = step;

  block.append(rangeInput);
  block.append(rangeInputValue);
  rangeInputValue.innerText = rangeInput.value;
  rangeInput.addEventListener('change', (e) => {
    rangeInputValue.innerText = e.target.value;
  });
}
