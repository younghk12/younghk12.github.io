initializeNavEvents();

function initializeNavEvents() {
    const buttons = document.querySelectorAll('.navbar button');

    buttons.forEach(button => {
        button.addEventListener('click', toggleMenu);
    });
}

function toggleMenu() {
    const target = this.getAttribute('data-target');
    const menu = document.getElementById(target);
    const outerMenu = this.closest('.expandable'); 

    const isOpened = this.getAttribute('aria-expanded') === 'true';
    // console.log("isopened = " + isOpened);

    this.setAttribute('aria-expanded', String(!isOpened));
    menu.setAttribute('aria-expanded', String(!isOpened));

    // console.log(this.getAttribute('aria-expanded'));

    if (!isOpened) {
        menu.style.maxHeight = menu.scrollHeight + 'px';
    } else {
        menu.style.maxHeight = '0';
    }
    if (!outerMenu) return;
    updateMenuHeight(outerMenu);
}

function updateMenuHeight(outerMenu) {
    // console.log('TRIGGER');
    const expandedMenus = outerMenu.querySelectorAll('.expandable[aria-expanded="true"]');
    
    
    let sumMenuHeight = 0;
    expandedMenus.forEach(menu => {
        const styles = getComputedStyle(menu);
        // const marginBottom = parseFloat(styles.marginBottom);
        // console.log("margin " +marginBottom);
        
        // sumMenuHeight += menu.scrollHeight + marginBottom;
        sumMenuHeight += menu.scrollHeight;
        // console.log(sumMenuHeight);
    });
    // console.log("sum "+sumMenuHeight);
    

    sumMenuHeight += outerMenu.scrollHeight;
    outerMenu.style.maxHeight = sumMenuHeight + 'px';
    
}