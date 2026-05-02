import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calculator, Dumbbell, Moon, ArrowRight } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export const Landing = () => {
  return (
    <div className="bg-background text-foreground overflow-hidden font-sans">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 pt-24 pb-20 mt-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <span className="text-primary text-sm font-bold tracking-widest uppercase mb-8 block">
                Cover Story
              </span>
              <h1 className="font-serif text-7xl md:text-[6.5rem] leading-[0.9] text-foreground tracking-tight mb-8">
                The slow <br/>
                <span className="text-primary italic">art</span> of <br/>
                moving <br/>
                well.
              </h1>
            </motion.div>
          </div>
          <div className="flex flex-col justify-end pb-4">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-8">
              <img src="/healthy_couple.png" alt="Healthy couple stretching" className="w-full max-w-md h-64 object-cover rounded-sm shadow-sm" />
            </motion.div>
            <motion.p initial="hidden" animate="visible" variants={fadeIn} className="text-xl text-foreground leading-relaxed max-w-md">
              Flexio is a quiet companion for your body: a calm place to plan your week, follow guided sessions, and notice how you feel. No streaks. No shouting. Just gentle progress.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Quote & Image Section */}
      <section className="bg-card border-y border-border py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center mb-20">
             <span className="text-primary text-6xl font-serif leading-none block mb-4">“</span>
             <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-8">
               You don't need more discipline. You need a kinder room to practice in. Flexio is that room, built by people who got tired of shouting apps.
             </h2>
             <p className="text-sm tracking-widest uppercase text-muted-foreground font-semibold">
               The Flexio Team, on why we exist
             </p>
          </div>
          
          <div className="relative">
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-serif italic z-10 shadow-soft">
              circles · weekly
            </div>
            <img src="/peaceful_yoga.png" alt="People practicing yoga in the park" className="w-full h-[600px] object-cover rounded-sm shadow-paper" />
          </div>
        </div>
      </section>

      {/* Core Features - Reimagined */}
      <section className="py-32 max-w-7xl mx-auto px-8">
        <div className="mb-20">
          <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">
            Core Philosophy
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-foreground tracking-tight">Gentle Tools. <br/>Powerful Results.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="group">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-6 text-accent-foreground group-hover:bg-accent transition-colors">
              <Calculator className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-2xl mb-4 text-foreground">Body Context</h3>
            <p className="text-muted-foreground leading-relaxed">
              We start by understanding your unique starting point. Our gentle BMI guidance helps set a healthy baseline, ensuring your movement practice supports your specific physiological needs without pushing you too hard.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="group">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Dumbbell className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-2xl mb-4 text-foreground">Guided Sessions</h3>
            <p className="text-muted-foreground leading-relaxed">
              Let go of the guesswork. Our algorithm quietly generates daily regimens tailored to your goals and energy levels, offering exactly what your body needs today—whether that's a light stretch or a strength session.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="group">
            <div className="w-12 h-12 rounded-full bg-sage-deep/20 flex items-center justify-center mb-6 text-sage-deep group-hover:bg-sage-deep group-hover:text-primary-foreground transition-colors">
              <Moon className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-2xl mb-4 text-foreground">Restful Recovery</h3>
            <p className="text-muted-foreground leading-relaxed">
              True strength is built in the quiet hours. By tracking your sleep quality and waking mood, Flexio syncs your workouts with your body's recovery state to prevent burnout and celebrate rest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cream py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">
              POSTSCRIPT
            </span>
            <h2 className="font-serif text-6xl md:text-8xl leading-[0.9] tracking-tight text-foreground mb-8">
              Take the <br/> first soft <br/> step today.
            </h2>
          </div>
          <div>
            <p className="text-xl text-foreground mb-12 leading-relaxed">
              Two minutes to set up. A lifetime to enjoy. Flexio is free to try: no card, no commitments, no fine print.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/auth" className="bg-foreground text-background px-8 py-4 text-sm font-bold hover:bg-primary transition-colors inline-flex items-center justify-center border border-transparent rounded-sm">
                Create free account <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/auth" className="bg-transparent text-foreground border border-foreground px-8 py-4 text-sm font-bold hover:bg-foreground hover:text-background transition-colors inline-flex items-center justify-center rounded-sm">
                Talk to our team
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-6 text-xs font-bold tracking-widest uppercase text-muted-foreground">
              <span className="flex items-center gap-2"><span className="text-primary">✦</span> NO CREDIT CARD</span>
              <span className="flex items-center gap-2"><span className="text-primary">✦</span> PAUSE ANYTIME</span>
              <span className="flex items-center gap-2"><span className="text-primary">✦</span> HUMAN SUPPORT</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
