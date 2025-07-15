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
  // const dataURL = block.children[0].querySelector('a')?.href;
  // block.append();
}
