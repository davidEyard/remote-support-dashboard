export default function Navbar({ onShip }) {
  return (
    <div style={bar}>
      <div style={brand}>Support Desk Dashboard</div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={links}>
          <span style={active}>Tickets</span>
          <span style={link}>Knowledge Base</span>
        </div>

        <button style={shipBtn} onClick={onShip}>
          SHIP
        </button>
      </div>
    </div>
  );
}

// styles unchanged...
const bar = {
  background: "#2563eb",
  color: "white",
  padding: "14px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const brand = { fontWeight: 900, letterSpacing: 0.2 };
const links = { display: "flex", gap: 14, fontWeight: 800 };
const active = { background: "rgba(255,255,255,0.18)", padding: "6px 10px", borderRadius: 10 };
const link = { opacity: 0.9, padding: "6px 10px", borderRadius: 10 };

const shipBtn = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.35)",
  background: "rgba(255,255,255,0.18)",
  color: "white",
  fontWeight: 900,
  cursor: "pointer",
};