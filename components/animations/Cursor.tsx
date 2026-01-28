import React from 'react';

interface CursorProps {
  x: string;
  y: string;
  isClicking: boolean;
  visible: boolean;
}

export const Cursor: React.FC<CursorProps> = ({ x, y, isClicking, visible }) => {
  if (!visible) return null;

  return (
    <div
      className="absolute z-[200] pointer-events-none transition-all duration-500 ease-out"
      style={{ left: x, top: y }}
    >
      {/* Cursor SVG */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className={`drop-shadow-lg transition-transform duration-100 ${isClicking ? 'scale-90' : 'scale-100'}`}
      >
        <path
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .73-.58.39-.92L6.35 2.85a.5.5 0 0 0-.85.36Z"
          fill="#fff"
          stroke="#000"
          strokeWidth="1.5"
        />
      </svg>

      {/* Click ripple effect */}
      {isClicking && (
        <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-brand-blue/40 animate-ping" />
      )}
    </div>
  );
};

export default Cursor;
