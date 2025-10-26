fetch('/components/nav.html')
  .then(res => res.text())
  .then(data => {
    document.querySelector('nav').innerHTML = data;
  });