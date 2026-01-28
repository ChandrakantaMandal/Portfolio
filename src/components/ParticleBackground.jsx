import { useEffect, useRef, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const particlesRef = useRef([]);
  const animationRef = useRef();
  const lastFrameTime = useRef(0);
  
  const config = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    
    return {
      particleCount: isMobile ? 15 : isLowEnd ? 25 : 35,
      targetFPS: 30,
      frameInterval: 1000 / 30
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = Math.random() * 0.8 + 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y > canvas.height + 10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset();
        }
      }

      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = isDark ? 'rgba(61, 229, 143, 0.4)' : 'rgba(99, 102, 241, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

  
    particlesRef.current = [];
    for (let i = 0; i < config.particleCount; i++) {
      particlesRef.current.push(new Particle());
    }

    const animate = (currentTime) => {
      if (currentTime - lastFrameTime.current < config.frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime.current = currentTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark, config]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleBackground;
