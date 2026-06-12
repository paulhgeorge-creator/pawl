import { useState } from "react";
import HomeScreen       from "./components/HomeScreen";
import SpeciesSelect    from "./components/SpeciesSelect";
import ContextQuestions from "./components/ContextQuestions";
import FullSurvey       from "./components/FullSurvey";
import SimpleSurvey     from "./components/SimpleSurvey";
import ResultsScreen    from "./components/ResultsScreen";
import TrainingPath     from "./components/TrainingPath";
import {
  scoreAssessment,
  scoreSimpleAssessment,
  classifyArchetype,
  checkReferrals,
  applyModifiers,
  TRAINING_PLANS,
} from "./logic/scoring";
import { FULL_QUESTIONS } from "./data/questions";

function getTrainingPlan(archetype) {
  return { ...(TRAINING_PLANS[archetype] ?? TRAINING_PLANS["The Companion"]) };
}

export default function App() {
  const [step,         setStep]         = useState("init");
  const [mode,         setMode]         = useState(null);
  const [species,      setSpecies]      = useState(null);
  const [petInfo,      setPetInfo]      = useState(null);
  const [surveyResult, setSurveyResult] = useState(null);
  const [pathSpecies,  setPathSpecies]  = useState(null);

  // ── Initial species pick for path ──
  const handlePathSpeciesSelect = (s) => {
    setPathSpecies(s);
    setStep("path");
  };

  // ── Survey flow from settings panel ──
  const handleStartSurveyFromPath = () => setStep("survey_species");

  const handleSurveySpeciesSelect = (s) => {
    setSpecies(s);
    setStep("survey_context");
  };

  const handleSurveyContext = (info) => {
    setPetInfo(info);
    setStep("survey_mode");
  };

  const handleSurveyMode = (m) => {
    setMode(m);
    setStep("survey_questions");
  };

  const handleSurveyComplete = (responses) => {
    const pct       = mode === "simple"
      ? scoreSimpleAssessment(responses)
      : scoreAssessment(responses, FULL_QUESTIONS);
    const archetype = classifyArchetype(pct);
    const referrals = checkReferrals(pct);
    const basePlan  = getTrainingPlan(archetype.primary);
    const modified  = applyModifiers(basePlan, petInfo);

    setSurveyResult({
      dimension_scores: pct,
      archetype,
      training_plan:    modified,
      referrals,
    });
    setStep("survey_results");
  };

  const handleResultsDone = () => setStep("path");

  // ── Initial entry ──
  if (step === "init" || !pathSpecies) {
    return <SpeciesSelectForPath onSelect={handlePathSpeciesSelect}/>;
  }

  if (step === "path") {
    return (
      <TrainingPath
        species={pathSpecies}
        archetype={surveyResult?.archetype?.primary ?? null}
        onStartSurvey={handleStartSurveyFromPath}
      />
    );
  }

  if (step === "survey_species") return <SpeciesSelect onSelect={handleSurveySpeciesSelect}/>;
  if (step === "survey_context") return <ContextQuestions species={species} onComplete={handleSurveyContext}/>;
  if (step === "survey_mode")    return <SurveyModeSelect onSelect={handleSurveyMode} species={species}/>;
  if (step === "survey_questions") {
    return mode === "simple"
      ? <SimpleSurvey species={species} petInfo={petInfo} onComplete={handleSurveyComplete}/>
      : <FullSurvey   species={species} petInfo={petInfo} onComplete={handleSurveyComplete}/>;
  }
  if (step === "survey_results") {
    return (
      <ResultsScreen
        result={surveyResult}
        petInfo={petInfo}
        species={species}
        onRestart={handleResultsDone}
        doneLabel="Back to training path →"
      />
    );
  }

  return null;
}

function SpeciesSelectForPath({ onSelect }) {
  const [hoveredDog, setHoveredDog] = useState(false);
  const [hoveredCat, setHoveredCat] = useState(false);

  const dogColor = "#8B5E3C";
  const catColor = "#E07B39";

  return (
    <div style={{
      minHeight:      "100vh",
      background:     "#FFFFFF",
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      padding:        "40px 20px",
      fontFamily:     "'Inter', sans-serif",
    }}>
      <div style={{ fontSize: "40px", marginBottom: "12px" }}>🐾</div>
      <h1 style={{
        fontSize:   "clamp(28px, 5vw, 44px)",
        fontWeight: "800",
        color:      "#3D3D3D",
        margin:     "0 0 8px",
        textAlign:  "center",
      }}>
        Pawl
      </h1>
      <p style={{
        fontSize:   "17px",
        color:      "#7A7A7A",
        margin:     "0 0 48px",
        textAlign:  "center",
        maxWidth:   "380px",
        lineHeight: "1.6",
      }}>
        Daily training tasks that teach your pet a new trick in 7 days.
      </p>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { s: "dog", label: "I have a dog", emoji: "🐕", color: dogColor, light: "#F5EDE4", hover: hoveredDog, setHover: setHoveredDog },
          { s: "cat", label: "I have a cat", emoji: "🐈", color: catColor, light: "#FEF0E6", hover: hoveredCat, setHover: setHoveredCat },
        ].map(({ s, label, emoji, color, light, hover, setHover }) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              width:         "200px",
              height:        "180px",
              background:    hover ? light : "#FFFFFF",
              border:        `3px solid ${hover ? color : "#E0E0E0"}`,
              borderRadius:  "24px",
              cursor:        "pointer",
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
              justifyContent:"center",
              gap:           "12px",
              transition:    "all 0.2s ease",
              transform:     hover ? "translateY(-4px)" : "none",
              boxShadow:     hover ? `0 8px 24px ${color}33` : "0 2px 8px rgba(0,0,0,0.06)",
              fontFamily:    "'Inter', sans-serif",
            }}
          >
            <span style={{ fontSize: "48px" }}>{emoji}</span>
            <span style={{ fontSize: "16px", fontWeight: "700", color: hover ? color : "#3D3D3D" }}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SurveyModeSelect({ onSelect, species }) {
  const color = species === "cat" ? "#E07B39" : "#8B5E3C";
  const light = species === "cat" ? "#FEF0E6" : "#F5EDE4";

  return (
    <div style={{
      minHeight:      "100vh",
      background:     "#FFFFFF",
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      padding:        "40px 20px",
      fontFamily:     "'Inter', sans-serif",
    }}>
      <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#3D3D3D", margin: "0 0 8px", textAlign: "center" }}>
        Which survey would you like?
      </h2>
      <p style={{ fontSize: "15px", color: "#7A7A7A", margin: "0 0 40px", textAlign: "center", maxWidth: "380px", lineHeight: "1.5" }}>
        Both produce the same depth of result and the same personalised training tips.
      </p>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { m: "simple", label: "Quick survey",    sub: "10 plain questions • ~3 min", emoji: "⚡" },
          { m: "full",   label: "Full assessment", sub: "25 detailed questions • ~8 min", emoji: "🔬" },
        ].map(({ m, label, sub, emoji }) => (
          <button
            key={m}
            onClick={() => onSelect(m)}
            style={{
              width:        "220px",
              padding:      "28px 20px",
              background:   "#FAFAFA",
              border:       "2px solid #E0E0E0",
              borderRadius: "20px",
              cursor:       "pointer",
              textAlign:    "center",
              fontFamily:   "'Inter', sans-serif",
              transition:   "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background  = light;
              e.currentTarget.style.borderColor = color;
              e.currentTarget.style.transform   = "translateY(-4px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background  = "#FAFAFA";
              e.currentTarget.style.borderColor = "#E0E0E0";
              e.currentTarget.style.transform   = "none";
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "10px" }}>{emoji}</div>
            <div style={{ fontSize: "17px", fontWeight: "700", color: "#3D3D3D", marginBottom: "4px" }}>{label}</div>
            <div style={{ fontSize: "13px", color: "#9E9E9E" }}>{sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
