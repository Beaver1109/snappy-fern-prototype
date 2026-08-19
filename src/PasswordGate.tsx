import { useState } from 'react';

const PASSWORD = 'thryvhub';
const STORAGE_KEY = 'thryv_hub_auth';

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(STORAGE_KEY) === '1');
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  if (authed) return <>{children}</>;

  const submit = () => {
    if (value === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setAuthed(true);
    } else {
      setError(true);
      setValue('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--dex-surface-canvas-bgColor, #f4f5f7)',
      fontFamily: 'var(--dex-fontFamily-body, system-ui, sans-serif)',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        padding: '40px 48px',
        width: '360px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#FF5000"/>
              <path d="M8 20L16 10L24 20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#1a1a1a' }}>Thryv Hub</span>
          </div>
          <span style={{ fontSize: '13px', color: '#666' }}>Enter the access password to continue.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>Password</label>
          <input
            type="password"
            value={value}
            autoFocus
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Enter password"
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              border: error ? '1.5px solid #e53e3e' : '1.5px solid #d1d5db',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
          />
          {error && (
            <span style={{ fontSize: '12px', color: '#e53e3e' }}>Incorrect password. Try again.</span>
          )}
        </div>

        <button
          onClick={submit}
          style={{
            background: '#FF5000',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '11px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
