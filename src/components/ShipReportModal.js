export default function ShipReportModal({ isOpen, onClose, report, onDownloadJson, onDownloadCsv }) {
  if (!isOpen) return null;

  return (
    <div style={backdrop} onMouseDown={onClose}>
      <div style={modal} onMouseDown={(e) => e.stopPropagation()}>
        <div style={header}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>SHIP Report</div>
          <button style={closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={{ color: "#475467", marginBottom: 12 }}>
          Snapshot of your current tickets.
        </div>

        <div style={grid}>
          <Stat label="Total Tickets" value={report.totalTickets} />
          <Stat label="Open" value={report.statusCounts.Open || 0} />
          <Stat label="In Progress" value={report.statusCounts["In Progress"] || 0} />
          <Stat label="Resolved" value={report.statusCounts.Resolved || 0} />
          <Stat label="High Priority Open" value={report.highPriorityOpenCount} />
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Top categories</div>
          {report.topCategories.length === 0 ? (
            <div style={{ color: "#667085" }}>No category data.</div>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 18, color: "#344054" }}>
              {report.topCategories.map((c) => (
                <li key={c.category}>
                  {c.category} — {c.count}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={footer}>
          <button style={secondaryBtn} onClick={onDownloadCsv}>
            Download CSV
          </button>
          <button style={primaryBtn} onClick={onDownloadJson}>
            Download JSON
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={statCard}>
      <div style={{ fontSize: 12, color: "#667085" }}>{label}</div>
      <div style={{ fontWeight: 900, fontSize: 18 }}>{value}</div>
    </div>
  );
}

const backdrop = {
  position: "fixed",
  inset: 0,
  background: "rgba(17, 24, 39, 0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  zIndex: 9999,
};

const modal = {
  width: "min(720px, 100%)",
  background: "white",
  borderRadius: 14,
  border: "1px solid #e6eaf0",
  boxShadow: "0 20px 70px rgba(0,0,0,0.35)",
  padding: 16,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
};

const closeBtn = {
  border: "1px solid #e6eaf0",
  background: "white",
  borderRadius: 10,
  padding: "6px 10px",
  cursor: "pointer",
  fontWeight: 900,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 10,
};

const statCard = {
  border: "1px solid #eef2f6",
  borderRadius: 12,
  padding: 12,
  background: "#f9fafb",
};

const footer = {
  marginTop: 16,
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
};

const primaryBtn = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #1d4ed8",
  background: "#2563eb",
  color: "white",
  fontWeight: 900,
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #d0d5dd",
  background: "white",
  color: "#111827",
  fontWeight: 900,
  cursor: "pointer",
};