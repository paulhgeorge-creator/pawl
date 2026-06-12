import { useState } from "react";
import { DOG_SHAKE_PATH, CAT_HIGHFIVE_PATH } from "../data/trainingPaths";
import { useProgress } from "../hooks/useProgress";
import DailyTask  from "./DailyTask";
import PathHeader from "./PathHeader";

export default function TrainingPath({ species, archetype, onStartSurvey }) {
  const path  = species === "cat" ? CAT_HIGHFIVE_PATH : DOG_SHAKE_PATH;
  const color = path.color;
  const light = path.light;

  const { isComplete, markComplete }    = useProgress(path.id);
  const [activeTask, setActiveTask]     = useState(null);
  const [celebration, setCelebration]   = useState(false);

  const completedCount = path.days.filter(d => isComplete(d.id)).length;

  const isUnlocked = (dayIndex) => {
    if (dayIndex === 0) return true;
    return path.days.slice(0, dayIndex).every(d => isComplete(d.id));
  };

  const handleComplete = (taskId, isFinal) => {
    markComplete(taskId);
    setActiveTask(null);
    if (isFinal) {
      setTimeout(() => setCelebration(true), 400);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}>
      <PathHeader
        species={species}
        color={color}
        light={light}
        completedCount={completedCount}
        totalDays={path.days.length}
        onStartSurvey={onStartSurvey}
        surveyDone={!!archetype}
      />

      {/* Hero */}
      <div style={{
        textAlign:    "center",
        padding:      "32px 20px 24px",
        borderBottom: `1px solid ${color}11`,
      }}>
        <div style={{ fontSize: "40px", marginBottom: "8px" }}>{path.emoji}</div>
        <div style={{
          fontSize:     "clamp(22px, 4vw, 32px)",
          fontWeight:   "700",
          color:        "#3D3D3D",
          marginBottom: "4px",
        }}>
          {path.trick}
        </div>
        <div style={{ fontSize: "15px", color: "#7A7A7A" }}>{path.tagline}</div>

        {archetype && (
          <div style={{
            display:      "inline-block",
            marginTop:    "12px",
            padding:      "5px 14px",
            borderRadius: "100px",
            fontSize:     "12px",
            fontWeight:   "600",
            background:   light,
            color:        color,
            border:       `1px solid ${color}33`,
          }}>
            ✨ Personalised for {archetype}
          </div>
        )}
      </div>

      {/* Horizontal path */}
      <div style={{
        overflowX:     "auto",
        padding:       "40px 24px 48px",
        scrollbarWidth:"none",
      }}>
        <div style={{
          display:   "flex",
          alignItems:"center",
          gap:       "0",
          minWidth:  "max-content",
          position:  "relative",
          padding:   "0 16px",
        }}>
          {path.days.map((task, i) => {
            const done     = isComplete(task.id);
            const unlocked = isUnlocked(i);
            const isLast   = i === path.days.length - 1;

            return (
              <div key={task.id} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "88px" }}>
                  <button
                    onClick={() => unlocked && setActiveTask(task)}
                    disabled={!unlocked}
                    aria-label={`${task.day}: ${task.title}${!unlocked ? " — locked" : done ? " — complete" : ""}`}
                    style={{
                      width:          "72px",
                      height:         "72px",
                      borderRadius:   "50%",
                      border:         done
                        ? `3px solid ${color}`
                        : unlocked
                          ? `3px solid ${color}88`
                          : "3px solid #E0E0E0",
                      background:     done
                        ? color
                        : unlocked
                          ? light
                          : "#F5F5F5",
                      cursor:         unlocked ? "pointer" : "default",
                      display:        "flex",
                      flexDirection:  "column",
                      alignItems:     "center",
                      justifyContent: "center",
                      transition:     "all 0.2s ease",
                      boxShadow:      done
                        ? `0 4px 16px ${color}44`
                        : unlocked
                          ? `0 2px 8px ${color}22`
                          : "none",
                      position:       "relative",
                    }}
                    onMouseEnter={e => { if (unlocked) e.currentTarget.style.transform = "scale(1.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    {done ? (
                      <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
                        <path d="M3 12L10 19L25 4" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <>
                        <span style={{ fontSize: "22px", lineHeight: "1" }}>{task.isFinal ? "🎉" : task.emoji}</span>
                        {!unlocked && (
                          <span style={{
                            position:     "absolute",
                            bottom:       "-2px",
                            right:        "-2px",
                            fontSize:     "14px",
                            background:   "white",
                            borderRadius: "50%",
                            padding:      "2px",
                          }}>🔒</span>
                        )}
                      </>
                    )}
                  </button>

                  <div style={{
                    marginTop:  "8px",
                    fontSize:   "11px",
                    fontWeight: "700",
                    color:      done ? color : unlocked ? "#5D5D5D" : "#BDBDBD",
                    textAlign:  "center",
                    lineHeight: "1.2",
                  }}>
                    {task.day}
                  </div>
                  <div style={{
                    fontSize:   "11px",
                    color:      done ? color : unlocked ? "#9E9E9E" : "#BDBDBD",
                    textAlign:  "center",
                    maxWidth:   "80px",
                    lineHeight: "1.2",
                  }}>
                    {task.title}
                  </div>
                </div>

                {/* Connector */}
                {!isLast && (
                  <div style={{
                    width:        "32px",
                    height:       "3px",
                    background:   done ? color : "#E0E0E0",
                    borderRadius: "2px",
                    flexShrink:   0,
                    transition:   "background 0.4s ease",
                    position:     "relative",
                    top:          "-18px",
                  }}>
                    {isUnlocked(i + 1) && !isComplete(path.days[i + 1]?.id) && !done && (
                      <div style={{
                        position:     "absolute",
                        top:          "50%",
                        left:         "50%",
                        transform:    "translate(-50%, -50%)",
                        width:        "6px",
                        height:       "6px",
                        borderRadius: "50%",
                        background:   color,
                        animation:    "pulse 1.5s ease infinite",
                      }}/>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "8px" }}>
          <span style={{ fontSize: "12px", color: "#BDBDBD" }}>← scroll to see all days →</span>
        </div>
      </div>

      {/* Tip card */}
      <div style={{
        margin:       "0 20px 32px",
        background:   light,
        borderRadius: "16px",
        padding:      "16px 20px",
        border:       `1.5px solid ${color}22`,
      }}>
        <div style={{ fontSize: "13px", color: color, fontWeight: "600", marginBottom: "4px" }}>
          {completedCount === 0 && "👆 Tap Day 1 to begin"}
          {completedCount > 0 && completedCount < path.days.length && `✅ ${completedCount} day${completedCount > 1 ? "s" : ""} done — keep going!`}
          {completedCount === path.days.length && "🎉 You've completed the full path!"}
        </div>
        <div style={{ fontSize: "13px", color: "#7A7A7A", lineHeight: "1.5" }}>
          {completedCount === 0 && "Complete each day's steps and pass the test to unlock the next one."}
          {completedCount > 0 && completedCount < path.days.length && `Day ${completedCount + 1} is now unlocked. Tap to continue.`}
          {completedCount === path.days.length && `Your ${species === "cat" ? "cat" : "dog"} can now ${path.trick.toLowerCase()}. Practise once a day to keep it sharp.`}
        </div>
      </div>

      {activeTask && (
        <DailyTask
          task={activeTask}
          species={species}
          archetype={archetype}
          isCompleted={isComplete(activeTask.id)}
          onComplete={() => handleComplete(activeTask.id, activeTask.isFinal)}
          onClose={() => setActiveTask(null)}
        />
      )}

      {celebration && (
        <CelebrationOverlay
          trick={path.trick}
          color={color}
          onClose={() => setCelebration(false)}
        />
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.4; transform: translate(-50%, -50%) scale(0.6); }
        }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

function CelebrationOverlay({ trick, color, onClose }) {
  return (
    <div style={{
      position:       "fixed",
      inset:          0,
      background:     "rgba(0,0,0,0.7)",
      zIndex:         400,
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      padding:        "20px",
    }}>
      <div style={{
        background:   "white",
        borderRadius: "24px",
        padding:      "40px 32px",
        textAlign:    "center",
        maxWidth:     "360px",
        width:        "100%",
        animation:    "popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
        <div style={{ fontSize: "28px", fontWeight: "800", color: "#3D3D3D", marginBottom: "12px" }}>
          Trick learned!
        </div>
        <div style={{ fontSize: "18px", color, fontWeight: "700", marginBottom: "16px" }}>
          {trick}
        </div>
        <div style={{ fontSize: "15px", color: "#7A7A7A", lineHeight: "1.6", marginBottom: "28px" }}>
          You and your pet completed all 7 days. Practice once a day to keep this trick sharp forever.
        </div>
        <button
          onClick={onClose}
          style={{
            padding:      "14px 32px",
            background:   color,
            color:        "white",
            border:       "none",
            borderRadius: "12px",
            fontSize:     "16px",
            fontWeight:   "700",
            cursor:       "pointer",
            fontFamily:   "'Inter', sans-serif",
            width:        "100%",
          }}
        >
          Amazing! 🐾
        </button>
      </div>
      <style>{`
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
