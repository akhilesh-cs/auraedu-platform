"use client";

import React, { useState } from 'react';
import { createClient } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function TeacherLoginPage() {
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
        setMessage("AUTHENTICATION GRANTED: Directing to Faculty Terminal...");
        router.push("/faculty/dashboard");
      }
    } catch (err: any) {
      setMessage(`ERROR_LOG: ${err.message || "System authentication mismatch."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', padding: '2rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
      <div style={{ maxWidth: '450px', width: '100%', backgroundColor: '#070a13', border: '3px solid #bd93f9', boxShadow: '0 0 25px rgba(189, 147, 249, 0.15)', borderRadius: '12px', overflow: 'hidden' }}>
        
        <div style={{ backgroundColor: '#0b1329', padding: '0.75rem 1.5rem', borderBottom: '2px solid #bd93f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#bd93f9', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px' }}>AURAEDU // FACULTY_AUTH_NODE</div>
          <div style={{ color: '#475569', fontSize: '0.75rem' }}>SECURE</div>
        </div>

        <div style={{ padding: '2rem' }}>
          <form onSubmit={handleLogin} style={{ backgroundColor: '#090d16', border: '1px solid #334155', padding: '1.5rem', borderRadius: '6px' }}>
            <h2 style={{ fontSize: '1.1rem', color: '#bd93f9', margin: '0 0 1.25rem 0', fontWeight: 'bold' }}>// STAFF IDENTITY VERIFICATION</h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>FACULTY EMAIL</label>
              <input type="email" placeholder="faculty@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px', outline: 'none' }} required />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>ACCESS DECRYPTION KEY</label>
              <input type="password" placeholder="••••••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px', outline: 'none' }} required />
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#bd93f9', color: '#020617', padding: '0.8rem', border: 'none', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? "DECRYPTING MATRIX..." : "AUTHORIZE HUB ACCESS"}
            </button>

            {message && <div style={{ marginTop: '1.25rem', border: '1px dashed #334155', padding: '0.75rem', borderRadius: '4px', fontSize: '0.8rem', color: '#e2e8f0', textAlign: 'center', backgroundColor: '#0f172a' }}>{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}