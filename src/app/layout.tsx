import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AuraEdu | Pan-Asia Educational Delivery Node",
  description: "Elite Online Tutoring & Cross-Border Educational Delivery for IB, IGCSE, CBSE, ICSE, and ISC.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
  suppressHydrationWarning // 👈 ADD THIS RIGHT HERE
  style={{ margin: 0, backgroundColor: '#020617', color: '#f1f5f9', fontFamily: 'monospace', boxSizing: 'border-box' }}
>
        
        {/* GLOBAL BRAND HEADER (Appears on every page) */}
        <header style={{ borderBottom: '1px solid #1e293b', backgroundColor: '#090f1f', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontWeight: '800', fontSize: '1.4rem', color: '#fff', letterSpacing: '0.05em' }}>AURAEDU</span>
            <span style={{ fontSize: '0.65rem', color: '#38bdf8', marginLeft: '1rem', border: '1px solid #38bdf8', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>PAN-ASIA NODE</span>
          </div>
          
          {/* LIVE CONTACT COMM LINK */}
          <div style={{ fontSize: '0.8rem', color: '#4ade80', backgroundColor: '#020617', padding: '0.4rem 0.8rem', border: '1px dashed #4ade80', borderRadius: '4px' }}>
            📞 HQ LINK: <a href="tel:+917268804322" style={{ color: '#4ade80', textDecoration: 'none', fontWeight: 'bold' }}>+91 72688 04322</a> | 📍 GORAKHPUR, UP
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
            <a href="/#curriculum" style={{ color: '#94a3b8', textDecoration: 'none' }}>[Curriculum Matrix]</a>
            <a href="/#recruitment" style={{ color: '#94a3b8', textDecoration: 'none' }}>[Teacher Recruitment]</a>
            <a href="/admin" style={{ color: '#f87171', textDecoration: 'none', fontWeight: 'bold' }}>⚡ [Admin Control]</a>
          </div>
        </header>

        {/* INDIVIDUAL PAGE CONTENT */}
        {children}

        {/* ADMINISTRATIVE AND LEADERSHIP HUB (Appears on every page footer) */}
        <section style={{ backgroundColor: '#090f1f', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#38bdf8', marginBottom: '2rem', letterSpacing: '0.05em', textAlign: 'center' }}>
              🛡️ AURAEDU LEADERSHIP & ADMINISTRATION CLUSTER
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', justifyContent: 'center', marginBottom: '2rem' }}>
              
              {/* SON: OWNER PROFILE */}
              <div style={{ backgroundColor: '#020617', border: '1px dashed #38bdf8', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 'bold', border: '1px solid #38bdf8', padding: '0.15rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  ROOT OWNER & SYSTEM DESIGNER
                </span>
                <img src="/images/son.jpg" alt="Mr. Ansh Srivastava - Owner" style={{ width: '180px', height: '180px', borderRadius: '50%', border: '2px solid #38bdf8', backgroundColor: '#1e293b', objectFit: 'cover', margin: '0 auto 1rem auto', display: 'block' }} />
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>Mr. Ansh Srivastava</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>BTech CSE Final Year</div>
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '1rem', lineHeight: '1.4', textAlign: 'left', borderTop: '1px solid #1e293b', paddingTop: '0.75rem' }}>
                  Principal platform architect managing global API integration vectors, network nodes, and deployment protocols for AuraEdu.
                </p>
              </div>

              {/* PARENT: ADMIN PROFILE */}
              <div style={{ backgroundColor: '#020617', border: '1px dashed #a78bfa', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 'bold', border: '1px solid #a78bfa', padding: '0.15rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>
                  CO-ADMINISTRATOR & OPERATIONS
                </span>
                <img src="/images/owner.jpg" alt="Mr. Akhilesh Kumar Srivastava" style={{ width: '180px', height: '180px', borderRadius: '50%', border: '2px solid #a78bfa', backgroundColor: '#1e293b', objectFit: 'cover', margin: '0 auto 1rem auto', display: 'block' }} />
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>Mr. Akhilesh Kumar Srivastava</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>MCA, M.Sc. (IT)</div>
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '1rem', lineHeight: '1.4', textAlign: 'left', borderTop: '1px solid #1e293b', paddingTop: '0.75rem' }}>
                  Supervises institutional compliance metrics, advanced technical curriculum distribution across national boards, and data architecture operations.
                </p>
              </div>

            </div>

            {/* PHYSICAL ADDRESS LOCATOR */}
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem', border: '1px solid #1e293b', borderRadius: '4px', backgroundColor: '#020617', textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
              🛰️ <span style={{ color: '#fff', fontWeight: 'bold' }}>PHYSICAL NODE LOCATOR:</span> Gorakhpur, UP, India - 273015 <br />
              📞 <span style={{ color: '#fff', fontWeight: 'bold' }}>DIRECT HOTLINE:</span> <a href="tel:+917268804322" style={{ color: '#38bdf8', textDecoration: 'none' }}>+91 72688 04322</a>
            </div>

          </div>
        </section>

        {/* SYSTEM BOTTOM LINE */}
        <footer style={{ backgroundColor: '#020617', padding: '1.5rem 2rem', textAlign: 'center', fontSize: '0.7rem', color: '#475569' }}>
          © 2026 AURAEDU ENTERPRISE ORCHESTRATION TERMINAL. SYSTEMS CONNECTED TO LOCAL TELEMETRY NODES. ALL CHANNELS ENCRYPTED.
        </footer>

      </body>
    </html>
  );
}