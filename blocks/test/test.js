export default function decorate(block) {
  const test = block.children[0].textContent.trim();
  const elStrong = document.createElement('strong');
  elStrong.innerText = test;
  elStrong.classList.add('test-class');
  block.append(elStrong);
}
