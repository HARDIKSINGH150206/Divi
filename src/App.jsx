import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import centerIcon from './images/diviconstillation.png';
import musicFile from './Audio/Afusic - Heer (Official Music Video) Prod. @AliSoomroMusic.mp3';
import d9Image from './images/D9.jpg';
import diviImage from './images/DIVI.jpeg';
import d20Image from './images/D20.jpeg';
import d25Image from './images/D25.jpeg';
import d29Image from './images/D29.jpeg';
import d26Image from './images/D26.jpeg';

function DiaryApp() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [daysTogether, setDaysTogether] = useState(0);

  const [shootingStars, setShootingStars] = useState([]);
  const [dinoPosition, setDinoPosition] = useState(0);
  const [currentUniverse, setCurrentUniverse] = useState(0); // 0: original, 1: cosmic, 2: sunrise
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFinalPage, setShowFinalPage] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement] = useState(() => {
    const audio = new Audio(musicFile);
    audio.loop = true;
    audio.volume = 0.3;
    return audio;
  });
  const [typewriterText, setTypewriterText] = useState('');

  useEffect(() => {
    // Calculate days together from a start date
    const startDate = new Date('2025-06-26'); // Starting from June 26, 2025
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysTogether(diffDays);
  }, []);

  // Typewriter effect for final page
  useEffect(() => {
    if (!showFinalPage) {
      setTypewriterText('');
      return;
    }

    const fullText = 'WELCOME TO 2026 DIVYANSHI';
    let currentIndex = 0;
    
    const typewriterInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, 100); // Adjust speed here (100ms per character)

    return () => clearInterval(typewriterInterval);
  }, [showFinalPage]);

  useEffect(() => {
    const createShootingStar = () => {
      const newStar = {
        id: Date.now() + Math.random(),
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 50}%`,
        duration: Math.random() * 2 + 2
      };
      
      setShootingStars(prev => [...prev, newStar]);
      
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== newStar.id));
      }, newStar.duration * 1000);
    };

    // Create 2-3 initial shooting stars
    createShootingStar();
    setTimeout(() => createShootingStar(), 500);
    setTimeout(() => createShootingStar(), 1200);

    // Create shooting stars at random intervals (more frequent)
    const interval = setInterval(() => {
      createShootingStar();
    }, Math.random() * 2000 + 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timelineScroll = document.querySelector('.timeline-scroll');
    if (!timelineScroll) return;

    const handleScroll = (e) => {
      const scrollPercentage = (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)) * 100;
      setDinoPosition(Math.min(Math.max(scrollPercentage, 0), 100));
    };

    timelineScroll.addEventListener('scroll', handleScroll);
    
    return () => timelineScroll.removeEventListener('scroll', handleScroll);
  }, [isUnlocked, currentUniverse]);

  const diaryPages = useMemo(() => [
    {
      title: "when we first saw each other",
      date: "May 24, 2025",
      message: "Thanks to Srishti2025 , Hackathon ke baad se ek dusre ki exsistance ke baree mei patta chala , its the best thing happend to me in 2025 , it was destiny ya fir mera luck ki mai waha par tha... humari baat hui nahi uss din lekin sometimes silence also speaks ... thankyou divyanshi meri life mei entry maarne ke liye....",
      imageUrl: d9Image
    },
    {
      title: "Fresh Beginnings",
      date: "June 26(shyd), 2025",
      message: "Tera first message ... we were strangers but i never felt like that ... humari day one se he vibe match ho gayi ... kabhi laga nahi ki hum strangers hai ... tabse le kar abhi tak humesha tujhse baat kar ke bahot aacha lagta hai...like tujhse baat karna is the best part of the day ... thankyou divyanshi for always being there... ",
      imageUrl: diviImage
    },
    {
      title: "Late Night Magic",
      date: "January 15, 2025",
      message: "  I still remember this day divyanshi ... raat ka yeh video call , to hostel vacate karne wali thi aur packing kar rahi thi ... sab kuch bahot aacha aur naya naya lag raha tha ... by that time mujhe tujhpe crush aa  gaya tha ... uss din tune mujhe apni favorite golden bangles aur certificates dikhae the ... aaesa lag raha hai ki kuch din pahle he baat hui thi .... during this period of time i started manefesting you ... but i was confused about my feeling ... lekin i enjoyed this period of time divyanshi ... tere voh calls ... tere voh voice note ... tujhe call kar ke uthana .... this all feels like a dream .... thankyou divyanshi for giving me these days in my lifeeee ",
      imageUrl: d20Image
    },
    {
      title: "Here we go...!!!",
      date: "January 28, 2025",
      message: "KYa din thaaa yrrr divyanshiii .... hum pahli baar sath mei kahi bahar gaye thre .... like pahli baar humne itna time spend kiyaa sath mei and felt every moment as a dream come true ... tere sath arcade mei bitaya hua time ... tere sath jeeta hua voh cutu rabbit aur tere sath voh baaten ... sab kuch bahot sundar aur bahot pyara tha divyanshi .... itne jaldi mai kabhi kisike sath open nahi hua ... thankyou divyanshi mujhe na judge marne ke liye ... thankyou for always being my safe space. initially i was thody shy lekin tune samhal liya tha mujhe divyanshi thankyouuuu very much for all this memories divyanshi ...thankyou ",
      imageUrl: d25Image
    },
    {
      title: "MERI BEST TROPHY",
      date: "February 10, 2025",
      message: "Yeh cute sa rabbit meri liye sabse badi sabse aachi trophy hai ...tune uss din tune poocha tha ki 'kya tujhe chahiye yeh' mera bahot mann tha usko apne pass rakhne ka usko bhagwaan ki murtii ki tarah pooja karta usko humesha apne paas rakta kabhi kuch hone nahi dena .... lekin voh tune jeeta tha you deserved it ... aur uss din ki nishani ke liye maine voh bottle le li .... voh bottle life time mere sath rahegi ... mujhe bahot pasand hai voh bottle ... its like im emotinally connected to it ... thankyou divyanshi for giving me days like this .... mai aapna naam bhul jaunga lekin tere sath bitaye hue yeh moments nahi bhula paunga ... thankyou divyanshi for making my life worth living",
      imageUrl: d29Image
    },
    {
      title: "Meri Favorite kuromi",
      date: "February 28, 2025",
      message: "i knew kuromi but kewal naam aur shaql .... tu kuromi jaisi gusse wali toh nahi hai ... lekin tu khud mei he ek disney princess hai .. sabse sundar ,sabse cuteeee,sapse aachi ... pata hai jab tu focus mei hoti hai toh baaki ssaari cheeze out of focus ho jaati hai .... i always rant about my luck ... lekin bhagwan ne meri sunn li aur tujse millwa diya .... billions of people and s all odds ... jabse tu mere life mei aayi hai sab kuch aacha ho raha hai ... mai khush hone laga , i short i got lucky... thankyou mujhe lucky banane ke liye ... if u are by my side i am the luckyest  person alive ..... thankyou ... i want to say thankyoub meri lucky charm ...lekin i lost that leverage to say u meri ... lekin maine cheexe bigadi hai ... aur mai he theek karunga .... lekin thanyou for giving me oppurtunity jo mai bina tere crack nahi kar pata ... thankyou ",
      imageUrl: d26Image
    }
  ], []);

  const otherUniversePages = useMemo(() => [
    {
      title: "Parallel Universe Discovery",
      date: "March 15, 2025",
      message: "In this alternate dimension, I found that every choice creates infinite possibilities. The version of me here dances with stardust and dreams in cosmic colors.",
      imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop"
    },
    {
      title: "Cosmic Connections",
      date: "April 2, 2025",
      message: "Here in the other universe, connections transcend space and time. Every soul I meet feels like a constellation, lighting up my path through the darkness.",
      imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop"
    },
    {
      title: "Stardust Memories",
      date: "May 10, 2025",
      message: "They say we're all made of stardust. In this universe, I can feel it - every atom vibrating with the memory of distant galaxies and ancient supernovas.",
      imageUrl: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=800&h=600&fit=crop"
    },
    {
      title: "Nebula Dreams",
      date: "June 18, 2025",
      message: "Dreams take form differently here. They swirl like nebulas, colorful and vast, each one a birthplace for new stars and possibilities.",
      imageUrl: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop"
    },
    {
      title: "Quantum Leap of Faith",
      date: "July 7, 2025",
      message: "Taking leaps of faith in this universe means existing in multiple states at once - both brave and afraid, both here and everywhere, both present and infinite.",
      imageUrl: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&h=600&fit=crop"
    },
    {
      title: "Infinite Together",
      date: "August 1, 2025",
      message: "Across all universes, dimensions, and timelines - this one truth remains constant: our connection spans infinity. Forever intertwined in the cosmic dance.",
      imageUrl: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=800&h=600&fit=crop"
    }
  ], []);

  const sunriseUniversePages = useMemo(() => [
    {
      title: "Dawn of New Beginnings",
      date: "September 5, 2025",
      message: "As the first light breaks through the horizon, everything feels possible. This universe is painted in golden hues, where every sunrise is a promise of hope and renewal.",
      imageUrl: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&h=600&fit=crop"
    },
    {
      title: "Golden Hour Reflections",
      date: "October 12, 2025",
      message: "In the warm embrace of the sunrise, I find clarity. The amber light reminds me that after every darkness, there's always a new day waiting to unfold.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    },
    {
      title: "Horizons of Hope",
      date: "November 8, 2025",
      message: "Where the sun meets the earth, dreams take flight. This universe teaches me that endings are just horizons waiting to become new beginnings.",
      imageUrl: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=600&fit=crop"
    },
    {
      title: "Radiant Moments",
      date: "December 1, 2025",
      message: "The sunrise universe glows with warmth and possibility. Every ray of light is a reminder that we are made to shine, to grow, and to illuminate each other's paths.",
      imageUrl: "https://images.unsplash.com/photo-1500099817043-86d46000d58f?w=800&h=600&fit=crop"
    },
    {
      title: "Awakening Hearts",
      date: "December 20, 2025",
      message: "Like the sun rising each morning without fail, love awakens my heart daily. In this universe, every dawn is a testament to the beauty of new chances and endless love.",
      imageUrl: "https://images.unsplash.com/photo-1504333638930-c8787321eee0?w=800&h=600&fit=crop"
    },
    {
      title: "Eternal Sunrise",
      date: "December 29, 2025",
      message: "In this universe of perpetual dawn, I've learned that together, we create our own light. Our love is the sunrise that never fades, illuminating all our universes.",
      imageUrl: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&h=600&fit=crop"
    }
  ], []);

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play().catch(err => console.log('Audio play failed:', err));
      setIsPlaying(true);
    }
  }, [isPlaying, audioElement]);

  const handleUnlock = useCallback(() => {
    if (password === 'Manya') {
      setIsUnlocked(true);
      setError('');
      // Reset dinosaur to start position
      setDinoPosition(0);
    } else {
      setError('Wrong password! Try again.');
      setPassword('');
    }
  }, [password]);

  const handleUniverseTransition = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentUniverse(prev => (prev + 1) % 3); // Cycle through 0, 1, 2
      setIsTransitioning(false);
      const timelineScroll = document.querySelector('.timeline-scroll');
      if (timelineScroll) {
        timelineScroll.scrollTop = 0;
      }
      setDinoPosition(0);
    }, 2000);
  }, []);

  const nextPage = () => {
    if (currentPage < diaryPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  // Generate random stars
  const stars = useMemo(() => {
    return [...Array(80)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2
    }));
  }, []);

  const currentPages = useMemo(() => {
    if (currentUniverse === 1) return otherUniversePages;
    if (currentUniverse === 2) return sunriseUniversePages;
    return diaryPages;
  }, [currentUniverse, diaryPages, otherUniversePages, sunriseUniversePages]);

  return (
    <>
      {/* Final New Year Page - Minimalist Luxury Design */}
      <AnimatePresence>
        {showFinalPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: "easeOut" }}
            className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #050505 0%, #0a0a0a 50%, #111111 100%)',
            }}
          >
            {/* Optimized Stars Layer */}
            <div className="absolute inset-0">
              {[...Array(100)].map((_, i) => {
                const size = Math.random();
                const brightness = Math.random();
                const delay = Math.random() * 3;
                const duration = Math.random() * 2 + 2;
                
                return (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: size < 0.7 ? '2px' : size < 0.9 ? '3px' : '4px',
                      height: size < 0.7 ? '2px' : size < 0.9 ? '3px' : '4px',
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      opacity: brightness * 0.5 + 0.3,
                      boxShadow: brightness > 0.7 ? '0 0 3px rgba(255, 255, 255, 0.8)' : '0 0 1px rgba(255, 255, 255, 0.5)',
                      animation: `twinkle ${duration}s ease-in-out ${delay}s infinite`,
                      willChange: 'opacity'
                    }}
                  />
                );
              })}
            </div>

            {/* Optimized Shooting Stars */}
            <div className="absolute inset-0 pointer-events-none">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={`shooting-${i}`}
                  className="absolute"
                  style={{
                    animation: `shoot ${2.5}s ease-out ${i * 4}s infinite`,
                    willChange: 'transform, opacity'
                  }}
                >
                  <div
                    className="w-1 h-1 bg-white rounded-full"
                    style={{
                      boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.6)',
                      position: 'relative',
                      left: '-5%',
                      top: `${15 + i * 20}vh`
                    }}
                  >
                    <div
                      className="absolute w-20 h-0.5 bg-gradient-to-r from-white to-transparent"
                      style={{
                        right: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        filter: 'blur(1px)',
                        opacity: 0.6
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Faint Static Glow - Bottom Right Corner */}
            <div 
              className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.015) 0%, transparent 70%)',
                filter: 'blur(40px)'
              }}
            />

            {/* Center Content */}
            <motion.div
              className="text-center relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 4, ease: "easeOut" }}
            >
              {/* The Year - 2026 */}
              <h1 
                className="font-serif text-white mb-8"
                style={{
                  fontSize: 'clamp(40px, 8vw, 80px)',
                  fontWeight: 100,
                  letterSpacing: '20px',
                  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                  lineHeight: 1.2,
                  minHeight: '80px' // Prevent layout shift
                }}
              >
                {typewriterText}
                <span 
                  className="animate-pulse" 
                  style={{ 
                    opacity: typewriterText.length < 'WELCOME TO 2026 DIVYANSHI'.length ? 1 : 0 
                  }}
                >
                  |
                </span>
              </h1>

              {/* The Message */}
              <p 
                className="text-white uppercase tracking-widest"
                style={{
                  fontSize: 'clamp(13px, 1.6vw, 18px)',
                  fontWeight: 300,
                  letterSpacing: '4px',
                  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                  opacity: 0.85,
                  maxWidth: '900px',
                  margin: '0 auto',
                  lineHeight: 1.8
                }}
              >
                Welcome to a brand new universe, Divyanshi. As the stars align for another 365 days, my favorite destination in every galaxy will always be you
              </p>

              {/* Back Button */}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 3, ease: "easeOut" }}
                onClick={() => {
                  setShowFinalPage(false);
                  setIsUnlocked(false);
                  setCurrentUniverse(0);
                }}
                className="text-white uppercase tracking-widest"
                style={{
                  marginTop: '60px',
                  fontSize: 'clamp(10px, 1.2vw, 14px)',
                  fontWeight: 300,
                  letterSpacing: '3px',
                  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '12px 30px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.background = 'transparent';
                }}
              >
                Return
              </motion.button>
            </motion.div>

            {/* Optimized CSS Animations */}
            <style>{`
              @keyframes twinkle {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 0.9; transform: scale(1.2); }
              }
              
              @keyframes shoot {
                0% { 
                  transform: translate(0, 0); 
                  opacity: 0; 
                }
                10% { 
                  opacity: 1; 
                }
                90% { 
                  opacity: 1; 
                }
                100% { 
                  transform: translate(110vw, 10vh); 
                  opacity: 0; 
                }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
      className="fixed inset-0 h-screen w-screen overflow-hidden" 
      style={{ 
        background: currentUniverse === 2 
          ? 'linear-gradient(180deg, #FF6B4A 0%, #E43414 15%, #C72C12 35%, #8A1F0D 55%, #3D1108 75%, #1a0604 100%)'
          : currentUniverse === 1 && isUnlocked
          ? 'linear-gradient(180deg, #000000 0%, #0a0014 50%, #0d001a 100%)'
          : 'linear-gradient(180deg, #050a15 0%, #12102d 50%, #1a0f30 100%)'
      }}
    >
      {/* Starfield */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}
        {/* Shooting Stars */}
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="shooting-star"
            style={{
              left: star.left,
              top: star.top,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}
      </div>

      {/* Universe Transition Effect - Cinematic Black Hole */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          >
            {/* Cinematic Vignette Effect */}
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 2,
                times: [0, 0.2, 0.8, 1]
              }}
              style={{
                background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.95) 100%)',
              }}
            />

            {/* Screen Shake/Distortion Effect */}
            <motion.div
              className="absolute inset-0"
              animate={{
                x: [0, -3, 3, -2, 2, 0],
                scale: [1, 1.02, 0.98, 1.01, 0.99, 1],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut"
              }}
              style={{
                background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.9) 100%)',
                filter: 'blur(3px)'
              }}
            />

            {/* Light Flash at Beginning and End */}
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: [0, 1, 0, 0, 0, 0, 0, 1, 0]
              }}
              transition={{
                duration: 2,
                times: [0, 0.05, 0.1, 0.4, 0.6, 0.8, 0.9, 0.95, 1]
              }}
              style={{
                background: 'radial-gradient(circle at center, rgba(192, 132, 252, 0.4) 0%, rgba(138, 43, 226, 0.2) 30%, transparent 60%)',
              }}
            />

            {/* Black Hole Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Gravitational Lensing Rings - Enhanced */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${100 + i * 80}px`,
                    height: `${100 + i * 80}px`,
                    border: `3px solid rgba(138, 43, 226, ${0.7 - i * 0.12})`,
                    boxShadow: `0 0 ${40 + i * 15}px rgba(138, 43, 226, ${0.6 - i * 0.1}), inset 0 0 ${30 + i * 8}px rgba(192, 132, 252, ${0.4 - i * 0.06})`
                  }}
                  animate={{
                    scale: [0.8, 1.5, 0.8],
                    opacity: [0, 1, 0.3, 1, 0],
                    rotate: i % 2 === 0 ? [0, 720] : [0, -720]
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    delay: i * 0.08
                  }}
                />
              ))}

              {/* Accretion Disk - Multiple Layers with Enhanced Motion */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`disk-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${250 + i * 100}px`,
                    height: `${250 + i * 100}px`,
                    background: `conic-gradient(
                      from ${i * 90}deg,
                      transparent 0deg,
                      rgba(138, 43, 226, ${0.6 - i * 0.12}) 60deg,
                      rgba(192, 132, 252, ${0.7 - i * 0.12}) 120deg,
                      rgba(168, 85, 247, ${0.5 - i * 0.1}) 180deg,
                      rgba(138, 43, 226, ${0.6 - i * 0.12}) 240deg,
                      rgba(192, 132, 252, ${0.7 - i * 0.12}) 300deg,
                      transparent 360deg
                    )`,
                    filter: 'blur(12px)'
                  }}
                  animate={{
                    rotate: i % 2 === 0 ? [0, 720] : [0, -720],
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    rotate: {
                      duration: 2,
                      ease: "easeInOut"
                    },
                    scale: {
                      duration: 2,
                      ease: "easeInOut"
                    },
                    opacity: {
                      duration: 2,
                      ease: "easeInOut"
                    }
                  }}
                />
              ))}

              {/* Spiral Arms - Enhanced */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`spiral-${i}`}
                  className="absolute"
                  style={{
                    width: '500px',
                    height: '6px',
                    background: `linear-gradient(90deg, 
                      transparent 0%, 
                      rgba(138, 43, 226, 0.8) 20%, 
                      rgba(192, 132, 252, 1) 50%, 
                      rgba(138, 43, 226, 0.6) 80%, 
                      transparent 100%)`,
                    transformOrigin: 'left center',
                    left: '50%',
                    top: '50%',
                    filter: 'blur(3px)',
                    boxShadow: '0 0 30px rgba(192, 132, 252, 0.8)'
                  }}
                  animate={{
                    rotate: [i * 45, i * 45 + 720],
                    scale: [0.5, 1.2, 0.5],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    delay: i * 0.05
                  }}
                />
              ))}

              {/* Event Horizon - Dark Center with Pulsing */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '150px',
                  height: '150px',
                  background: 'radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(10, 0, 20, 0.98) 40%, rgba(30, 0, 60, 0.9) 100%)',
                  boxShadow: `
                    0 0 60px rgba(0, 0, 0, 1),
                    0 0 120px rgba(138, 43, 226, 0.6),
                    inset 0 0 60px rgba(0, 0, 0, 1)
                  `,
                  border: '3px solid rgba(138, 43, 226, 0.5)'
                }}
                animate={{
                  scale: [0.3, 1.5, 0.3],
                  boxShadow: [
                    '0 0 60px rgba(0, 0, 0, 1), 0 0 120px rgba(138, 43, 226, 0.6)',
                    '0 0 100px rgba(0, 0, 0, 1), 0 0 200px rgba(138, 43, 226, 0.9)',
                    '0 0 60px rgba(0, 0, 0, 1), 0 0 120px rgba(138, 43, 226, 0.6)'
                  ]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut"
                }}
              />

              {/* Energy Particles - More Dynamic */}
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${Math.random() * 8 + 3}px`,
                    height: `${Math.random() * 8 + 3}px`,
                    background: i % 4 === 0 
                      ? 'rgba(255, 255, 255, 1)' 
                      : i % 4 === 1
                      ? 'rgba(192, 132, 252, 1)' 
                      : i % 4 === 2
                      ? 'rgba(138, 43, 226, 1)'
                      : 'rgba(168, 85, 247, 1)',
                    boxShadow: `0 0 ${Math.random() * 20 + 15}px ${
                      i % 4 === 0
                        ? 'rgba(255, 255, 255, 1)'
                        : i % 4 === 1 
                        ? 'rgba(192, 132, 252, 1)' 
                        : 'rgba(138, 43, 226, 1)'
                    }`,
                    left: `${50 + Math.cos(i * 9 * Math.PI / 180) * 300}%`,
                    top: `${50 + Math.sin(i * 9 * Math.PI / 180) * 300}%`
                  }}
                  animate={{
                    x: [0, Math.cos(i * 9 * Math.PI / 180) * -500],
                    y: [0, Math.sin(i * 9 * Math.PI / 180) * -500],
                    scale: [1, 0.5, 0],
                    opacity: [1, 0.8, 0]
                  }}
                  transition={{
                    duration: 1.8,
                    ease: [0.2, 0.8, 0.2, 1],
                    delay: (i * 0.03) % 1.2
                  }}
                />
              ))}

              {/* Glowing Center Burst */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '100px',
                  height: '100px',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(192, 132, 252, 0.3) 30%, transparent 70%)',
                  filter: 'blur(15px)'
                }}
                animate={{
                  scale: [0.5, 2, 0.5],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut"
                }}
              />

              {/* Outer Glow Pulse - Enhanced */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '800px',
                  height: '800px',
                  background: 'radial-gradient(circle, transparent 30%, rgba(138, 43, 226, 0.2) 50%, rgba(192, 132, 252, 0.15) 70%, transparent 90%)',
                  filter: 'blur(30px)'
                }}
                animate={{
                  scale: [0.8, 1.5, 0.8],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut"
                }}
              />

              {/* Wormhole Tunnel Effect */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`tunnel-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${600 - i * 70}px`,
                    height: `${600 - i * 70}px`,
                    border: `2px solid rgba(138, 43, 226, ${0.1 + i * 0.08})`,
                    boxShadow: `0 0 20px rgba(192, 132, 252, ${0.2 + i * 0.08})`
                  }}
                  animate={{
                    scale: [1.2, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeIn",
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 h-full w-full flex flex-col"
          >
            {/* Decorative Moon */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="absolute top-10 right-10 sm:top-16 sm:right-16 md:top-20 md:right-24"
            >
              <svg className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56" viewBox="0 0 200 200" fill="none">
                <defs>
                  <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                    <stop offset="50%" stopColor="rgba(255, 255, 255, 0.2)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Outer glow */}
                <circle cx="100" cy="100" r="95" fill="url(#moonGlow)" />
                {/* Moon circle with glow filter */}
                <circle cx="100" cy="100" r="80" fill="white" opacity="1" filter="url(#glow)" />
                {/* Craters */}
                <circle cx="70" cy="80" r="15" fill="rgba(200, 200, 220, 0.5)" />
                <circle cx="120" cy="90" r="10" fill="rgba(200, 200, 220, 0.5)" />
                <circle cx="90" cy="120" r="20" fill="rgba(200, 200, 220, 0.5)" />
                <circle cx="130" cy="110" r="8" fill="rgba(200, 200, 220, 0.5)" />
                <circle cx="80" cy="110" r="12" fill="rgba(200, 200, 220, 0.5)" />
              </svg>
            </motion.div>

            {/* Header */}
            <header className="relative z-10 flex justify-between items-center p-4 sm:p-6 md:p-8">
              <div className="font-playfair text-white text-sm sm:text-base md:text-lg">
                Together for: <span className="font-bold text-purple-300">{daysTogether}</span> days
              </div>
              <button 
                onClick={() => {
                  setIsUnlocked(false);
                  setCurrentUniverse(0);
                  setDinoPosition(0);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm sm:text-base font-playfair">Close</span>
              </button>
            </header>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6 -mt-12 sm:-mt-16 md:-mt-20">
              {/* Center Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative"
              >
                <img 
                  src={centerIcon} 
                  alt="Universe Icon" 
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain constellation-flicker"
                />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="font-playfair text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center tracking-wider"
                style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
              >
                A Universe Named Divyanshi
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="font-playfair text-purple-200 text-base sm:text-lg md:text-xl text-center italic"
              >
                A universe crafted just for you
              </motion.p>

              {/* Play Music Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.85 }}
                onClick={toggleMusic}
                className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all border border-white/20 group"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="text-sm sm:text-base font-playfair group-hover:text-purple-200">
                  {isPlaying ? 'Pause Music' : 'Play Music'}
                </span>
              </motion.button>

              {/* Password Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="w-full max-w-md space-y-4 sm:space-y-5"
              >
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                    placeholder="Hint: Person who rules her universe"
                    className="w-full px-6 py-3 sm:py-4 text-center text-base sm:text-lg font-playfair bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full text-white placeholder-white/50 focus:outline-none focus:border-purple-300 focus:bg-white/15 transition-all"
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-300 text-center font-playfair text-sm"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Golden Wax Seal Button */}
                <button
                  onClick={handleUnlock}
                  className="relative group w-full py-4 sm:py-5 font-playfair text-lg sm:text-xl md:text-2xl font-bold text-white transition-all overflow-hidden rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #f2d06b 50%, #d4af37 100%)',
                    boxShadow: '0 8px 30px rgba(212, 175, 55, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2" style={{ color: '#1a1a1a' }}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    OPEN YOUR UNIVERSE
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="diary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 h-full w-full flex flex-col"
          >
            {/* Header */}
            <header className="relative z-10 flex justify-end items-center p-4 sm:p-6 md:p-8">
              <button 
                onClick={() => setIsUnlocked(false)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm sm:text-base font-playfair">Close</span>
              </button>
            </header>

            {/* Diary Timeline Content */}
            <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 timeline-scroll">
              {/* Timeline Container */}
              <div className="relative z-10 max-w-5xl mx-auto py-8" style={{ minHeight: 'calc(100vh - 100px)' }}>
                {/* Vertical Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-400 via-purple-300 to-purple-400" 
                  style={{ opacity: currentUniverse === 1 ? 0.1 : 0.3 }}></div>
                
                {/* Timeline Entries */}
                {currentPages.map((page, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`relative flex items-center mb-12 sm:mb-16 md:mb-20 ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    {/* Content Card */}
                    <div className={`w-full sm:w-5/12 ${index % 2 === 0 ? 'pr-8 sm:pr-12' : 'pl-8 sm:pl-12'}`}>
                      <div
                        className="p-4 sm:p-6 rounded-2xl backdrop-blur-md border"
                        style={{
                          background: currentUniverse === 2
                            ? 'linear-gradient(135deg, rgba(25, 10, 8, 0.95) 0%, rgba(40, 15, 12, 0.9) 100%)'
                            : currentUniverse === 1
                            ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(10, 10, 10, 0.85) 100%)'
                            : 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(20, 20, 50, 0.6) 100%)',
                          borderColor: currentUniverse === 2
                            ? 'rgba(228, 52, 20, 0.4)'
                            : 'rgba(255, 255, 255, 0.2)',
                          boxShadow: currentUniverse === 2
                            ? '0 8px 32px rgba(228, 52, 20, 0.3), 0 4px 16px rgba(255, 107, 74, 0.2), inset 0 1px 0 rgba(228, 52, 20, 0.15)'
                            : '0 8px 32px rgba(0, 0, 0, 0.5)'
                        }}
                      >
                        {/* Date */}
                        <p className="font-playfair text-xs sm:text-sm italic mb-2" style={{
                          color: currentUniverse === 2 ? 'rgba(255, 140, 105, 0.95)' : 'rgb(216, 180, 254)'
                        }}>
                          {page.date}
                        </p>

                        {/* Title */}
                        <h3 className="font-playfair font-bold text-lg sm:text-xl md:text-2xl text-white mb-3">
                          {page.title}
                        </h3>

                        {/* Image */}
                        <div className="rounded-xl overflow-hidden shadow-xl border mb-3 flex items-center justify-center bg-black" style={{
                          borderColor: currentUniverse === 2 ? 'rgba(228, 52, 20, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                          minHeight: '300px',
                          maxHeight: '500px'
                        }}>
                          <img 
                            src={page.imageUrl} 
                            alt={page.title}
                            loading="lazy"
                            className="max-w-full max-h-full w-auto h-auto object-contain"
                          />
                        </div>

                        {/* Message */}
                        <p className="font-playfair text-sm sm:text-base leading-relaxed" style={{
                          color: currentUniverse === 2 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)'
                        }}>
                          {page.message}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-purple-400 border-4 border-black shadow-lg" 
                        style={{ boxShadow: '0 0 20px rgba(192, 132, 252, 0.6)' }}
                      ></div>
                    </div>

                    {/* Empty space for alternating layout */}
                    <div className="hidden sm:block w-5/12"></div>
                  </motion.div>
                ))}

                {/* Journey End Marker & Universe Switcher */}
                <div className="relative flex justify-center mt-8">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-4 border-black shadow-xl" 
                      style={{ boxShadow: '0 0 30px rgba(192, 132, 252, 0.8)' }}
                    ></div>
                    
                    {currentUniverse === 0 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleUniverseTransition}
                        className="group relative px-8 py-4 rounded-2xl font-playfair font-bold text-base sm:text-lg overflow-hidden transition-all"
                        style={{
                          background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)',
                          boxShadow: '0 8px 30px rgba(212, 175, 55, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.3)'
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2" style={{ color: '#1a1a1a' }}>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                          Enter Cosmic Universe
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </motion.button>
                    ) : currentUniverse === 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleUniverseTransition}
                        className="group relative px-8 py-4 rounded-2xl font-playfair font-bold text-base sm:text-lg overflow-hidden transition-all border-2"
                        style={{
                          background: 'rgba(138, 43, 226, 0.2)',
                          borderColor: 'rgba(192, 132, 252, 0.6)',
                          color: 'rgba(255, 255, 255, 0.9)',
                          boxShadow: '0 8px 30px rgba(138, 43, 226, 0.4), inset 0 2px 10px rgba(192, 132, 252, 0.2)'
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          Enter Sunrise Universe
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={() => setShowFinalPage(true)}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: '0 20px 50px rgba(228, 52, 20, 0.6), 0 0 60px rgba(255, 107, 74, 0.4), inset 0 2px 20px rgba(255, 255, 255, 0.2)'
                        }}
                        whileTap={{ 
                          scale: 0.95
                        }}
                        className="group relative px-12 py-5 rounded-2xl font-playfair font-bold text-xl sm:text-2xl overflow-hidden transition-all"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(30, 10, 10, 0.9) 100%)',
                          color: '#FF6B4A',
                          boxShadow: '0 15px 40px rgba(228, 52, 20, 0.5), 0 0 40px rgba(255, 107, 74, 0.3), inset 0 2px 15px rgba(228, 52, 20, 0.2)',
                          textShadow: '0 0 20px rgba(255, 107, 74, 0.8), 0 2px 10px rgba(0, 0, 0, 0.8)',
                          border: '2px solid rgba(255, 107, 74, 0.5)',
                          letterSpacing: '0.08em'
                        }}
                      >
                        <motion.span 
                          className="relative z-10 flex items-center justify-center gap-3"
                          animate={{
                            textShadow: [
                              '0 0 15px rgba(255, 107, 74, 0.6)',
                              '0 0 25px rgba(228, 52, 20, 0.8)',
                              '0 0 15px rgba(255, 107, 74, 0.6)'
                            ]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <motion.svg 
                            className="w-6 h-6" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                            animate={{ 
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                          
                          THE FINAL CLICK
                          
                          <motion.svg 
                            className="w-6 h-6" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                            animate={{ 
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 1
                            }}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        </motion.span>

                        {/* Subtle Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        {/* Gentle Border Glow */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl pointer-events-none"
                          animate={{
                            boxShadow: [
                              'inset 0 0 20px rgba(255, 107, 74, 0.2)',
                              'inset 0 0 30px rgba(228, 52, 20, 0.3)',
                              'inset 0 0 20px rgba(255, 107, 74, 0.2)'
                            ]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>

              {/* Animated Dinosaur - Fixed to viewport, moves with scroll */}
              <motion.div
                className="fixed left-1/2 transform -translate-x-1/2 pointer-events-none"
                style={{
                  top: `${20 + (dinoPosition * 0.55)}%`,
                  zIndex: 30
                }}
                animate={{
                  rotate: [0, -5, 5, 0],
                  y: dinoPosition >= 85 ? [0, -10, 0] : 0
                }}
                transition={{
                  rotate: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  y: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <div 
                  className="flex items-center justify-center text-4xl sm:text-5xl rounded-full p-3 sm:p-4"
                  style={{
                    background: currentUniverse === 2
                      ? 'radial-gradient(circle, rgba(25, 10, 8, 0.9) 0%, rgba(40, 15, 12, 0.8) 50%, rgba(228, 52, 20, 0.2) 100%)'
                      : currentUniverse === 1
                      ? 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(192, 132, 252, 0.15) 50%, transparent 100%)'
                      : 'radial-gradient(circle, rgba(192, 132, 252, 0.3) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 100%)',
                    border: currentUniverse === 2
                      ? '3px solid rgba(255, 107, 74, 0.7)'
                      : currentUniverse === 1
                      ? '3px solid rgba(255, 255, 255, 0.4)'
                      : '3px solid rgba(192, 132, 252, 0.5)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: currentUniverse === 2
                      ? '0 0 30px rgba(255, 107, 74, 0.7), 0 0 60px rgba(228, 52, 20, 0.5), inset 0 0 15px rgba(25, 10, 8, 0.6)'
                      : currentUniverse === 1
                      ? '0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(192, 132, 252, 0.3)'
                      : '0 0 30px rgba(192, 132, 252, 0.7), 0 0 60px rgba(168, 85, 247, 0.4)'
                  }}
                >
                  🦕
                </div>
                
                {/* Message when dinosaur reaches the end */}
                <AnimatePresence>
                  {dinoPosition >= 85 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2"
                    >
                      <div 
                        className="px-3 py-1.5 rounded-full font-playfair text-xs font-semibold whitespace-nowrap"
                        style={{
                          background: currentUniverse === 2
                            ? 'linear-gradient(135deg, rgba(255, 107, 74, 0.4) 0%, rgba(228, 52, 20, 0.35) 100%)'
                            : currentUniverse === 1
                            ? 'linear-gradient(135deg, rgba(192, 132, 252, 0.3) 0%, rgba(138, 43, 226, 0.3) 100%)'
                            : 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(242, 208, 107, 0.3) 100%)',
                          border: currentUniverse === 2
                            ? '2px solid rgba(255, 107, 74, 0.6)'
                            : currentUniverse === 1
                            ? '2px solid rgba(192, 132, 252, 0.5)'
                            : '2px solid rgba(212, 175, 55, 0.5)',
                          color: 'white',
                          backdropFilter: 'blur(10px)',
                          boxShadow: currentUniverse === 2
                            ? '0 4px 20px rgba(255, 107, 74, 0.5)'
                            : currentUniverse === 1
                            ? '0 4px 20px rgba(192, 132, 252, 0.4)'
                            : '0 4px 20px rgba(212, 175, 55, 0.4)'
                        }}
                      >
                        Press the button
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}

export default DiaryApp;
