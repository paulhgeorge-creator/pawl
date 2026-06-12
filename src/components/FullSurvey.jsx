import { useState } from "react";
import { FULL_QUESTIONS } from "../data/questions";
import { theme } from "../styles/theme";
import GuideCharacter from "./GuideCharacter";

const DIMENSIONS = ["energy", "sociability", "boldness", "trainability", "reactivity"];
const DIM_LABELS = {
  energy:       "Energy",
  sociability:  "Sociability",
  boldness:     "Boldness",
  trainability: "Trainability",
  reactivity:   "Reactivity",
};

function QuestionCard({ q, index, value, onChange, accent, light }) {
  return (
    <div style={{
      background:   value != null ? light : theme.colors.white,
      border:       `1.5px solid ${value != null ? accent : theme.colors.border}`,
      borderRadius: theme.radius.lg,
      padding:      "20px",
      marginBottom: "16px",
      transition:   "all 0.2s ease",
    }}>
      <div style={{ fontSize: "13px", fontWeight: "600", color: accent, marginBottom: "8px" }}>
        Question {index + 1}
      </div>
      <div style={{ fontSize: "16px", fontWeight: "600", color: theme.colors.neutral, marginBottom: "16px", lineHeight: "1.4" }}>
        {q.text}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {Object.entries(q.anchors).map(([val, label]) => (
          <button
            key={val}
            onClick={() => onChange(parseInt(val))}
            style={{
              padding:       "10px 14px",
              textAlign:     "left",
              background:    value === parseInt(val) ? accent : theme.colors.white,
              border:        `1.5px solid ${value === parseInt(val) ? accent : theme.colors.border}`,
              borderRadius:  theme.radius.md,
              fontSize:      "14px",
              color:         value === parseInt(val) ? "white" : theme.colors.neutral,
              cursor:        "pointer",
              transition:    "all 0.15s ease",
              fontFamily:    theme.fonts.body,
              lineHeight:    "1.4",
              display:       "flex",
              alignItems:    "center",
              gap:           "10px",
            }}
          >
            <span style={{
              minWidth:       "22px",
              height:         "22px",
              borderRadius:   "50%",
              background:     value === parseInt(val) ? "rgba(255,255,255,0.3)" : theme.colors.neutralLight,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              fontSize:       "11px",
              fontWeight:     "700",
              color:          value === parseInt(val) ? "white" : theme.colors.neutralMid,
              flexShrink:     0,
            }}>
              {val}
            </span>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FullSurvey({ species, petInfo, onComplete }) {
  const accent = species === "cat" ? theme.colors.cat : theme.colors.dog;
  const light  = species === "cat" ? theme.colors.catLight : theme.colors.dogLight;

  const [responses, setResponses] = useState({});
  const [currentGroup, setCurrentGroup] = useState(0);

  const groups = DIMENSIONS.map(dim => ({
    dim,
    label: DIM_LABELS[dim],
    questions: FULL_QUESTIONS.filter(q => q.dimension === dim),
  }));

  const current = groups[currentGroup];
  const groupAnswered = current.questions.every(q => responses[q.id] != null);
  const totalAnswered = FULL_QUESTIONS.filter(q => responses[q.id] != null).length;
  const progress = Math.round((totalAnswered / FULL_QUESTIONS.length) * 100);

  const setAnswer = (id, val) => setResponses(r => ({ ...r, [id]: val }));

  const next = () => {
    if (currentGroup < groups.length - 1) {
      setCurrentGroup(g => g + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onComplete(responses);
    }
  };

  const back = () => {
    if (currentGroup > 0) setCurrentGroup(g => g - 1);
  };

  return (
    <div style={{
      minHeight:     "100vh",
      background:    theme.colors.white,
      display:       "flex",
      alignItems:    "flex-start",
      justifyContent:"center",
      padding:       "32px 20px",
      gap:           "32px",
      fontFamily:    theme.fonts.body,
    }}>
      <div style={{ flex: "1", maxWidth: "620px" }}>
        <div style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "13px", color: theme.colors.neutralMid }}>
            Section {currentGroup + 1} of {groups.length}
          </span>
          <span style={{ fontSize: "13px", fontWeight: "600", color: accent }}>
            {progress}% complete
          </span>
        </div>
        <div style={{ height: "6px", background: theme.colors.neutralLight, borderRadius: "3px", marginBottom: "28px", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: accent, borderRadius: "3px", transition: "width 0.4s ease" }}/>
        </div>

        <div style={{
          background:   light,
          borderRadius: theme.radius.lg,
          padding:      "16px 20px",
          marginBottom: "28px",
          borderLeft:   `4px solid ${accent}`,
        }}>
          <div style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: accent, marginBottom: "4px" }}>
            Dimension {currentGroup + 1} of 5
          </div>
          <div style={{ fontSize: "22px", fontWeight: "700", color: theme.colors.neutral }}>
            {current.label}
          </div>
        </div>

        {current.questions.map((q, qi) => (
          <QuestionCard
            key={q.id}
            q={q}
            index={qi}
            value={responses[q.id]}
            onChange={val => setAnswer(q.id, val)}
            accent={accent}
            light={light}
          />
        ))}

        <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
          {currentGroup > 0 && (
            <button
              onClick={back}
              style={{
                padding:      "12px 28px",
                background:   theme.colors.white,
                border:       `1.5px solid ${theme.colors.border}`,
                borderRadius: theme.radius.lg,
                fontSize:     "15px",
                color:        theme.colors.neutralMid,
                cursor:       "pointer",
                fontFamily:   theme.fonts.body,
              }}
            >
              ← Back
            </button>
          )}
          <button
            onClick={next}
            disabled={!groupAnswered}
            style={{
              flex:         "1",
              padding:      "14px 28px",
              background:   groupAnswered ? accent : theme.colors.border,
              border:       "none",
              borderRadius: theme.radius.lg,
              fontSize:     "15px",
              fontWeight:   "600",
              color:        groupAnswered ? "white" : theme.colors.neutralMid,
              cursor:       groupAnswered ? "pointer" : "not-allowed",
              transition:   "all 0.2s ease",
              fontFamily:   theme.fonts.body,
            }}
          >
            {currentGroup < groups.length - 1 ? `Next: ${groups[currentGroup + 1].label} →` : "See my results →"}
          </button>
        </div>
      </div>

      <div style={{ paddingTop: "60px", display: "none" }} className="guide-full">
        <GuideCharacter species={species} progress={progress}/>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .guide-full { display: block !important; }
        }
      `}</style>
    </div>
  );
}
