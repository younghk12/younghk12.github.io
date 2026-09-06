// window.addEventListener('load', () => {
    

//     if (screen.width <= 700) {
//       // Your logic that should only run on small screens (<= 700px)
//       console.log('Screen is 700px or smaller, running logic!');
//       // Place your desired code here
//     } else {
//       // Optional: Code for larger screens
//       console.log('Screen is larger than 700px, skipping logic.');
//       const imageContainers = document.querySelectorAll('.gallery .gallery-item');
//     const minHeight = 200;
//     const maxHeight = minHeight*(16/9);

//     imageContainers.forEach(container => {
//       const img = container.querySelector('img');
      
      
//       img.addEventListener("load", img_loaded, false);
//         if (img.complete) {
//         img_loaded.call(img);
//         img.removeEventListener("load", img_loaded, false);

//         function img_loaded(){
//             const imgWidth = img.naturalWidth;
//             const imgHeight = img.naturalHeight;
//             const aspectRatio = imgWidth / imgHeight;
//             console.log(aspectRatio);
//             const minWidth = minHeight * aspectRatio;
//             const maxWidth = maxHeight * aspectRatio;

//             container.style.flex = `${aspectRatio} ${aspectRatio} 0`;
//             container.style.minWidth = `${minWidth}px`;
//             // container.style.maxWidth = `${maxWidth}px`;
//         }
//         }

//     });
//     }
//     // Select all image containers within the gallery
    
//   });

// window.addEventListener('load', () => {
//   if (screen.width <= 700) return; // skip small screens

//   const imageContainers = document.querySelectorAll('.gallery .gallery-item');
//   const minHeight = 300;
//   const maxHeight = minHeight * (16 / 9);

//   imageContainers.forEach(container => {
//     const img = container.querySelector('img');
//     if (!img) return;

//     function img_loaded() {
//       const imgWidth = img.naturalWidth;
//       const imgHeight = img.naturalHeight;
//       const aspectRatio = imgWidth / imgHeight;
//       const minWidth = minHeight * aspectRatio;
//       const maxWidth = maxHeight * aspectRatio;

//       container.style.flex = `${aspectRatio} ${aspectRatio} 0`;
//       container.style.minWidth = `${minWidth}px`;
//       container.style.maxWidth = `${maxWidth}px`;
//     }

//     if (img.complete && img.naturalWidth) {
//       img_loaded();
//     } else {
//       img.addEventListener('load', img_loaded, { once: true });
//     }
//   });
// });

window.addEventListener('load', () => {
    if (screen.width <= 700) return;

    const children = document.querySelectorAll('.gallery > *'); // direct children
    const minHeight = 300;
    const maxHeight = minHeight * (16/9); // optional, same as your old code

    children.forEach(child => {
        const img = child.querySelector('img');
        if (!img) return;

        const apply = () => {
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        if (!w || !h) return;

        const aspect = w / h;
        const minWidth = Math.round(minHeight * aspect);
        const maxWidth = Math.round(maxHeight * aspect); // keep your maxWidth

        child.style.flex = `${aspect} ${aspect} 0`;
        child.style.minWidth = `${minWidth}px`;
        child.style.maxWidth = `${maxWidth}px`;  // same as your old commented-out line
        };

        if (img.complete && img.naturalWidth) apply();
        else img.addEventListener('load', apply, { once: true });
    });
});
