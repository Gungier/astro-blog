const starField = () => {
    const starCount = 1000; // Number of stars you want
    const body = document.querySelector('body');
  
    for (let i = 0; i < starCount; i++) {
      let star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * window.innerWidth}px`;
      star.style.top = `${Math.random() * window.innerHeight}px`;
      star.style.animation = `twinkle ${Math.random() * 3 + 2}s linear infinite`;
      body.appendChild(star);
    }
  };
  
  starField();
  