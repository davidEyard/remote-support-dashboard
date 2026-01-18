import { useState } from "react";

export default function KnowledgeBase({ articles }) {
  const [selectedId, setSelectedId] = useState(articles?.[0]?.id || "");

  const selected = articles.find((a) => a.id === selectedId) || null;

  return (
    <div style={panelStyle}>
      <h3 style={panelTitle}>Knowledge Base</h3>

      <div style={{ display: "grid", gap: 10 }}>
        {articles.map((a) => (
          <button
            key={a.id}
            onClick={() => setSelectedId(a.id)}
            style={{
              ...kbItem,
              borderColor: a.id === selectedId ? "#3b82f6" : "#eef2f6",
              boxShadow:
                a.id === selectedId ? "0 0 0 3px rgba(59,130,246,0.12)" : "none",
            }}
          >
            {a.title}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #eef2f6" }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>
          {selected ? selected.title : "Select an article"}
        </div>
        <div style={{ color: "#475467", lineHeight: 1.5, fontSize: 13 }}>
          {selected?.summary ||
            "This is a placeholder summary. Next we can add real KB article content (steps, links, and quick fixes)."}
        </div>
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

const kbItem = {
  textAlign: "left",
  padding: 12,
  borderRadius: 10,
  border: "1px solid #eef2f6",
  background: "white",
  cursor: "pointer",
  color: "#1d4ed8",
  fontWeight: 700,
};