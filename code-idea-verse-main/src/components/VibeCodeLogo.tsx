import React from 'react';

export default function VibeCodeLogo({ size = 48 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: '#A78BFA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      }}
    >
      <span
        style={{
          color: 'white',
          fontFamily: 'monospace',
          fontWeight: 700,
          fontSize: size * 0.5,
          letterSpacing: '0.05em',
        }}
      >
        {'{ ~ }'}
      </span>
    </div>
  );
}
