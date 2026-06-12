export default function SettingsPanel({ open, onClose, onStartSurvey, surveyDone, color, light, species }) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position:   "fixed",
          inset:      0,
          background: "rgba(0,0,0,0.4)",
          zIndex:     200,
        }}
      />

      <div style={{
        position:      "fixed",
        top:           0,
        right:         0,
        bottom:        0,
        width:         "min(360px, 92vw)",
        background:    "#FFFFFF",
        zIndex:        201,
        boxShadow:     "-4px 0 32px rgba(0,0,0,0.16)",
        display:       "flex",
        flexDirection: "column",
        fontFamily:    "'Inter', sans-serif",
        animation:     "slideInRight 0.25s ease",
      }}>
        <div style={{
          padding:       "24px 24px 20px",
          borderBottom:  `1.5px solid ${color}22`,
          display:       "flex",
          justifyContent:"space-between",
          alignItems:    "center",
        }}>
          <div style={{ fontSize: "20px", fontWeight: "700", color: "#3D3D3D" }}>
            Settings
          </div>
          <button
            onClick={onClose}
            style={{
              width:          "36px",
              height:         "36px",
              borderRadius:   "50%",
              border:         "1.5px solid #E0E0E0",
              background:     "#FAFAFA",
              cursor:         "pointer",
              fontSize:       "18px",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <div style={{
            background:   light,
            borderRadius: "16px",
            padding:      "20px",
            marginBottom: "20px",
            border:       `2px solid ${color}33`,
          }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>
              {surveyDone ? "✅" : "🎯"}
            </div>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "#3D3D3D", marginBottom: "8px" }}>
              {surveyDone ? "Personality survey complete" : "Personalise your training"}
            </div>
            <div style={{ fontSize: "14px", color: "#7A7A7A", lineHeight: "1.5", marginBottom: "16px" }}>
              {surveyDone
                ? "Your training path is already tailored to your pet's personality. Retake the survey any time if your pet's behaviour changes."
                : `Take a short personality survey and we'll adjust every tip, session length, and reward style on this path to suit your ${species === "cat" ? "cat's" : "dog's"} specific learning style.`}
            </div>
            <button
              onClick={onStartSurvey}
              style={{
                width:        "100%",
                padding:      "12px",
                background:   color,
                color:        "white",
                border:       "none",
                borderRadius: "10px",
                fontSize:     "14px",
                fontWeight:   "700",
                cursor:       "pointer",
                fontFamily:   "'Inter', sans-serif",
              }}
            >
              {surveyDone ? "Retake the survey →" : "Take the survey →"}
            </button>
          </div>

          <div style={{
            background:   "#FAFAFA",
            borderRadius: "12px",
            padding:      "16px",
            marginBottom: "16px",
          }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#3D3D3D", marginBottom: "4px" }}>
              About the training paths
            </div>
            <div style={{ fontSize: "13px", color: "#7A7A7A", lineHeight: "1.5" }}>
              Each 7-day path is built on peer-reviewed training science. Tasks unlock daily and are designed to build on each other progressively. Complete the personality survey to unlock personalised tips for every step.
            </div>
          </div>

          <div style={{
            background:   "#FAFAFA",
            borderRadius: "12px",
            padding:      "16px",
          }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#3D3D3D", marginBottom: "4px" }}>
              The science
            </div>
            <div style={{ fontSize: "13px", color: "#7A7A7A", lineHeight: "1.5" }}>
              Pawl's personality assessment is based on the MCPQ-R canine framework and Feline Five research. Positive reinforcement is the only training method used — it produces better outcomes and lower stress than punishment-based approaches.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
