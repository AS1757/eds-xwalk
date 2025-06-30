export default function decorate(block) {
  const audioSource = block.children[0].querySelector('a').href;
  const audioSourceTypes = block.children[1].textContent.trim().split(',');
  const audioFallbackText = block.children[2].textContent.trim();
  const audioElement = document.createElement('audio');
  audioElement.controls = true;
  audioSourceTypes.forEach((type) => {
    const sourceElement = document.createElement('source');
    sourceElement.src = `${audioSource}.${type}`;
    sourceElement.type = `audio/${type}`;
    audioElement.appendChild(sourceElement);
  });
  audioElement.appendChild(document.createTextNode(audioFallbackText));
  block.replaceChildren(audioElement);
}
