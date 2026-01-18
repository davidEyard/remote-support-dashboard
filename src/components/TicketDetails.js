export default function TicketDetails({ ticket, onUpdateStatus }) {
  return (
    <div style={panelStyle}>
      <h3 style={panelTitle}>Ticket Details</h3>

      {!ticket ? (
        <div style={{ padding: 12, color: "#667085" }}>
          Select a ticket to view details.
        </div>
      ) : (
        <>
          <h2 style={{ margin: "10px 0 12px" }}>{ticket.title}</h2>

          <div style={metaRow}>
            <Meta label="Status" value={ticket.status} />
            <Meta label="Priority" value={ticket.priority} />
            <Meta label="Category" value={ticket.category} />
          </div>

          <div style={{ marginTop: 14, color: "#344054", lineHeight: 1.5 }}>
            {ticket.description}
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Steps Taken:</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: "#344054" }}>
              {ticket.stepsTaken.map((s, idx) => (
                <li key={idx} style={{ marginBottom: 8 }}>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
            <button
              onClick={() => onUpdateStatus("In Progress")}
              style={buttonSecondary}
            >
              Mark In Progress
            </button>
            <button
              onClick={() => onUpdateStatus("Resolved")}
              style={buttonPrimary}
            >
              Resolve Ticket
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div style={{ minWidth: 140 }}>
      <div style={{ fontSize: 12, color: "#667085" }}>{label}</div>
      <div style={{ fontWeight: 800 }}>{value}</div>
    </div>
  );
}

const panelStyle = {
  background: "white",
  borderRadius: 10,
  padding: 14,
  border: "1px solid #e6eaf0",
};

const panelTitle = {
  margin: "0 0 12px",
  fontWeight: 700,
};

const metaRow = {
  display: "flex",
  gap: 18,
  flexWrap: "wrap",
  paddingBottom: 12,
  borderBottom: "1px solid #eef2f6",
};

const buttonPrimary = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #1d4ed8",
  background: "#2563eb",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
};

const buttonSecondary = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #d0d5dd",
  background: "white",
  color: "#111827",
  fontWeight: 800,
  cursor: "pointer",
};