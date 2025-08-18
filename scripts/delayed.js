// add delayed functionality here
import { loadScript } from './aem.js';

const hasVideoComponent = document.querySelectorAll('.video-wrapper')?.length;
const hasChartsComponent = document.querySelectorAll('.charts-wrapper')?.length;
if (hasVideoComponent) {
  await loadScript('https://player.vimeo.com/api/player.js');
}

// if (hasChartsComponent) {
await loadScript(
  'https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.min.js'
);
// }
