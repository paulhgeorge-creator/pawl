import { useState } from "react";
import { SIMPLE_QUESTIONS } from "../data/questions";
import { theme } from "../styles/theme";
import GuideCharacter from "./GuideCharacter";

export default function SimpleSurvey({ species, petInfo, onComplete }) {
  const accent = species === "cat" ? theme.colors.cat : theme.colors.dog;
  const light  = species === "cat" ? theme.colors.catLight : theme.colors.dogLight;

  const [responses, setResponses]   = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);

  const q        = SIMPLE_QUESTIONS[currentIdx];
  const answered = responses[q.id] != null;
  const progress = Math.round(((currentIdx + (answered ? 1 : 0)) / SIMPLE_QUESTIONS.length) * 100);

  const next = () => {
    if (currentIdx < SIMPLE_QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onComplete(responses);
    }
  };

  const back = () => {
    if (currentIdx > 0) setCurrentIdx(i => i - 1);
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
      <div style={{ flex: "1", maxWidth: "560px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontSize: "13px", color: theme.colors.neutralMid }}>
            Question {currentIdx + 1} of {SIMPLE_QUESTIONS.length}
          </span>
          <span style={{ fontSize: "13px", fontWeight: "600", color: accent }}>
            {progress}% done
          </span>
        </div>
        <div style={{ height: "6px", background: theme.colors.neutralLight, borderRadius: "3px", marginBottom: "40px", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: accent, borderRadius: "3px", transition: "width 0.4s ease" }}/>
        </div>

        <div style={{
          background:   light,
          borderRadius: theme.radius.xl,
          padding:      "32px 28px",
          marginBottom: "28px",
          border:       `2px solid ${accent}22`,
        }}>
          <div style={{ fontSize: "28px", marginBottom: "16px" }}>
            {currentIdx % 2 === 0 ? "🐾" : species === "cat" ? "🐱" : "🐶"}
          </div>
          <h3 style={{
            fontSize:   "clamp(18px, 3vw, 24px)",
            fontWeight: "700",
            color:      theme.colors.neutral,
            margin:     "0 0 28px",
            lineHeight: "1.35",
            fontFamily: theme.fonts.display,
          }}>
            {q.text}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {q.options.map(opt => (
              <button
                key={opt.value}
                onClick={() => setResponses(r => ({ ...r, [q.id]: opt.value }))}
                style={{
                  padding:      "16px 20px",
                  textAlign:    "left",
                  background:   responses[q.id] === opt.value ? accent : theme.colors.white,
                  border:       `2px solid ${responses[q.id] === opt.value ? accent : theme.colors.border}`,
                  borderRadius: theme.radius.lg,
                  fontSize:     "15px",
                  fontWeight:   "500",
                  color:        responses[q.id] === opt.value ? "white" : theme.colors.neutral,
                  cursor:       "pointer",
                  transition:   "all 0.2s ease",
                  fontFamily:   theme.fonts.body,
                  lineHeight:   "1.4",
                  transform:    responses[q.id] === opt.value ? "scale(1.02)" : "scale(1)",
                  boxShadow:    responses[q.id] === opt.value ? `0 4px 16px ${accent}44` : "none",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {currentIdx > 0 && (
            <button
              onClick={back}
              style={{
                padding:      "12px 24px",
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
            disabled={!answered}
            style={{
              flex:         "1",
              padding:      "14px 28px",
              background:   answered ? accent : theme.colors.border,
              border:       "none",
              borderRadius: theme.radius.lg,
              fontSize:     "16px",
              fontWeight:   "700",
              color:        answered ? "white" : theme.colors.neutralMid,
              cursor:       answered ? "pointer" : "not-allowed",
              transition:   "all 0.2s ease",
              fontFamily:   theme.fonts.body,
            }}
          >
            {currentIdx < SIMPLE_QUESTIONS.length - 1 ? "Next question →" : "See my results →"}
          </button>
        </div>
      </div>

      <div style={{ paddingTop: "60px", display: "none" }} className="guide-simple">
        <GuideCharacter species={species} progress={progress}/>
      </div>

      <style>{`
        @media (min-width: 800px) {
          .guide-simple { display: block !important; }
        }
      `}</style>
    </div>
  );
}
