"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase";

export default function AuraEduHomePage() {
  const router = useRouter();
  const [visitorCount, setVisitorCount] = useState<number>(14230);
  const [activeDemos, setActiveDemos] = useState<number>(42);
  const [globalTeachers, setGlobalTeachers] = useState<number>(186);

  useEffect(() => {
    // SECURITY TERMINAL INTERCEPTOR: Routes active sessions to designated dashboards
    const checkUserSession = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

          if (profile?.role === "student") {
            router.push("/student/dashboard");
          } else if (profile?.role === "teacher") {
            router.push("/faculty/dashboard");
          } else if (profile?.role === "admin") {
            router.push("/admin/dashboard");
          }
        }
      } catch (err) {
        console.error("Telemetry intercept loop down:", err);
      }
    };

    checkUserSession();
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      if (Math.random() > 0.7) {
        setActiveDemos(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', padding: '2rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
      
      {/* CENTRALIZED ORCHESTRATION TERMINAL FRAME */}
      <div style={{ maxWidth: '1200px', width: '100%', backgroundColor: '#070a13', border: '3px solid #00f0ff', boxShadow: '0 0 25px rgba(0, 240, 255, 0.15)', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
        
        {/* TERMINAL HEADER HEADER BAR */}
        <div style={{ backgroundColor: '#0b1329', padding: '0.75rem 1.5rem', borderBottom: '2px solid #00f0ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5555', display: 'inline-block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffb86c', display: 'inline-block' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#50fa7b', display: 'inline-block' }}></span>
          </div>
          <div style={{ color: '#00f0ff', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px' }}>AURAEDU-PAN-ASIA // LIVE_NODE_CORE</div>
          <div style={{ color: '#475569', fontSize: '0.75rem' }}>SYS_STATUS: ACTIVE</div>
        </div>

        {/* LIVE COUNTERS METRICS ENGINE */}
        <div style={{ backgroundColor: '#0f172a', borderBottom: '1px dashed #334155', padding: '1rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: '500' }}>
            🌐 PLATFORM ENGINE VISITS: <span style={{ color: '#00f0ff', fontWeight: 'bold' }}>{visitorCount.toLocaleString()}</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: '500' }}>
            📡 DEMO CLASSES COMPLETED: <span style={{ color: '#39ff14', fontWeight: 'bold' }}>{activeDemos}</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: '500' }}>
            🎓 ACTIVE ASIA FACULTY: <span style={{ color: '#bd93f9', fontWeight: 'bold' }}>{globalTeachers}</span>
          </div>
        </div>

        {/* CONTAINER INNER BODY */}
        <div style={{ padding: '2.5rem 2rem' }}>
          
          {/* HERO TITLE MODULE */}
          <section style={{ textAlign: 'center', marginBottom: '3rem', padding: '2rem', border: '1px solid #1e293b', borderRadius: '6px', backgroundColor: '#090d16' }}>
            <h1 style={{ fontSize: '2.2rem', color: '#ffffff', margin: '0 0 1rem 0', fontWeight: '800', letterSpacing: '0.01em', textTransform: 'uppercase' }}>
              Elite Online Tutoring & Cross-Border Educational Delivery
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '900px', margin: '0 auto' }}>
              Synchronized instructional clusters covering IB, IGCSE, AS/A Levels, and National tiers (CBSE, ICSE, ISC). Engineered with flexible modular subject branches across India and broader Asian operations.
            </p>
          </section>

          {/* SPLIT ACCESS ACCELERATOR HUB */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            
            {/* STUDENT NODE HUB */}
            <div style={{ backgroundColor: '#090d16', border: '1px solid #00f0ff', boxShadow: 'inset 0 0 15px rgba(0, 240, 255, 0.05)', borderRadius: '6px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#00f0ff', marginBottom: '0.75rem', letterSpacing: '1px' }}>📥 Student Access Terminal</div>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Initialize split-subject streams, design customized practical frameworks, monitor learning metrics, and process enrollment bills.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button onClick={() => window.location.href='/student/login'} style={{ flex: 1, padding: '0.8rem', border: '1px solid #00f0ff', backgroundColor: 'transparent', color: '#00f0ff', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.9rem', borderRadius: '4px', transition: 'all 0.2s' }}>Sign In</button>
                <button onClick={() => window.location.href='/signup?role=student'} style={{ flex: 1, padding: '0.8rem', border: 'none', backgroundColor: '#00f0ff', color: '#020617', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.9rem', borderRadius: '4px', transition: 'all 0.2s' }}>Register Node</button>
              </div>
            </div>

            {/* TEACHER NODE HUB */}
            <div style={{ backgroundColor: '#090d16', border: '1px solid #bd93f9', boxShadow: 'inset 0 0 15px rgba(189, 147, 249, 0.05)', borderRadius: '6px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#bd93f9', marginBottom: '0.75rem', letterSpacing: '1px' }}>🎓 Faculty Control Node</div>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Configure subject expert parameters across Theory or Portfolio groups, log lecture tracking metadata, and manage global payout configurations.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button onClick={() => window.location.href='/teacher/login'} style={{ flex: 1, padding: '0.8rem', border: '1px solid #bd93f9', backgroundColor: 'transparent', color: '#bd93f9', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.9rem', borderRadius: '4px' }}>Sign In</button>
                <button onClick={() => window.location.href='/signup?role=teacher'} style={{ flex: 1, padding: '0.8rem', border: 'none', backgroundColor: '#bd93f9', color: '#020617', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.9rem', borderRadius: '4px' }}>Apply Node</button>
              </div>
            </div>
          </section>

          {/* MATRIX COST SCHEMA */}
          <section id="curriculum" style={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '6px', padding: '2rem' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '1.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ color: '#cbd5e1' }}>📊 SPLIT-ENGAGEMENT FEE MATRIX (INR Valuations)</span>
              <span style={{ fontSize: '0.8rem', color: '#39ff14', border: '1px dashed #39ff14', padding: '0.3rem 0.6rem', borderRadius: '4px', backgroundColor: '#020617' }}>⚡ BUNDLE DISCOUNT: 20% OFF ALL COMBINED PACKAGES</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #334155', color: '#cbd5e1', backgroundColor: '#0f172a' }}>
                    <th style={{ padding: '1rem', fontWeight: 'bold' }}>CURRICULUM LEVEL</th>
                    <th style={{ padding: '1rem', fontWeight: 'bold' }}>OPTION 1: CORE THEORY (HOURLY)</th>
                    <th style={{ padding: '1rem', fontWeight: 'bold' }}>OPTION 2: PORTFOLIO / IA / PRACTICALS</th>
                    <th style={{ padding: '1rem', fontWeight: 'bold' }}>MANDATORY PROJECT MODULE ADD-ON</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#ffffff' }}>IB Diploma (Grades 11-12)</td>
                    <td style={{ padding: '1rem', color: '#00f0ff', fontWeight: 'bold' }}>₹1,500 / Hour</td>
                    <td style={{ padding: '1rem', color: '#94a3b8' }}>IA: ₹30,000 | EE: ₹20,000 | TOK: ₹10,000</td>
                    <td style={{ padding: '1rem', color: '#ff5555', fontWeight: 'bold' }}>Tracked natively per group</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#ffffff' }}>IGCSE / AS & A Level</td>
                    <td style={{ padding: '1rem', color: '#00f0ff', fontWeight: 'bold' }}>9-10: ₹1,200/Hr | AS/A: ₹1,500/Hr</td>
                    <td style={{ padding: '1rem', color: '#94a3b8' }}>Practical Lab Portfolios Indexed</td>
                    <td style={{ padding: '1rem', color: '#ff5555', fontWeight: 'bold' }}>Integrated Tracking Matrix</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1e293b', backgroundColor: '#0f172a' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#00f0ff' }}>CBSE Secondary (Grades 9-10)</td>
                    <td style={{ padding: '1rem', color: '#00f0ff', fontWeight: 'bold' }}>₹1,200 / Hour</td>
                    <td style={{ padding: '1rem', color: '#94a3b8' }}>Integrated Practicals Mapped</td>
                    <td style={{ padding: '1rem', color: '#39ff14', fontWeight: 'bold' }}>CBSE Portfolios: ₹10,000</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1e293b', backgroundColor: '#0f172a' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#ffffff' }}>CBSE Senior Sec. (Grades 11-12)</td>
                    <td style={{ padding: '1rem', color: '#00f0ff', fontWeight: 'bold' }}>₹1,200 / Hour</td>
                    <td style={{ padding: '1rem', color: '#94a3b8' }}>Internal Skill Boards Mapped</td>
                    <td style={{ padding: '1rem', color: '#39ff14', fontWeight: 'bold' }}>CBSE Projects: ₹10,000</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#bd93f9' }}>ICSE Secondary (Grades 9-10)</td>
                    <td style={{ padding: '1rem', color: '#00f0ff', fontWeight: 'bold' }}>₹1,200 / Hour</td>
                    <td style={{ padding: '1rem', color: '#94a3b8' }}>Group III Skill Practicals Mapping</td>
                    <td style={{ padding: '1rem', color: '#39ff14', fontWeight: 'bold' }}>ICSE Portfolios: ₹10,000</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#ffffff' }}>ISC Senior Sec. (Grades 11-12)</td>
                    <td style={{ padding: '1rem', color: '#00f0ff', fontWeight: 'bold' }}>₹1,500 / Hour</td>
                    <td style={{ padding: '1rem', color: '#94a3b8' }}>Lab & Viva Portfolio Tracks</td>
                    <td style={{ padding: '1rem', color: '#39ff14', fontWeight: 'bold' }}>ISC Portfolios: ₹10,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>

        {/* SECURE TELEMETRY FOOTER */}
        <div style={{ backgroundColor: '#0b1329', borderTop: '1px solid #334155', padding: '1rem 2rem', color: '#475569', fontSize: '0.75rem', textAlign: 'center', letterSpacing: '1px' }}>
          © 2026 AURAEDU ENTERPRISE ORCHESTRATION TERMINAL. SYSTEMS ENCRYPTED SECURELY VIA DEPLOYED LOCAL TELEMETRY NODES.
        </div>

      </div>
    </div>
  );
}