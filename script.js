

function toggleMenu() {
  
  console.log('doing something');
  const menuId = this.getAttribute('data-target');
  const menu = document.getElementById(menuId);

  const outerMenu = this.parentNode.closest('.expandable');
  // console.log(this);
  // console.log(this.parentNode);
  // console.log(outerMenu);



  const isOpened = this.getAttribute('aria-expanded');
  
  if(isOpened === 'false') {
    this.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-expanded', 'true');
    menu.style.maxHeight = menu.scrollHeight + 'px';
    updateMenuHeight(menu, outerMenu);
  }
  else{
    this.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-expanded', 'false');
    console.log("opacity " + window.getComputedStyle(menu).opacity);
    menu.style.maxHeight = 0;

    console.log("inner1 " + menu.style.maxHeight);
    console.log("inner1 " + menu.scrollHeight);
    updateMenuHeight(menu, outerMenu);

  }
}

function updateMenuHeight(innerMenu, outerMenu) {
  console.log(innerMenu);
  console.log("scroll " + innerMenu.scrollHeight);
  console.log("offset " + innerMenu.offsetHeight);
  // outerMenu.style.maxHeight = outerMenu.scrollHeight + innerMenu.scrollHeight + 'px';
  console.log("outer " + outerMenu.style.maxHeight);

    const innerMenuHeight = innerMenu.scrollHeight;
  const outerMenuMaxHeight = outerMenu.style.maxHeight;
  
  if (outerMenu.getAttribute('aria-expanded') === 'true') {
    // If the outer menu is expanded, calculate the new maxHeight including the inner menu's height
    outerMenu.style.maxHeight = outerMenu.scrollHeight + innerMenuHeight + 'px';
  } else {
    // If the outer menu is collapsed, adjust its maxHeight to account for the inner menu being collapsed
    outerMenu.style.maxHeight = outerMenu.scrollHeight - innerMenuHeight + 'px';
  }

}

const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
  button.addEventListener('click', toggleMenu);
});

