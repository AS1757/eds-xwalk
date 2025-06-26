export default function decorate(block) {
  const audioContainer = block.children[1];
  const audioSource = block.querySelector("a").href;
  audioContainer.innerHTML = `<audio controls><source src="${audioSource}.ogg" type="audio/ogg"><source src="${audioSource}.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>`;
}
