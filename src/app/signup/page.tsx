"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from "@/utils/supabase";

function ComprehensiveRegistrationForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [subjects, setSubjects] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const urlRole = searchParams.get("role");
    if (urlRole === "student" || urlRole === "teacher") {
      setRole(urlRole);
    }
  }, [searchParams]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();
      
      // 1. Initialize passwordless onboarding via Supabase Auth
      // Generates a magic link / setup token delivered directly to the node email
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password: Math.random().toString(36) + Math.random().toString(36), // Secure randomized backing string
        options: {
          data: {
            full_name: fullName,
            phone_number: phone,
            role_assignment: role,
            subjects_matrix: subjects
          },
        },
      });

      if (authError) throw authError;

      // 2. Synchronize telemetry parameters to our public profiles database
      if (data?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: fullName,
              phone_number: phone,
              portal_role: role,
              selected_subjects: subjects
            }
          ]);
          
        if (profileError) throw profileError;
      }

      setMessage(`SUCCESS: Registration payload mapped. Secure activation OTP matrix dispatched to ${email}. Check mailbox.`);
    } catch (err: any) {
      setMessage(`ERROR_LOG: [SYS_FAULT] -> ${err.message || JSON.stringify(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const currentThemeColor = role === 'student' ? '#00f0ff' : '#bd93f9';

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', padding: '2rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
      <div style={{ maxWidth: '650px', width: '100%', backgroundColor: '#070a13', border: `3px solid ${currentThemeColor}`, boxShadow: `0 0 25px ${currentThemeColor}25`, borderRadius: '12px', overflow: 'hidden' }}>
        
        <div style={{ backgroundColor: '#0b1329', padding: '0.75rem 1.5rem', borderBottom: `2px solid ${currentThemeColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: currentThemeColor, fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px' }}>
            AURAEDU-PAN-ASIA // REGISTRATION_NODE
          </div>
          <div style={{ color: '#475569', fontSize: '0.75rem' }}>OTP_MODE: ACTIVE</div>
        </div>

        <div style={{ padding: '2rem' }}>
          <form onSubmit={handleRegister} style={{ backgroundColor: '#090d16', border: '1px solid #334155', padding: '1.5rem', borderRadius: '6px' }}>
            <h2 style={{ fontSize: '1.1rem', color: currentThemeColor, margin: '0 0 1.25rem 0', fontWeight: 'bold' }}>// INITIALIZE SYSTEM ONBOARDING</h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.4rem' }}>FULL NAME</label>
              <input type="text" placeholder="e.g. John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.65rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px', outline: 'none' }} required />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.4rem' }}>EMAIL ADDRESS (FOR SECURE OTP UPLINK)</label>
              <input type="email" placeholder="name@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.65rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px', outline: 'none' }} required />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.4rem' }}>COMMS PHONE NUMBER</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.65rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px', outline: 'none' }} required />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.4rem' }}>CURRICULUM MODULES & SUBJECT MATRIX</label>
              <input type="text" placeholder="e.g. IB Physics HL, IGCSE Math, CBSE Chemistry" value={subjects} onChange={(e) => setSubjects(e.target.value)} style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.65rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px', outline: 'none' }} required />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.4rem' }}>ROLE ASSIGNMENT</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button type="button" onClick={() => setRole("student")} style={{ padding: '0.6rem', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold', borderRadius: '4px', border: role === "student" ? '2px solid #00f0ff' : '1px solid #334155', backgroundColor: role === "student" ? 'rgba(0, 240, 255, 0.1)' : 'transparent', color: role === "student" ? '#00f0ff' : '#64748b' }}>STUDENT NODE</button>
                <button type="button" onClick={() => setRole("teacher")} style={{ padding: '0.6rem', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold', borderRadius: '4px', border: role === "teacher" ? '2px solid #bd93f9' : '1px solid #334155', backgroundColor: role === "teacher" ? 'rgba(189, 147, 249, 0.1)' : 'transparent', color: role === "teacher" ? '#bd93f9' : '#64748b' }}>FACULTY NODE</button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: currentThemeColor, color: '#020617', padding: '0.75rem', border: 'none', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? "TRANSMITTING TELEMETRY..." : "REGISTER CORE NODE"}
            </button>

            {message && <div style={{ marginTop: '1.25rem', border: '1px dashed #334155', padding: '0.75rem', borderRadius: '4px', fontSize: '0.8rem', color: '#e2e8f0', textAlign: 'center', backgroundColor: '#0f172a', wordBreak: 'break-word' }}>{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ color: '#00f0ff', fontFamily: 'monospace', padding: '2rem' }}>BOOTING_REGISTRATION_SYSTEM...</div>}>
      <ComprehensiveRegistrationForm />
    </Suspense>
  );
}