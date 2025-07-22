document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('sliderContainer');
    const thumb = document.getElementById('sliderThumb');
    // Select all span elements inside the labelContainer
    let intervalText = document.querySelector('.label3');
    let previous = document.querySelector('.label3');

    const intervals = 5; // Including the start and end as intervals
    const intervalWidth = slider.offsetWidth / (intervals - 1);    // Calculate the width of each interval in pixels.
    const initialLeft = -(thumb.offsetWidth / 2);    // Calculate the initial position of the thumb to center it on the edge of the container

    const fontLarge = 50;
    intervalText.style.fontSize = `${fontLarge}px`;
    
    thumb.style.left = (initialLeft+(intervalWidth*2)) + 'px' ;     // Set the initial position of the thumb

    let delayTimer; // Variable to store the timer reference

    
    
    const sliderState = {
        isDragging: false,
        currentIndex: 0,
        previousIndex: 0,
        
        get thumbPosition() {
            return thumb.offsetLeft+ thumb.offsetWidth/2;},
        get closestIntervalIndex() {
            return Math.round(this.thumbPosition / intervalWidth);},
        get closestIntervalPos() {
            return this.closestIntervalIndex * intervalWidth;},
        get scaleFactor() {
            return 1-(Math.abs(this.closestIntervalPos - this.thumbPosition)/ (intervalWidth/2));},
        get intervalText() {
            return document.querySelector(`.label${this.currentIndex+1}`);},
        get previousText () {
            return document.querySelector(`.label${this.previousIndex+1}`);}
    };

    sliderState.currentIndex = 2;
    updateContent();

    thumb.addEventListener('mousedown', function (e) {
        e.preventDefault(); // Prevent default action to avoid potential image drag etc.
        sliderState.previousIndex = sliderState.closestIntervalIndex;
        sliderState.isDragging = true;
        thumb.style.transition = 'none';
        const spans = document.querySelectorAll('#labelContainer .label span');
        spans.forEach(span => {
            span.style.transition = 'none';
        });
        sliderState.thumbPosition = thumb.offsetLeft + thumb.offsetWidth / 2;
    });

    document.addEventListener('mousemove', function (e) {
        if (sliderState.isDragging) {
            let newLeft = e.clientX - slider.getBoundingClientRect().left - (thumb.offsetWidth / 2);
            // Constrain the thumb to the slider bounds, allowing some overflow.
            newLeft = Math.max(newLeft, -thumb.offsetWidth / 2); // Allowing negative values
            newLeft = Math.min(newLeft, slider.offsetWidth - thumb.offsetWidth / 2); // Considering thumb's width
            // Update the position of the thumb without snapping.
            thumb.style.left = newLeft + 'px';
            sliderState.thumbPosition = thumb.offsetLeft + thumb.offsetWidth / 2;
            sliderState.currentIndex = sliderState.closestIntervalIndex;
            adjustLabels();
        
        }
    });

    document.addEventListener('mouseup', function (e) {
        if (sliderState.isDragging) {
            sliderState.isDragging = false;
            // Snap thumb to the nearest interval.
            snapToNearestInterval();
            return;
        }
    });

    slider.addEventListener('click', function (e) {
        sliderState.previousIndex = sliderState.closestIntervalIndex;

        if (e.target === thumb) {
            return; // Exit the event handler if the click occurred on the thumb
        }
        if(!sliderState.isDragging){
            // Move thumb to the clicked position before snapping.
            sliderState.intervalText.style.fontSize = "16px";
            //sliderState.previousIndex = sliderState.closestIntervalIndex;
            let newLeft = e.clientX - slider.getBoundingClientRect().left - (thumb.offsetWidth / 2);
            newLeft = Math.max(newLeft, 0-thumb.offsetWidth/2);
            newLeft = Math.min(newLeft, slider.offsetWidth - thumb.offsetWidth);
            thumb.style.transition = "none"; //if calculating dynamically beware of animation
            //could use click position to animate text while thumb is animating
            thumb.style.left = newLeft + 'px';
            
            sliderState.currentIndex = sliderState.closestIntervalIndex;

            clearTimeout(delayTimer); // Clear any existing delay timer.
            // Set a new delay timer to snap the thumb position after half a second (500 milliseconds)
            delayTimer = setTimeout(() => {
                // Call the function to snap to the nearest interval every time after the delay
                snapToNearestInterval();
            }, 300);
        }        
          
    });

  
    document.querySelectorAll('#labelContainer .label span').forEach(span => {
        span.addEventListener('click', function() {
            const className = this.className;
            const numberPart = className.replace(/^\D+/g, ''); // Remove non-digits
            const index = parseInt(numberPart, 10);

            sliderState.previousIndex = sliderState.closestIntervalIndex;
            sliderState.currentIndex = index-1;
            snapToInterval(sliderState.currentIndex);
        
        });
    });

    function snapToInterval(interval) {
        function animate() {
            thumb.style.transition = 'left 0.3s ease-out'; // Adjust the duration and timing function as needed
            sliderState.intervalText.style.transition = 'font-size 0.3s ease-out';
            sliderState.previousText.style.transition = 'font-size 0.3s ease-out';
    
            const dest = interval*intervalWidth;

            thumb.style.left = `${dest - thumb.offsetWidth/2}px`;
            sliderState.intervalText.style.fontSize = `${fontLarge}px`;
            if(sliderState.previousText!=sliderState.intervalText){
                sliderState.previousText.style.fontSize = "16px";
            }
        }
        animate();
        updateContent(); 
           
        
    }

    function snapToNearestInterval() {
        const target = sliderState.closestIntervalIndex;
        snapToInterval(target);
    }


    function updateContent() {
        const container = document.querySelector('.projects');
        const divs = container.children;
        for (let i = 0; i < divs.length; i++) {
            divs[i].style.display = 'none';
        }

        // Show the div corresponding to the interval index
        const targetDiv = document.getElementById(`div${sliderState.currentIndex+1}`);
        if (targetDiv) {
            targetDiv.style.display = 'block';
        }
    }

    function adjustLabels() {
        const labels = document.getElementById('labelContainer');
        const text = labels.querySelector(`:nth-child(${sliderState.closestIntervalIndex+1}) > span`);
        const smooth = smoothScaleFactor(sliderState.scaleFactor);
        const scaledValue = (smooth - 0) * (fontLarge - 16) / (1 - 0) + 16;
        text.style.fontSize = scaledValue+"px";
    }

    function smoothScaleFactor(scaleFactor) {
        // Apply the sigmoid function to smooth the transition
        return 0.5 + 0.5 * Math.cos(Math.PI * scaleFactor - Math.PI);
    }

});
