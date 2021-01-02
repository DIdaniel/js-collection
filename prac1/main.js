function animatdForm() {
  const arrows = document.querySelectorAll('.fa-arrow-down');

  arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
      const input = arrow.previousElementSibling; // 모든 input 
      const parent = arrow.parentElement; // 감싸 있는 모든 div 
      const nextForm = parent.nextElementSibling; // 다음 div class

      // Check for validation
      if(input.type === 'text' && validateUser(input)){
        nextSlide(parent, nextForm);
      } else if (input.type === 'email' && validateEmail(input)) {
        nextSlide(parent, nextForm);
      } else if (input.type ==='password' && validateUser(input)) {
        nextSlide(parent, nextForm);
      } else {
        parent.style.animation = "shake .4s ease"
      }
      // get rid of animation
      parent.addEventListener('animationend', () => {
        parent.style.animation = '';
      })
    });
  });
}

function validateUser(user) {
  if(user.value.length < 6) {
    console.log('not Enough Characters');
    error('rgb(189,87,87)') // red
  } else {
    error('rgb(87, 189, 189)'); // green
    return true;
  }
}

function validateEmail(email) {
  const validation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (validation.test(email.value)) {
    error('rgb(87, 189, 189)');
    return true;
  } else {
    error('rgb(189,87,87)');
  }
}


function nextSlide(parent, nextForm) {
  parent.classList.add('innactive');
  parent.classList.remove('actice');
  nextForm.classList.add('active');
}

function error(color) {
  document.body.style.backgroundColor = color;
}

animatdForm();