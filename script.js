document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    const shine = document.querySelector('.shine');
  
    // Function to handle the 3D effect on the card
    function handleCardMouseMove(e) {
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      const mouseX = (e.clientX - cardRect.left) / cardWidth;
      const mouseY = (e.clientY - cardRect.top) / cardHeight;
      const rotateX = -1 * (mouseY - 0.5) * 20; // Tilt card
      const rotateY = (mouseX - 0.5) * 20;
  
      // Move the shine effect based on mouse position
      const shineX = mouseX * 200 - 100; // 200% width - 100% to center it
      const shineY = mouseY * 200 - 100; // 200% height - 100% to center it
  
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      shine.style.transform = `translateX(-50%) rotate(45deg) translateX(${shineX}px) translateY(${shineY}px)`;
    }
  
    // Function to reset the card state when the mouse leaves
    function handleCardMouseLeave() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      shine.style.opacity = '0'; // Hide the shine effect
    }
  
    // Function to remove the transition for responsiveness
    function handleCardMouseEnter() {
      card.style.transition = 'none'; // Remove transition for responsiveness
      shine.style.opacity = '1'; // Show the shine effect
    }
  
    card.addEventListener('mousemove', handleCardMouseMove);
    card.addEventListener('mouseleave', handleCardMouseLeave);
    card.addEventListener('mouseenter', handleCardMouseEnter);
  
    // Particle canvas setup
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const particles = [];
    const colors = ['#f8f7ff', '#d1d0e5', '#a29ec2']; // Particle colors
  
    function createParticles() {
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 1 + 0.5,
          angle: Math.random() * 360
        });
      }
    }
  
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
  
        if (p.x < 0 || p.x > canvas.width) p.x = Math.random() * canvas.width;
        if (p.y < 0 || p.y > canvas.height) p.y = Math.random() * canvas.height;
      });
      requestAnimationFrame(drawParticles);
    }
  
    createParticles();
    drawParticles();
  
    // Handle window resize
    window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  });
  