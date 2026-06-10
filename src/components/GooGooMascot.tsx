import { useEffect, useRef, useState, useCallback } from 'react';
import { useGooGooCursor } from '@/hooks/useGooGooCursor';

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  opacity: number;
  maxSize: number;
}

interface MiniBabyGhost {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  scale: number;
  rotation: number;
}

const SPEECH_LINES = [
  "Night night, mess.",
  "Bubbles!",
  "Goo goo ga-ga!",
];

export default function GooGooMascot() {
  const { x, y, isMoving, velocity } = useGooGooCursor();
  const [, setExpression] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [speechBubble, setSpeechBubble] = useState('');
  const [superMode, setSuperMode] = useState(false);

  const bubblesRef = useRef<Bubble[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const miniGhostsRef = useRef<MiniBabyGhost[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const clickCountRef = useRef(0);
  const cursorRef = useRef({ x, y, isMoving, velocity, mascotSize: 0, superMode });

  const mascotSize = typeof window !== 'undefined' && window.innerWidth < 768 ? 180 : 280;

  const spawnRipples = useCallback((cx: number, cy: number, count = 3) => {
    for (let i = 0; i < count; i++) {
      ripplesRef.current.push({
        x: cx + mascotSize / 2,
        y: cy + mascotSize / 2,
        size: 5,
        opacity: 0.5,
        maxSize: 40 + i * 20,
      });
    }
  }, [mascotSize]);

  const handleClick = useCallback(() => {
    clickCountRef.current = (clickCountRef.current + 1) % 3;
    const newExpr = clickCountRef.current;
    setExpression(newExpr);
    spawnRipples(x, y, newExpr === 2 ? 5 : 3);

    if (newExpr === 2) {
      setSuperMode(true);
    } else {
      setSuperMode(false);
    }

    const line = SPEECH_LINES[newExpr] || SPEECH_LINES[0];
    setSpeechBubble(line);
    setTimeout(() => setSpeechBubble(''), 3000);
  }, [x, y, spawnRipples]);

  const handleDoubleClick = useCallback(() => {
    if (miniGhostsRef.current.length >= 4) return;
    for (let i = 0; i < 2; i++) {
      miniGhostsRef.current.push({
        x: x + mascotSize / 2 + (Math.random() - 0.5) * 50,
        y: y + mascotSize,
        vx: (Math.random() - 0.5) * 1,
        vy: -Math.random() * 2 - 0.5,
        opacity: 1,
        scale: 0.25 + Math.random() * 0.15,
        rotation: Math.random() * 360,
      });
    }
  }, [x, y, mascotSize]);

  cursorRef.current = { x, y, isMoving, velocity, mascotSize, superMode };

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let bubbleTimer = 0;

    const animate = () => {
      const { x, y, isMoving, velocity, mascotSize, superMode } = cursorRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Bubble trails from movement
      if (isMoving && velocity > 1) {
        bubbleTimer++;
        if (bubbleTimer > 10) {
          bubbleTimer = 0;
          const cx = x + mascotSize / 2;
          const cy = y + mascotSize / 2;
          bubblesRef.current.push({
            x: cx + (Math.random() - 0.5) * 15,
            y: cy + (Math.random() - 0.5) * 15,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -Math.random() * 1.2 - 0.4,
            size: Math.random() * 10 + 4,
            opacity: 0.3,
            life: 0,
            maxLife: Math.random() * 80 + 50,
          });
        }
      }

      // Always spawn a few bubbles for ambiance
      if (Math.random() < 0.04) {
        bubblesRef.current.push({
          x: x + mascotSize / 2 + (Math.random() - 0.5) * 30,
          y: y + mascotSize * 0.3,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -Math.random() * 0.8 - 0.3,
          size: Math.random() * 8 + 4,
          opacity: 0.2,
          life: 0,
          maxLife: Math.random() * 100 + 60,
        });
      }

      // Bubbles
      bubblesRef.current = bubblesRef.current.filter((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.vx += Math.sin(b.life * 0.05) * 0.02;
        b.size += 0.08;
        b.life++;
        const lifeRatio = b.life / b.maxLife;
        b.opacity = Math.max(0, 0.35 * (1 - lifeRatio));

        if (b.opacity <= 0) return false;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = '#bfdbfe';
        ctx.globalAlpha = b.opacity;
        ctx.fill();
        // Bubble highlight
        ctx.beginPath();
        ctx.arc(b.x - b.size * 0.3, b.y - b.size * 0.3, b.size * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fill();

        return true;
      });

      // Ripples
      ripplesRef.current = ripplesRef.current.filter((r) => {
        r.size += 1.5;
        r.opacity -= 0.008;
        if (r.opacity <= 0) return false;

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.size, 0, Math.PI * 2);
        ctx.strokeStyle = '#93c5fd';
        ctx.lineWidth = 1;
        ctx.globalAlpha = r.opacity;
        ctx.stroke();

        return true;
      });

      // Mini baby ghosts
      miniGhostsRef.current = miniGhostsRef.current.filter((mg) => {
        mg.x += mg.vx;
        mg.y += mg.vy;
        mg.vy -= 0.008;
        mg.vx *= 0.998;
        mg.opacity -= 0.002;
        mg.rotation += 0.5;

        if (mg.opacity <= 0) return false;

        ctx.save();
        ctx.globalAlpha = mg.opacity;
        ctx.translate(mg.x, mg.y);
        ctx.rotate((mg.rotation * Math.PI) / 180);
        ctx.scale(mg.scale, mg.scale);

        // Mini ghost body
        ctx.beginPath();
        ctx.arc(0, -5, 16, Math.PI, 0);
        ctx.bezierCurveTo(16, 10, 12, 22, 8, 18);
        ctx.bezierCurveTo(4, 24, 0, 20, -4, 22);
        ctx.bezierCurveTo(-8, 24, -12, 20, -16, 18);
        ctx.bezierCurveTo(-20, 14, -16, 6, -16, -5);
        ctx.fillStyle = '#dbeafe';
        ctx.fill();

        // Mini pacifier
        ctx.beginPath();
        ctx.arc(0, 2, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#93c5fd';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 2, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Mini closed eyes
        ctx.beginPath();
        ctx.moveTo(-8, -5);
        ctx.quadraticCurveTo(-5, -3, -2, -5);
        ctx.moveTo(2, -5);
        ctx.quadraticCurveTo(5, -3, 8, -5);
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
        return true;
      });

      // Super mode - soft blue overlay
      if (superMode) {
        ctx.fillStyle = 'rgba(147, 197, 253, 0.012)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9996 }}
      />

      <div
        className="fixed pointer-events-none"
        style={{
          left: x,
          top: y,
          zIndex: 9997,
          width: mascotSize,
          height: mascotSize,
        }}
      >
        {speechBubble && (
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl whitespace-nowrap font-goo text-xs tracking-wider pointer-events-none"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #bfdbfe',
              color: '#3b82f6',
              boxShadow: '0 4px 20px rgba(147,197,253,0.15)',
              animation: 'bounce-subtle 0.6s ease-in-out infinite',
              zIndex: 9999,
            }}
          >
            {speechBubble}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid #bfdbfe',
              }}
            />
          </div>
        )}

        <div
          className="relative pointer-events-none cursor-default"
          style={{
            width: mascotSize,
            height: mascotSize,
            animation: !isMoving ? `ghost-bob 3s ease-in-out infinite, ghost-sway 4s ease-in-out infinite` : undefined,
          }}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src="/ghoul_mascot.png"
            alt="GOO GOO"
            className="w-full h-full object-contain"
            draggable={false}
            style={{
              filter: isHovered
                ? 'brightness(1.1) drop-shadow(0 0 12px rgba(147,197,253,0.3))'
                : undefined,
              transition: 'filter 0.3s ease',
            }}
          />
        </div>
      </div>
    </>
  );
}
