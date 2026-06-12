import { useState } from "react";
import SettingsPanel from "./SettingsPanel";

export default function PathHeader({ species, color, light, completedCount, totalDays, onStartSurvey, surveyDone }) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div style={{
        position:       "sticky",
        top:            0,
        zIndex:         100,
        background:     "#FFFFFF",
        borderBottom:   `1.5px solid ${color}22`,
        padding:        "14px 20px",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        fontFamily:     "'Inter', sans-serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px" }}>{species === "cat" ? "🐈" : "🐕"}</span>
          <div>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "#3D3D3D", lineHeight: "1.1" }}>
              Pawl Training
            </div>
            <div style={{ fontSize: "12px", color: "#7A7A7A" }}>
              {completedCount} of {totalDays} days complete
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ProgressRing pct={Math.round((completedCount / totalDays) * 100)} color={color}/>
          <button
            onClick={() => setSettingsOpen(true)}
            style={{
              width:          "40px",
              height:         "40px",
              borderRadius:   "50%",
              background:     light,
              border:         `1.5px solid ${color}33`,
              cursor:         "pointer",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              fontSize:       "18px",
              transition:     "all 0.2s ease",
            }}
            aria-label="Settings"
          >
            ⚙️
          </button>
        </div>
      </div>

      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onStartSurvey={() => { setSettingsOpen(false); onStartSurvey(); }}
        surveyDone={surveyDone}
        color={color}
        light={light}
        species={species}
      />
    </>
  );
}

function ProgressRing({ pct, color }) {
  const r      = 16;
  const c      = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r={r} fill="none" stroke="#E0E0E0" strokeWidth="3"/>
      <circle
        cx="20" cy="20" r={r} fill="none"
        stroke={color} strokeWidth="3"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 20 20)"
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
      <text x="20" y="24" textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>
        {pct}%
      </text>
    </svg>
  );
}
