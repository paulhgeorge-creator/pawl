// ── FULL SURVEY: 25 behaviorally-anchored questions ──
export const FULL_QUESTIONS = [
  // ENERGY
  {
    id: 1, dimension: "energy", direction: "high",
    text: "After a 30-minute walk, your pet is...",
    anchors: {
      1: "Exhausted — lies down immediately",
      2: "Tired but responsive",
      3: "Settled but alert",
      4: "Calm but would go again",
      5: "Recovered within 10 minutes",
      6: "Still energetic, seeking activity",
      7: "Seemingly unaffected — still demanding play",
    },
  },
  {
    id: 2, dimension: "energy", direction: "high",
    text: "During a typical day at home, your pet is...",
    anchors: {
      1: "Sleeping or resting almost all day",
      2: "Mostly resting, occasionally moves",
      3: "Resting but responsive to activity",
      4: "A mix of rest and self-directed activity",
      5: "More active than not",
      6: "Constantly seeking engagement",
      7: "Unable to settle — always moving",
    },
  },
  {
    id: 3, dimension: "energy", direction: "high",
    text: "When offered a second walk shortly after the first, your pet...",
    anchors: {
      1: "Ignores the offer completely",
      2: "Moves toward the door but seems reluctant",
      3: "Goes along without enthusiasm",
      4: "Accepts with mild interest",
      5: "Responds positively",
      6: "Responds eagerly",
      7: "Responds with intense excitement as if the first walk never happened",
    },
  },
  {
    id: 4, dimension: "energy", direction: "high",
    text: "Your pet's engagement with toys throughout the day is...",
    anchors: {
      1: "No interest in toys",
      2: "Occasionally sniffs toys but doesn't play",
      3: "Plays briefly if initiated by owner",
      4: "Self-directed play once or twice a day",
      5: "Regular self-directed play",
      6: "Frequently initiates play",
      7: "Obsessively engaged with toys most of the day",
    },
  },
  {
    id: 5, dimension: "energy", direction: "low",
    text: "Without a walk or play session on a given day, your pet...",
    anchors: {
      1: "Shows no change whatsoever",
      2: "Slightly more restless than usual",
      3: "Noticeably more active indoors",
      4: "Seeks attention more than usual",
      5: "Becomes frustrated or vocalises",
      6: "Becomes destructive or disruptive",
      7: "Becomes unmanageable",
    },
  },

  // SOCIABILITY
  {
    id: 6, dimension: "sociability", direction: "high",
    text: "The last time a stranger approached on a walk, your pet...",
    anchors: {
      1: "Lunged, barked, or showed teeth",
      2: "Backed away or hid",
      3: "Stood still and watched from a distance",
      4: "Sniffed cautiously then disengaged",
      5: "Allowed brief contact without seeking more",
      6: "Approached the stranger first",
      7: "Jumped up or actively sought extended contact",
    },
  },
  {
    id: 7, dimension: "sociability", direction: "high",
    text: "When guests arrive at your home, your pet typically...",
    anchors: {
      1: "Hides in another room",
      2: "Stays at a distance and observes",
      3: "Approaches cautiously after several minutes",
      4: "Approaches calmly once the guest is settled",
      5: "Greets guests at the door with mild interest",
      6: "Greets guests enthusiastically",
      7: "Overwhelms guests with excitement",
    },
  },
  {
    id: 8, dimension: "sociability", direction: "high",
    text: "Around other animals, your pet...",
    anchors: {
      1: "Reacts aggressively or defensively",
      2: "Moves away and avoids all contact",
      3: "Ignores them unless directly approached",
      4: "Sniffs briefly then disengages",
      5: "Engages calmly with most animals",
      6: "Actively seeks other animals out",
      7: "Fixated on other animals — hard to redirect",
    },
  },
  {
    id: 9, dimension: "sociability", direction: "high",
    text: "When you leave the room, your pet...",
    anchors: {
      1: "Shows no response",
      2: "Watches where you went but stays",
      3: "Shifts to maintain visual contact",
      4: "Follows after a short delay",
      5: "Follows fairly consistently",
      6: "Follows you to almost every room",
      7: "Cannot be separated without distress",
    },
  },
  {
    id: 10, dimension: "sociability", direction: "high",
    text: "During a vet visit, your pet's response to the vet is...",
    anchors: {
      1: "Aggressive or extremely fearful",
      2: "Tries to escape or hides",
      3: "Freezes and tolerates handling",
      4: "Tense but cooperative",
      5: "Calm and cooperative",
      6: "Relaxed and accepts handling easily",
      7: "Friendly and seeks contact with the vet",
    },
  },

  // BOLDNESS
  {
    id: 11, dimension: "boldness", direction: "high",
    text: "When your pet encounters an unfamiliar object, they...",
    anchors: {
      1: "Refuse to pass it or panic visibly",
      2: "Give it a wide berth",
      3: "Pause and stare but don't approach",
      4: "Sniff from a distance then move on",
      5: "Approach cautiously after a few seconds",
      6: "Investigate immediately and move on",
      7: "Investigate immediately, interact with it, no concern",
    },
  },
  {
    id: 12, dimension: "boldness", direction: "high",
    text: "In a new environment your pet has never visited, they...",
    anchors: {
      1: "Freeze, refuse to move, or attempt to leave",
      2: "Stay very close and avoid exploring",
      3: "Stay near you but observe",
      4: "Gradually explore after several minutes",
      5: "Explore the perimeter cautiously",
      6: "Explore actively with occasional check-ins",
      7: "Explore immediately with no hesitation",
    },
  },
  {
    id: 13, dimension: "boldness", direction: "high",
    text: "When your pet hears a sudden loud noise, they...",
    anchors: {
      1: "Panics severely — shaking, hiding",
      2: "Strongly fearful — seeks hiding",
      3: "Startled, moves toward you for reassurance",
      4: "Startled but recovers within a minute",
      5: "Slightly alert, recovers quickly",
      6: "Brief alert response, returns to normal immediately",
      7: "No visible response",
    },
  },
  {
    id: 14, dimension: "boldness", direction: "high",
    text: "When presented with a novel treat they have never had, your pet...",
    anchors: {
      1: "Refuses to engage with it at all",
      2: "Sniffs from a distance and backs away",
      3: "Sniffs repeatedly but does not eat",
      4: "Eventually eats after several minutes",
      5: "Eats after brief investigation",
      6: "Eats willingly on first offer",
      7: "Eats immediately with no investigation",
    },
  },
  {
    id: 15, dimension: "boldness", direction: "high",
    text: "When off-leash in a safe open space, your pet...",
    anchors: {
      1: "Stays pressed against your legs",
      2: "Moves only a few feet away at most",
      3: "Explores a small radius, returns frequently",
      4: "Explores a moderate range with regular check-ins",
      5: "Explores confidently with occasional check-ins",
      6: "Explores widely with infrequent check-ins",
      7: "Explores immediately and independently",
    },
  },

  // TRAINABILITY
  {
    id: 16, dimension: "trainability", direction: "high",
    text: "When you hold a treat and give a verbal command, your pet...",
    anchors: {
      1: "Is uninterested in both treat and command",
      2: "Notices the treat but cannot follow the command",
      3: "Attempts the behaviour but loses focus quickly",
      4: "Performs the behaviour with some repetition",
      5: "Performs reliably with one repetition",
      6: "Performs reliably and immediately",
      7: "Performs instantly and holds until released",
    },
  },
  {
    id: 17, dimension: "trainability", direction: "high",
    text: "During training with distractions nearby, your pet...",
    anchors: {
      1: "Cannot focus at all",
      2: "Focuses briefly then loses attention",
      3: "Performs familiar behaviours but not new ones",
      4: "Can work through mild distractions",
      5: "Performs reliably with moderate distractions",
      6: "Performs reliably with significant distractions",
      7: "Performs reliably regardless of environment",
    },
  },
  {
    id: 18, dimension: "trainability", direction: "high",
    text: "When learning a brand new behaviour for the first time, your pet...",
    anchors: {
      1: "Shows no understanding after multiple sessions",
      2: "Begins to understand after many sessions",
      3: "Grasps the concept after several sessions",
      4: "Grasps the concept within two or three sessions",
      5: "Grasps the concept within one session",
      6: "Grasps the concept within a few repetitions",
      7: "Appears to understand after one or two repetitions",
    },
  },
  {
    id: 19, dimension: "trainability", direction: "high",
    text: "How long does your pet maintain focus during training before disengaging?",
    anchors: {
      1: "Under 1 minute",
      2: "1 to 2 minutes",
      3: "2 to 5 minutes",
      4: "5 to 8 minutes",
      5: "8 to 12 minutes",
      6: "12 to 20 minutes",
      7: "As long as the session continues",
    },
  },
  {
    id: 20, dimension: "trainability", direction: "high",
    text: "When you give a well-known command without a visible treat, your pet...",
    anchors: {
      1: "Never performs without a visible treat",
      2: "Rarely performs without a visible treat",
      3: "Sometimes performs but inconsistently",
      4: "Performs about half the time",
      5: "Usually performs with verbal praise only",
      6: "Reliably performs with verbal praise only",
      7: "Performs immediately regardless of reward visibility",
    },
  },

  // REACTIVITY
  {
    id: 21, dimension: "reactivity", direction: "high",
    text: "When your pet sees another animal through a window or fence, they...",
    anchors: {
      1: "Ignores it completely",
      2: "Briefly looks and returns to normal",
      3: "Watches with mild interest",
      4: "Becomes alert but remains calm",
      5: "Vocalises once or twice",
      6: "Barks or vocalises persistently",
      7: "Lunges and is very difficult to redirect",
    },
  },
  {
    id: 22, dimension: "reactivity", direction: "high",
    text: "After a stressful event, your pet recovers...",
    anchors: {
      1: "Immediately — no visible lasting effect",
      2: "Within a few minutes",
      3: "Within 15 to 30 minutes",
      4: "Within an hour",
      5: "Within a few hours",
      6: "Within a day — noticeably subdued or on edge",
      7: "Over multiple days — behaviour altered significantly",
    },
  },
  {
    id: 23, dimension: "reactivity", direction: "high",
    text: "When your routine changes significantly, your pet...",
    anchors: {
      1: "Adapts immediately with no noticeable change",
      2: "Slightly unsettled for a day",
      3: "Unsettled for a few days",
      4: "Takes about a week to adjust",
      5: "Takes two or more weeks to return to normal",
      6: "Shows prolonged stress behaviours",
      7: "Has not fully adjusted even after a month",
    },
  },
  {
    id: 24, dimension: "reactivity", direction: "high",
    text: "When left alone at home, your pet...",
    anchors: {
      1: "Settles immediately and shows no distress",
      2: "Settles within 10 minutes",
      3: "Settles within 30 minutes",
      4: "Vocalises briefly then settles",
      5: "Vocalises for an extended period",
      6: "Shows destructive behaviour or persistent vocalising",
      7: "Cannot be left alone — severe distress every time",
    },
  },
  {
    id: 25, dimension: "reactivity", direction: "low",
    text: "In a calm environment with no triggers, your pet's general demeanour is...",
    anchors: {
      1: "Completely relaxed and settled at all times",
      2: "Generally relaxed with occasional alertness",
      3: "Calm but scans the environment regularly",
      4: "Moderately alert, reacts to minor changes",
      5: "Frequently on alert without obvious triggers",
      6: "Rarely fully relaxed — always vigilant",
      7: "Never appears fully relaxed — persistent tension",
    },
  },
];

// ── SIMPLIFIED SURVEY: 10 plain-language questions ──
export const SIMPLE_QUESTIONS = [
  {
    id: "s1", dimension: "energy", direction: "high",
    text: "How much energy does your pet have on a typical day?",
    options: [
      { value: 1, label: "Very low — mostly sleeps all day" },
      { value: 3, label: "Moderate — active but settles easily" },
      { value: 5, label: "High — needs regular exercise and play" },
      { value: 7, label: "Extremely high — never seems to tire out" },
    ],
  },
  {
    id: "s2", dimension: "energy", direction: "low",
    text: "What happens if your pet misses their usual walk or play time?",
    options: [
      { value: 1, label: "Nothing — they're totally fine" },
      { value: 3, label: "A little restless but manageable" },
      { value: 5, label: "Noticeably frustrated or destructive" },
      { value: 7, label: "Extremely disruptive — very hard to manage" },
    ],
  },
  {
    id: "s3", dimension: "sociability", direction: "high",
    text: "How does your pet react when they meet a stranger?",
    options: [
      { value: 1, label: "Hides or shows fear" },
      { value: 3, label: "Cautious but warms up slowly" },
      { value: 5, label: "Friendly and calm" },
      { value: 7, label: "Extremely excited — jumps all over them" },
    ],
  },
  {
    id: "s4", dimension: "sociability", direction: "high",
    text: "How much does your pet want to be near you?",
    options: [
      { value: 1, label: "Prefers their own space" },
      { value: 3, label: "Likes company but doesn't need it" },
      { value: 5, label: "Follows you around often" },
      { value: 7, label: "Cannot stand being away from you" },
    ],
  },
  {
    id: "s5", dimension: "boldness", direction: "high",
    text: "When your pet sees something new and unfamiliar, they usually...",
    options: [
      { value: 1, label: "Hide or refuse to go near it" },
      { value: 3, label: "Keep their distance but watch carefully" },
      { value: 5, label: "Approach slowly and check it out" },
      { value: 7, label: "Go straight up to it without hesitation" },
    ],
  },
  {
    id: "s6", dimension: "boldness", direction: "high",
    text: "How does your pet react to a sudden loud noise?",
    options: [
      { value: 1, label: "Panics badly and hides" },
      { value: 3, label: "Gets scared but calms down in a few minutes" },
      { value: 5, label: "Startled for a moment then back to normal" },
      { value: 7, label: "Doesn't seem bothered at all" },
    ],
  },
  {
    id: "s7", dimension: "trainability", direction: "high",
    text: "When you try to teach your pet something new, they...",
    options: [
      { value: 1, label: "Lose interest almost immediately" },
      { value: 3, label: "Try but get distracted often" },
      { value: 5, label: "Focus well and pick things up reasonably fast" },
      { value: 7, label: "Pick it up almost instantly" },
    ],
  },
  {
    id: "s8", dimension: "trainability", direction: "high",
    text: "If you give your pet a command they know without a treat visible, they...",
    options: [
      { value: 1, label: "Ignore you without the treat" },
      { value: 3, label: "Sometimes do it, sometimes don't" },
      { value: 5, label: "Usually listen with just your voice" },
      { value: 7, label: "Always respond immediately" },
    ],
  },
  {
    id: "s9", dimension: "reactivity", direction: "high",
    text: "After something stressful happens, how long does it take your pet to calm down?",
    options: [
      { value: 1, label: "They're fine straight away" },
      { value: 3, label: "About 30 minutes" },
      { value: 5, label: "A few hours" },
      { value: 7, label: "They stay on edge for days" },
    ],
  },
  {
    id: "s10", dimension: "reactivity", direction: "high",
    text: "When you leave your pet alone at home, they...",
    options: [
      { value: 1, label: "Settle immediately with no fuss" },
      { value: 3, label: "Take a little while but are usually fine" },
      { value: 5, label: "Often bark, whine, or cause trouble" },
      { value: 7, label: "Get extremely distressed every single time" },
    ],
  },
];

export const CONTEXT_FIELDS = {
  breed: {
    label:       "What breed is your pet?",
    placeholder: "e.g. Labrador, Siamese, mixed breed...",
    type:        "text",
  },
  age: {
    label:   "How old is your pet? (years)",
    type:    "number",
    min:     0,
    max:     30,
  },
  health_status: {
    label:   "Current health status",
    type:    "select",
    options: [
      { value: "healthy",               label: "Healthy" },
      { value: "post_surgery_active",   label: "Post-surgery (active recovery)" },
      { value: "post_surgery_recovery", label: "Post-surgery (recovery phase)" },
      { value: "chronic",               label: "Chronic condition" },
    ],
  },
  history: {
    label:   "How did you get your pet?",
    type:    "select",
    options: [
      { value: "breeder_no_training",  label: "From a breeder — no prior training" },
      { value: "rescue",               label: "Rescued / adopted — history unknown" },
      { value: "prior_aversive",       label: "Previously trained with punishment methods" },
      { value: "prior_professional",   label: "Previously trained by a professional" },
    ],
  },
};
