import Head from "next/head";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Bell,
  CheckCircle,
  ChevronRight,
  Clock,
  Coffee,
  Copy,
  EyeOff,
  LayoutGrid,
  Loader2,
  Lock,
  Map,
  MapPin,
  MessageSquare,
  Moon,
  MousePointer2,
  Navigation,
  PackageCheck,
  Send,
  Server,
  Shield,
  ShieldCheck,
  Smartphone,
  User,
  Zap,
} from "lucide-react";

const useStartupReveal = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) {
      setReady(true);
      return;
    }

    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return ready;
};

const MinimalReveal: React.FC<{ ready: boolean; delay?: number; className?: string; children: React.ReactNode }> = ({
  ready,
  delay = 0,
  className = "",
  children,
}) => (
  <div
    className={className}
    style={{
      opacity: ready ? 1 : 0,
      transform: ready ? "translateY(0px)" : "translateY(12px)",
      transition: "opacity 260ms ease, transform 320ms ease",
      transitionDelay: `${delay}ms`,
      willChange: "opacity, transform",
    }}
  >
    {children}
  </div>
);

enum UserRole {
  BROKER = "BROKER",
  DRIVER = "DRIVER",
  CUSTOMER = "CUSTOMER",
}

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }
> = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
  const baseStyles =
    "font-mono tracking-tight inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-zinc-100 text-zinc-950 hover:bg-zinc-300 font-semibold border border-transparent",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700",
    outline: "bg-transparent text-zinc-300 border border-zinc-700 hover:border-zinc-500 hover:text-zinc-100",
    ghost: "bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50",
  };
  const sizes: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({
  children,
  className = "",
  id,
}) => (
  <section id={id} className={`py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

type DriverStatus = "pending" | "active" | "complete";

const RoleButton = ({
  role,
  active,
  onClick,
  icon: Icon,
  label,
  status,
  notification,
}: {
  role: UserRole;
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  status?: DriverStatus;
  notification?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-md flex items-center justify-between transition-all group relative ${
      active ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon className={`w-4 h-4 ${active ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"}`} />
      <span className="text-sm font-medium">{label}</span>
    </div>

    <div className="flex items-center gap-2">
      {notification && <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />}
      {status === "complete" && <CheckCircle className="w-3 h-3 text-emerald-500" />}
      {status === "active" && <Loader2 className="w-3 h-3 text-blue-500 animate-spin" />}
    </div>
  </button>
);

const InteractiveDemo: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.BROKER);
  const [demoState, setDemoState] = useState({
    loadCreated: false,
    smsReceived: false,
    codeAutofilled: false,
    codeVerified: false,
    trackingActive: false,
    progress: 0,
    isDelivered: false,
  });

  const TRACKING_CODE = "8X9J2K";

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (activeRole === UserRole.CUSTOMER && demoState.trackingActive && !demoState.isDelivered) {
      interval = setInterval(() => {
        setDemoState((prev) => {
          const newProgress = prev.progress + 0.8;
          if (newProgress >= 100) {
            return { ...prev, progress: 100, isDelivered: true };
          }
          return { ...prev, progress: newProgress };
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [activeRole, demoState.trackingActive, demoState.isDelivered]);

  useEffect(() => {
    if (demoState.loadCreated && !demoState.smsReceived) {
      const timer = setTimeout(() => {
        setDemoState((prev) => ({ ...prev, smsReceived: true }));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [demoState.loadCreated, demoState.smsReceived]);

  const handleCreateLoad = () => {
    setDemoState((prev) => ({ ...prev, loadCreated: true }));
    setTimeout(() => setActiveRole(UserRole.DRIVER), 2500);
  };

  const handleAutofillCode = () => {
    setDemoState((prev) => ({ ...prev, codeAutofilled: true }));
    setTimeout(() => {
      setDemoState((prev) => ({ ...prev, codeVerified: true }));
    }, 1200);
  };

  const handleStartTracking = () => {
    setDemoState((prev) => ({ ...prev, trackingActive: true }));
    setTimeout(() => setActiveRole(UserRole.CUSTOMER), 1500);
  };

  const resetDemo = () => {
    setDemoState({
      loadCreated: false,
      smsReceived: false,
      codeAutofilled: false,
      codeVerified: false,
      trackingActive: false,
      progress: 0,
      isDelivered: false,
    });
    setActiveRole(UserRole.BROKER);
  };

  const getDriverStepStatus = (): DriverStatus => {
    if (demoState.trackingActive) return "complete";
    if (demoState.codeVerified) return "active";
    if (demoState.smsReceived) return "pending";
    return "pending";
  };

  return (
    <div className="w-full bg-surface border border-border rounded-lg overflow-hidden flex flex-col md:flex-row h-[600px] shadow-2xl shadow-black/50 ring-1 ring-white/5">
      <div className="w-full md:w-64 bg-zinc-900/50 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="text-zinc-400 text-xs font-mono uppercase tracking-wider">Workflow Step</h3>
        </div>
        <div className="flex flex-col p-2 gap-1">
          <RoleButton
            role={UserRole.BROKER}
            active={activeRole === UserRole.BROKER}
            onClick={() => setActiveRole(UserRole.BROKER)}
            icon={User}
            label="1. The Broker"
            status={demoState.loadCreated ? "complete" : "pending"}
          />
          <RoleButton
            role={UserRole.DRIVER}
            active={activeRole === UserRole.DRIVER}
            onClick={() => setActiveRole(UserRole.DRIVER)}
            icon={Smartphone}
            label="2. The Driver"
            status={getDriverStepStatus()}
            notification={demoState.smsReceived && !demoState.codeVerified}
          />
          <RoleButton
            role={UserRole.CUSTOMER}
            active={activeRole === UserRole.CUSTOMER}
            onClick={() => setActiveRole(UserRole.CUSTOMER)}
            icon={Map}
            label="3. The Customer"
            status={demoState.isDelivered ? "complete" : demoState.trackingActive ? "active" : "pending"}
          />
        </div>

        <div className="mt-auto p-4 border-t border-border bg-black/20">
          <button
            onClick={resetDemo}
            className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-2 transition-colors"
          >
            <Clock className="w-3 h-3" /> Reset Simulation
          </button>
        </div>
      </div>

      <div className="flex-1 relative bg-background">
        {activeRole === UserRole.BROKER && (
          <div className="absolute inset-0 p-8 flex flex-col animate-in fade-in duration-300">
            <div className="mb-8">
              <h2 className="text-xl font-medium text-zinc-100">Create New Load</h2>
              <p className="text-zinc-500 text-sm mt-1">Generate a tracking link in seconds.</p>
            </div>

            <div className="space-y-6 max-w-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase">Pickup</label>
                  <div className="h-10 border border-border bg-zinc-900/50 rounded flex items-center px-3 text-sm text-zinc-300">
                    <span className="text-emerald-500/50 mr-2">●</span> LAX-01
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase">Dropoff</label>
                  <div className="h-10 border border-border bg-zinc-900/50 rounded flex items-center px-3 text-sm text-zinc-300">
                    <span className="text-orange-500/50 mr-2">●</span> SFO-04
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase">Driver Mobile Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    disabled
                    className="w-full h-10 bg-zinc-900/30 border border-border rounded px-3 text-sm text-zinc-400 font-mono"
                    value="+1 (555) 019-2834"
                    readOnly
                  />
                </div>
                <p className="text-[10px] text-zinc-600">We will send a secure magic code to this number.</p>
              </div>

              {!demoState.loadCreated ? (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-emerald-500/30 rounded-lg blur opacity-75 animate-pulse pointer-events-none"></div>
                  {/* Animated cursor pointer to show clickability */}
                  <div className="absolute -bottom-8 -right-2 z-10 animate-bounce">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center shadow-lg">
                      <MousePointer2 className="w-4 h-4 text-white animate-pulse" />
                    </div>
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-30"></div>
                  </div>
                  <Button
                    onClick={handleCreateLoad}
                    className="w-full gap-2 relative shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-500/50 border-emerald-500/50 hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    Create Load & Send Invite <Send className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="bg-emerald-900/10 border border-emerald-900/30 rounded-lg p-4 flex flex-col gap-3 animate-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" /> Invite Sent
                  </div>
                  <div className="text-xs text-zinc-400">
                    Tracking code <span className="font-mono text-white bg-zinc-800 px-1 rounded">{TRACKING_CODE}</span> sent to driver.
                  </div>
                  <div className="h-1 w-full bg-emerald-900/30 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-emerald-500/50 loading-bar" style={{ width: "60%" }}></div>
                  </div>
                  <p className="text-[10px] text-zinc-500">Waiting for driver to connect...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeRole === UserRole.DRIVER && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 p-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="w-[300px] h-[550px] bg-black border-[3px] border-zinc-800 rounded-[2.5rem] relative overflow-hidden shadow-2xl flex flex-col ring-1 ring-zinc-800/50">
              <div className="absolute top-0 w-full h-7 flex justify-center items-end pb-1 z-50 pointer-events-none">
                <div className="w-24 h-5 bg-black rounded-b-xl border-b border-x border-zinc-800/50"></div>
              </div>

              {demoState.smsReceived && !demoState.codeAutofilled && (
                <div
                  onClick={handleAutofillCode}
                  className="absolute top-10 left-3 right-3 bg-zinc-800/90 backdrop-blur-md border border-zinc-700/50 p-3 rounded-2xl shadow-2xl z-50 cursor-pointer animate-in slide-in-from-top-4 duration-500 hover:scale-[1.02] transition-transform ring-1 ring-emerald-500/50"
                >
                  <div className="flex items-start gap-3 relative">
                    <div className="absolute -right-2 -bottom-6 animate-bounce">
                      <MousePointer2 className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] fill-zinc-900" />
                    </div>

                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-900/20">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <p className="text-[11px] font-semibold text-white">MESSAGES</p>
                        <p className="text-[9px] text-zinc-400">NOW</p>
                      </div>
                      <p className="text-xs text-zinc-200 leading-snug">
                        Vertex: Your load tracking code is <span className="font-mono font-bold text-emerald-400">{TRACKING_CODE}</span>
                      </p>
                      <p className="text-[10px] text-emerald-400/80 mt-1 font-medium animate-pulse">Tap to autofill</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-1 flex flex-col relative z-10 bg-zinc-950">
                {!demoState.codeVerified ? (
                  <div className="flex-1 flex flex-col p-6 items-center justify-center">
                    <div className="w-16 h-16 bg-zinc-900 rounded-2xl mb-8 flex items-center justify-center border border-zinc-800">
                      <ShieldCheck className="w-8 h-8 text-zinc-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Vertex Driver</h3>
                    <p className="text-zinc-500 text-center text-xs mb-8">Enter the code from your dispatcher to start.</p>

                    <div className="flex gap-2 mb-8">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`w-9 h-12 rounded border flex items-center justify-center text-lg font-mono transition-all duration-300 ${
                            demoState.codeAutofilled
                              ? "border-emerald-500/50 bg-emerald-900/10 text-emerald-400 scale-105"
                              : "border-zinc-800 bg-zinc-900 text-zinc-300"
                          }`}
                        >
                          {demoState.codeAutofilled ? TRACKING_CODE[i] : ""}
                        </div>
                      ))}
                    </div>
                    {demoState.codeAutofilled && (
                      <div className="flex items-center gap-2 text-emerald-500 text-xs animate-in fade-in slide-in-from-bottom-2">
                        <Loader2 className="w-3 h-3 animate-spin" /> Verifying code...
                      </div>
                    )}
                    {!demoState.codeAutofilled && <p className="text-[10px] text-zinc-600">Waiting for code...</p>}
                  </div>
                ) : !demoState.trackingActive ? (
                  <div className="flex-1 flex flex-col p-6 animate-in fade-in duration-300">
                    <div className="mt-8 mb-auto">
                      <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-emerald-950/30 border border-emerald-900/50 text-[10px] text-emerald-400 font-mono mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        CODE VERIFIED
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">Load Details</h3>
                      <p className="text-zinc-500 text-sm font-mono">ID: {TRACKING_CODE}</p>

                      <div className="mt-8 relative space-y-8 pl-4 border-l border-zinc-800 ml-2">
                        <div className="relative">
                          <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-black" />
                          <p className="text-[10px] text-zinc-500 font-mono mb-0.5">PICKUP • 09:00 AM</p>
                          <p className="text-sm text-zinc-200 font-medium">Distribution Center A</p>
                          <p className="text-xs text-zinc-500">Los Angeles, CA</p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-orange-500 ring-4 ring-black" />
                          <p className="text-[10px] text-zinc-500 font-mono mb-0.5">DROPOFF • EST 14:00 PM</p>
                          <p className="text-sm text-zinc-200 font-medium">Retail Hub SFO</p>
                          <p className="text-xs text-zinc-500">San Francisco, CA</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-emerald-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                      <Button
                        size="lg"
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-14 transition-transform active:scale-95 relative shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        onClick={handleStartTracking}
                      >
                        START TRACKING
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-500">
                    <div className="w-40 h-40 rounded-full border border-emerald-500/20 flex items-center justify-center relative mb-8">
                      <div className="absolute inset-0 rounded-full border border-emerald-500/10 animate-[ping_3s_linear_infinite]"></div>
                      <div className="w-32 h-32 rounded-full bg-emerald-500/10 flex items-center justify-center backdrop-blur-sm">
                        <div className="text-center">
                          <p className="text-4xl font-mono text-white font-bold tracking-tighter">58</p>
                          <p className="text-[10px] text-emerald-500 font-mono mt-1">MPH</p>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-white">Tracking Active</h3>
                    <p className="text-zinc-500 text-sm mt-2 max-w-[200px]">Location is being shared with the broker automatically.</p>

                    <div className="mt-auto w-full">
                      <Button variant="secondary" className="w-full border-red-900/30 text-red-400 hover:bg-red-950/20">
                        STOP TRACKING
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeRole === UserRole.CUSTOMER && (
          <div className="absolute inset-0 flex flex-col animate-in fade-in zoom-in-95 duration-500">
            <div className="flex-1 bg-zinc-900 relative overflow-hidden group cursor-crosshair">
              <svg className="w-full h-full opacity-20">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#71717a" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg className="w-full max-w-3xl h-64 overflow-visible">
                  <path
                    d="M 0,150 C 100,150 200,50 400,50 S 700,100 800,80"
                    fill="none"
                    stroke="#27272a"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />

                  <path
                    d="M 0,150 C 100,150 200,50 400,50 S 700,100 800,80"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="1200"
                    strokeDashoffset={1200 - demoState.progress * 12}
                    className="transition-all duration-75 ease-linear"
                  />

                  {!demoState.isDelivered && (
                    <g style={{ offsetPath: 'path("M 0,150 C 100,150 200,50 400,50 S 700,100 800,80")', offsetDistance: `${demoState.progress}%` }}>
                      <circle r="8" fill="#10b981" className="shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                      <circle r="20" fill="#10b981" opacity="0.2" className="animate-ping" />
                    </g>
                  )}

                  {demoState.isDelivered && (
                    <g transform="translate(800, 80)">
                      <circle r="8" fill="#10b981" />
                      <circle r="16" fill="transparent" stroke="#10b981" strokeWidth="1" className="animate-ping" />
                    </g>
                  )}
                </svg>
              </div>

              <div className="absolute top-4 right-4 bg-zinc-950/90 backdrop-blur border border-zinc-800 p-4 rounded-lg shadow-2xl w-72 transition-all duration-500">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Public View</span>
                  {demoState.isDelivered ? (
                    <span className="text-[10px] text-zinc-950 font-bold font-mono bg-emerald-500 px-2 py-0.5 rounded flex items-center gap-1 animate-in fade-in zoom-in">
                      <PackageCheck className="w-3 h-3" />
                      DELIVERED
                    </span>
                  ) : (
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900/50 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      IN TRANSIT
                    </span>
                  )}
                </div>
                <div className="text-sm text-zinc-200 font-medium border-b border-zinc-800 pb-3 mb-3">Load #{TRACKING_CODE}</div>

                {demoState.isDelivered ? (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                    <div className="p-3 bg-emerald-900/20 border border-emerald-900/50 rounded flex gap-3 items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-zinc-200 font-medium">Arrived at Destination</p>
                        <p className="text-xs text-zinc-500">San Francisco, CA • Just now</p>
                      </div>
                    </div>
                    <Button className="w-full text-xs" variant="secondary" onClick={resetDemo}>
                      View Proof of Delivery
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <div className="text-[10px] text-zinc-500 font-mono">ORIGIN</div>
                      <div className="text-xs text-zinc-300">Los Angeles, CA</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-500 font-mono">DESTINATION</div>
                      <div className="text-xs text-zinc-300">San Francisco, CA</div>
                    </div>
                    <div className="col-span-2">
                      <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${demoState.progress}%` }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-[10px] text-zinc-600">0%</span>
                        <span className="text-[10px] text-zinc-400 font-mono">{Math.round(demoState.progress)}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="h-10 bg-zinc-950 border-t border-border flex items-center justify-between px-6">
              <span className="flex items-center gap-2 text-[10px] text-zinc-500">
                <Shield className="w-3 h-3" /> Secure Link • No sensitive data exposed
              </span>
              <span className="text-[10px] text-zinc-600 font-mono">Powered by Vertex</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Navbar: React.FC<{ ready: boolean }> = ({ ready }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? "bg-background/80 backdrop-blur-md border-border py-4" : "bg-transparent border-transparent py-6"
      }`}
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(-6px)",
        transition: "opacity 200ms ease, transform 260ms ease",
        willChange: "opacity, transform",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* <div className="w-8 h-8 bg-zinc-100 rounded flex items-center justify-center text-black">
            <LayoutGrid className="w-5 h-5" />
          </div> */}
          <span className="text-lg font-bold tracking-tight text-white">Raisedash Vertex</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/request-demo">
            <Button size="sm" className="hidden sm:inline-flex">
              Book a Demo
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC<{ ready: boolean }> = ({ ready }) => (
  <div className="relative overflow-hidden">
    <div className="absolute inset-0 grid-bg pointer-events-none z-0"></div>
    <Section className="relative z-10 pt-32 pb-16">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
        {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 mb-6 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          SYSTEM ONLINE v2.4.0
        </div> */}
        <MinimalReveal ready={ready}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            The Easiest Way to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Track Freight.</span> Period.
          </h1>
        </MinimalReveal>
        <MinimalReveal ready={ready} delay={80}>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
            Stop the check calls. Get real-time visibility and automated arrival alerts in seconds. No passwords, no training, just results.
          </p>
        </MinimalReveal>
        <MinimalReveal ready={ready} delay={140}>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/request-demo">
              <Button size="lg" className="gap-2">
                Start Tracking <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            {/* <Button variant="outline" size="lg" className="gap-2">
              View Documentation <ChevronRight className="w-4 h-4" />
            </Button> */}
          </div>
        </MinimalReveal>
        {/* <p className="mt-8 text-xs text-zinc-600 font-mono">TRUSTED BY MODERN BROKERAGES TO TRACK THOUSANDS OF LOADS</p> */}
      </div>
      <MinimalReveal ready={ready} delay={220} className="w-full">
        <InteractiveDemo />
      </MinimalReveal>
    </Section>
  </div>
);

const Features: React.FC<{ ready: boolean }> = ({ ready }) => (
  <Section className="border-t border-border bg-black/40">
    <MinimalReveal ready={ready} className="mb-16 md:text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold text-zinc-100 tracking-tight mb-4">Platform Capabilities</h2>
      <p className="text-zinc-400">
        Built on a modern stack (Next.js, NestJS, Flutter) to provide reliability that legacy TMS platforms cannot match.
      </p>
    </MinimalReveal>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
      {[
        { title: "Real-time Telemetry", desc: "Watch freight move in real-time. High-frequency polling ensures you see the truck where it is.", icon: MapPin },
        { title: "Idempotent Alerts", desc: "No spam. Our notification engine guarantees you only receive one alert per event.", icon: Bell },
        { title: "Dark Mode Native", desc: "Designed for operations centers. High contrast interface reduces eye strain.", icon: Moon },
        { title: "Universal Driver App", desc: "No passwords. One-tap start. Works on any modern smartphone.", icon: Smartphone },
        { title: "Bank-Grade Security", desc: "Google OAuth, encrypted tokens, and strict environment validation.", icon: ShieldCheck },
        { title: "Instant Session Tabs", desc: "Manage multiple loads without losing context.", icon: Zap },
      ].map((f, idx) => (
        <MinimalReveal key={idx} ready={ready} delay={idx * 40} className="h-full">
          <div className="bg-background p-8 hover:bg-zinc-900/50 transition-colors group h-full">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
              <f.icon className="w-5 h-5 text-zinc-400 group-hover:text-primary" />
            </div>
            <h3 className="text-lg font-medium text-zinc-100 mb-2">{f.title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
          </div>
        </MinimalReveal>
      ))}
    </div>
  </Section>
);

const HowItWorks: React.FC<{ ready: boolean }> = ({ ready }) => (
  <Section className="border-t border-border">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <MinimalReveal ready={ready}>
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Zero Friction.
            <br />
            Zero Training.
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            We removed every barrier. Drivers don't need accounts. Brokers don't need manuals. It just works.
          </p>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Send className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1 flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-500">01</span>Send the Invite
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">Enter the driver's phone number. We text them a secure magic code instantly.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1 flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-500">02</span>Driver Enters Code
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">They enter the 6-digit code from the SMS and hit Start. No username, no password.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1 flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-500">03</span>You Relax
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">Watch the truck on the map. Get an email when it arrives.</p>
              </div>
            </div>
          </div>
        </div>
      </MinimalReveal>
      <MinimalReveal ready={ready} delay={120} className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 blur-3xl rounded-full"></div>
        <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
          <div className="font-mono text-xs text-zinc-500 mb-4 border-b border-zinc-800 pb-2">SYSTEM LOGS</div>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex gap-3">
              <span className="text-zinc-600">10:42:01</span>
              <span className="text-zinc-400">INFO</span>
              <span className="text-zinc-300">Load #8X9 created by Broker</span>
            </div>
            <div className="flex gap-3">
              <span className="text-zinc-600">10:42:05</span>
              <span className="text-blue-400">SMS</span>
              <span className="text-zinc-300">Invite sent to +1 (555) ***-****</span>
            </div>
            <div className="flex gap-3">
              <span className="text-zinc-600">10:44:12</span>
              <span className="text-purple-400">AUTH</span>
              <span className="text-zinc-300">Driver authenticated via Code</span>
            </div>
            <div className="flex gap-3">
              <span className="text-zinc-600">10:44:15</span>
              <span className="text-emerald-400">LOC</span>
              <span className="text-zinc-300">Tracking started. Lat: 34.05, Lng: -118.24</span>
            </div>
            <div className="flex gap-3">
              <span className="text-zinc-600">10:44:45</span>
              <span className="text-orange-400">GEO</span>
              <span className="text-zinc-300">Geofence exit: PICKUP_LOCATION</span>
            </div>
          </div>
        </div>
      </MinimalReveal>
    </div>
  </Section>
);

const Trust: React.FC<{ ready: boolean }> = ({ ready }) => (
  <Section className="border-t border-border">
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { title: "Bank-Grade Security", desc: "Encryption standards matching financial institutions.", icon: Lock },
        { title: "99.9% Uptime", desc: "Redundant infrastructure for critical shipments.", icon: Server },
        { title: "Privacy First", desc: "We track freight, not lives. Tracking stops on delivery.", icon: EyeOff },
      ].map((t, idx) => (
        <MinimalReveal key={idx} ready={ready} delay={idx * 60} className="h-full">
          <div className="bg-zinc-900/30 p-6 rounded-lg border border-transparent hover:border-zinc-800 transition-colors h-full">
            <t.icon className="w-8 h-8 text-zinc-400 mb-4" />
            <h3 className="text-white font-medium mb-2">{t.title}</h3>
            <p className="text-sm text-zinc-500">{t.desc}</p>
          </div>
        </MinimalReveal>
      ))}
    </div>
    <MinimalReveal ready={ready} delay={220} className="mt-24 text-center">
      <h2 className="text-2xl font-bold text-white mb-6">Ready to streamline your operations?</h2>
      <div className="inline-flex flex-col items-center">
        <Link href="/request-demo">
          <button className="bg-emerald-500 text-black font-bold px-8 py-4 rounded hover:bg-emerald-400 transition-colors text-lg tracking-tight">
            Create Your First Load
          </button>
        </Link>
      </div>
    </MinimalReveal>
  </Section>
);

const Footer: React.FC = () => (
  <footer className="border-t border-border bg-zinc-950 py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-sm text-zinc-500">© {new Date().getFullYear()} Raisedash Vertex. All rights reserved.</div>
    </div>
  </footer>
);

const RaisedashVertexPage: NextPage = () => {
  const startupReady = useStartupReveal();

  useEffect(() => {
    const root = document.documentElement;
    const wasDark = root.classList.contains("dark");
    root.classList.add("dark");
    return () => {
      if (!wasDark) {
        root.classList.remove("dark");
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Raisedash Vertex | Tracking Simplified</title>
        <meta name="description" content="Raisedash Vertex freight tracking experience." />
      </Head>
      <div className="min-h-screen bg-background text-zinc-100 font-sans selection:bg-emerald-500/30">
        <Navbar ready={startupReady} />
        <main>
          <Hero ready={startupReady} />
          <Features ready={startupReady} />
          <HowItWorks ready={startupReady} />
          <Trust ready={startupReady} />
        </main>
        <Footer />
      </div>
      <style jsx global>{`
        .grid-bg {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, #27272a 1px, transparent 1px),
            linear-gradient(to bottom, #27272a 1px, transparent 1px);
          mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
        }
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default RaisedashVertexPage;

