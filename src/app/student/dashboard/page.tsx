"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase';

interface EnrollmentData {
  id: string;
  payment_status: string;
  batches: {
    batch_name: string;
    subject_catalog: {
      board_name: string;
      grade_tier: string;
      subject_name: string;
      has_ia: boolean;
      has_ee: boolean;
      has_tok: boolean;
      has_board_project: boolean;
    };
  };
}

export default function StudentDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [enrollments, setEnrollments] = useState<EnrollmentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      const supabase = createClient();
      
      // 1. Verify user session state
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/student/login');
        return;
      }
      
      setUserEmail(user.email ?? "Active Node");

      // 2. Fetch linked batch matrix and relational subject parameters
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          id,
          payment_status,
          batches (
            batch_name,
            subject_catalog (
              board_name,
              grade_tier,
              subject_name,
              has_ia,
              has_ee,
              has_tok,
              has_board_project
            )
          )
        `)
        .eq('student_id', user.id);

      if (!error && data) {
        setEnrollments(data as unknown as EnrollmentData[]);
      }
      setLoading(false);
    };

    fetchStudentData();
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', padding: '2rem 1rem', fontFamily: 'monospace', color: '#ffffff' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: '#070a13', border: '2px solid #00f0ff', boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)', borderRadius: '8px', padding: '2rem' }}>
        
        {/* HEADER CONTROL TERMINAL */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ color: '#00f0ff', margin: 0, fontSize: '1.6rem' }}>🎓 STUDENT WORKSPACE MATRIX</h1>
            <p style={{ color: '#94a3b8', margin: '0.25rem 0 0 0', fontSize: '0.85rem' }}>Identified User: <span style={{ color: '#39ff14' }}>{userEmail}</span></p>
          </div>
          <button onClick={handleSignOut} style={{ padding: '0.5rem 1rem', backgroundColor: 'transparent', border: '1px solid #ff5555', color: '#ff5555', cursor: 'pointer', fontFamily: 'monospace', borderRadius: '4px', fontSize: '0.8rem' }}>
            DISCONNECT NODE
          </button>
        </div>

        {/* CORE TELEMETRY STATUS */}
        <h2 style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '1rem' }}>📡 CURRENT COURSE SUBSCRIPTIONS</h2>
        
        {loading ? (
          <p style={{ color: '#94a3b8' }}>SCANNING SYSTEM DEPLOYMENTS...</p>
        ) : enrollments.length === 0 ? (
          <div style={{ padding: '2rem', backgroundColor: '#0f172a', border: '1px dashed #334155', borderRadius: '4px', textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', margin: 0 }}>No active batch tracks mapped to this node framework yet.</p>
            <p style={{ color: '#475569', fontSize: '0.8rem', marginTop: '0.5rem' }}>Awaiting administrator catalog allocation assignment.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {enrollments.map((item) => {
              const catalog = item.batches?.subject_catalog;
              return (
                <div key={item.id} style={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '6px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#1e293b', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#00f0ff', fontWeight: 'bold' }}>
                      {catalog?.board_name} // {catalog?.grade_tier}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: item.payment_status === 'completed' ? '#39ff14' : '#ffb86c' }}>
                      ● {item.payment_status.toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#ffffff' }}>{catalog?.subject_name}</h3>
                  <p style={{ color: '#475569', fontSize: '0.8rem', margin: '0 0 1rem 0' }}>Track ID: {item.batches?.batch_name}</p>
                  
                  {/* CRITICAL PORTFOLIO MODULE REQUIREMENT TRACKER */}
                  <div style={{ borderTop: '1px solid #1e293b', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 'bold' }}>MANDATORY TRACKS COMPLIANCE:</span>
                    
                    {catalog?.has_ia && <span style={{ fontSize: '0.8rem', color: '#00f0ff' }}>🔹 Internal Assessment (IA) Track Required</span>}
                    {catalog?.has_ee && <span style={{ fontSize: '0.8rem', color: '#bd93f9' }}>🔹 Extended Essay (EE) Track Required</span>}
                    {catalog?.has_tok && <span style={{ fontSize: '0.8rem', color: '#ffb86c' }}>🔹 Theory of Knowledge (TOK) Requirement</span>}
                    {catalog?.has_board_project && <span style={{ fontSize: '0.8rem', color: '#39ff14' }}>🔹 Board Project / Portfolio Lab Required</span>}
                    
                    {!catalog?.has_ia && !catalog?.has_ee && !catalog?.has_tok && !catalog?.has_board_project && (
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>🔸 Standard Core Theory Metric Only</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}