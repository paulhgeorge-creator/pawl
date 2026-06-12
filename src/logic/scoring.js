import { FULL_QUESTIONS, SIMPLE_QUESTIONS } from "../data/questions";

// ── Core scoring ──
export function scoreAssessment(responses, questions) {
  const raw = { energy: 0, sociability: 0, boldness: 0, trainability: 0, reactivity: 0 };
  const maxPerDimension = questions.filter(q => q.dimension === "energy").length * 3;

  questions.forEach(q => {
    const raw_val = responses[q.id] ?? 4;
    let point = typeof raw_val === "number" ? raw_val - 4 : 0;
    if (q.direction === "low") point = -point;
    raw[q.dimension] += Math.max(point, 0);
  });

  return Object.fromEntries(
    Object.entries(raw).map(([dim, score]) => [
      dim,
      Math.round((score / maxPerDimension) * 100),
    ])
  );
}

// ── Simple survey normalisation ──
export function scoreSimpleAssessment(responses) {
  const raw = { energy: 0, sociability: 0, boldness: 0, trainability: 0, reactivity: 0 };
  const counts = { energy: 0, sociability: 0, boldness: 0, trainability: 0, reactivity: 0 };

  SIMPLE_QUESTIONS.forEach(q => {
    const val = responses[q.id];
    if (val == null) return;
    const normalised = (val - 1) / 2;
    const point = q.direction === "low" ? 3 - normalised : normalised;
    raw[q.dimension]    += point;
    counts[q.dimension] += 3;
  });

  return Object.fromEntries(
    Object.entries(raw).map(([dim, score]) => [
      dim,
      counts[dim] > 0 ? Math.round((score / counts[dim]) * 100) : 50,
    ])
  );
}

// ── Three-zone confidence ──
export function classifyDimension(pct) {
  if (pct >= 70) return { zone: "dominant",   label: "high",  confidence: "high" };
  if (pct >= 60) return { zone: "clear",       label: "high",  confidence: "medium" };
  if (pct >= 41) return { zone: "borderline",  label: "mixed", confidence: "low" };
  if (pct >= 31) return { zone: "clear",       label: "low",   confidence: "medium" };
  return           { zone: "dominant",   label: "low",   confidence: "high" };
}

export function calculateConfidence(classifications) {
  const borderline = Object.values(classifications).filter(d => d.zone === "borderline").length;
  if (borderline >= 3) return "low";
  if (borderline >= 1) return "medium";
  return "high";
}

// ── Coherence check ──
const INCOHERENT_PAIRS = [
  ["boldness",    "reactivity",  "both_high", "High boldness and high reactivity is unusual — consider re-taking the reactivity section."],
  ["sociability", "reactivity",  "both_high", "High sociability and high reactivity is contradictory — review the reactivity questions."],
  ["trainability","energy",      "high_low",  "Very high trainability with very low energy is unusual — age or health may be influencing responses."],
];

export function coherenceCheck(pct) {
  const flags = [];
  INCOHERENT_PAIRS.forEach(([a, b, pattern, msg]) => {
    if (pattern === "both_high" && pct[a] >= 65 && pct[b] >= 65)
      flags.push({ dims: [a, b], message: msg });
    if (pattern === "high_low" && pct[a] >= 70 && pct[b] <= 30)
      flags.push({ dims: [a, b], message: msg });
  });
  return { flags, coherent: flags.length === 0 };
}

// ── Archetype classification ──
export function classifyArchetype(pct) {
  const classifications = Object.fromEntries(
    Object.entries(pct).map(([dim, score]) => [dim, classifyDimension(score)])
  );
  const coherence  = coherenceCheck(pct);
  let   confidence = calculateConfidence(classifications);
  if (!coherence.coherent && confidence === "medium") confidence = "low";

  const e = classifications.energy.label;
  const b = classifications.boldness.label;
  const s = classifications.sociability.label;
  const t = classifications.trainability.label;
  const r = classifications.reactivity.label;

  let primary;
  if      (e === "high" && b === "high" && s !== "high")                    primary = "The Sentinel";
  else if (e === "high" && b === "high" && s === "high" && t !== "high")    primary = "The Free Spirit";
  else if (e === "high" && b === "high")                                     primary = "The Trailblazer";
  else if (s === "high" && t === "high" && r !== "high")                    primary = "The Companion";
  else if (e !== "high" && b !== "high" && r === "high" && s !== "high")    primary = "The Observer";
  else if (e !== "high" && b !== "high" && r === "high")                    primary = "The Gentle Soul";
  else                                                                        primary = "The Companion";

  return {
    primary,
    secondary: confidence === "low"
      ? "Profile is borderline on multiple dimensions. Treat this result as provisional and reassess in 30 days."
      : null,
    confidence,
    coherence,
    dimensions: classifications,
  };
}

// ── Professional referral thresholds ──
const THRESHOLDS = [
  ["reactivity", "above", 90, "urgent", "URGENT: Your pet may benefit from a veterinary behavioural assessment. Cases at this level often respond better to medication-assisted behaviour modification than training alone."],
  ["reactivity", "above", 75, "high",   "Your pet shows signs of significant anxiety. A certified behaviourist should assess before you begin any formal training programme."],
  ["boldness",   "below", 25, "high",   "Your pet shows significant fear responses. Please consult a certified behaviourist before introducing new training environments or stimuli."],
];

export function checkReferrals(pct) {
  return THRESHOLDS
    .filter(([dim, dir, thresh]) =>
      dir === "above" ? pct[dim] >= thresh : pct[dim] <= thresh
    )
    .map(([dim, , thresh, severity, message]) => ({ severity, dimension: dim, message }));
}

// ── Training plans ──
export const TRAINING_PLANS = {
  "The Trailblazer": {
    emoji:       "🏃",
    description: "High-drive, confident, independent thinker. Needs a job to do.",
    method:      "Short high-intensity reward sessions, 5–10 minutes maximum.",
    reward:      "Play-based reward over food — the game is the prize.",
    session:     "5–10 minutes. Multiple short sessions beat one long one.",
    avoid:       "Long repetitive drills — disengages and becomes frustrated fast.",
    exercises:   ["Agility foundation — tunnels, jumps, directional cues", "Nose work — hide high-value treats and let them search", "Off-leash recall training — build the come command before anything else"],
    structure:   "Exercise first 20 minutes → 5-minute focused training → reward with play.",
  },
  "The Companion": {
    emoji:       "🤝",
    description: "Friendly, eager to please, socially motivated. The textbook learner.",
    method:      "Positive reinforcement with heavy verbal praise.",
    reward:      "Social reward — praise and touch matter as much as food.",
    session:     "10–15 minutes daily. Consistent schedule matters more than frequency.",
    avoid:       "Cold corrections, isolation-based methods, or ignoring their social bids.",
    exercises:   ["Obedience foundation — sit, stay, down, come", "Trick training — builds confidence and strengthens the bond", "Loose-leash walking — capitalise on social motivation to stay close"],
    structure:   "Any time of day. Consistent location initially. End every session on a success.",
  },
  "The Sentinel": {
    emoji:       "🛡️",
    description: "Alert, structured, protective. Values clear rules over social praise.",
    method:      "Structured reward-based training with clear, consistent commands.",
    reward:      "Task completion reward — values the work itself.",
    session:     "15–20 minutes. Same time each day if possible.",
    avoid:       "Inconsistent rules or permissive handling — will test and exploit gaps.",
    exercises:   ["Impulse control — wait, leave it, settle on mat", "Leash manners — focused heel work", "Place command — go to mat and hold position"],
    structure:   "Consistent daily schedule. Same commands, same criteria. Reward precision.",
  },
  "The Gentle Soul": {
    emoji:       "🌸",
    description: "Calm, sensitive, bonds deeply. Easily damaged by pressure.",
    method:      "Counterconditioning and systematic desensitisation only.",
    reward:      "High-value food rewards. Calm verbal praise. Never excitement.",
    session:     "5 minutes maximum. Always end on success. Never push past threshold.",
    avoid:       "All aversive methods — even raised voices cause measurable stress damage.",
    exercises:   ["Mat and settle training — build a safe default behaviour", "Confidence-building exercises — low-stakes novelty exposure", "Gradual trigger desensitisation — start well below threshold"],
    structure:   "Short, gentle, predictable. Always the same routine. Never end in frustration.",
  },
  "The Free Spirit": {
    emoji:       "🌀",
    description: "Energetic, curious, easily distracted. Training feels like interrupting play.",
    method:      "Capture natural behaviours. Make training feel like the game.",
    reward:      "High-value treats only, varied unpredictably to maintain engagement.",
    session:     "3–5 minutes. Multiple times per day rather than one long session.",
    avoid:       "Drilling commands — attention span is measured in seconds.",
    exercises:   ["Nose work and scatter feeding — channels the energy productively", "Free-shaping games — reward any voluntary behaviour in the right direction", "Chase and recall games — turn the prey drive into a training tool"],
    structure:   "3–5 minutes, 4–6 times per day. Treat training as a lifestyle not a session.",
  },
  "The Observer": {
    emoji:       "👁️",
    description: "Reserved, cautious, slow to trust. Needs time before asking for anything.",
    method:      "Force-free only. Build trust before any formal training begins.",
    reward:      "Let the pet set the pace. Owner controls distance, pet controls approach.",
    session:     "5 minutes at home. No new environments until baseline confidence is built.",
    avoid:       "Flooding (forced exposure), punishment, raised voices, group classes early on.",
    exercises:   ["Owner-as-safe-base exercises — build the bond before building obedience", "Clicker introduction — create a positive emotional response to the marker", "Gradual socialisation protocol — one new stimulus per week at sub-threshold distance"],
    structure:   "Home only for weeks 1–4. Quiet, predictable, owner-paced. No pressure.",
  },
};

// ── Context modifiers ──
export function applyModifiers(plan, context) {
  const result  = { ...plan };
  const flags   = [];
  const suppress = [];
  const add     = [];

  const age = parseFloat(context.age_years) || 3;

  if (age < 0.5) {
    suppress.push("formal_obedience", "long_sessions");
    add.push("socialisation_priority", "play_training");
    flags.push("Puppy under 6 months: prioritise socialisation and play-based learning.");
  } else if (age >= 12) {
    suppress.push("high_intensity", "agility", "long_sessions");
    add.push("gentle_mental_stimulation", "cognitive_enrichment");
    flags.push("Senior pet (12+ years): high-intensity training is contraindicated. Focus on gentle enrichment and consult your vet.");
  } else if (age >= 8) {
    suppress.push("agility", "sustained_high_intensity");
    add.push("cognitive_enrichment", "low_impact_alternatives");
    flags.push("Mature pet (8+ years): high-impact exercise should be reduced.");
  }

  const health = context.health_status;
  if (health === "post_surgery_active") {
    suppress.push("all_physical_training");
    flags.push("TRAINING ON HOLD: Active post-surgical recovery. No physical training without explicit veterinary clearance.");
  } else if (health === "post_surgery_recovery") {
    suppress.push("high_intensity", "off_leash", "agility");
    flags.push("Post-surgical recovery: cleared for gentle lead work and mental stimulation only.");
  } else if (health === "chronic") {
    suppress.push("high_impact", "sustained_exercise");
    flags.push("Chronic condition: veterinary review of the exercise component is recommended.");
  }

  const history = context.history;
  if (history === "rescue") {
    result.preamble = "Before beginning any formal training, focus exclusively on building trust. Give your pet time to decompress. Trust is the foundation — training comes later.";
    suppress.push("group_classes_early");
    flags.push("Rescue background: decompress and build trust before introducing formal training. Avoid group classes for the first 3–4 weeks minimum.");
  } else if (history === "prior_aversive") {
    result.contraindicated = ["All correction-based methods", "Leash corrections", "Verbal or physical punishment"];
    flags.push("Prior aversive training: re-conditioning is recommended. All correction-based methods are contraindicated for this pet.");
  } else if (history === "prior_professional") {
    result.advanced_unlocked = true;
    flags.push("Prior professional training noted: advanced exercises and off-leash work are unlocked.");
  }

  result.suppress = suppress;
  result.add      = add;
  result.flags    = flags;
  return result;
}
