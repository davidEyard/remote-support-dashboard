export default function TicketCard({ ticket, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...cardStyle,
        borderColor: isSelected ? "#3b82f6" : "#e6eaf0",
        boxShadow: isSelected ? "0 0 0 3px rgba(59,130,246,0.15)" : "none",
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <StatusPill status={ticket.status} />
        <div style={{ fontWeight: 700, textAlign: "left" }}>{ticket.title}</div>
      </div>

      <div style={metaStyle}>
        <strong>{ticket.priority}</strong> &nbsp;|&nbsp; {ticket.category} &nbsp;|&nbsp;{" "}
        {ticket.timeAgo}
      </div>
    </button>
  );
}

function StatusPill({ status }) {
  const bg =
    status === "Resolved"
      ? "#16a34a"
      : status === "In Progress"
      ? "#f59e0b"
      : "#ef4444";

  return (
    <span
      style={{
        background: bg,
        color: "white",
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

const cardStyle = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "1px solid #e6eaf0",
  background: "white",
  cursor: "pointer",
};

const metaStyle = {
  marginTop: 8,
  color: "#475467",
  fontSize: 13,
  textAlign: "left",
};