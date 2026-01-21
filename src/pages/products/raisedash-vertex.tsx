import { NextPage } from "next";
import Link from "next/link";
import { SEO, SoftwareApplicationJsonLd } from "@/components/seo/SEO";
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Bell,
  CheckCircle,
  Clock,
  Coffee,
  EyeOff,
  Loader2,
  Lock,
  Map,
  MapPin,
  MessageSquare,
  Moon,
  MousePointer2,
  PackageCheck,
  Send,
  Server,
  Shield,
  ShieldCheck,
  Smartphone,
  User,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";

// --- Animations and Styles from globals.css ---

enum UserRole {
  BROKER = "BROKER",
  DRIVER = "DRIVER",
  CUSTOMER = "CUSTOMER",
}



type DriverStatus = "pending" | "active" | "complete";

const RoleButton = ({
  active,
  onClick,
  icon: Icon,
  label,
  status,
  notification,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  status?: DriverStatus;
  notification?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-xs flex items-center justify-between transition-all duration-[0.15s] group relative border ${active
      ? "bg-[#19224A]/10 text-[#19224A] dark:text-primary border-[#19224A]/30"
      : "text-muted-foreground border-transparent hover:text-foreground hover:bg-surface-3 dark:hover:bg-secondary"
      }`}
  >
    <div className="flex items-center gap-3">
      <Icon className={`w-4 h-4 ${active ? "text-[#19224A] dark:text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
      <span className="text-sm font-normal">{label}</span>
    </div>

    <div className="flex items-center gap-2">
      {notification && <span className="flex h-2 w-2 rounded-full bg-[#D04841] animate-pulse" />}
      {status === "complete" && <CheckCircle className="w-3 h-3 text-emerald-500" />}
      {status === "active" && <Loader2 className="w-3 h-3 text-[#19224A] animate-spin" />}
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
    <div className="w-full bg-white border border-border rounded-xs overflow-hidden flex flex-col md:flex-row h-[600px] shadow-lg">
      <div className="w-full md:w-64 bg-surface-3 dark:bg-secondary border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="text-muted-foreground text-xs font-mono uppercase tracking-wider">Workflow Step</h3>
        </div>
        <div className="flex flex-col p-2 gap-1">
          <RoleButton
            active={activeRole === UserRole.BROKER}
            onClick={() => setActiveRole(UserRole.BROKER)}
            icon={User}
            label="1. The Broker"
            status={demoState.loadCreated ? "complete" : "pending"}
          />
          <RoleButton
            active={activeRole === UserRole.DRIVER}
            onClick={() => setActiveRole(UserRole.DRIVER)}
            icon={Smartphone}
            label="2. The Driver"
            status={getDriverStepStatus()}
            notification={demoState.smsReceived && !demoState.codeVerified}
          />
          <RoleButton
            active={activeRole === UserRole.CUSTOMER}
            onClick={() => setActiveRole(UserRole.CUSTOMER)}
            icon={Map}
            label="3. The Customer"
            status={demoState.isDelivered ? "complete" : demoState.trackingActive ? "active" : "pending"}
          />
        </div>

        <div className="mt-auto p-4 border-t border-border bg-surface-3/50 dark:bg-secondary/50">
          <button
            onClick={resetDemo}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors duration-[0.15s]"
          >
            <Clock className="w-3 h-3" /> Reset Simulation
          </button>
        </div>
      </div>

      <div className="flex-1 relative bg-white">
        {activeRole === UserRole.BROKER && (
          <div className="absolute inset-0 p-8 flex flex-col animate-in fade-in duration-300">
            <div className="mb-8">
              <h2 className="text-xl font-normal tracking-[-0.03em] text-foreground">Create New Load</h2>
              <p className="text-muted-foreground text-sm mt-1 font-light">Generate a tracking link in seconds.</p>
            </div>

            <div className="space-y-6 max-w-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-muted-foreground uppercase">Pickup</label>
                  <div className="h-10 border border-border bg-white rounded-xs flex items-center px-3 text-sm text-foreground">
                    <span className="text-emerald-500/50 mr-2">●</span> LAX-01
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-muted-foreground uppercase">Dropoff</label>
                  <div className="h-10 border border-border bg-white rounded-xs flex items-center px-3 text-sm text-foreground">
                    <span className="text-orange-500/50 mr-2">●</span> SFO-04
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-muted-foreground uppercase">Driver Mobile Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    disabled
                    className="w-full h-10 bg-surface-3 dark:bg-secondary border border-border rounded-xs px-3 text-sm text-foreground font-mono"
                    value="+1 (555) 019-2834"
                    readOnly
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">We will send a secure magic code to this number.</p>
              </div>

              {!demoState.loadCreated ? (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-[#19224A]/20 rounded-xs blur opacity-75 animate-pulse pointer-events-none"></div>
                  {/* Animated cursor pointer to show clickability */}
                  <div className="absolute -bottom-8 -right-2 z-10 animate-bounce">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center shadow-lg">
                      <MousePointer2 className="w-4 h-4 text-[#19224A] animate-pulse" />
                    </div>
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-30"></div>
                  </div>
                  <Button
                    onClick={handleCreateLoad}
                    className="w-full gap-2 relative bg-[#1F1E1E] hover:bg-foreground text-white rounded-xs hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    Create Load & Send Invite <Send className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xs p-4 flex flex-col gap-3 animate-in zoom-in-95 duration-[0.15s]">
                  <div className="flex items-center gap-2 text-emerald-700 text-sm font-normal">
                    <CheckCircle className="w-4 h-4" /> Invite Sent
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Tracking code <span className="font-mono text-[#19224A] dark:text-primary bg-surface-3 dark:bg-secondary px-1 rounded">{TRACKING_CODE}</span> sent to driver.
                  </div>
                  <div className="h-1 w-full bg-emerald-100 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-emerald-500/70 loading-bar" style={{ width: "60%" }}></div>
                  </div>
                  <p className="text-[10px] text-emerald-700">Waiting for driver to connect...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeRole === UserRole.DRIVER && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white to-surface-3 dark:from-card dark:to-secondary p-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="w-[300px] h-[550px] bg-white border-[3px] border-border rounded-[2.5rem] relative overflow-hidden shadow-lg flex flex-col ring-1 ring-border/60">
              <div className="absolute top-0 w-full h-7 flex justify-center items-end pb-1 z-50 pointer-events-none">
                <div className="w-24 h-5 bg-white rounded-b-xs border-b border-x border-border/80"></div>
              </div>

              {demoState.smsReceived && !demoState.codeAutofilled && (
                <div
                  onClick={handleAutofillCode}
                  className="absolute top-10 left-3 right-3 bg-white/90 dark:bg-white/90 backdrop-blur-md border border-border p-3 rounded-xs shadow-lg z-50 cursor-pointer animate-in slide-in-from-top-4 duration-500 hover:scale-[1.02] transition-transform ring-1 ring-[#19224A]/20"
                >
                  <div className="flex items-start gap-3 relative">
                    <div className="absolute -right-2 -bottom-6 animate-bounce">
                      <MousePointer2 className="w-6 h-6 text-[#19224A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)] fill-white" />
                    </div>

                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-900/20">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <p className="text-[11px] font-semibold text-foreground">MESSAGES</p>
                        <p className="text-[9px] text-muted-foreground">NOW</p>
                      </div>
                      <p className="text-xs text-foreground leading-snug">
                        Vertex: Your load tracking code is <span className="font-mono font-bold text-emerald-600">{TRACKING_CODE}</span>
                      </p>
                      <p className="text-[10px] text-emerald-600 mt-1 font-normal animate-pulse">Tap to autofill</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-1 flex flex-col relative z-10 bg-white">
                {!demoState.codeVerified ? (
                  <div className="flex-1 flex flex-col p-6 items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-xs mb-8 flex items-center justify-center border border-border">
                      <ShieldCheck className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-normal tracking-[-0.03em] text-foreground mb-2">Vertex Driver</h3>
                    <p className="text-muted-foreground text-center text-xs mb-8 font-light">Enter the code from your dispatcher to start.</p>

                    <div className="flex gap-2 mb-8">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`w-9 h-12 rounded-xs border flex items-center justify-center text-lg font-mono transition-all duration-300 ${demoState.codeAutofilled
                            ? "border-emerald-300 bg-emerald-50 text-emerald-700 scale-105"
                            : "border-border bg-surface-3 dark:bg-secondary text-foreground"
                            }`}
                        >
                          {demoState.codeAutofilled ? TRACKING_CODE[i] : ""}
                        </div>
                      ))}
                    </div>
                    {demoState.codeAutofilled && (
                      <div className="flex items-center gap-2 text-emerald-600 text-xs animate-in fade-in slide-in-from-bottom-2">
                        <Loader2 className="w-3 h-3 animate-spin" /> Verifying code...
                      </div>
                    )}
                    {!demoState.codeAutofilled && <p className="text-[10px] text-muted-foreground">Waiting for code...</p>}
                  </div>
                ) : !demoState.trackingActive ? (
                  <div className="flex-1 flex flex-col p-6 animate-in fade-in duration-300">
                    <div className="mt-8 mb-auto">
                      <div className="inline-flex items-center gap-2 px-2 py-1 rounded-xs bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-700 font-mono mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        CODE VERIFIED
                      </div>
                      <h3 className="text-2xl font-normal tracking-[-0.03em] text-foreground mb-1">Load Details</h3>
                      <p className="text-muted-foreground text-sm font-mono">ID: {TRACKING_CODE}</p>

                      <div className="mt-8 relative space-y-8 pl-4 border-l border-border ml-2">
                        <div className="relative">
                          <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                          <p className="text-[10px] text-muted-foreground font-mono mb-0.5">PICKUP • 09:00 AM</p>
                          <p className="text-sm text-foreground font-normal">Distribution Center A</p>
                          <p className="text-xs text-muted-foreground">Los Angeles, CA</p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-orange-500 ring-4 ring-orange-100" />
                          <p className="text-[10px] text-muted-foreground font-mono mb-0.5">DROPOFF • EST 14:00 PM</p>
                          <p className="text-sm text-foreground font-normal">Retail Hub SFO</p>
                          <p className="text-xs text-muted-foreground">San Francisco, CA</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-[#19224A]/10 rounded-xs blur opacity-0 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                      <Button
                        size="lg"
                        className="w-full h-14 font-normal transition-transform active:scale-95 relative bg-[#1F1E1E] hover:bg-foreground text-white rounded-xs shadow-lg"
                        onClick={handleStartTracking}
                      >
                        START TRACKING
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-500">
                    <div className="w-40 h-40 rounded-full border border-emerald-200 flex items-center justify-center relative mb-8">
                      <div className="absolute inset-0 rounded-full border border-emerald-100 animate-[ping_3s_linear_infinite]"></div>
                      <div className="w-32 h-32 rounded-full bg-emerald-50 flex items-center justify-center backdrop-blur-sm">
                        <div className="text-center">
                          <p className="text-4xl font-mono text-emerald-700 font-bold tracking-tighter">58</p>
                          <p className="text-[10px] text-emerald-600 font-mono mt-1">MPH</p>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-normal text-foreground">Tracking Active</h3>
                    <p className="text-muted-foreground text-sm mt-2 max-w-[200px] font-light">Location is being shared with the broker automatically.</p>

                    <div className="mt-auto w-full">
                      <Button variant="secondary" className="w-full border-[#D04841]/30 text-[#D04841] hover:bg-[#D04841]/5 rounded-xs">
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
            <div className="flex-1 bg-gradient-to-b from-white to-surface-3 dark:from-card dark:to-secondary relative overflow-hidden group cursor-crosshair">
              <svg className="w-full h-full opacity-20">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg className="w-full max-w-3xl h-64 overflow-visible">
                  <path
                    d="M 0,150 C 100,150 200,50 400,50 S 700,100 800,80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="text-border"
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

              <div className="absolute top-4 right-4 bg-white/95 dark:bg-white/95 backdrop-blur border border-border p-4 rounded-xs shadow-lg w-72 transition-all duration-500">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Public View</span>
                  {demoState.isDelivered ? (
                    <span className="text-[10px] text-emerald-900 font-bold font-mono bg-emerald-200 px-2 py-0.5 rounded-xs flex items-center gap-1 animate-in fade-in zoom-in">
                      <PackageCheck className="w-3 h-3 text-emerald-700" />
                      DELIVERED
                    </span>
                  ) : (
                    <span className="text-[10px] text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      IN TRANSIT
                    </span>
                  )}
                </div>
                <div className="text-sm text-foreground font-normal border-b border-border pb-3 mb-3">Load #{TRACKING_CODE}</div>

                {demoState.isDelivered ? (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xs flex gap-3 items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-foreground font-normal">Arrived at Destination</p>
                        <p className="text-xs text-muted-foreground">San Francisco, CA • Just now</p>
                      </div>
                    </div>
                    <Button className="w-full text-xs rounded-xs" variant="secondary" onClick={resetDemo}>
                      Complete
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <div className="text-[10px] text-muted-foreground font-mono">ORIGIN</div>
                      <div className="text-xs text-foreground">Los Angeles, CA</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground font-mono">DESTINATION</div>
                      <div className="text-xs text-foreground">San Francisco, CA</div>
                    </div>
                    <div className="col-span-2">
                      <div className="w-full bg-border h-1 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${demoState.progress}%` }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-[10px] text-muted-foreground">0%</span>
                        <span className="text-[10px] text-foreground font-mono">{Math.round(demoState.progress)}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="h-10 bg-surface-3 dark:bg-secondary border-t border-border flex items-center justify-between px-6">
              <span className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <Shield className="w-3 h-3" /> Secure Link • No sensitive data exposed
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">Powered by Vertex</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



const Hero: React.FC = () => (
  <div className="relative overflow-hidden bg-background dark:bg-secondary">
    <div className="absolute inset-0 z-0 opacity-[0.3]"
      style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
    </div>

    <div className="pt-32 pb-20 md:pt-40 md:pb-24 relative z-10">
      <Container className="flex flex-col items-center text-center">
        <div className="animate-fade-in-up delay-0 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border text-xs font-normal text-muted-foreground mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Next-Generation Freight Tracking
        </div>

        <h1 className="animate-fade-in-up delay-100 text-[48px] md:text-7xl font-normal tracking-[-0.03em] text-foreground mb-6 max-w-4xl">
          The Easiest Way to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Track Freight</span>
        </h1>

        <p className="animate-fade-in-up delay-200 text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop the check calls. Get real-time visibility and automated arrival alerts in seconds. No passwords, no training, just results.
        </p>

        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mb-16">
          <Link href="/request-demo">
            <Button size="lg" className="w-full sm:w-auto gap-2 bg-[#1F1E1E] hover:bg-foreground text-white rounded-xs">
              Start Tracking <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2 bg-white border-border text-foreground hover:bg-surface-3 rounded-xs">
              <Zap className="w-4 h-4" /> How It Works
            </Button>
          </Link>
        </div>

        <div className="animate-fade-in-up delay-500 w-full relative z-10 flex justify-center">
          <InteractiveDemo />
        </div>
      </Container>
    </div>
  </div>
);

const Features: React.FC = () => (
  <Container className="border-t border-border mt-20 pt-20">
    <div className="mb-12 text-center max-w-3xl mx-auto">
      <h2 className="text-[28px] font-normal text-foreground tracking-[-0.03em] mb-4">Platform Capabilities</h2>
      <p className="text-lg text-muted-foreground font-light">
        Built on a modern stack (Next.js, NestJS, Flutter) to provide reliability that legacy TMS platforms cannot match.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { title: "Real-time Telemetry", desc: "Watch freight move in real-time. High-frequency polling ensures you see the truck where it is.", icon: MapPin },
        { title: "Idempotent Alerts", desc: "No spam. Our notification engine guarantees you only receive one alert per event.", icon: Bell },
        { title: "Dark Mode Native", desc: "Designed for operations centers. High contrast interface reduces eye strain.", icon: Moon },
        { title: "Universal Driver App", desc: "No passwords. One-tap start. Works on any modern smartphone.", icon: Smartphone },
        { title: "Bank-Grade Security", desc: "Google OAuth, encrypted tokens, and strict environment validation.", icon: ShieldCheck },
        { title: "Instant Session Tabs", desc: "Manage multiple loads without losing context.", icon: Zap },
      ].map((f, idx) => (
        <div key={idx} className="group bg-white p-8 rounded-xs border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-[0.15s] h-full animate-fade-in-scale" style={{ animationDelay: `${idx * 50}ms` }}>
          <div className="w-10 h-10 rounded-xs bg-surface-3 dark:bg-secondary flex items-center justify-center mb-4 group-hover:bg-[#19224A]/10 transition-colors duration-[0.15s]">
            <f.icon className="w-5 h-5 text-muted-foreground group-hover:text-[#19224A] dark:group-hover:text-foreground transition-colors duration-[0.15s]" />
          </div>
          <h3 className="text-lg font-normal text-foreground mb-2">{f.title}</h3>
          <p className="text-sm text-muted-foreground font-light leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  </Container>
);

const HowItWorks: React.FC = () => (
  <Container id="how-it-works" className="border-t border-border mt-20 pt-20">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="animate-fade-in-up">
        <h2 className="text-[28px] font-normal text-foreground mb-6 tracking-[-0.03em]">
          Zero Friction. Zero Training.
        </h2>
        <p className="text-lg text-muted-foreground font-light mb-8 leading-relaxed">
          We removed every barrier. Drivers don't need accounts. Brokers don't need manuals. It just works.
        </p>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface-3 dark:bg-secondary border border-border flex items-center justify-center">
              <Send className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-foreground font-normal mb-1 flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">01</span>Send the Invite
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-sm">Enter the driver's phone number. We text them a secure magic code instantly.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface-3 dark:bg-secondary border border-border flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-foreground font-normal mb-1 flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">02</span>Driver Enters Code
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-sm">They enter the 6-digit code from the SMS and hit Start. No username, no password.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface-3 dark:bg-secondary border border-border flex items-center justify-center">
              <Coffee className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-foreground font-normal mb-1 flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">03</span>You Relax
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-sm">Watch the truck on the map. Get an email when it arrives.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative animate-fade-in-scale delay-200">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 blur-3xl rounded-full"></div>
        <div className="relative bg-white border border-border rounded-xs p-8 shadow-lg">
          <div className="font-mono text-xs text-muted-foreground mb-4 border-b border-border pb-2">SYSTEM LOGS</div>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex gap-3">
              <span className="text-muted-foreground">10:42:01</span>
              <span className="text-blue-600">INFO</span>
              <span className="text-foreground">Load #8X9 created by Broker</span>
            </div>
            <div className="flex gap-3">
              <span className="text-muted-foreground">10:42:05</span>
              <span className="text-blue-600">SMS</span>
              <span className="text-foreground">Invite sent to +1 (555) ***-****</span>
            </div>
            <div className="flex gap-3">
              <span className="text-muted-foreground">10:44:12</span>
              <span className="text-purple-400">AUTH</span>
              <span className="text-foreground">Driver authenticated via Code</span>
            </div>
            <div className="flex gap-3">
              <span className="text-muted-foreground">10:44:15</span>
              <span className="text-emerald-400">LOC</span>
              <span className="text-foreground">Tracking started. Lat: 34.05, Lng: -118.24</span>
            </div>
            <div className="flex gap-3">
              <span className="text-muted-foreground">10:44:45</span>
              <span className="text-orange-400">GEO</span>
              <span className="text-foreground">Geofence exit: PICKUP_LOCATION</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
);

const Trust: React.FC = () => (
  <Container className="border-t border-border mt-20 pt-20">
    <div className="mb-12 text-center max-w-2xl mx-auto">
      <h2 className="text-[28px] font-normal text-foreground tracking-[-0.03em] mb-4">You Can Trust Vertex</h2>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { title: "Bank-Grade Security", desc: "Encryption standards matching financial institutions.", icon: Lock },
        { title: "99.9% Uptime", desc: "Redundant infrastructure for critical shipments.", icon: Server },
        { title: "Privacy First", desc: "We track freight, not lives. Tracking stops on delivery.", icon: EyeOff },
      ].map((t, idx) => (
        <div key={idx} className="bg-white p-8 rounded-xs border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-[0.15s] h-full animate-fade-in-scale" style={{ animationDelay: `${idx * 100}ms` }}>
          <div className="w-10 h-10 rounded-xs bg-surface-3 dark:bg-secondary flex items-center justify-center mb-4">
            <t.icon className="w-5 h-5 text-[#19224A] dark:text-primary" />
          </div>
          <h3 className="text-foreground font-normal mb-2 text-lg">{t.title}</h3>
          <p className="text-sm text-muted-foreground font-light leading-relaxed">{t.desc}</p>
        </div>
      ))}
    </div>
  </Container>
);

const CTA: React.FC = () => (
  <>
    <Container className="border-t border-border mt-20 pt-20" />
    <Container className="bg-[#19224A] rounded-xs p-12 md:p-16 text-center relative overflow-hidden mb-20">
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-[28px] md:text-4xl font-normal text-white mb-6 tracking-[-0.03em]">Ready to streamline your operations?</h2>
        <p className="text-lg text-white/70 font-light mb-10">
          Get real-time visibility and automated arrival alerts in seconds.
        </p>
        <div className="flex justify-center">
          <Link href="/request-demo">
            <Button size="lg" className="px-8 bg-white text-[#19224A] hover:bg-white/90 rounded-xs">Create Your First Load</Button>
          </Link>
        </div>
      </div>
    </Container>
  </>
);

const RaisedashVertexPage: NextPage = () => {
  useEffect(() => {
    // Preserve logic to force Light Mode if that was the intent,
    // or remove it if Vertex should support Dark Mode like PTI does.
    // The previous code had logic to REMOVE dark class.
    // "It's design should be consistent... but do not break any working good logic"
    // "Maintain the page's forced light mode behavior." (from previous conversation summary)
    // I will KEEP the forced light mode for now as per previous instructions,
    // unless the "rich" design implies dark mode support.
    // However, PTI supports dark mode (it has dark mode styles).
    // The previous conversation summary explicitly said "Maintaining the page's forced light mode behavior."
    // I will respect that.

    const root = document.documentElement;
    const wasDark = root.classList.contains("dark");
    if (wasDark) {
      root.classList.remove("dark");
    }
    return () => {
      if (wasDark) {
        root.classList.add("dark");
      }
    };
  }, []);

  return (
    <>
      <SEO
        title="Raisedash Vertex | Real-Time Freight Tracking"
        description="Track your freight in real-time with Raisedash Vertex. Get automated arrival alerts, live location updates, and seamless driver communication for your logistics operations."
        keywords={["freight tracking", "real-time tracking", "fleet tracking software", "cargo tracking", "logistics tracking", "driver tracking app"]}
        ogType="product"
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Vertex"
        description="Real-time freight tracking platform with automated arrival alerts and driver communication tools."
        operatingSystem={["iOS", "Android", "Web"]}
        applicationCategory="BusinessApplication"
      />
      <div className="min-h-screen bg-background dark:bg-secondary text-foreground font-sans selection:bg-[#19224A]/15 selection:text-[#19224A]">
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Trust />
          <CTA />
        </main>
        <Footer />
      </div>
      <style jsx global>{`
        /* Keeping InteractiveDemo specific styles if needed, mostly Tailwind now */
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
