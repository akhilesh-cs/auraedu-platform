"use client";

import React, { useState, useEffect } from 'react';

export default function AuraEduHomePage() {
  const [visitorCount, setVisitorCount] = useState<number>(14230);
  const [activeDemos, setActiveDemos] = useState<number>(42);
  const [globalTeachers, setGlobalTeachers] = useState<number>(186);

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
    <>
      {/* RECONNAISSANCE LIVE COUNTERS MATRIX - ENHANCED VISIBILITY */}
      <div style={{ backgroundColor: '#0b1329', borderBottom: '2px solid #00f0ff', padding: '1rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', textAlign: 'center' }}>
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

      {/* STRETCHED MAIN CONTENT WRAPPER */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        
        {/* HERO SECTION */}
        <section style={{ textAlign: 'center', marginBottom: '3rem', padding: '2.5rem', border: '2px solid #334155', borderRadius: '8px', backgroundColor: '#0f172a' }}>
          <h1 style={{ fontSize: '2.4rem', color: '#ffffff', margin: '0 0 1rem 0', fontWeight: '800', letterSpacing: '0.02em' }}>
            Elite Online Tutoring & Cross-Border Educational Delivery
          </h1>
          <p style={{ color: '#f1f5f9', fontSize: '1rem', lineHeight: '1.7', maxWidth: '1000px', margin: '0 auto' }}>
            Synchronized instructional clusters covering IB, IGCSE, AS/A Levels, and National tiers (CBSE, ICSE, ISC). Engineered with flexible modular subject branches across India and broader Asian operations.
          </p>
        </section>

        {/* ACCESS ROUTING HUB */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* STUDENT CARD */}
          <div style={{ backgroundColor: '#0f172a', border: '2px solid #00f0ff', borderRadius: '8px', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#00f0ff', marginBottom: '0.75rem' }}>📥 Student Access Terminal</div>
              <p style={{ color: '#ffffff', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Initialize split-subject streams, design customized practical frameworks, monitor learning metrics, and process enrollment bills.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={() => window.location.href='/student/login'} style={{ flex: 1, padding: '0.8rem', border: '2px solid #00f0ff', backgroundColor: 'transparent', color: '#00f0ff', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1rem', borderRadius: '4px' }}>Sign In</button>
              <button onClick={() => window.location.href='/student/register'} style={{ flex: 1, padding: '0.8rem', border: 'none', backgroundColor: '#00f0ff', color: '#020617', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1rem', borderRadius: '4px' }}>Register Node</button>
            </div>
          </div>

          {/* TEACHER CARD */}
          <div style={{ backgroundColor: '#0f172a', border: '2px solid #bd93f9', borderRadius: '8px', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#bd93f9', marginBottom: '0.75rem' }}>🎓 Faculty Control Node</div>
              <p style={{ color: '#ffffff', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Configure subject expert parameters across Theory or Portfolio groups, log lecture tracking metadata, and manage global payout configurations.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={() => window.location.href='/teacher/login'} style={{ flex: 1, padding: '0.8rem', border: '2px solid #bd93f9', backgroundColor: 'transparent', color: '#bd93f9', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1rem', borderRadius: '4px' }}>Sign In</button>
              <button onClick={() => window.location.href='/teacher/register'} style={{ flex: 1, padding: '0.8rem', border: 'none', backgroundColor: '#bd93f9', color: '#020617', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1rem', borderRadius: '4px' }}>Apply Node</button>
            </div>
          </div>
        </section>

        {/* HIGH-CONTRAST PRICING MATRIX TABLE */}
        <section id="curriculum" style={{ backgroundColor: '#0f172a', border: '2px solid #334155', borderRadius: '8px', padding: '2.5rem', marginBottom: '3rem' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '1.5rem', borderBottom: '2px solid #334155', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <span>📊 SPLIT-ENGAGEMENT FEE MATRIX (INR Valuations)</span>
            <span style={{ fontSize: '0.85rem', color: '#39ff14', border: '2px dashed #39ff14', padding: '0.3rem 0.6rem', borderRadius: '4px', backgroundColor: '#020617' }}>⚡ BUNDLE DISCOUNT: 20% OFF ALL COMBINED PACKAGES</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1', color: '#ffffff', backgroundColor: '#1e293b' }}>
                  <th style={{ padding: '1.2rem 1rem', fontWeight: 'bold' }}>CURRICULUM LEVEL</th>
                  <th style={{ padding: '1.2rem 1rem', fontWeight: 'bold' }}>OPTION 1: CORE THEORY (HOURLY)</th>
                  <th style={{ padding: '1rem 1rem', fontWeight: 'bold' }}>OPTION 2: PORTFOLIO / IA / PRACTICALS</th>
                  <th style={{ padding: '1.2rem 1rem', fontWeight: 'bold' }}>MANDATORY PROJECT MODULE ADD-ON</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #475569' }}>
                  <td style={{ padding: '1.2rem 1rem', fontWeight: 'bold', color: '#ffffff' }}>IB Diploma (Grades 11-12)</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#00f0ff', fontWeight: 'bold' }}>₹1,500 / Hour</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#ffffff' }}>IA: ₹30,000 | EE: ₹20,000 | TOK: ₹10,000</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#ff5555', fontWeight: 'bold' }}>Tracked natively per group</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #475569' }}>
                  <td style={{ padding: '1.2rem 1rem', fontWeight: 'bold', color: '#ffffff' }}>IGCSE / AS & A Level</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#00f0ff', fontWeight: 'bold' }}>9-10: ₹1,200/Hr | AS/A: ₹1,500/Hr</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#ffffff' }}>Practical Lab Portfolios Indexed</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#ff5555', fontWeight: 'bold' }}>Integrated Tracking Matrix</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #475569', backgroundColor: '#1e293b' }}>
                  <td style={{ padding: '1.2rem 1rem', fontWeight: 'bold', color: '#00f0ff' }}>CBSE Secondary (Grades 9-10)</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#00f0ff', fontWeight: 'bold' }}>₹1,200 / Hour</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#ffffff' }}>Integrated Practicals Mapped</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#39ff14', fontWeight: 'bold' }}>CBSE Portfolios: ₹10,000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #475569', backgroundColor: '#1e293b' }}>
                  <td style={{ padding: '1.2rem 1rem', fontWeight: 'bold', color: '#ffffff' }}>CBSE Senior Sec. (Grades 11-12)</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#00f0ff', fontWeight: 'bold' }}>₹1,200 / Hour</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#ffffff' }}>Internal Skill Boards Mapped</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#39ff14', fontWeight: 'bold' }}>CBSE Projects: ₹10,000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #475569' }}>
                  <td style={{ padding: '1.2rem 1rem', fontWeight: 'bold', color: '#bd93f9' }}>ICSE Secondary (Grades 9-10)</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#00f0ff', fontWeight: 'bold' }}>₹1,200 / Hour</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#ffffff' }}>Group III Skill Practicals Mapping</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#39ff14', fontWeight: 'bold' }}>ICSE Portfolios: ₹10,000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #475569' }}>
                  <td style={{ padding: '1.2rem 1rem', fontWeight: 'bold', color: '#ffffff' }}>ISC Senior Sec. (Grades 11-12)</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#00f0ff', fontWeight: 'bold' }}>₹1,500 / Hour</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#ffffff' }}>Lab & Viva Portfolio Tracks</td>
                  <td style={{ padding: '1.2rem 1rem', color: '#39ff14', fontWeight: 'bold' }}>ISC Portfolios: ₹10,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </>
  );
}