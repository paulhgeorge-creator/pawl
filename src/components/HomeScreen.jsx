import { useState } from "react";
import { theme } from "../styles/theme";

function DogIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="20" r="10" fill={theme.colors.dogMid}/>
      <ellipse cx="24" cy="34" rx="14" ry="10" fill={theme.colors.dogMid}/>
      <ellipse cx="16" cy="13" rx="4" ry="6" fill={theme.colors.dog} transform="rotate(-15 16 13)"/>
      <ellipse cx="32" cy="13" rx="4" ry="6" fill={theme.colors.dog} transform="rotate(15 32 13)"/>
    </svg>
  );
}

function CatIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="20" r="10" fill={theme.colors.catMid}/>
      <ellipse cx="24" cy="34" rx="14" ry="10" fill={theme.colors.catMid}/>
      <polygon points="14,14 17,6 21,14" fill={theme.colors.cat}/>
      <polygon points="27,14 31,6 34,14" fill={theme.colors.cat}/>
    </svg>
  );
}

function SurveyCard({ icon, title, subtitle, detail, accent, light, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex:           "1 1 280px",
        maxWidth:       "300px",
        background:     hovered ? light : theme.colors.white,
        border:         `2px solid ${hovered ? accent : theme.colors.border}`,
        borderRadius:   theme.radius.xl,
        padding:        "32px 28px",
        cursor:         "pointer",
        textAlign:      "left",
        transition:     "all 0.2s ease",
        transform:      hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow:      hovered ? theme.shadow.md : theme.shadow.sm,
        display:        "flex",
        flexDirection:  "column",
        gap:            "12px",
      }}
    >
      <div>{icon}</div>
      <div>
        <div style={{ fontSize: "22px", fontWeight: "700", color: accent, marginBottom: "4px" }}>
          {title}
        </div>
        <div style={{ fontSize: "14px", fontWeight: "600", color: theme.colors.neutralMid, marginBottom: "8px" }}>
          {subtitle}
        </div>
        <div style={{ fontSize: "14px", color: theme.colors.neutralMid, lineHeight: "1.5" }}>
          {detail}
        </div>
      </div>
      <div style={{
        marginTop:    "8px",
        background:   accent,
        color:        "white",
        borderRadius: theme.radius.md,
        padding:      "10px 20px",
        fontSize:     "14px",
        fontWeight:   "600",
        textAlign:    "center",
      }}>
        Start →
      </div>
    </button>
  );
}

export default function HomeScreen({ onSelect }) {
  return (
    <div style={{
      minHeight:      "100vh",
      background:     theme.colors.white,
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      padding:        "40px 20px",
      fontFamily:     theme.fonts.body,
    }}>
      <div style={{ marginBottom: "12px" }}>
        <span style={{ fontSize: "40px" }}>🐾</span>
      </div>
      <h1 style={{
        fontFamily:   theme.fonts.display,
        fontSize:     "clamp(32px, 5vw, 52px)",
        fontWeight:   "700",
        color:        theme.colors.neutral,
        margin:       "0 0 12px",
        textAlign:    "center",
      }}>
        Pawl
      </h1>
      <p style={{
        fontSize:     "18px",
        color:        theme.colors.neutralMid,
        margin:       "0 0 56px",
        textAlign:    "center",
        maxWidth:     "420px",
        lineHeight:   "1.6",
      }}>
        Discover your pet's personality and get a training plan built specifically for them.
      </p>

      <div style={{
        display:        "flex",
        gap:            "24px",
        flexWrap:       "wrap",
        justifyContent: "center",
        maxWidth:       "680px",
        width:          "100%",
      }}>
        <SurveyCard
          icon={<DogIcon/>}
          title="Quick Survey"
          subtitle="10 simple questions"
          detail="Plain language, easy to understand, takes about 3 minutes."
          accent={theme.colors.dog}
          light={theme.colors.dogLight}
          onClick={() => onSelect("simple")}
        />
        <SurveyCard
          icon={<CatIcon/>}
          title="Full Assessment"
          subtitle="25 detailed questions"
          detail="Behaviorally anchored questions for the most accurate result. Takes about 8 minutes."
          accent={theme.colors.cat}
          light={theme.colors.catLight}
          onClick={() => onSelect("full")}
        />
      </div>

      <p style={{
        marginTop:  "40px",
        fontSize:   "13px",
        color:      theme.colors.neutralMid,
        textAlign:  "center",
      }}>
        Based on the peer-reviewed MCPQ-R and Feline Five frameworks
      </p>
    </div>
  );
}
