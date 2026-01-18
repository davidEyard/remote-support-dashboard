import { useMemo, useState } from "react";
import { initialTickets } from "../data/tickets";
import { kbArticles } from "../data/kb";

import Navbar from "../components/Navbar";
import TicketList from "../components/TicketList";
import TicketDetails from "../components/TicketDetails";
import KnowledgeBase from "../components/KnowledgeBase";
import ShipReportModal from "../components/ShipReportModal";

export default function Dashboard() {
  // Core state
  const [tickets, setTickets] = useState(initialTickets);

  // Filters/search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Selected ticket
  const [selectedTicketId, setSelectedTicketId] = useState(
    initialTickets[0]?.id || ""
  );

  // SHIP modal
  const [isShipOpen, setIsShipOpen] = useState(false);

  // Derived list (filtered)
  const filteredTickets = useMemo(() => {
    const s = searchTerm.trim().toLowerCase();

    return tickets.filter((t) => {
      const matchesSearch =
        s.length === 0 ||
        t.title.toLowerCase().includes(s) ||
        t.category.toLowerCase().includes(s);

      const matchesStatus = statusFilter === "All" || t.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || t.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, searchTerm, statusFilter, priorityFilter]);

  // Selected ticket object
  const selectedTicket = useMemo(() => {
    return tickets.find((t) => t.id === selectedTicketId) || null;
  }, [tickets, selectedTicketId]);

  // If filters remove the selected ticket, auto-select first in list
  // NOTE: This setState-in-render works but can warn; we'll keep it simple for now.
  if (selectedTicketId && selectedTicket === null && filteredTickets.length > 0) {
    setSelectedTicketId(filteredTickets[0].id);
  }

  // Update ticket status
  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
  };

  // Build SHIP report
  const buildReport = (ticketsList) => {
    const statusCounts = ticketsList.reduce((acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {});

    const categoryCounts = ticketsList.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {});

    const topCategories = Object.entries(categoryCounts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    const highPriorityOpenCount = ticketsList.filter(
      (t) => t.priority === "High" && t.status !== "Resolved"
    ).length;

    return {
      generatedAt: new Date().toISOString(),
      totalTickets: ticketsList.length,
      statusCounts,
      highPriorityOpenCount,
      topCategories,
    };
  };

  const report = buildReport(tickets);

  // Download helpers
  const downloadTextFile = (filename, text, mime = "application/json") => {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    downloadTextFile(
      `ship-report-${new Date().toISOString().slice(0, 10)}.json`,
      JSON.stringify(report, null, 2),
      "application/json"
    );
  };

  const escapeCsv = (val) => {
    const s = String(val ?? "");
    if (s.includes('"') || s.includes(",") || s.includes("\n")) {
      return `"${s.replaceAll('"', '""')}"`;
    }
    return s;
  };

  const handleDownloadCsv = () => {
    const rows = [
      ["generatedAt", report.generatedAt],
      ["totalTickets", String(report.totalTickets)],
      ["open", String(report.statusCounts.Open || 0)],
      ["inProgress", String(report.statusCounts["In Progress"] || 0)],
      ["resolved", String(report.statusCounts.Resolved || 0)],
      ["highPriorityOpenCount", String(report.highPriorityOpenCount)],
    ];

    report.topCategories.forEach((c, idx) => {
      rows.push([`topCategory${idx + 1}`, `${c.category} (${c.count})`]);
    });

    const csv = rows.map((r) => r.map(escapeCsv).join(",")).join("\n");

    downloadTextFile(
      `ship-report-${new Date().toISOString().slice(0, 10)}.csv`,
      csv,
      "text/csv"
    );
  };

  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>
      <Navbar onShip={() => setIsShipOpen(true)} />

      <ShipReportModal
        isOpen={isShipOpen}
        onClose={() => setIsShipOpen(false)}
        report={report}
        onDownloadJson={handleDownloadJson}
        onDownloadCsv={handleDownloadCsv}
      />

      <div style={{ padding: 20 }}>
        <div style={{ marginBottom: 14, color: "#475467" }}>
          Track, filter, and resolve support tickets in one place.
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr 1fr",
            gap: 16,
            alignItems: "start",
          }}
        >
          <TicketList
            tickets={filteredTickets}
            selectedTicketId={selectedTicketId}
            onSelectTicket={setSelectedTicketId}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />

          <TicketDetails
            ticket={selectedTicket}
            onUpdateStatus={(newStatus) => {
              if (!selectedTicket) return;
              updateTicketStatus(selectedTicket.id, newStatus);
            }}
          />

          <KnowledgeBase articles={kbArticles} />
        </div>
      </div>
    </div>
  );
}