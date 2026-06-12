import { useState } from "react";
import HomeScreen       from "./components/HomeScreen";
import SpeciesSelect    from "./components/SpeciesSelect";
import ContextQuestions from "./components/ContextQuestions";
import FullSurvey       from "./components/FullSurvey";
import SimpleSurvey     from "./components/SimpleSurvey";
import ResultsScreen    from "./components/ResultsScreen";
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
  const [step,    setStep]    = useState("home");
  const [mode,    setMode]    = useState(null);
  const [species, setSpecies] = useState(null);
  const [petInfo, setPetInfo] = useState(null);
  const [result,  setResult]  = useState(null);

  const handleHome = (selectedMode) => {
    setMode(selectedMode);
    setStep("species");
  };

  const handleSpecies = (s) => {
    setSpecies(s);
    setStep("context");
  };

  const handleContext = (info) => {
    setPetInfo(info);
    setStep("survey");
  };

  const handleSurveyComplete = (responses) => {
    const pct = mode === "simple"
      ? scoreSimpleAssessment(responses)
      : scoreAssessment(responses, FULL_QUESTIONS);

    const archetype    = classifyArchetype(pct);
    const referrals    = checkReferrals(pct);
    const basePlan     = getTrainingPlan(archetype.primary);
    const modifiedPlan = applyModifiers(basePlan, petInfo);

    setResult({
      dimension_scores: pct,
      archetype,
      training_plan:    modifiedPlan,
      referrals,
    });
    setStep("results");
  };

  const restart = () => {
    setStep("home");
    setMode(null);
    setSpecies(null);
    setPetInfo(null);
    setResult(null);
  };

  if (step === "home")    return <HomeScreen    onSelect={handleHome}/>;
  if (step === "species") return <SpeciesSelect onSelect={handleSpecies}/>;
  if (step === "context") return <ContextQuestions species={species} onComplete={handleContext}/>;
  if (step === "survey") {
    return mode === "simple"
      ? <SimpleSurvey species={species} petInfo={petInfo} onComplete={handleSurveyComplete}/>
      : <FullSurvey   species={species} petInfo={petInfo} onComplete={handleSurveyComplete}/>;
  }
  if (step === "results") return (
    <ResultsScreen
      result={result}
      petInfo={petInfo}
      species={species}
      onRestart={restart}
    />
  );
}
