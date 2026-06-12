import { useState } from "react";
import { CONTEXT_FIELDS } from "../data/questions";
import { theme } from "../styles/theme";
import GuideCharacter from "./GuideCharacter";

export default function ContextQuestions({ species, onComplete }) {
  const accent = species === "cat" ? theme.colors.cat : theme.colors.dog;
  const light  = species === "cat" ? theme.colors.catLight : theme.colors.dogLight;

  const [values, setValues] = useState({
    name:          "",
    breed:         "",
    age:           "",
    health_status: "healthy",
    history:       "breeder_no_training",
  });

  const set = (key, val) => setValues(v => ({ ...v, [key]: val }));
  const canProceed = values.name.trim() && values.breed.trim() && values.age !== "";

  const inputStyle = {
    width:        "100%",
    padding:      "12px 16px",
    fontSize:     "15px",
    border:       `1.5px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    outline:      "none",
    fontFamily:   theme.fonts.body,
    color:        theme.colors.neutral,
    background:   theme.colors.white,
    transition:   "border-color 0.2s",
    boxSizing:    "border-box",
  };

  return (
    <div style={{
      minHeight:     "100vh",
      background:    theme.colors.white,
      display:       "flex",
      alignItems:    "flex-start",
      justifyContent:"center",
      padding:       "40px 20px",
      gap:           "32px",
      fontFamily:    theme.fonts.body,
    }}>
      <div style={{ flex: "1", maxWidth: "560px" }}>
        <div style={{
          background:   light,
          borderRadius: theme.radius.lg,
          padding:      "6px 14px",
          display:      "inline-block",
          marginBottom: "16px",
          fontSize:     "13px",
          fontWeight:   "600",
          color:        accent,
        }}>
          {species === "cat" ? "🐈 Cat selected" : "🐕 Dog selected"}
        </div>

        <h2 style={{
          fontFamily:   theme.fonts.display,
          fontSize:     "clamp(22px, 3.5vw, 32px)",
          fontWeight:   "700",
          color:        theme.colors.neutral,
          margin:       "0 0 8px",
        }}>
          Tell us about your pet
        </h2>
        <p style={{
          color:      theme.colors.neutralMid,
          fontSize:   "15px",
          margin:     "0 0 32px",
          lineHeight: "1.5",
        }}>
          This helps us personalise your results and apply the right modifiers to the training plan.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: theme.colors.neutral, marginBottom: "6px" }}>
              What's your pet's name?
            </label>
            <input
              type="text"
              value={values.name}
              onChange={e => set("name", e.target.value)}
              placeholder="e.g. Max, Luna, Biscuit..."
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = accent}
              onBlur={e => e.target.style.borderColor = theme.colors.border}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: theme.colors.neutral, marginBottom: "6px" }}>
              {CONTEXT_FIELDS.breed.label}
            </label>
            <input
              type="text"
              value={values.breed}
              onChange={e => set("breed", e.target.value)}
              placeholder={CONTEXT_FIELDS.breed.placeholder}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = accent}
              onBlur={e => e.target.style.borderColor = theme.colors.border}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: theme.colors.neutral, marginBottom: "6px" }}>
              {CONTEXT_FIELDS.age.label}
            </label>
            <input
              type="number"
              value={values.age}
              onChange={e => set("age", e.target.value)}
              min="0"
              max="30"
              placeholder="e.g. 3"
              style={{ ...inputStyle, maxWidth: "160px" }}
              onFocus={e => e.target.style.borderColor = accent}
              onBlur={e => e.target.style.borderColor = theme.colors.border}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: theme.colors.neutral, marginBottom: "6px" }}>
              {CONTEXT_FIELDS.health_status.label}
            </label>
            <select
              value={values.health_status}
              onChange={e => set("health_status", e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {CONTEXT_FIELDS.health_status.options.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: theme.colors.neutral, marginBottom: "6px" }}>
              {CONTEXT_FIELDS.history.label}
            </label>
            <select
              value={values.history}
              onChange={e => set("history", e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {CONTEXT_FIELDS.history.options.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => canProceed && onComplete({ ...values, age_years: parseFloat(values.age) })}
          disabled={!canProceed}
          style={{
            marginTop:    "32px",
            padding:      "14px 40px",
            background:   canProceed ? accent : theme.colors.border,
            color:        canProceed ? "white" : theme.colors.neutralMid,
            border:       "none",
            borderRadius: theme.radius.lg,
            fontSize:     "16px",
            fontWeight:   "600",
            cursor:       canProceed ? "pointer" : "not-allowed",
            transition:   "all 0.2s ease",
            fontFamily:   theme.fonts.body,
          }}
        >
          Start the survey →
        </button>
      </div>

      <div style={{ paddingTop: "80px", display: "none" }} className="guide-panel">
        <GuideCharacter species={species} progress={0}/>
      </div>

      <style>{`
        @media (min-width: 700px) {
          .guide-panel { display: block !important; }
        }
      `}</style>
    </div>
  );
}
