import { theme } from "../styles/theme";
import { TRAINING_PLANS } from "../logic/scoring";

const DIMENSION_LABELS = {
  energy:       "Energy",
  sociability:  "Sociability",
  boldness:     "Boldness",
  trainability: "Trainability",
  reactivity:   "Reactivity",
};

export default function ResultsScreen({ result, petInfo, species, onRestart }) {
  const accent = species === "cat" ? theme.colors.cat : theme.colors.dog;
  const light  = species === "cat" ? theme.colors.catLight : theme.colors.dogLight;

  const { archetype, dimension_scores, training_plan, referrals } = result;
  const plan = training_plan;

  return (
    <div style={{
      minHeight:  "100vh",
      background: theme.colors.white,
      padding:    "40px 20px 80px",
      fontFamily: theme.fonts.body,
    }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "56px", marginBottom: "8px" }}>
            {TRAINING_PLANS[archetype.primary]?.emoji ?? "🐾"}
          </div>
          <div style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: accent, marginBottom: "8px" }}>
            {petInfo.name}'s personality type
          </div>
          <h1 style={{
            fontFamily: theme.fonts.display,
            fontSize:   "clamp(28px, 5vw, 44px)",
            fontWeight: "700",
            color:      theme.colors.neutral,
            margin:     "0 0 12px",
          }}>
            {archetype.primary}
          </h1>
          <p style={{ fontSize: "17px", color: theme.colors.neutralMid, maxWidth: "480px", margin: "0 auto", lineHeight: "1.6" }}>
            {TRAINING_PLANS[archetype.primary]?.description}
          </p>

          <div style={{
            display:    "inline-block",
            marginTop:  "16px",
            padding:    "6px 16px",
            borderRadius:"100px",
            fontSize:   "13px",
            fontWeight: "600",
            background: archetype.confidence === "high" ? "#E8F5E9" : archetype.confidence === "medium" ? "#FFF8E1" : "#FFEBEE",
            color:      archetype.confidence === "high" ? "#2E7D32" : archetype.confidence === "medium" ? "#F57F17" : "#C62828",
          }}>
            {archetype.confidence === "high" ? "✓ High confidence result" :
             archetype.confidence === "medium" ? "⚠ Medium confidence — reassess in 30 days" :
             "⚠ Low confidence — this is a provisional result"}
          </div>
        </div>

        {/* Referral alerts */}
        {referrals && referrals.length > 0 && (
          <div style={{ marginBottom: "28px" }}>
            {referrals.map((r, i) => (
              <div key={i} style={{
                background:   r.severity === "urgent" ? "#FFEBEE" : "#FFF3E0",
                border:       `1.5px solid ${r.severity === "urgent" ? "#EF5350" : "#FFA726"}`,
                borderRadius: theme.radius.lg,
                padding:      "16px 20px",
                marginBottom: "12px",
                fontSize:     "14px",
                color:        r.severity === "urgent" ? "#B71C1C" : "#E65100",
                lineHeight:   "1.5",
                fontWeight:   "500",
              }}>
                {r.severity === "urgent" ? "🚨 " : "⚠️ "}{r.message}
              </div>
            ))}
          </div>
        )}

        {/* Dimension scores */}
        <div style={{
          background:   theme.colors.offWhite,
          borderRadius: theme.radius.xl,
          padding:      "28px",
          marginBottom: "28px",
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: "700", color: theme.colors.neutral, margin: "0 0 20px" }}>
            Personality profile
          </h3>
          {Object.entries(dimension_scores).map(([dim, pct]) => (
            <div key={dim} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "14px", fontWeight: "600", color: theme.colors.neutral }}>
                  {DIMENSION_LABELS[dim]}
                </span>
                <span style={{ fontSize: "14px", fontWeight: "700", color: accent }}>
                  {pct}%
                </span>
              </div>
              <div style={{ height: "8px", background: theme.colors.border, borderRadius: "4px", overflow: "hidden" }}>
                <div style={{
                  width:        `${pct}%`,
                  height:       "100%",
                  background:   pct >= 60 ? accent : pct >= 40 ? theme.colors.neutralMid : `${accent}88`,
                  borderRadius: "4px",
                  transition:   "width 0.8s ease",
                }}/>
              </div>
            </div>
          ))}
        </div>

        {/* Plan flags */}
        {plan.flags && plan.flags.length > 0 && (
          <div style={{ marginBottom: "28px" }}>
            {plan.flags.map((flag, i) => (
              <div key={i} style={{
                background:   "#E3F2FD",
                border:       "1.5px solid #90CAF9",
                borderRadius: theme.radius.lg,
                padding:      "14px 18px",
                marginBottom: "10px",
                fontSize:     "14px",
                color:        "#0D47A1",
                lineHeight:   "1.5",
              }}>
                ℹ️ {flag}
              </div>
            ))}
          </div>
        )}

        {/* Training plan */}
        <div style={{
          background:   light,
          borderRadius: theme.radius.xl,
          padding:      "28px",
          marginBottom: "28px",
          border:       `2px solid ${accent}22`,
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: "700", color: theme.colors.neutral, margin: "0 0 20px" }}>
            {petInfo.name}'s training plan
          </h3>

          {plan.preamble && (
            <div style={{
              background:   "white",
              borderRadius: theme.radius.md,
              padding:      "14px 16px",
              marginBottom: "20px",
              fontSize:     "14px",
              color:        accent,
              fontWeight:   "500",
              borderLeft:   `4px solid ${accent}`,
            }}>
              {plan.preamble}
            </div>
          )}

          <div style={{ display: "grid", gap: "16px" }}>
            {[
              ["Method",         plan.method],
              ["Best reward",    plan.reward],
              ["Session length", plan.session],
              ["Avoid",          plan.avoid],
              ["Structure",      plan.structure],
            ].map(([label, value]) => value && (
              <div key={label}>
                <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: accent, marginBottom: "4px" }}>
                  {label}
                </div>
                <div style={{ fontSize: "15px", color: theme.colors.neutral, lineHeight: "1.5" }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {plan.exercises && (
            <div style={{ marginTop: "24px" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: accent, marginBottom: "12px" }}>
                Start with these exercises
              </div>
              {plan.exercises.map((ex, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "10px" }}>
                  <div style={{
                    width:          "26px",
                    height:         "26px",
                    borderRadius:   "50%",
                    background:     accent,
                    color:          "white",
                    fontSize:       "13px",
                    fontWeight:     "700",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    flexShrink:     0,
                    marginTop:      "1px",
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: "15px", color: theme.colors.neutral, lineHeight: "1.5" }}>
                    {ex}
                  </div>
                </div>
              ))}
            </div>
          )}

          {plan.contraindicated && (
            <div style={{ marginTop: "20px", padding: "14px 16px", background: "#FFEBEE", borderRadius: theme.radius.md, fontSize: "14px", color: "#C62828" }}>
              <strong>Contraindicated for {petInfo.name}:</strong>{" "}
              {plan.contraindicated.join(", ")}
            </div>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={onRestart}
            style={{
              padding:      "14px 36px",
              background:   theme.colors.white,
              border:       `2px solid ${accent}`,
              borderRadius: theme.radius.lg,
              fontSize:     "15px",
              fontWeight:   "600",
              color:        accent,
              cursor:       "pointer",
              fontFamily:   theme.fonts.body,
            }}
          >
            Start a new assessment
          </button>
        </div>
      </div>
    </div>
  );
}
