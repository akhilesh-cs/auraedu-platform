"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase";

export default function StudentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setMessage(`ERROR_LOG: [AUTH_ERR] -> ${error.message}`);
      } else {
        setMessage("AUTHENTICATION GRANTED: Opening Student Dashboard Terminal...");
        router.push("/student/dashboard");
      }
    } catch (err: any) {
      setMessage(`ERROR_LOG: ${err.message || "System authentication exception."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', padding: '2rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
      <div style={{ maxWidth: '650px', width: '100%', backgroundColor: '#070a13', border: '3px solid #00f0ff', boxShadow: '0 0 25px rgba(0, 240, 255, 0.15)', borderRadius: '12px', overflow: 'hidden' }}>
        
        <div style={{ backgroundColor: '#0b1329', padding: '0.75rem 1.5rem', borderBottom: '2px solid #00f0ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#00f0ff', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px' }}>AURAEDU // STUDENT_ACCESS</div>
          <div style={{ color: '#475569', fontSize: '0.75rem' }}>GORAKHPUR_NODE</div>
        </div>

        <div style={{ padding: '2.5rem 2rem' }}>
          <form onSubmit={handleLogin} style={{ backgroundColor: '#090d16', border: '1px solid #334155', padding: '2rem', borderRadius: '6px' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#00f0ff', margin: '0 0 1.5rem 0', fontWeight: 'bold' }}>// INITIALIZE STUDENT ACCESS</h2>
            
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>STUDENT NETWORK EMAIL</label>
              <input type="email" placeholder="identity@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px', outline: 'none' }} required />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>SECURITY ACCESS TOKEN</label>
              <input type="password" placeholder="••••••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px', outline: 'none' }} required />
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#00f0ff', color: '#020617', padding: '0.8rem', border: 'none', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? "VERIFYING TOKENS..." : "INITIALIZE STUDENT ACCESS"}
            </button>

            {message && <div style={{ marginTop: '1.5rem', border: '1px dashed #334155', padding: '0.75rem', borderRadius: '4px', fontSize: '0.8rem', color: '#e2e8f0', textAlign: 'center', backgroundColor: '#0f172a' }}>{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}