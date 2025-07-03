export default function decorate(block) {
  const min = block.children[0].textContent.trim() || 1;
  const max = block.children[1].textContent.trim() || 10;
  const step = block.children[2].textContent.trim() || 1;
  const rangeInput = document.createElement('input');
  const rangeInputValue = document.createElement('p');
  rangeInput.type = 'range';
  rangeInput.min = min;
  rangeInput.max = max;
  rangeInput.step = step;

  block.append(rangeInput);
  block.append(rangeInputValue);
  rangeInput.addEventListener('change', (e) => {
    rangeInputValue.innerText = e.value;
  });
}
