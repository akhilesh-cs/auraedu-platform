"use client";

import React, { useState } from 'react';

export default function StudentForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("RESET_LOG: Secure recovery matrix uplink dispatched to your identity string.");
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', padding: '2rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
      <div style={{ maxWidth: '450px', width: '100%', backgroundColor: '#070a13', border: '2px solid #ff5555', borderRadius: '8px', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', color: '#ff5555', margin: '0 0 1.5rem 0', fontWeight: 'bold' }}>// SECURE RECOVERY TERMINAL</h2>
        <form onSubmit={handleReset}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem' }}>REGISTERED EMAIL</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px', outline: 'none' }} required />
          </div>
          <button type="submit" style={{ width: '100%', backgroundColor: '#ff5555', color: '#ffffff', padding: '0.7rem', border: 'none', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 'bold', cursor: 'pointer' }}>
            DISPATCH UPLINK
          </button>
        </form>
        {message && <div style={{ marginTop: '1.25rem', color: '#50fa7b', fontSize: '0.8rem', textAlign: 'center' }}>{message}</div>}
      </div>
    </div>
  );
}