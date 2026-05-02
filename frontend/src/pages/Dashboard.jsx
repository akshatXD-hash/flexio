import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { Dumbbell, Moon, Calculator, ArrowRight, User, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { getBMIHistory, getWorkoutHistory, getSleepHistory } from "../services/api";

export const Dashboard = () => {
  const [synergyData, setSynergyData] = useState({ bmi: null, workout: null, sleep: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSynergy = async () => {
      try {
        const [bmiRes, workoutRes, sleepRes] = await Promise.all([
          getBMIHistory().catch(() => null),
          getWorkoutHistory().catch(() => null),
          getSleepHistory().catch(() => null)
        ]);

        setSynergyData({
          bmi: bmiRes?.bmi?.[bmiRes.bmi.length - 1] || null,
          workout: workoutRes?.workouts?.[0] || null,
          sleep: sleepRes?.sleepLogs?.[0] || null
        });
      } catch (err) { } finally {
        setLoading(false);
      }
    };
    fetchSynergy();
  }, []);

  const calculateVitalityScore = () => {
    let score = 0;
    if (synergyData.bmi) {
      const val = parseFloat(synergyData.bmi.bmiValue);
      if (val >= 18.5 && val <= 24.9) score += 30; else score += 15; 
    }
    if (synergyData.workout) {
      const days = parseInt(synergyData.workout.daysPerWeek) || 0;
      if (days >= 5) score += 35; else if (days >= 3) score += 25; else if (days >= 1) score += 10;
    }
    if (synergyData.sleep) {
      const hrs = parseFloat(synergyData.sleep.amount) || 0;
      if (hrs >= 7) score += 35; else if (hrs >= 5) score += 20; else score += 5;
    }
    return score;
  };

  const score = calculateVitalityScore();
  
  const getRankData = (val) => {
    if (val >= 85) return { tier: "Flourishing", title: "In Perfect Balance", color: "text-primary" };
    if (val >= 60) return { tier: "Consistent", title: "Steady Rhythm", color: "text-accent" };
    if (val >= 30) return { tier: "Awakening", title: "Finding Your Pace", color: "text-muted-foreground" };
    return { tier: "Beginning", title: "Taking Root", color: "text-muted-foreground" };
  };
  const rank = getRankData(score);

  const containerVars = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVars = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVars} className="space-y-12 max-w-7xl mx-auto font-sans text-foreground pb-20">
      {/* State Guide Legend */}
      <motion.div variants={itemVars} className="bg-card border border-border rounded-sm p-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 shadow-sm mt-8">
        <div className="flex items-center gap-3 xl:w-1/4">
           <div className="bg-muted p-2 rounded-sm">
             <Heart className="w-5 h-5 text-muted-foreground" />
           </div>
           <div>
             <h3 className="text-xs font-bold text-foreground uppercase tracking-widest mb-1">State Guide</h3>
             <p className="text-xs text-muted-foreground font-medium">Understanding your wellness flow</p>
           </div>
        </div>
        <div className="flex w-full xl:w-3/4 flex-col sm:flex-row gap-6 justify-between">
           <div className="flex flex-col items-start border-l-2 border-muted pl-4 sm:w-1/4">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Beginning</span>
              <span className="text-sm font-serif font-medium text-muted-foreground mb-1">Taking Root</span>
              <span className="text-xs text-muted-foreground/70 leading-relaxed">Starting your optimization phase. Consistency is key.</span>
           </div>
           <div className="flex flex-col items-start border-l-2 border-muted pl-4 sm:w-1/4">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Awakening</span>
              <span className="text-sm font-serif font-medium text-muted-foreground mb-1">Finding Your Pace</span>
              <span className="text-xs text-muted-foreground/70 leading-relaxed">Building a routine. Your body is gently adapting.</span>
           </div>
           <div className="flex flex-col items-start border-l-2 border-accent pl-4 sm:w-1/4">
              <span className="text-[10px] uppercase tracking-widest text-accent font-bold mb-1">Consistent</span>
              <span className="text-sm font-serif font-medium text-foreground mb-1">Steady Rhythm</span>
              <span className="text-xs text-muted-foreground/80 leading-relaxed">Regular practice established. Feeling the benefits daily.</span>
           </div>
           <div className="flex flex-col items-start border-l-2 border-primary pl-4 sm:w-1/4">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Flourishing</span>
              <span className="text-sm font-serif font-medium text-foreground mb-1">In Perfect Balance</span>
              <span className="text-xs text-muted-foreground/80 leading-relaxed">Deeply connected with and honoring your body's needs.</span>
           </div>
        </div>
      </motion.div>

      {/* Welcome & Summary Card */}
      <div className="bg-card p-8 md:p-12 rounded-sm relative overflow-hidden shadow-sm border border-border">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start gap-12">
           
           <div className="lg:pr-10 lg:w-1/2">
             <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight mb-4 text-foreground">Welcome Back.</h1>
             <p className="text-muted-foreground font-medium text-lg mb-8 leading-relaxed">Ready for your next session? Execute your scheduled programming today.</p>
             
             <div className="flex items-center gap-4 bg-background p-4 rounded-sm border border-border w-max">
                <div className="bg-muted p-3 rounded-full">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Status</p>
                  <p className="font-bold text-foreground uppercase flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-primary"></span> Present
                  </p>
                </div>
             </div>
           </div>

           {/* Wellness Summary */}
           {!loading && (
             <div className="flex-1 w-full lg:w-1/2 border border-border rounded-sm p-6 bg-background shadow-sm">
                
                <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
                   <div className="flex items-center gap-2">
                      <Heart className={`h-5 w-5 ${rank.color}`} />
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Wellness Summary</span>
                   </div>
                   <div className="px-3 py-1 flex items-center gap-2 rounded bg-muted">
                      <Sparkles className="w-3 h-3 text-muted-foreground"/>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Flow State</span>
                   </div>
                </div>

                <div className="mb-8">
                   <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">State: {rank.tier}</div>
                   <div className={`text-3xl font-serif font-medium tracking-tight ${rank.color}`}>
                     {rank.title}
                   </div>
                </div>

                <div className="space-y-3">
                   <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Today's Protocol</div>
                   
                   <Link to="/bmi" className={`flex justify-between items-center p-3 rounded-sm transition-colors ${synergyData.bmi ? 'bg-muted/50 border border-border text-foreground hover:bg-muted' : 'bg-background border border-border border-dashed text-muted-foreground hover:bg-muted/30'}`}>
                      <span className="text-sm font-medium flex items-center gap-3"><Calculator className="w-4 h-4"/> Check In</span>
                      {synergyData.bmi ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <div className="text-[10px] uppercase font-bold tracking-widest">Pending</div>}
                   </Link>

                   <Link to="/workout" className={`flex justify-between items-center p-3 rounded-sm transition-colors ${synergyData.workout ? 'bg-muted/50 border border-border text-foreground hover:bg-muted' : 'bg-background border border-border border-dashed text-muted-foreground hover:bg-muted/30'}`}>
                      <span className="text-sm font-medium flex items-center gap-3"><Dumbbell className="w-4 h-4"/> Guided Movement</span>
                      {synergyData.workout ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <div className="text-[10px] uppercase font-bold tracking-widest">Pending</div>}
                   </Link>

                   <Link to="/sleep" className={`flex justify-between items-center p-3 rounded-sm transition-colors ${synergyData.sleep ? 'bg-muted/50 border border-border text-foreground hover:bg-muted' : 'bg-background border border-border border-dashed text-muted-foreground hover:bg-muted/30'}`}>
                      <span className="text-sm font-medium flex items-center gap-3"><Moon className="w-4 h-4"/> Recovery</span>
                      {synergyData.sleep ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <div className="text-[10px] uppercase font-bold tracking-widest">Pending</div>}
                   </Link>
                </div>
                
             </div>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <motion.div variants={itemVars} className="h-full">
          <Card className="h-full flex flex-col bg-card border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-8">
              <div className="bg-primary/10 p-3 rounded-sm text-primary">
                <Calculator className="h-6 w-6" /> 
              </div>
              {synergyData.bmi ? (
                 <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Active</span>
              ) : (
                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Unlinked</span>
              )}
            </div>
            <h2 className="text-2xl font-serif font-medium text-foreground tracking-tight mb-3">Body Context</h2>
            <p className="text-muted-foreground mb-8 font-medium flex-grow leading-relaxed">Understand your unique starting point to ensure your practice supports you.</p>
            <Link to="/bmi">
              <Button className="w-full btn-primary">
                 {synergyData.bmi ? "Update Context" : "Begin Check-In"} <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </Card>
        </motion.div>

        <motion.div variants={itemVars} className="h-full">
          <Card className="h-full flex flex-col bg-card border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-8">
              <div className="bg-primary/10 p-3 rounded-sm text-primary">
                <Dumbbell className="h-6 w-6" /> 
              </div>
              {synergyData.workout ? (
                 <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Active</span>
              ) : (
                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Unlinked</span>
              )}
            </div>
            <h2 className="text-2xl font-serif font-medium text-foreground tracking-tight mb-3">Guided Sessions</h2>
            <p className="text-muted-foreground mb-8 font-medium flex-grow leading-relaxed">Daily regimens tailored to your goals and current energy levels.</p>
            <Link to="/workout">
              <Button className="w-full btn-primary">
                 Plan Session <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </Card>
        </motion.div>

        <motion.div variants={itemVars} className="h-full">
           <Card className="h-full flex flex-col bg-card border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-8">
              <div className="bg-primary/10 p-3 rounded-sm text-primary">
                <Moon className="h-6 w-6" /> 
              </div>
              {synergyData.sleep ? (
                 <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Active</span>
              ) : (
                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Unlinked</span>
              )}
            </div>
            <h2 className="text-2xl font-serif font-medium text-foreground tracking-tight mb-3">Recovery Analytics</h2>
            <p className="text-muted-foreground mb-8 font-medium flex-grow leading-relaxed">Track sleep metrics to optimize your performance and prevent overtraining.</p>
            <Link to="/sleep">
              <Button className="w-full btn-primary">
                 Log Rest <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
