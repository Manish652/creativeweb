import React from 'react';

const cursorStyles = [
  { id: 1, name: 'Default', variant: 'default', color: '#ffffff', size: 'md', blendMode: 'difference' },
  { id: 2, name: 'Dot Ring', variant: 'dot-ring', color: '#f0e68c', size: 'lg', blendMode: 'difference' },
  { id: 3, name: 'Glow', variant: 'glow', color: '#00ffff', size: 'md', blendMode: 'screen' },
  { id: 4, name: 'Trail', variant: 'trail', color: '#ff69b4', size: 'sm', blendMode: 'normal', trailLength: 8 },
  { id: 5, name: 'Pointer', variant: 'pointer', color: '#ff4500', size: 'md', blendMode: 'difference' },
  { id: 6, name: 'Text', variant: 'text', color: '#32cd32', size: 'md', blendMode: 'normal', text: 'Click' },
  { id: 7, name: 'Large Dot Ring', variant: 'dot-ring', color: '#ffa500', size: 'lg', blendMode: 'overlay' },
  { id: 8, name: 'Small Glow', variant: 'glow', color: '#ff1493', size: 'sm', blendMode: 'screen' },
  { id: 9, name: 'Pulse Click', variant: 'default', color: '#1e90ff', size: 'md', blendMode: 'difference', clickEffectType: 'pulse' },
  { id: 10, name: 'Exclusion Ring', variant: 'dot-ring', color: '#ffffff', size: 'md', blendMode: 'exclusion' },
];

export default function CursorSelector({ selectedStyleId, onSelect }) {
  return (
    <div className="fixed top-20 right-10 bg-gray-900 bg-opacity-80 text-white p-4 rounded-lg shadow-lg z-20 max-w-xs w-full">
      <h3 className="text-lg font-semibold mb-3">Select Cursor Style</h3>
      <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
        {cursorStyles.map(style => (
          <button
            key={style.id}
            onClick={() => onSelect(style)}
            className={`p-2 rounded border-2 ${
              selectedStyleId === style.id ? 'border-blue-400' : 'border-transparent'
            } hover:border-blue-600 transition-colors flex flex-col items-center`}
            aria-label={`Select ${style.name} cursor style`}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: style.variant === 'dot-ring' || style.variant === 'pointer' ? '50%' : '4px',
                backgroundColor: style.color,
                mixBlendMode: style.blendMode,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: style.variant === 'glow' ? `0 0 10px ${style.color}` : 'none',
                position: 'relative',
              }}
            >
              {style.variant === 'dot-ring' && (
                <div
                  style={{
                    position: 'absolute',
                    top: 4,
                    left: 4,
                    right: 4,
                    bottom: 4,
                    borderRadius: '50%',
                    border: `2px solid ${style.color}`,
                    pointerEvents: 'none',
                  }}
                />
              )}
              {style.variant === 'text' && (
                <span style={{ color: '#000', fontSize: 12, fontWeight: 'bold' }}>
                  {style.text || 'Click'}
                </span>
              )}
            </div>
            <span className="mt-1 text-xs">{style.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
