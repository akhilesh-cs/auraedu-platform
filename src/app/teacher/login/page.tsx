"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase";

export default function TeacherOTPLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false }
      });

      if (error) throw error;
      setStep(2);
      setMessage("TOKEN SENT: Check your email inbox for the faculty authentication key.");
    } catch (err: any) {
      setMessage(`ERROR_LOG: [OTP_GEN_FAIL] -> ${err.message || "Email identity non-existent."}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({ email, token: otpToken, type: 'email' });

      if (error) throw error;
      setMessage("ACCESS GRANTED: Opening faculty control core...");
      router.push("/faculty/dashboard");
    } catch (err: any) {
      setMessage(`ERROR_LOG: [TOKEN_INVALID] -> ${err.message || "Invalid token key."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', padding: '2rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
      <div style={{ maxWidth: '500px', width: '100%', backgroundColor: '#070a13', border: '3px solid #bd93f9', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#0b1329', padding: '0.75rem 1.5rem', borderBottom: '2px solid #bd93f9', color: '#bd93f9', fontWeight: 'bold', fontSize: '0.8rem' }}>
          AURAEDU // FACULTY_OTP_TERMINAL
        </div>

        <div style={{ padding: '2rem' }}>
          {step === 1 ? (
            <form onSubmit={handleRequestOTP}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem' }}>FACULTY EMAIL</label>
                <input type="email" placeholder="faculty@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px' }} required />
              </div>
              <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#bd93f9', color: '#020617', padding: '0.75rem', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                {loading ? "GENERATING..." : "DISPATCH FACULTY OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem' }}>6-DIGIT OTP TOKEN</label>
                <input type="text" placeholder="123456" value={otpToken} onChange={(e) => setOtpToken(e.target.value)} style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px', letterSpacing: '4px', textAlign: 'center' }} required />
              </div>
              <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#50fa7b', color: '#020617', padding: '0.75rem', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                {loading ? "VERIFYING..." : "AUTHORIZE ACCESS"}
              </button>
            </form>
          )}
          {message && <div style={{ marginTop: '1.25rem', border: '1px dashed #334155', padding: '0.75rem', color: '#ffffff', fontSize: '0.8rem', backgroundColor: '#0f172a', textAlign: 'center' }}>{message}</div>}
        </div>
      </div>
    </div>
  );
}