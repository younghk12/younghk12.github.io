window.addEventListener('load', () => {
    
    // Select all image containers within the gallery
    const imageContainers = document.querySelectorAll('.gallery .gallery-item');
    const minHeight = 200;
    const maxHeight = minHeight*(16/9);

    imageContainers.forEach(container => {
      const img = container.querySelector('img');
      
      
      img.addEventListener("load", img_loaded, false);
        if (img.complete) {
        img_loaded.call(img);
        img.removeEventListener("load", img_loaded, false);

        function img_loaded(){
            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;
            const aspectRatio = imgWidth / imgHeight;
            console.log(aspectRatio);
            const minWidth = minHeight * aspectRatio;
            const maxWidth = maxHeight * aspectRatio;

            container.style.flex = `${aspectRatio} ${aspectRatio} 0`;
            container.style.minWidth = `${minWidth}px`;
            container.style.maxWidth = `${maxWidth}px`;
        }
        }

    });
  });