import { useState } from "react";
import { PERSONALISED_TIPS } from "../data/trainingPaths";

export default function DailyTask({ task, species, archetype, onComplete, onClose, isCompleted }) {
  const [checkedSteps, setCheckedSteps] = useState({});
  const [showPassTest, setShowPassTest] = useState(false);

  const color = species === "cat" ? "#E07B39" : "#8B5E3C";
  const light = species === "cat" ? "#FEF0E6" : "#F5EDE4";
  const tips  = archetype ? PERSONALISED_TIPS[archetype] : null;

  const allStepsChecked = task.steps.every((_, i) => checkedSteps[i]);
  const toggleStep      = (i) => setCheckedSteps(p => ({ ...p, [i]: !p[i] }));

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position:   "fixed",
          inset:      0,
          background: "rgba(0,0,0,0.5)",
          zIndex:     300,
        }}
      />

      <div style={{
        position:     "fixed",
        bottom:       0,
        left:         0,
        right:        0,
        background:   "#FFFFFF",
        zIndex:       301,
        borderRadius: "24px 24px 0 0",
        maxHeight:    "92vh",
        overflowY:    "auto",
        fontFamily:   "'Inter', sans-serif",
        animation:    "slideUp 0.3s ease",
      }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
          <div style={{ width: "40px", height: "4px", borderRadius: "2px", background: "#E0E0E0" }}/>
        </div>

        <div style={{ padding: "20px 24px 40px" }}>
          {/* Header */}
          <div style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "flex-start",
            marginBottom:   "20px",
          }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "700", color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                {task.day}  ·  {task.duration}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "32px" }}>{task.emoji}</span>
                <div style={{ fontSize: "24px", fontWeight: "700", color: "#3D3D3D", lineHeight: "1.2" }}>
                  {task.title}
                </div>
              </div>
            </div>
            {isCompleted && (
              <div style={{
                background:   "#E8F5E9",
                color:        "#2E7D32",
                fontSize:     "12px",
                fontWeight:   "700",
                padding:      "4px 12px",
                borderRadius: "100px",
              }}>
                ✓ Done
              </div>
            )}
          </div>

          {/* Goal */}
          <div style={{
            background:   light,
            borderRadius: "12px",
            padding:      "14px 16px",
            marginBottom: "20px",
            borderLeft:   `4px solid ${color}`,
          }}>
            <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color, marginBottom: "4px" }}>
              Today's goal
            </div>
            <div style={{ fontSize: "15px", color: "#3D3D3D", lineHeight: "1.5" }}>
              {task.goal}
            </div>
          </div>

          {/* Why */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#7A7A7A", marginBottom: "6px" }}>
              Why this matters
            </div>
            <div style={{ fontSize: "14px", color: "#3D3D3D", lineHeight: "1.6" }}>
              {task.why}
            </div>
          </div>

          {/* Personalised tip */}
          {tips && (
            <div style={{
              background:   "#FFF8F0",
              borderRadius: "12px",
              padding:      "14px 16px",
              marginBottom: "20px",
              border:       `1.5px solid ${color}33`,
            }}>
              <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color, marginBottom: "8px" }}>
                ✨ Personalised for {archetype}
              </div>
              <div style={{ fontSize: "13px", color: "#3D3D3D", lineHeight: "1.5", marginBottom: "6px" }}>
                <strong>Session:</strong> {tips.sessionLength}
              </div>
              <div style={{ fontSize: "13px", color: "#3D3D3D", lineHeight: "1.5", marginBottom: "6px" }}>
                <strong>Reward:</strong> {tips.rewardStyle}
              </div>
              <div style={{ fontSize: "13px", color, lineHeight: "1.5", fontStyle: "italic" }}>
                {tips.extraNote}
              </div>
            </div>
          )}

          {/* Steps checklist */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#3D3D3D", marginBottom: "12px" }}>
              Steps
            </div>
            {task.steps.map((step, i) => (
              <button
                key={i}
                onClick={() => toggleStep(i)}
                style={{
                  display:      "flex",
                  alignItems:   "flex-start",
                  gap:          "12px",
                  width:        "100%",
                  textAlign:    "left",
                  background:   checkedSteps[i] ? "#F1F8E9" : "#FAFAFA",
                  border:       `1.5px solid ${checkedSteps[i] ? "#81C784" : "#E0E0E0"}`,
                  borderRadius: "10px",
                  padding:      "12px 14px",
                  marginBottom: "8px",
                  cursor:       "pointer",
                  transition:   "all 0.15s ease",
                  fontFamily:   "'Inter', sans-serif",
                }}
              >
                <div style={{
                  width:          "22px",
                  height:         "22px",
                  borderRadius:   "50%",
                  border:         `2px solid ${checkedSteps[i] ? "#4CAF50" : "#BDBDBD"}`,
                  background:     checkedSteps[i] ? "#4CAF50" : "white",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  flexShrink:     0,
                  marginTop:      "1px",
                  transition:     "all 0.15s ease",
                }}>
                  {checkedSteps[i] && (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span style={{
                  fontSize:       "14px",
                  color:          checkedSteps[i] ? "#7A7A7A" : "#3D3D3D",
                  lineHeight:     "1.5",
                  textDecoration: checkedSteps[i] ? "line-through" : "none",
                  transition:     "all 0.15s ease",
                }}>
                  {step}
                </span>
              </button>
            ))}
          </div>

          {/* Trainer tip */}
          <div style={{
            background:   "#F5F5F5",
            borderRadius: "10px",
            padding:      "12px 14px",
            marginBottom: "20px",
            display:      "flex",
            gap:          "10px",
            alignItems:   "flex-start",
          }}>
            <span style={{ fontSize: "18px", flexShrink: 0 }}>💡</span>
            <div style={{ fontSize: "13px", color: "#5D5D5D", lineHeight: "1.5" }}>
              <strong>Trainer tip:</strong> {task.tip}
            </div>
          </div>

          {/* Pass test */}
          {!showPassTest ? (
            <button
              onClick={() => setShowPassTest(true)}
              style={{
                width:        "100%",
                padding:      "12px",
                background:   "white",
                border:       `1.5px solid ${color}`,
                borderRadius: "10px",
                fontSize:     "14px",
                color:        color,
                fontWeight:   "600",
                cursor:       "pointer",
                marginBottom: "12px",
                fontFamily:   "'Inter', sans-serif",
              }}
            >
              Show today's pass test
            </button>
          ) : (
            <div style={{
              background:   light,
              borderRadius: "10px",
              padding:      "14px",
              marginBottom: "12px",
              border:       `1.5px solid ${color}33`,
            }}>
              <div style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", color, marginBottom: "6px" }}>
                Pass test
              </div>
              <div style={{ fontSize: "14px", color: "#3D3D3D", lineHeight: "1.5" }}>
                {task.passTest}
              </div>
            </div>
          )}

          {/* Complete button */}
          {!isCompleted && (
            <button
              onClick={onComplete}
              disabled={!allStepsChecked}
              style={{
                width:        "100%",
                padding:      "16px",
                background:   allStepsChecked ? color : "#E0E0E0",
                color:        allStepsChecked ? "white" : "#9E9E9E",
                border:       "none",
                borderRadius: "12px",
                fontSize:     "16px",
                fontWeight:   "700",
                cursor:       allStepsChecked ? "pointer" : "not-allowed",
                transition:   "all 0.2s ease",
                fontFamily:   "'Inter', sans-serif",
                marginTop:    "4px",
              }}
            >
              {allStepsChecked
                ? (task.isFinal ? "🎉 Complete the trick!" : "Mark day complete →")
                : `Check off all ${task.steps.length} steps to continue`}
            </button>
          )}

          {isCompleted && (
            <div style={{
              textAlign:    "center",
              padding:      "16px",
              background:   "#E8F5E9",
              borderRadius: "12px",
              fontSize:     "15px",
              fontWeight:   "600",
              color:        "#2E7D32",
            }}>
              ✓ Day complete — see you tomorrow!
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
