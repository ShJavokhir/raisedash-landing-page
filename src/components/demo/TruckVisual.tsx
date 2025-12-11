import { useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Truck } from "lucide-react";
import { DemoFormData, FieldsCompleted } from "./types";

interface TruckVisualProps {
  formData: DemoFormData;
  fieldsCompleted: FieldsCompleted;
  isSubmitting: boolean;
  isSuccess: boolean;
}

export function TruckVisual({ formData, fieldsCompleted, isSubmitting, isSuccess }: TruckVisualProps) {
  const parts = useMemo(
    () => ({
      chassis: fieldsCompleted.email,
      cabin: fieldsCompleted.companyName,
      wheels: fieldsCompleted.companySize,
      cargo: fieldsCompleted.fullName,
      details: fieldsCompleted.role,
      bonus: fieldsCompleted.phone,
    }),
    [fieldsCompleted]
  );

  return (
    <div className="w-full max-w-xl mx-auto bg-card border border-border rounded-xl shadow-xl overflow-hidden backdrop-blur-sm relative">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Truck size={100} />
      </div>
      <div className="relative w-full h-80 md:h-[450px] flex items-center justify-center overflow-hidden bg-muted/30">
      <motion.div
        animate={isSuccess ? { x: 800, opacity: 0 } : { x: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="relative z-10 w-full max-w-[700px] aspect-[2.5/1]"
      >
        <svg viewBox="0 0 700 280" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="cabGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <radialGradient id="sunGradient">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
            <mask id="windowMask">
              <path d="M 515 115 L 465 115 L 465 155 L 515 155 L 535 155 L 515 115" fill="white" />
            </mask>
          </defs>

          {/* Sun for "role" completion */}
          <AnimatePresence>
            {parts.details && (
              <motion.g
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 60, damping: 12 }}
              >
                <g transform="translate(620, 60)">
                  <motion.circle
                    cx="0"
                    cy="0"
                    r="50"
                    fill="url(#sunGradient)"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  />
                  <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }}>
                    {[...Array(12)].map((_, i) => (
                      <line
                        key={i}
                        x1="0"
                        y1="-28"
                        x2="0"
                        y2="-42"
                        transform={`rotate(${i * 30})`}
                        stroke="#fbbf24"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    ))}
                  </motion.g>
                  <circle cx="0" cy="0" r="18" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
                </g>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Chassis for email */}
          <AnimatePresence>
            {parts.chassis && (
              <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <rect x="50" y="195" width="450" height="15" rx="2" fill="#475569" />
                <rect x="440" y="180" width="40" height="20" fill="#334155" />
                <rect x="45" y="190" width="10" height="30" fill="#1e293b" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Cabin for company identity */}
          <AnimatePresence>
            {parts.cabin && (
              <motion.g initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, type: "spring" }}>
                <path d="M 460 210 L 460 110 L 520 110 L 550 160 L 550 210 Z" fill="url(#cabGradient)" stroke="#0f172a" strokeWidth="2" />
                <rect x="460" y="170" width="90" height="40" fill="#1e293b" />
                <path d="M 515 115 L 465 115 L 465 155 L 515 155 L 535 155 L 515 115" fill="#64748b" stroke="#334155" strokeWidth="1" />
                <path d="M 550 190 L 555 190" stroke="#f59e0b" strokeWidth="4" />
                <path d="M 550 170 L 550 200" stroke="#334155" strokeWidth="2" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Driver when full name is present */}
          <AnimatePresence>
            {parts.cargo && (
              <motion.g
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                mask="url(#windowMask)"
              >
                <path d="M 475 160 C 475 145 500 135 525 160" fill="#0f172a" />
                <circle cx="500" cy="138" r="9" fill="#94a3b8" />
                <path d="M 491 132 L 509 132 L 509 136 L 491 136 Z" fill="#1e293b" />
                <path d="M 491 132 Q 500 125 509 132" fill="#1e293b" />
                <path d="M 509 134 L 518 136" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Trailer shows company name */}
          <AnimatePresence>
            {parts.cargo && (
              <motion.g initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} style={{ originY: 1 }} transition={{ duration: 0.5 }}>
                <rect
                  x="50"
                  y="80"
                  width="400"
                  height="130"
                  rx="4"
                  className="fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600"
                  strokeWidth="2"
                />
                <foreignObject x="60" y="115" width="380" height="60">
                  <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest font-mono truncate px-4">
                      {formData.companyName || "RAISEDASH"}
                    </h2>
                  </div>
                </foreignObject>
                <rect x="50" y="100" width="400" height="2" fill="#cbd5e1" opacity="0.3" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Wheels unlock with fleet size */}
          <AnimatePresence>
            {parts.wheels && (
              <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ staggerChildren: 0.1 }}>
                <Wheel cx={100} cy={210} isMoving={isSuccess || isSubmitting} />
                <Wheel cx={155} cy={210} isMoving={isSuccess || isSubmitting} />
                <Wheel cx={490} cy={210} isMoving={isSuccess || isSubmitting} />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Antenna + exhaust for phone bonus */}
          <AnimatePresence>
            {parts.bonus && (
              <motion.g>
                <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ originY: 1 }}>
                  <line x1="470" y1="110" x2="470" y2="70" stroke="#475569" strokeWidth="2" />
                  <circle cx="470" cy="70" r="3" fill="#ef4444" />
                  <motion.circle
                    cx="470"
                    cy="70"
                    r="10"
                    stroke="#ef4444"
                    fill="none"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 0], scale: 2 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                </motion.g>
                <motion.g>
                  <rect x="530" y="120" width="6" height="40" fill="#94a3b8" />
                  {[...Array(3)].map((_, i) => (
                    <motion.circle
                      key={i}
                      cx="533"
                      cy="110"
                      r="4"
                      fill="#cbd5e1"
                      opacity="0.5"
                      initial={{ y: 0, opacity: 0 }}
                      animate={{ y: -40, opacity: [0, 0.5, 0], scale: 2 }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }}
                    />
                  ))}
                </motion.g>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </motion.div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 flex-wrap px-4 pointer-events-none">
          <AnimatePresence>
            {parts.chassis && <Badge label="CHASSIS" delay={0} />}
            {parts.cabin && <Badge label="CABIN" delay={0.1} />}
            {parts.wheels && <Badge label="WHEELS" delay={0.2} />}
            {parts.cargo && <Badge label="CARGO" delay={0.3} />}
            {parts.details && <Badge label="HORIZON" delay={0.4} />}
            {parts.bonus && <Badge label="UPLINK" delay={0.5} isBonus />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Badge({ label, delay, isBonus }: { label: string; delay: number; isBonus?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ delay, type: "spring" }}
      className={`text-[10px] font-bold px-2 py-1 rounded-full border shadow-sm backdrop-blur-md ${
        isBonus
          ? "bg-red-100 dark:bg-red-900/30 text-red-600 border-red-200 dark:border-red-800"
          : "bg-secondary text-secondary-foreground border-border"
      }`}
    >
      {isBonus && "✨ "}
      {label}
    </motion.span>
  );
}

function Wheel({ cx, cy, isMoving }: { cx: number; cy: number; isMoving: boolean }) {
  return (
    <motion.g
      style={{ originX: "50%", originY: "50%", transformBox: "fill-box" }}
      animate={isMoving ? { rotate: 360 } : { rotate: 0 }}
      transition={{ duration: 0.5, repeat: isMoving ? Infinity : 0, ease: "linear" }}
    >
      <circle cx={cx} cy={cy} r="22" fill="#1e293b" stroke="#0f172a" strokeWidth="4" />
      <circle cx={cx} cy={cy} r="12" fill="#94a3b8" />
      <path d={`M ${cx - 22} ${cy} L ${cx + 22} ${cy}`} stroke="#334155" strokeWidth="2" />
      <path d={`M ${cx} ${cy - 22} L ${cx} ${cy + 22}`} stroke="#334155" strokeWidth="2" />
    </motion.g>
  );
}

export default TruckVisual;

