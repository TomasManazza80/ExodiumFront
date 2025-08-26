import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import video2 from '../videos/video2.mp4';

const videoPaths = [video2];

function Hero() {
  const [currentVideo, setCurrentVideo] = useState('');

  useEffect(() => {
    if (!sessionStorage.getItem('lastVideoIndex')) {
      sessionStorage.setItem('lastVideoIndex', -1);
    }
    
    const lastVideoIndex = parseInt(sessionStorage.getItem('lastVideoIndex'), 10);
    const nextVideoIndex = (lastVideoIndex + 1) % videoPaths.length;
    sessionStorage.setItem('lastVideoIndex', nextVideoIndex);
    setCurrentVideo(videoPaths[nextVideoIndex]);
  }, []);

  return (
    <header className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {currentVideo && (
        <video 
          className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-[-2]" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={currentVideo} type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-[-1]"></div>
      
      <div className="container mx-auto px-4">
        <div className="row">
          <motion.div
            className="relative z-10 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.h2 
              className="text-xl md:text-2xl font-medium uppercase tracking-widest text-purple-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6 }
                }
              }}
            >
              TRANSFORMA TU CUERPO
            </motion.h2>

            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mt-2"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.2 }
                }
              }}
            >
              <span className="text-white">EN</span>{' '}
              <span className="text-purple-600">EXODIUM</span>{' '}
              <span className="text-purple-600">GYM</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg mt-5 max-w-md text-gray-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.4 }
                }
              }}
            >
              En Exodium, no solo entrenas, evolucionas. Somos el mejor gimnasio de Santa Fe Capital, con entrenadores expertos, equipos de última generación y un ambiente que te impulsa a superar tus límites. ¡Tu mejor versión comienza aquí!
            </motion.p>

            <motion.div
              className="mt-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.6, delay: 0.6 }
                }
              }}
            >
              <button className="px-6 py-3 bg-purple-600 text-white border-none rounded-full text-base font-bold cursor-pointer transition-all duration-300 ease-in-out hover:bg-purple-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/40">
                ¡Inscríbete hoy!
              </button>
              <button className="px-6 py-3 bg-transparent text-white border-2 border-white rounded-full text-base font-bold cursor-pointer ml-4 transition-all duration-300 ease-in-out hover:bg-white hover:text-gray-900 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/20">
                Conoce más
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

export default Hero;