\"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase";

export default function OTPLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [step, setStep] = useState<1 | 2>(1); // Step 1: Send OTP, Step 2: Verify OTP
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const supabase = createClient();

  // Send single-use OTP key to email
  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false } // Ensures non-registered visitors can't bypass registration
      });

      if (error) throw error;
      setStep(2);
      setMessage("TOKEN SENT: Check your email inbox for the system authentication key.");
    } catch (err: any) {
      setMessage(`ERROR_LOG: [OTP_GEN_FAIL] -> ${err.message || "Email identity non-existent."}`);
    } finally {
      setLoading(false);
    }
  };

  // Verify token and grant entry matrix
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otpToken,
        type: 'email'
      });

      if (error) throw error;

      setMessage("ACCESS GRANTED: Opening portal core telemetry...");
      // Check roles or route immediately
      router.push("/student/dashboard");
    } catch (err: any) {
      setMessage(`ERROR_LOG: [TOKEN_INVALID] -> ${err.message || "Invalid or expired key."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', padding: '2rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
      <div style={{ maxWidth: '500px', width: '100%', backgroundColor: '#070a13', border: '3px solid #00f0ff', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#0b1329', padding: '0.75rem 1.5rem', borderBottom: '2px solid #00f0ff', color: '#00f0ff', fontWeight: 'bold', fontSize: '0.8rem' }}>
          AURAEDU // SECURE_OTP_TERMINAL
        </div>

        <div style={{ padding: '2rem' }}>
          {step === 1 ? (
            <form onSubmit={handleRequestOTP}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem' }}>ENTER REGISTERED EMAIL</label>
                <input type="email" placeholder="identity@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px' }} required />
              </div>
              <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#00f0ff', color: '#020617', padding: '0.75rem', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                {loading ? "GENERATING TOKEN..." : "DISPATCH SYSTEM OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem' }}>ENTER SECURE 6-DIGIT OTP TOKEN</label>
                <input type="text" placeholder="123456" value={otpToken} onChange={(e) => setOtpToken(e.target.value)} style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '0.75rem', color: '#ffffff', fontFamily: 'monospace', borderRadius: '4px', letterSpacing: '4px', textAlign: 'center' }} required />
              </div>
              <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#50fa7b', color: '#020617', padding: '0.75rem', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                {loading ? "VERIFYING MATRIX..." : "AUTHORIZE PROFILE GATEWAYS"}
              </button>
              <button type="button" onClick={() => setStep(1)} style={{ width: '100%', marginTop: '0.5rem', background: 'none', color: '#64748b', border: 'none', fontSize: '0.75rem', textDecoration: 'underline', cursor: 'pointer' }}>Change Email Parameter</button>
            </form>
          )}

          {message && <div style={{ marginTop: '1.25rem', border: '1px dashed #334155', padding: '0.75rem', color: '#ffffff', fontSize: '0.8rem', backgroundColor: '#0f172a', textAlign: 'center' }}>{message}</div>}
        </div>
      </div>
    </div>
  );
}