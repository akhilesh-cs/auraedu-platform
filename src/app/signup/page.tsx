"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlRole = params.get("role");
      if (urlRole === "student" || urlRole === "teacher") {
        setRole(urlRole);
      }
    }
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (error) {
        setMessage(`ERROR_LOG: [${error.status || "AUTH_ERR"}] -> ${error.message}`);
      } else {
        setMessage("INITIALIZATION SUCCESS: Check your email for node validation uplink.");
      }
    } catch (err: any) {
      setMessage(`ERROR_LOG: ${err.message || "System execution exception."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', padding: '2rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
      
      {/* CENTRALIZED ORCHESTRATION TERMINAL FRAME */}
      <div style={{ maxWidth: '650px', width: '100%', backgroundColor: '#070a13', border: '3px solid #00f0ff', boxShadow: '0 0 25px rgba(0, 240, 255, 0.15)', borderRadius: '12px', overflow: 'hidden' }}>
        
        {/* TERMINAL HEADER HEADER BAR */}
        <div style={{ backgroundColor: '#0b1329', padding: '0.75rem 1.5rem', borderBottom: '2px solid #00f0ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5555', display: 'inline-block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffb86c', display: 'inline-block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#50fa7b', display: 'inline-block' }}></span>
          </div>
          <div style={{ color: '#00f0ff', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px' }}>AURAEDU-PAN-ASIA // REGISTRATION_NODE</div>
          <div style={{ color: '#475569', fontSize: '0.75rem' }}>SYS_STATUS: READY</div>
        </div>

        {/* TOP CONTACT BANNER MATRIX */}
        <div style={{ backgroundColor: '#0f172a', borderBottom: '1px dashed #334155', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', fontSize: '0.8rem', color: '#e2e8f0' }}>
          <div>📞 HQ LINK: <span style={{ color: '#00f0ff' }}>+91 72688 04322</span></div>
          <div>📍 GORAKHPUR, UP</div>
        </div>

        {/* CONTAINER INNER BODY */}
        <div style={{ padding: '2.5rem 2rem' }}>
          
          <form onSubmit={handleSignup} style={{ backgroundColor: '#090d16', border: '1px solid #334155', padding: '2rem', borderRadius: '6px' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#00f0ff', margin: '0 0 1.5rem 0', fontWeight: 'bold', letterSpacing: '1px' }}>
              // CREATE PORTAL ACCOUNT
            </h2>
            
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>FULL NAME</label>
              <input 
                type="text" 
                placeholder="Initialize string input" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px', outline: 'none' }}
                required
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>EMAIL ADDRESS</label>
              <input 
                type="email" 
                placeholder="identity@domain.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px', outline: 'none' }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>PASSWORD</label>
              <input 
                type="password" 
                placeholder="••••••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px', outline: 'none' }}
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>CHOOSE YOUR PORTAL ROLE</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  style={{ padding: '0.75rem', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.85rem', borderRadius: '4px', border: role === "student" ? '2px solid #00f0ff' : '1px solid #334155', backgroundColor: role === "student" ? 'rgba(0, 240, 255, 0.1)' : 'transparent', color: role === "student" ? '#00f0ff' : '#64748b', transition: 'all 0.2s' }}
                >
                  STUDENT NODE
                </button>
                <button
                  type="button"
                  onClick={() => setRole("teacher")}
                  style={{ padding: '0.75rem', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.85rem', borderRadius: '4px', border: role === "teacher" ? '2px solid #bd93f9' : '1px solid #334155', backgroundColor: role === "teacher" ? 'rgba(189, 147, 249, 0.1)' : 'transparent', color: role === "teacher" ? '#bd93f9' : '#64748b', transition: 'all 0.2s' }}
                >
                  FACULTY NODE
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', backgroundColor: role === 'student' ? '#00f0ff' : '#bd93f9', color: '#020617', padding: '0.8rem', border: 'none', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '1px', transition: 'all 0.2s', opacity: loading ? 0.5 : 1 }}
            >
              {loading ? "SYNCHRONIZING..." : "REGISTER CORE NODE"}
            </button>

            {message && (
              <div style={{ marginTop: '1.5rem', border: '1px dashed #334155', padding: '0.75rem', borderRadius: '4px', fontSize: '0.8rem', color: '#e2e8f0', textAlign: 'center', backgroundColor: '#0f172a' }}>
                {message}
              </div>
            )}
          </form>

        </div>

        {/* SECURE TELEMETRY FOOTER */}
        <div style={{ backgroundColor: '#0b1329', borderTop: '1px solid #334155', padding: '1rem 2rem', color: '#475569', fontSize: '0.75rem', textAlign: 'center', letterSpacing: '1px' }}>
          © 2026 AURAEDU ENTERPRISE ORCHESTRATION TERMINAL. SYSTEMS CONNECTED TO LOCAL TELEMETRY NODES. ALL CHANNELS ENCRYPTED.
        </div>

      </div>
    </div>
  );
}