import { useState, useEffect } from "react";

const DOG_MESSAGES = [
  "Let's find out what makes your pup tick! 🐾",
  "Every dog is different — that's the fun part!",
  "Take your time. There are no wrong answers.",
  "You're doing great! Keep going.",
  "Almost there! These last ones really help.",
  "Nearly done — your personalised plan is coming!",
  "Amazing! Let's see your results.",
];

const CAT_MESSAGES = [
  "Cats are wonderfully complex. Let's learn about yours! 🐱",
  "Your cat has a unique personality all their own.",
  "No rush — answer as honestly as you can.",
  "You know your cat best. Trust your instincts.",
  "Just a few more questions to go.",
  "Almost done! Your cat's plan is nearly ready.",
  "Purr-fect! Let's see what we found.",
];

function DogSVG({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="52" rx="22" ry="16" fill="#C49A6C"/>
      <circle cx="40" cy="28" r="16" fill="#C49A6C"/>
      <ellipse cx="27" cy="18" rx="7" ry="10" fill="#8B5E3C" transform="rotate(-15 27 18)"/>
      <ellipse cx="53" cy="18" rx="7" ry="10" fill="#8B5E3C" transform="rotate(15 53 18)"/>
      <circle cx="34" cy="26" r="3" fill="#3D2B1F"/>
      <circle cx="46" cy="26" r="3" fill="#3D2B1F"/>
      <circle cx="35" cy="25" r="1" fill="white"/>
      <circle cx="47" cy="25" r="1" fill="white"/>
      <ellipse cx="40" cy="32" rx="4" ry="3" fill="#3D2B1F"/>
      <path d="M37 35 Q40 38 43 35" stroke="#3D2B1F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M62 48 Q75 38 72 28" stroke="#C49A6C" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <rect x="22" y="62" width="8" height="12" rx="4" fill="#C49A6C"/>
      <rect x="32" y="62" width="8" height="12" rx="4" fill="#C49A6C"/>
      <rect x="42" y="62" width="8" height="12" rx="4" fill="#C49A6C"/>
      <rect x="52" y="62" width="8" height="12" rx="4" fill="#C49A6C"/>
    </svg>
  );
}

function CatSVG({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="54" rx="20" ry="14" fill="#F0A875"/>
      <circle cx="40" cy="30" r="15" fill="#F0A875"/>
      <polygon points="24,20 28,8 34,20" fill="#E07B39"/>
      <polygon points="46,20 52,8 56,20" fill="#E07B39"/>
      <polygon points="25,20 28,11 33,20" fill="#FEC8A0"/>
      <polygon points="47,20 52,11 55,20" fill="#FEC8A0"/>
      <ellipse cx="34" cy="28" rx="4" ry="5" fill="#2D5016"/>
      <ellipse cx="46" cy="28" rx="4" ry="5" fill="#2D5016"/>
      <ellipse cx="34" cy="28" rx="2" ry="4" fill="#1A1A1A"/>
      <ellipse cx="46" cy="28" rx="2" ry="4" fill="#1A1A1A"/>
      <circle cx="35" cy="27" r="1" fill="white"/>
      <circle cx="47" cy="27" r="1" fill="white"/>
      <polygon points="40,33 37,36 43,36" fill="#E07B39"/>
      <path d="M37 36 Q40 39 43 36" stroke="#3D2B1F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <line x1="20" y1="32" x2="34" y2="34" stroke="#3D2B1F" strokeWidth="1"/>
      <line x1="20" y1="35" x2="34" y2="35" strokeWidth="1" stroke="#3D2B1F"/>
      <line x1="46" y1="34" x2="60" y2="32" stroke="#3D2B1F" strokeWidth="1"/>
      <line x1="46" y1="35" x2="60" y2="35" stroke="#3D2B1F" strokeWidth="1"/>
      <path d="M60 54 Q72 44 68 32 Q65 26 60 30" stroke="#F0A875" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <rect x="24" y="62" width="7" height="11" rx="3.5" fill="#F0A875"/>
      <rect x="33" y="62" width="7" height="11" rx="3.5" fill="#F0A875"/>
      <rect x="42" y="62" width="7" height="11" rx="3.5" fill="#F0A875"/>
      <rect x="51" y="62" width="7" height="11" rx="3.5" fill="#F0A875"/>
    </svg>
  );
}

export default function GuideCharacter({ species, progress = 0 }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const accent = species === "cat" ? "#E07B39" : "#8B5E3C";
  const messages = species === "cat" ? CAT_MESSAGES : DOG_MESSAGES;

  useEffect(() => {
    const idx = Math.min(
      Math.floor((progress / 100) * (messages.length - 1)),
      messages.length - 1
    );
    if (idx !== messageIndex) {
      setIsAnimating(true);
      setTimeout(() => {
        setMessageIndex(idx);
        setIsAnimating(false);
      }, 300);
    }
  }, [progress]);

  return (
    <div style={{
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      gap:            "16px",
      padding:        "24px 16px",
      background:     "#FAFAFA",
      borderRadius:   "16px",
      border:         `1.5px solid ${accent}22`,
      minWidth:       "160px",
      maxWidth:       "180px",
      position:       "sticky",
      top:            "24px",
    }}>
      <div style={{ animation: "bounce 2s ease-in-out infinite" }}>
        {species === "cat" ? <CatSVG size={80}/> : <DogSVG size={80}/>}
      </div>

      <div style={{
        background:   `${accent}15`,
        borderRadius: "12px",
        padding:      "10px 12px",
        fontSize:     "13px",
        color:        accent,
        fontWeight:   "500",
        textAlign:    "center",
        lineHeight:   "1.4",
        opacity:      isAnimating ? 0 : 1,
        transition:   "opacity 0.3s ease",
        minHeight:    "60px",
        display:      "flex",
        alignItems:   "center",
      }}>
        {messages[messageIndex]}
      </div>

      <div style={{
        width:        "100%",
        height:       "4px",
        background:   "#E0E0E0",
        borderRadius: "2px",
        overflow:     "hidden",
      }}>
        <div style={{
          width:        `${progress}%`,
          height:       "100%",
          background:   accent,
          borderRadius: "2px",
          transition:   "width 0.5s ease",
        }}/>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
