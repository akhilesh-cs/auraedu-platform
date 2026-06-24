"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase';

export default function StudentDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/student/login');
      } else {
        setUserEmail(user.email ?? "Active Node");
      }
    };
    fetchSession();
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', padding: '2rem', fontFamily: 'monospace', color: '#ffffff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#070a13', border: '2px solid #00f0ff', borderRadius: '8px', padding: '2rem' }}>
        <h1 style={{ color: '#00f0ff', borderBottom: '1px solid #1e293b', paddingBottom: '1rem' }}>🎓 STUDENT CENTRAL CONTROL WORKSPACE</h1>
        <p style={{ color: '#94a3b8', marginTop: '1rem' }}>Welcome back, operator: <span style={{ color: '#39ff14' }}>{userEmail}</span></p>
        
        <div style={{ margin: '2rem 0', padding: '1rem', backgroundColor: '#0f172a', borderRadius: '4px', border: '1px dashed #334155' }}>
          <p style={{ color: '#cbd5e1' }}>📊 Core Learning metrics initialized. No active assignments pending submission.</p>
        </div>

        <button onClick={handleSignOut} style={{ padding: '0.6rem 1.2rem', backgroundColor: 'transparent', border: '1px solid #ff5555', color: '#ff5555', cursor: 'pointer', fontFamily: 'monospace', borderRadius: '4px' }}>
          TERMINATE SESSION (SIGN OUT)
        </button>
      </div>
    </div>
  );
}