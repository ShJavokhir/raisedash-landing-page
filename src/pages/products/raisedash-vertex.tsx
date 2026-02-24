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
    className={`group relative flex w-full items-center justify-between rounded-xs border px-4 py-3 text-left transition-all duration-[0.15s] ${
      active
        ? "dark:text-primary border-[#19224A]/30 bg-[#19224A]/10 text-[#19224A]"
        : "text-muted-foreground hover:text-foreground hover:bg-surface-3 dark:hover:bg-secondary border-transparent"
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon
        className={`h-4 w-4 ${active ? "dark:text-primary text-[#19224A]" : "text-muted-foreground group-hover:text-foreground"}`}
      />
      <span className="text-sm font-normal">{label}</span>
    </div>

    <div className="flex items-center gap-2">
      {notification && <span className="flex h-2 w-2 animate-pulse rounded-full bg-[#D04841]" />}
      {status === "complete" && <CheckCircle className="h-3 w-3 text-emerald-500" />}
      {status === "active" && <Loader2 className="h-3 w-3 animate-spin text-[#19224A]" />}
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
    <div className="border-border flex h-[600px] w-full flex-col overflow-hidden rounded-xs border bg-white shadow-lg md:flex-row">
      <div className="bg-surface-3 dark:bg-secondary border-border flex w-full flex-col border-r md:w-64">
        <div className="border-border border-b p-4">
          <h3 className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            Workflow Step
          </h3>
        </div>
        <div className="flex flex-col gap-1 p-2">
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
            status={
              demoState.isDelivered ? "complete" : demoState.trackingActive ? "active" : "pending"
            }
          />
        </div>

        <div className="border-border bg-surface-3/50 dark:bg-secondary/50 mt-auto border-t p-4">
          <button
            onClick={resetDemo}
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs transition-colors duration-[0.15s]"
          >
            <Clock className="h-3 w-3" /> Reset Simulation
          </button>
        </div>
      </div>

      <div className="relative flex-1 bg-white">
        {activeRole === UserRole.BROKER && (
          <div className="animate-in fade-in absolute inset-0 flex flex-col p-8 duration-300">
            <div className="mb-8">
              <h2 className="text-foreground text-xl font-normal tracking-[-0.03em]">
                Create New Load
              </h2>
              <p className="text-muted-foreground mt-1 text-sm font-light">
                Generate a tracking link in seconds.
              </p>
            </div>

            <div className="max-w-md space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-muted-foreground font-mono text-[10px] uppercase">
                    Pickup
                  </label>
                  <div className="border-border text-foreground flex h-10 items-center rounded-xs border bg-white px-3 text-sm">
                    <span className="mr-2 text-emerald-500/50">●</span> LAX-01
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-muted-foreground font-mono text-[10px] uppercase">
                    Dropoff
                  </label>
                  <div className="border-border text-foreground flex h-10 items-center rounded-xs border bg-white px-3 text-sm">
                    <span className="mr-2 text-orange-500/50">●</span> SFO-04
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-muted-foreground font-mono text-[10px] uppercase">
                  Driver Mobile Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    disabled
                    className="bg-surface-3 dark:bg-secondary border-border text-foreground h-10 w-full rounded-xs border px-3 font-mono text-sm"
                    value="+1 (555) 019-2834"
                    readOnly
                  />
                </div>
                <p className="text-muted-foreground text-[10px]">
                  We will send a secure magic code to this number.
                </p>
              </div>

              {!demoState.loadCreated ? (
                <div className="group relative">
                  <div className="pointer-events-none absolute -inset-1 animate-pulse rounded-xs bg-[#19224A]/20 opacity-75 blur"></div>
                  {/* Animated cursor pointer to show clickability */}
                  <div className="absolute -right-2 -bottom-8 z-10 animate-bounce">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/20 shadow-lg backdrop-blur-sm">
                      <MousePointer2 className="h-4 w-4 animate-pulse text-[#19224A]" />
                    </div>
                    <div className="absolute inset-0 animate-ping rounded-full bg-white/20 opacity-30"></div>
                  </div>
                  <Button
                    onClick={handleCreateLoad}
                    className="hover:bg-foreground relative w-full cursor-pointer gap-2 rounded-xs bg-[#1F1E1E] text-white transition-transform hover:scale-[1.02]"
                  >
                    Create Load & Send Invite <Send className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="animate-in zoom-in-95 flex flex-col gap-3 rounded-xs border border-emerald-200 bg-emerald-50 p-4 duration-[0.15s]">
                  <div className="flex items-center gap-2 text-sm font-normal text-emerald-700">
                    <CheckCircle className="h-4 w-4" /> Invite Sent
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Tracking code{" "}
                    <span className="dark:text-primary bg-surface-3 dark:bg-secondary rounded px-1 font-mono text-[#19224A]">
                      {TRACKING_CODE}
                    </span>{" "}
                    sent to driver.
                  </div>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-emerald-100">
                    <div
                      className="loading-bar h-full bg-emerald-500/70"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-emerald-700">Waiting for driver to connect...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeRole === UserRole.DRIVER && (
          <div className="to-surface-3 dark:from-card dark:to-secondary animate-in fade-in slide-in-from-right-4 absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white p-4 duration-300">
            <div className="border-border ring-border/60 relative flex h-[550px] w-[300px] flex-col overflow-hidden rounded-[2.5rem] border-[3px] bg-white shadow-lg ring-1">
              <div className="pointer-events-none absolute top-0 z-50 flex h-7 w-full items-end justify-center pb-1">
                <div className="border-border/80 h-5 w-24 rounded-b-xs border-x border-b bg-white"></div>
              </div>

              {demoState.smsReceived && !demoState.codeAutofilled && (
                <div
                  onClick={handleAutofillCode}
                  className="border-border animate-in slide-in-from-top-4 absolute top-10 right-3 left-3 z-50 cursor-pointer rounded-xs border bg-white/90 p-3 shadow-lg ring-1 ring-[#19224A]/20 backdrop-blur-md transition-transform duration-500 hover:scale-[1.02] dark:bg-white/90"
                >
                  <div className="relative flex items-start gap-3">
                    <div className="absolute -right-2 -bottom-6 animate-bounce">
                      <MousePointer2 className="h-6 w-6 fill-white text-[#19224A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]" />
                    </div>

                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-900/20">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-baseline justify-between">
                        <p className="text-foreground text-[11px] font-semibold">MESSAGES</p>
                        <p className="text-muted-foreground text-[9px]">NOW</p>
                      </div>
                      <p className="text-foreground text-xs leading-snug">
                        Vertex: Your load tracking code is{" "}
                        <span className="font-mono font-bold text-emerald-600">
                          {TRACKING_CODE}
                        </span>
                      </p>
                      <p className="mt-1 animate-pulse text-[10px] font-normal text-emerald-600">
                        Tap to autofill
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="relative z-10 flex flex-1 flex-col bg-white">
                {!demoState.codeVerified ? (
                  <div className="flex flex-1 flex-col items-center justify-center p-6">
                    <div className="border-border mb-8 flex h-16 w-16 items-center justify-center rounded-xs border bg-white">
                      <ShieldCheck className="text-muted-foreground h-8 w-8" />
                    </div>
                    <h3 className="text-foreground mb-2 text-xl font-normal tracking-[-0.03em]">
                      Vertex Driver
                    </h3>
                    <p className="text-muted-foreground mb-8 text-center text-xs font-light">
                      Enter the code from your dispatcher to start.
                    </p>

                    <div className="mb-8 flex gap-2">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`flex h-12 w-9 items-center justify-center rounded-xs border font-mono text-lg transition-all duration-300 ${
                            demoState.codeAutofilled
                              ? "scale-105 border-emerald-300 bg-emerald-50 text-emerald-700"
                              : "border-border bg-surface-3 dark:bg-secondary text-foreground"
                          }`}
                        >
                          {demoState.codeAutofilled ? TRACKING_CODE[i] : ""}
                        </div>
                      ))}
                    </div>
                    {demoState.codeAutofilled && (
                      <div className="animate-in fade-in slide-in-from-bottom-2 flex items-center gap-2 text-xs text-emerald-600">
                        <Loader2 className="h-3 w-3 animate-spin" /> Verifying code...
                      </div>
                    )}
                    {!demoState.codeAutofilled && (
                      <p className="text-muted-foreground text-[10px]">Waiting for code...</p>
                    )}
                  </div>
                ) : !demoState.trackingActive ? (
                  <div className="animate-in fade-in flex flex-1 flex-col p-6 duration-300">
                    <div className="mt-8 mb-auto">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-xs border border-emerald-200 bg-emerald-50 px-2 py-1 font-mono text-[10px] text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        CODE VERIFIED
                      </div>
                      <h3 className="text-foreground mb-1 text-2xl font-normal tracking-[-0.03em]">
                        Load Details
                      </h3>
                      <p className="text-muted-foreground font-mono text-sm">ID: {TRACKING_CODE}</p>

                      <div className="border-border relative mt-8 ml-2 space-y-8 border-l pl-4">
                        <div className="relative">
                          <div className="absolute top-1 -left-[21px] h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                          <p className="text-muted-foreground mb-0.5 font-mono text-[10px]">
                            PICKUP • 09:00 AM
                          </p>
                          <p className="text-foreground text-sm font-normal">
                            Distribution Center A
                          </p>
                          <p className="text-muted-foreground text-xs">Los Angeles, CA</p>
                        </div>
                        <div className="relative">
                          <div className="absolute top-1 -left-[21px] h-3 w-3 rounded-full bg-orange-500 ring-4 ring-orange-100" />
                          <p className="text-muted-foreground mb-0.5 font-mono text-[10px]">
                            DROPOFF • EST 14:00 PM
                          </p>
                          <p className="text-foreground text-sm font-normal">Retail Hub SFO</p>
                          <p className="text-muted-foreground text-xs">San Francisco, CA</p>
                        </div>
                      </div>
                    </div>
                    <div className="group relative">
                      <div className="absolute -inset-1 animate-pulse rounded-xs bg-[#19224A]/10 opacity-0 blur transition duration-500 group-hover:opacity-100"></div>
                      <Button
                        size="lg"
                        className="hover:bg-foreground relative h-14 w-full rounded-xs bg-[#1F1E1E] font-normal text-white shadow-lg transition-transform active:scale-95"
                        onClick={handleStartTracking}
                      >
                        START TRACKING
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in flex flex-1 flex-col items-center justify-center p-6 text-center duration-500">
                    <div className="relative mb-8 flex h-40 w-40 items-center justify-center rounded-full border border-emerald-200">
                      <div className="absolute inset-0 animate-[ping_3s_linear_infinite] rounded-full border border-emerald-100"></div>
                      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-emerald-50 backdrop-blur-sm">
                        <div className="text-center">
                          <p className="font-mono text-4xl font-bold tracking-tighter text-emerald-700">
                            58
                          </p>
                          <p className="mt-1 font-mono text-[10px] text-emerald-600">MPH</p>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-foreground text-lg font-normal">Tracking Active</h3>
                    <p className="text-muted-foreground mt-2 max-w-[200px] text-sm font-light">
                      Location is being shared with the broker automatically.
                    </p>

                    <div className="mt-auto w-full">
                      <Button
                        variant="secondary"
                        className="w-full rounded-xs border-[#D04841]/30 text-[#D04841] hover:bg-[#D04841]/5"
                      >
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
          <div className="animate-in fade-in zoom-in-95 absolute inset-0 flex flex-col duration-500">
            <div className="to-surface-3 dark:from-card dark:to-secondary group relative flex-1 cursor-crosshair overflow-hidden bg-gradient-to-b from-white">
              <svg className="h-full w-full opacity-20">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-border"
                  />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <svg className="h-64 w-full max-w-3xl overflow-visible">
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
                    <g
                      style={{
                        offsetPath: 'path("M 0,150 C 100,150 200,50 400,50 S 700,100 800,80")',
                        offsetDistance: `${demoState.progress}%`,
                      }}
                    >
                      <circle
                        r="8"
                        fill="#10b981"
                        className="shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                      />
                      <circle r="20" fill="#10b981" opacity="0.2" className="animate-ping" />
                    </g>
                  )}

                  {demoState.isDelivered && (
                    <g transform="translate(800, 80)">
                      <circle r="8" fill="#10b981" />
                      <circle
                        r="16"
                        fill="transparent"
                        stroke="#10b981"
                        strokeWidth="1"
                        className="animate-ping"
                      />
                    </g>
                  )}
                </svg>
              </div>

              <div className="border-border absolute top-4 right-4 w-72 rounded-xs border bg-white/95 p-4 shadow-lg backdrop-blur transition-all duration-500 dark:bg-white/95">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                    Public View
                  </span>
                  {demoState.isDelivered ? (
                    <span className="animate-in fade-in zoom-in flex items-center gap-1 rounded-xs bg-emerald-200 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-900">
                      <PackageCheck className="h-3 w-3 text-emerald-700" />
                      DELIVERED
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-xs border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[10px] text-emerald-700">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
                      IN TRANSIT
                    </span>
                  )}
                </div>
                <div className="text-foreground border-border mb-3 border-b pb-3 text-sm font-normal">
                  Load #{TRACKING_CODE}
                </div>

                {demoState.isDelivered ? (
                  <div className="animate-in fade-in slide-in-from-bottom-2 space-y-3">
                    <div className="flex items-start gap-3 rounded-xs border border-emerald-200 bg-emerald-50 p-3">
                      <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                      <div>
                        <p className="text-foreground text-sm font-normal">
                          Arrived at Destination
                        </p>
                        <p className="text-muted-foreground text-xs">
                          San Francisco, CA • Just now
                        </p>
                      </div>
                    </div>
                    <Button
                      className="w-full rounded-xs text-xs"
                      variant="secondary"
                      onClick={resetDemo}
                    >
                      Complete
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <div className="text-muted-foreground font-mono text-[10px]">ORIGIN</div>
                      <div className="text-foreground text-xs">Los Angeles, CA</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground font-mono text-[10px]">DESTINATION</div>
                      <div className="text-foreground text-xs">San Francisco, CA</div>
                    </div>
                    <div className="col-span-2">
                      <div className="bg-border h-1 w-full overflow-hidden rounded-full">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-300"
                          style={{ width: `${demoState.progress}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 flex justify-between">
                        <span className="text-muted-foreground text-[10px]">0%</span>
                        <span className="text-foreground font-mono text-[10px]">
                          {Math.round(demoState.progress)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-surface-3 dark:bg-secondary border-border flex h-10 items-center justify-between border-t px-6">
              <span className="text-muted-foreground flex items-center gap-2 text-[10px]">
                <Shield className="h-3 w-3" /> Secure Link • No sensitive data exposed
              </span>
              <span className="text-muted-foreground font-mono text-[10px]">Powered by Vertex</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Hero: React.FC = () => (
  <div className="bg-background dark:bg-secondary relative overflow-hidden">
    <div
      className="absolute inset-0 z-0 opacity-[0.3]"
      style={{
        backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    ></div>

    <div className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-24">
      <Container className="flex flex-col items-center text-center">
        <div className="animate-fade-in-up bg-card border-border text-muted-foreground mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-normal delay-0">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          Next-Generation Freight Tracking
        </div>

        <h1 className="animate-fade-in-up text-foreground mb-6 max-w-4xl text-[48px] font-normal tracking-[-0.03em] delay-100 md:text-7xl">
          The Easiest Way to{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            Track Freight
          </span>
        </h1>

        <p className="animate-fade-in-up text-muted-foreground mx-auto mb-10 max-w-2xl text-xl leading-relaxed font-light delay-200">
          Stop the check calls. Get real-time visibility and automated arrival alerts in seconds. No
          passwords, no training, just results.
        </p>

        <div className="animate-fade-in-up mb-16 flex w-full flex-col justify-center gap-4 delay-300 sm:w-auto sm:flex-row">
          <Link href="/get-started">
            <Button
              size="lg"
              className="hover:bg-foreground w-full gap-2 rounded-xs bg-[#1F1E1E] text-white sm:w-auto"
            >
              Start Tracking <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button
              variant="secondary"
              size="lg"
              className="border-border text-foreground hover:bg-surface-3 w-full gap-2 rounded-xs bg-white sm:w-auto"
            >
              <Zap className="h-4 w-4" /> How It Works
            </Button>
          </Link>
        </div>

        <div className="animate-fade-in-up relative z-10 flex w-full justify-center delay-500">
          <InteractiveDemo />
        </div>
      </Container>
    </div>
  </div>
);

const Features: React.FC = () => (
  <Container className="border-border mt-20 border-t pt-20">
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <h2 className="text-foreground mb-4 text-[28px] font-normal tracking-[-0.03em]">
        Platform Capabilities
      </h2>
      <p className="text-muted-foreground text-lg font-light">
        Built on a modern stack (Next.js, NestJS, Flutter) to provide reliability that legacy TMS
        platforms cannot match.
      </p>
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: "Real-time Telemetry",
          desc: "Watch freight move in real-time. High-frequency polling ensures you see the truck where it is.",
          icon: MapPin,
        },
        {
          title: "Idempotent Alerts",
          desc: "No spam. Our notification engine guarantees you only receive one alert per event.",
          icon: Bell,
        },
        {
          title: "Dark Mode Native",
          desc: "Designed for operations centers. High contrast interface reduces eye strain.",
          icon: Moon,
        },
        {
          title: "Universal Driver App",
          desc: "No passwords. One-tap start. Works on any modern smartphone.",
          icon: Smartphone,
        },
        {
          title: "Bank-Grade Security",
          desc: "Google OAuth, encrypted tokens, and strict environment validation.",
          icon: ShieldCheck,
        },
        {
          title: "Instant Session Tabs",
          desc: "Manage multiple loads without losing context.",
          icon: Zap,
        },
      ].map((f, idx) => (
        <div
          key={idx}
          className="group bg-card border-border animate-fade-in-scale h-full rounded-xs border p-8 transition-all duration-[0.15s] hover:-translate-y-1 hover:shadow-lg"
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          <div className="bg-surface-3 dark:bg-secondary mb-4 flex h-10 w-10 items-center justify-center rounded-xs transition-colors duration-[0.15s] group-hover:bg-[#19224A]/10">
            <f.icon className="text-muted-foreground dark:group-hover:text-foreground h-5 w-5 transition-colors duration-[0.15s] group-hover:text-[#19224A]" />
          </div>
          <h3 className="text-foreground mb-2 text-lg font-normal">{f.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed font-light">{f.desc}</p>
        </div>
      ))}
    </div>
  </Container>
);

const HowItWorks: React.FC = () => (
  <Container id="how-it-works" className="border-border mt-20 border-t pt-20">
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div className="animate-fade-in-up">
        <h2 className="text-foreground mb-6 text-[28px] font-normal tracking-[-0.03em]">
          Zero Friction. Zero Training.
        </h2>
        <p className="text-muted-foreground mb-8 text-lg leading-relaxed font-light">
          We removed every barrier. Drivers don't need accounts. Brokers don't need manuals. It just
          works.
        </p>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="bg-surface-3 dark:bg-secondary border-border flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border">
              <Send className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-foreground mb-1 flex items-center gap-2 font-normal">
                <span className="text-muted-foreground font-mono text-xs">01</span>Send the Invite
              </h3>
              <p className="text-muted-foreground max-w-sm text-sm leading-relaxed font-light">
                Enter the driver's phone number. We text them a secure magic code instantly.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-3 dark:bg-secondary border-border flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border">
              <Smartphone className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-foreground mb-1 flex items-center gap-2 font-normal">
                <span className="text-muted-foreground font-mono text-xs">02</span>Driver Enters
                Code
              </h3>
              <p className="text-muted-foreground max-w-sm text-sm leading-relaxed font-light">
                They enter the 6-digit code from the SMS and hit Start. No username, no password.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-3 dark:bg-secondary border-border flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border">
              <Coffee className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-foreground mb-1 flex items-center gap-2 font-normal">
                <span className="text-muted-foreground font-mono text-xs">03</span>You Relax
              </h3>
              <p className="text-muted-foreground max-w-sm text-sm leading-relaxed font-light">
                Watch the truck on the map. Get an email when it arrives.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="animate-fade-in-scale relative delay-200">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 blur-3xl"></div>
        <div className="bg-card border-border relative rounded-xs border p-8 shadow-lg">
          <div className="text-muted-foreground border-border mb-4 border-b pb-2 font-mono text-xs">
            SYSTEM LOGS
          </div>
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
  <Container className="border-border mt-20 border-t pt-20">
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <h2 className="text-foreground mb-4 text-[28px] font-normal tracking-[-0.03em]">
        You Can Trust Vertex
      </h2>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      {[
        {
          title: "Bank-Grade Security",
          desc: "Encryption standards matching financial institutions.",
          icon: Lock,
        },
        {
          title: "99.9% Uptime",
          desc: "Redundant infrastructure for critical shipments.",
          icon: Server,
        },
        {
          title: "Privacy First",
          desc: "We track freight, not lives. Tracking stops on delivery.",
          icon: EyeOff,
        },
      ].map((t, idx) => (
        <div
          key={idx}
          className="bg-card border-border animate-fade-in-scale h-full rounded-xs border p-8 transition-all duration-[0.15s] hover:-translate-y-1 hover:shadow-lg"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className="bg-surface-3 dark:bg-secondary mb-4 flex h-10 w-10 items-center justify-center rounded-xs">
            <t.icon className="dark:text-primary h-5 w-5 text-[#19224A]" />
          </div>
          <h3 className="text-foreground mb-2 text-lg font-normal">{t.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed font-light">{t.desc}</p>
        </div>
      ))}
    </div>
  </Container>
);

const CTA: React.FC = () => (
  <>
    <Container className="border-border mt-20 border-t pt-20" />
    <Container className="relative mb-20 overflow-hidden rounded-xs bg-[#19224A] p-12 text-center md:p-16">
      <div className="relative z-10 mx-auto max-w-3xl">
        <h2 className="mb-6 text-[28px] font-normal tracking-[-0.03em] text-white md:text-4xl">
          Ready to streamline your operations?
        </h2>
        <p className="mb-10 text-lg font-light text-white/70">
          Get real-time visibility and automated arrival alerts in seconds.
        </p>
        <div className="flex justify-center">
          <Link href="/get-started">
            <Button size="lg" className="rounded-xs bg-white px-8 text-[#19224A] hover:bg-white/90">
              Create Your First Load
            </Button>
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
        keywords={[
          "freight tracking",
          "real-time tracking",
          "fleet tracking software",
          "cargo tracking",
          "logistics tracking",
          "driver tracking app",
        ]}
        ogType="product"
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Vertex"
        description="Real-time freight tracking platform with automated arrival alerts and driver communication tools."
        operatingSystem={["iOS", "Android", "Web"]}
        applicationCategory="BusinessApplication"
        offers={[{ price: "0", priceCurrency: "USD" }]}
      />
      <div className="bg-background dark:bg-secondary text-foreground min-h-screen font-sans selection:bg-[#19224A]/15 selection:text-[#19224A]">
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
