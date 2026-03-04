import React, { useRef, useEffect } from "react";
import { RefreshCw } from "lucide-react";

const DEFAULT_ROTATION = 297;
const SPIN_SPEED = 1.8;
const RETURN_EASE = 0.06;

export const AnimatedRefreshButton = ({ onClick, isRefreshing, text }) => {
  const rotation = useRef(DEFAULT_ROTATION);
  const isHovered = useRef(false);
  const isRefreshingRef = useRef(isRefreshing); // <-- ref que siempre tiene el valor actual
  const animFrame = useRef(null);
  const layers = useRef([]);

  // Mantener el ref sincronizado con la prop en cada render
  useEffect(() => {
    isRefreshingRef.current = isRefreshing;
  }, [isRefreshing]);

  const applyRotation = (deg) => {
    layers.current.forEach((el) => {
      if (el) el.style.transform = `translate(-50%, -50%) rotate(${deg}deg)`;
    });
  };

  const loop = () => {
    // Leemos siempre desde el ref, no desde el closure
    if (isHovered.current || isRefreshingRef.current) {
      rotation.current += SPIN_SPEED;
      applyRotation(rotation.current);
      animFrame.current = requestAnimationFrame(loop);
    } else {
      let current = rotation.current % 360;
      if (current < 0) current += 360;

      let diff = DEFAULT_ROTATION - current;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      if (Math.abs(diff) < 0.5) {
        rotation.current = DEFAULT_ROTATION;
        applyRotation(DEFAULT_ROTATION);
        return;
      }

      rotation.current = current + diff * RETURN_EASE;
      applyRotation(rotation.current);
      animFrame.current = requestAnimationFrame(loop);
    }
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    animFrame.current = requestAnimationFrame(loop);
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    animFrame.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    applyRotation(DEFAULT_ROTATION);
    return () => { if (animFrame.current) cancelAnimationFrame(animFrame.current); };
  }, []);

  useEffect(() => {
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    animFrame.current = requestAnimationFrame(loop);
  }, [isRefreshing]);

  return (
    <div className="flex w-full items-center justify-center relative">
      <style>{`
        .btn-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 48px;
          cursor: pointer;
        }
        .btn-layer {
          position: absolute;
          border-radius: 12px;
          overflow: hidden;
        }
        .btn-glow {
          inset: -6px;
          border-radius: 16px;
          filter: blur(18px);
          opacity: 0.45;
          z-index: 0;
        }
        .btn-dark {
          inset: 0;
          z-index: 1;
        }
        .btn-white {
          inset: 2px;
          border-radius: 10px;
          filter: blur(2px);
          z-index: 2;
        }
        .btn-inner {
          position: absolute;
          inset: 3px;
          border-radius: 9px;
          background: linear-gradient(90deg, #5b3fcf 0%, #3ec6c6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          z-index: 3;
          transition: filter 0.2s;
        }
        .btn-wrapper:hover .btn-inner {
          filter: brightness(1.12);
        }
        .btn-label {
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          font-family: system-ui, sans-serif;
          letter-spacing: 0.02em;
        }
      `}</style>

      <div
        className="btn-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        <div className="btn-layer btn-glow">
          <div ref={(el) => (layers.current[0] = el)} style={{ position: "absolute", top: "50%", left: "50%", width: 800, height: 800, backgroundImage: "conic-gradient(#000, #402fb5 5%, #000 38%, #000 50%, #cf30aa 60%, #000 87%)", transform: `translate(-50%, -50%) rotate(${DEFAULT_ROTATION}deg)` }} />
        </div>
        <div className="btn-layer btn-dark" style={{ inset: 0, borderRadius: 12 }}>
          <div ref={(el) => (layers.current[1] = el)} style={{ position: "absolute", top: "50%", left: "50%", width: 600, height: 600, backgroundImage: "conic-gradient(#1c191c, #402fb5 5%, #1c191c 14%, #1c191c 50%, #cf30aa 60%, #1c191c 64%)", filter: "brightness(1.3)", transform: `translate(-50%, -50%) rotate(${DEFAULT_ROTATION}deg)` }} />
        </div>
        <div className="btn-layer btn-white" style={{ inset: 2, borderRadius: 10, filter: "blur(2px)" }}>
          <div ref={(el) => (layers.current[2] = el)} style={{ position: "absolute", top: "50%", left: "50%", width: 600, height: 600, backgroundImage: "conic-gradient(rgba(0,0,0,0) 0%, #a099d8, rgba(0,0,0,0) 8%, rgba(0,0,0,0) 50%, #dfa2da, rgba(0,0,0,0) 58%)", filter: "brightness(1.4)", transform: `translate(-50%, -50%) rotate(${DEFAULT_ROTATION}deg)` }} />
        </div>
        <div className="btn-inner">
          <RefreshCw size={18} className={`text-white transition-transform ${isRefreshing ? "animate-spin" : ""}`} />
          <span className="btn-label">{text}</span>
        </div>
      </div>
    </div>
  );
};