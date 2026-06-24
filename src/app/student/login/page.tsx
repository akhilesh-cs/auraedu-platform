"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase';

export default function StudentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLog, setErrorLog] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLog('');
    setLoading(true);

    try {
      const supabase = createClient();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Pull role data from profiles grid
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError || profile?.role !== 'student') {
        await supabase.auth.signOut();
        throw new Error('Access Denied: Node mismatch. This portal is for Student clusters only.');
      }

      router.push('/student/dashboard');
    } catch (err: any) {
      setErrorLog(`ERROR_LOG: [STUDENT_AUTH_ERR] -> ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', padding: '2rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
      <div style={{ maxWidth: '450px', width: '100%', backgroundColor: '#070a13', border: '3px solid #00f0ff', boxShadow: '0 0 25px rgba(0, 240, 255, 0.15)', borderRadius: '12px', overflow: 'hidden' }}>
        
        <div style={{ backgroundColor: '#0b1329', padding: '1rem 1.5rem', borderBottom: '2px solid #00f0ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#00f0ff', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px' }}>AURAEDU // STUDENT_ACCESS</div>
          <div style={{ color: '#475569', fontSize: '0.75rem' }}>GORAKHPUR_NODE</div>
        </div>

        <form onSubmit={handleSignIn} style={{ padding: '2rem' }}>
          {errorLog && (
            <div style={{ backgroundColor: '#1e1b2e', border: '1px solid #ff5555', color: '#ff5555', padding: '0.75rem', borderRadius: '4px', fontSize: '0.8rem', marginBottom: '1rem' }}>
              {errorLog}
            </div>
          )}

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>STUDENT NETWORK EMAIL</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@domain.com" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px', color: '#ffffff', fontFamily: 'monospace', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>SECURITY ACCESS TOKEN</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px', color: '#ffffff', fontFamily: 'monospace', outline: 'none' }} />
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.8rem', border: 'none', backgroundColor: '#00f0ff', color: '#020617', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.9rem', borderRadius: '4px', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'SYNCHRONIZING SECURE TUNNEL...' : 'INITIALIZE STUDENT ACCESS'}
          </button>
        </form>

      </div>
    </div>
  );
}