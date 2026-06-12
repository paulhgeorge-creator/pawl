import { useState } from "react";
import { theme } from "../styles/theme";

function DogBreedPreviews() {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", marginTop: "16px", justifyContent: "center" }}>
      {/* Labrador */}
      <svg width="56" height="60" viewBox="0 0 56 60" fill="none">
        <ellipse cx="28" cy="42" rx="18" ry="12" fill={theme.colors.dogMid}/>
        <circle cx="28" cy="22" r="12" fill={theme.colors.dogMid}/>
        <ellipse cx="19" cy="15" rx="5" ry="7" fill={theme.colors.dog} transform="rotate(-10 19 15)"/>
        <ellipse cx="37" cy="15" rx="5" ry="7" fill={theme.colors.dog} transform="rotate(10 37 15)"/>
        <circle cx="24" cy="21" r="2.5" fill="#2a1a0e"/>
        <circle cx="32" cy="21" r="2.5" fill="#2a1a0e"/>
        <ellipse cx="28" cy="26" rx="3" ry="2.5" fill="#2a1a0e"/>
        <rect x="14" y="50" width="6" height="10" rx="3" fill={theme.colors.dogMid}/>
        <rect x="22" y="50" width="6" height="10" rx="3" fill={theme.colors.dogMid}/>
        <rect x="30" y="50" width="6" height="10" rx="3" fill={theme.colors.dogMid}/>
        <rect x="38" y="50" width="6" height="10" rx="3" fill={theme.colors.dogMid}/>
      </svg>
      {/* Dachshund */}
      <svg width="72" height="50" viewBox="0 0 72 50" fill="none">
        <ellipse cx="36" cy="34" rx="28" ry="10" fill="#A0522D"/>
        <circle cx="14" cy="24" r="10" fill="#A0522D"/>
        <ellipse cx="8" cy="18" rx="4" ry="6" fill="#7B3F1F" transform="rotate(-15 8 18)"/>
        <ellipse cx="18" cy="16" rx="4" ry="6" fill="#7B3F1F" transform="rotate(5 18 16)"/>
        <circle cx="11" cy="22" r="2" fill="#2a1a0e"/>
        <circle cx="17" cy="22" r="2" fill="#2a1a0e"/>
        <ellipse cx="14" cy="27" rx="2.5" ry="2" fill="#2a1a0e"/>
        <rect x="12" y="40" width="5" height="9" rx="2.5" fill="#A0522D"/>
        <rect x="20" y="40" width="5" height="9" rx="2.5" fill="#A0522D"/>
        <rect x="48" y="40" width="5" height="9" rx="2.5" fill="#A0522D"/>
        <rect x="56" y="40" width="5" height="9" rx="2.5" fill="#A0522D"/>
        <path d="M64 30 Q72 22 70 14" stroke="#A0522D" strokeWidth="4" fill="none" strokeLinecap="round"/>
      </svg>
      {/* Poodle */}
      <svg width="52" height="64" viewBox="0 0 52 64" fill="none">
        <ellipse cx="26" cy="44" rx="16" ry="14" fill="#D2B48C"/>
        <circle cx="26" cy="22" r="13" fill="#D2B48C"/>
        <circle cx="14" cy="18" r="7" fill="#D2B48C"/>
        <circle cx="38" cy="18" r="7" fill="#D2B48C"/>
        <circle cx="22" cy="12" r="6" fill="#D2B48C"/>
        <circle cx="30" cy="12" r="6" fill="#D2B48C"/>
        <circle cx="22" cy="22" r="2.5" fill="#2a1a0e"/>
        <circle cx="30" cy="22" r="2.5" fill="#2a1a0e"/>
        <ellipse cx="26" cy="27" rx="3" ry="2.5" fill="#2a1a0e"/>
        <circle cx="16" cy="54" r="6" fill="#D2B48C"/>
        <circle cx="24" cy="56" r="5" fill="#D2B48C"/>
        <circle cx="32" cy="56" r="5" fill="#D2B48C"/>
        <circle cx="38" cy="54" r="6" fill="#D2B48C"/>
      </svg>
    </div>
  );
}

function CatBreedPreviews() {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", marginTop: "16px", justifyContent: "center" }}>
      {/* Siamese */}
      <svg width="50" height="62" viewBox="0 0 50 62" fill="none">
        <ellipse cx="25" cy="44" rx="16" ry="12" fill="#F5DEB3"/>
        <circle cx="25" cy="24" r="12" fill="#F5DEB3"/>
        <polygon points="14,18 17,8 21,18" fill="#C8A882"/>
        <polygon points="29,18 33,8 36,18" fill="#C8A882"/>
        <ellipse cx="20" cy="23" rx="3.5" ry="4.5" fill="#4169E1"/>
        <ellipse cx="30" cy="23" rx="3.5" ry="4.5" fill="#4169E1"/>
        <ellipse cx="20" cy="23" rx="1.5" ry="3.5" fill="#1a1a1a"/>
        <ellipse cx="30" cy="23" rx="1.5" ry="3.5" fill="#1a1a1a"/>
        <polygon points="25,28 22,31 28,31" fill="#DEB887"/>
        <rect x="14" y="52" width="5" height="10" rx="2.5" fill="#F5DEB3"/>
        <rect x="22" y="52" width="5" height="10" rx="2.5" fill="#F5DEB3"/>
        <rect x="30" y="52" width="5" height="10" rx="2.5" fill="#F5DEB3"/>
        <rect x="38" y="52" width="5" height="10" rx="2.5" fill="#F5DEB3"/>
        <path d="M41 44 Q50 34 48 22" stroke="#F5DEB3" strokeWidth="4" fill="none" strokeLinecap="round"/>
      </svg>
      {/* Persian */}
      <svg width="58" height="64" viewBox="0 0 58 64" fill="none">
        <ellipse cx="29" cy="46" rx="22" ry="16" fill="#E8D5C0"/>
        <circle cx="10" cy="42" r="8" fill="#E8D5C0"/>
        <circle cx="48" cy="42" r="8" fill="#E8D5C0"/>
        <circle cx="29" cy="26" r="16" fill="#E8D5C0"/>
        <circle cx="14" cy="20" r="7" fill="#E8D5C0"/>
        <circle cx="44" cy="20" r="7" fill="#E8D5C0"/>
        <circle cx="22" cy="14" r="6" fill="#E8D5C0"/>
        <circle cx="36" cy="14" r="6" fill="#E8D5C0"/>
        <polygon points="18,20 21,10 25,20" fill="#C9A882"/>
        <polygon points="33,20 37,10 40,20" fill="#C9A882"/>
        <ellipse cx="23" cy="24" r="3.5" fill="#FF8C00"/>
        <ellipse cx="35" cy="24" r="3.5" fill="#FF8C00"/>
        <ellipse cx="23" cy="24" rx="1.5" ry="3" fill="#1a1a1a"/>
        <ellipse cx="35" cy="24" rx="1.5" ry="3" fill="#1a1a1a"/>
        <ellipse cx="29" cy="29" rx="3" ry="2" fill="#DEB887"/>
        <circle cx="16" cy="56" r="7" fill="#E8D5C0"/>
        <circle cx="26" cy="58" r="6" fill="#E8D5C0"/>
        <circle cx="34" cy="58" r="6" fill="#E8D5C0"/>
        <circle cx="44" cy="56" r="7" fill="#E8D5C0"/>
      </svg>
      {/* Tabby */}
      <svg width="50" height="62" viewBox="0 0 50 62" fill="none">
        <ellipse cx="25" cy="44" rx="17" ry="13" fill="#B8860B"/>
        <circle cx="25" cy="24" r="13" fill="#B8860B"/>
        <line x1="18" y1="40" x2="18" y2="52" stroke="#8B6914" strokeWidth="2"/>
        <line x1="25" y1="40" x2="25" y2="54" stroke="#8B6914" strokeWidth="2"/>
        <line x1="32" y1="40" x2="32" y2="52" stroke="#8B6914" strokeWidth="2"/>
        <polygon points="14,18 17,8 21,18" fill="#8B6914"/>
        <polygon points="29,18 33,8 36,18" fill="#8B6914"/>
        <ellipse cx="20" cy="23" rx="3.5" ry="4.5" fill="#228B22"/>
        <ellipse cx="30" cy="23" rx="3.5" ry="4.5" fill="#228B22"/>
        <ellipse cx="20" cy="23" rx="1.5" ry="3.5" fill="#1a1a1a"/>
        <ellipse cx="30" cy="23" rx="1.5" ry="3.5" fill="#1a1a1a"/>
        <polygon points="25,28 22,31 28,31" fill="#DAA520"/>
        <line x1="10" y1="30" x2="20" y2="31" stroke="#8B6914" strokeWidth="1"/>
        <line x1="10" y1="33" x2="20" y2="32" stroke="#8B6914" strokeWidth="1"/>
        <line x1="30" y1="31" x2="40" y2="30" stroke="#8B6914" strokeWidth="1"/>
        <line x1="30" y1="32" x2="40" y2="33" stroke="#8B6914" strokeWidth="1"/>
        <rect x="12" y="52" width="5" height="10" rx="2.5" fill="#B8860B"/>
        <rect x="20" y="52" width="5" height="10" rx="2.5" fill="#B8860B"/>
        <rect x="28" y="52" width="5" height="10" rx="2.5" fill="#B8860B"/>
        <rect x="36" y="52" width="5" height="10" rx="2.5" fill="#B8860B"/>
        <path d="M42 44 Q50 36 48 24" stroke="#B8860B" strokeWidth="4" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

export default function SpeciesSelect({ onSelect }) {
  const [hoveredDog, setHoveredDog] = useState(false);
  const [hoveredCat, setHoveredCat] = useState(false);

  return (
    <div style={{
      minHeight:      "100vh",
      background:     theme.colors.white,
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      padding:        "40px 20px",
      fontFamily:     theme.fonts.body,
    }}>
      <h2 style={{
        fontFamily: theme.fonts.display,
        fontSize:   "clamp(24px, 4vw, 38px)",
        fontWeight: "700",
        color:      theme.colors.neutral,
        margin:     "0 0 8px",
        textAlign:  "center",
      }}>
        Do you have a dog or a cat?
      </h2>
      <p style={{
        color:      theme.colors.neutralMid,
        fontSize:   "16px",
        margin:     "0 0 48px",
        textAlign:  "center",
      }}>
        We'll tailor the entire assessment to your pet.
      </p>

      <div style={{
        display:        "flex",
        gap:            "32px",
        flexWrap:       "wrap",
        justifyContent: "center",
      }}>
        {/* Dog button */}
        <button
          onClick={() => onSelect("dog")}
          onMouseEnter={() => setHoveredDog(true)}
          onMouseLeave={() => setHoveredDog(false)}
          onFocus={() => setHoveredDog(true)}
          onBlur={() => setHoveredDog(false)}
          style={{
            width:         "280px",
            height:        "260px",
            background:    hoveredDog ? theme.colors.dogLight : theme.colors.white,
            border:        `3px solid ${hoveredDog ? theme.colors.dog : theme.colors.border}`,
            borderRadius:  theme.radius.xl,
            cursor:        "pointer",
            display:       "flex",
            flexDirection: "column",
            alignItems:    "center",
            justifyContent:"center",
            transition:    "all 0.25s ease",
            transform:     hoveredDog ? "scale(1.03)" : "scale(1)",
            boxShadow:     hoveredDog ? `0 8px 32px ${theme.colors.dog}33` : theme.shadow.sm,
            position:      "relative",
            overflow:      "hidden",
          }}
        >
          {hoveredDog && (
            <>
              <div style={{ position:"absolute", top:0, left:0, width:"40px", height:"3px", background: theme.colors.dog, animation: "slideInH 0.3s ease forwards" }}/>
              <div style={{ position:"absolute", top:0, left:0, width:"3px", height:"40px", background: theme.colors.dog, animation: "slideInV 0.3s ease forwards" }}/>
              <div style={{ position:"absolute", bottom:0, right:0, width:"40px", height:"3px", background: theme.colors.dog, animation: "slideInH 0.3s ease forwards" }}/>
              <div style={{ position:"absolute", bottom:0, right:0, width:"3px", height:"40px", background: theme.colors.dog, animation: "slideInV 0.3s ease forwards" }}/>
            </>
          )}
          <div style={{ fontSize: "52px", marginBottom: "4px" }}>🐕</div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: theme.colors.dog, marginBottom: hoveredDog ? "4px" : "0" }}>
            Dog
          </div>
          {hoveredDog && <DogBreedPreviews/>}
        </button>

        {/* Cat button */}
        <button
          onClick={() => onSelect("cat")}
          onMouseEnter={() => setHoveredCat(true)}
          onMouseLeave={() => setHoveredCat(false)}
          onFocus={() => setHoveredCat(true)}
          onBlur={() => setHoveredCat(false)}
          style={{
            width:         "280px",
            height:        "260px",
            background:    hoveredCat ? theme.colors.catLight : theme.colors.white,
            border:        `3px solid ${hoveredCat ? theme.colors.cat : theme.colors.border}`,
            borderRadius:  theme.radius.xl,
            cursor:        "pointer",
            display:       "flex",
            flexDirection: "column",
            alignItems:    "center",
            justifyContent:"center",
            transition:    "all 0.25s ease",
            transform:     hoveredCat ? "scale(1.03)" : "scale(1)",
            boxShadow:     hoveredCat ? `0 8px 32px ${theme.colors.cat}33` : theme.shadow.sm,
            position:      "relative",
            overflow:      "hidden",
          }}
        >
          {hoveredCat && (
            <>
              <div style={{ position:"absolute", top:0, left:0, width:"40px", height:"3px", background: theme.colors.cat, animation: "slideInH 0.3s ease forwards" }}/>
              <div style={{ position:"absolute", top:0, left:0, width:"3px", height:"40px", background: theme.colors.cat, animation: "slideInV 0.3s ease forwards" }}/>
              <div style={{ position:"absolute", bottom:0, right:0, width:"40px", height:"3px", background: theme.colors.cat, animation: "slideInH 0.3s ease forwards" }}/>
              <div style={{ position:"absolute", bottom:0, right:0, width:"3px", height:"40px", background: theme.colors.cat, animation: "slideInV 0.3s ease forwards" }}/>
            </>
          )}
          <div style={{ fontSize: "52px", marginBottom: "4px" }}>🐈</div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: theme.colors.cat, marginBottom: hoveredCat ? "4px" : "0" }}>
            Cat
          </div>
          {hoveredCat && <CatBreedPreviews/>}
        </button>
      </div>

      <style>{`
        @keyframes slideInH {
          from { width: 0; }
          to   { width: 40px; }
        }
        @keyframes slideInV {
          from { height: 0; }
          to   { height: 40px; }
        }
      `}</style>
    </div>
  );
}
