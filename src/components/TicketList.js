import Filters from "./Filters";
import TicketCard from "./TicketCard";

export default function TicketList({
  tickets,
  selectedTicketId,
  onSelectTicket,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) {
  return (
    <div style={panelStyle}>
      <h3 style={panelTitle}>Support Tickets</h3>

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
        {tickets.length === 0 ? (
          <div style={{ padding: 12, color: "#667085" }}>
            No tickets match your filters.
          </div>
        ) : (
          tickets.map((t) => (
            <TicketCard
              key={t.id}
              ticket={t}
              isSelected={t.id === selectedTicketId}
              onClick={() => onSelectTicket(t.id)}
            />
          ))
        )}
      </div>
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