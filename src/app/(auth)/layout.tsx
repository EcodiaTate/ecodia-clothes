export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-container">
      <div className="auth-inner">
        {/* Branding */}
        <div className="auth-brand">
          <div className="auth-brand-title">
            THRIFT<span>.eco</span>
          </div>
          <p className="auth-brand-sub">Buy &amp; sell pre-loved</p>
        </div>

        {/* Auth card */}
        <div className="auth-card">
          {children}
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            height: 2,
            width: 48,
            background: "var(--color-rust)",
            margin: "0 auto",
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  );
}
