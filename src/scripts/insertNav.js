import { initializeNavEvents } from './nav.js';

fetch('/src/components/nav.html')
  .then(res => res.text())
  .then(data => {
    document.querySelector('nav').innerHTML = data;
    initializeNavEvents();
  });

fetch('/src/components/footer.html')
  .then(res => res.text())
  .then(data => {
    document.querySelector('footer').innerHTML = data;
  });
