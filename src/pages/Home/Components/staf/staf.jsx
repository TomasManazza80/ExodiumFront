import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Datos del equipo
const team = [
  {
    id: 1,
    name: "JUAN PÉREZ",
    title: "ENTRENADOR DE MUSCULACIÓN",
    bio: "Especializado en hipertrofia y fuerza. Más de 10 años de experiencia ayudando a atletas a alcanzar su máximo potencial.",
    image: 'https://i.postimg.cc/tT4QtWhR/image.png',
  },
  {
    id: 2,
    name: "LAUTARO GÓMEZ",
    title: "INSTRUCTORA DE RITMOS",
    bio: "Experta en coreografías de alta energía y clases grupales. Transforma el entrenamiento en una experiencia divertida.",
    image: "https://i.postimg.cc/XXMzhCyC/image.png",
  },
  {
    id: 3,
    name: "CARLOS RAMOS",
    title: "ESPECIALISTA EN CROSS-FUNCIONAL",
    bio: "Certificado en entrenamiento funcional de alta intensidad. Diseña rutinas para mejorar resistencia y condición física general.",
    image: "https://i.postimg.cc/RZhgRdYD/image.png",
  },
  {
    id: 4,
    name: "ANA LÓPEZ",
    title: "NUTRICIONISTA DEPORTIVA",
    bio: "Ayuda a nuestros clientes a optimizar su alimentación para complementar su entrenamiento y lograr resultados sostenibles.",
    image: "https://i.postimg.cc/wTTCChPh/image.png",
  },
];

// Variantes de animación para las tarjetas
const cardVariants = {
  offscreen: { opacity: 0, y: 50, scale: 0.95 },
  onscreen: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8
    }
  },
};

function Staf() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Ajustar número de cards visibles según el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Avanzar automáticamente el carrusel
  useEffect(() => {
    let interval;
    if (isAutoPlay && team.length > visibleCards) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (team.length - visibleCards + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, visibleCards]);

  const goToNext = () => {
    if (currentIndex < team.length - visibleCards) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(team.length - visibleCards);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section ref={containerRef} className="horarios-section bg-[#100D1B] text-white py-16 px-4 font-sans">
      <div className="container max-w-7xl mx-auto">
        <motion.h2
          className="section-title text-center text-4xl md:text-5xl font-extrabold mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          CONOCE A NUESTROS <span className="text-[#845ef7]">PROFESIONALES</span>
        </motion.h2>

        {/* Carrusel */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <div className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
          >
            {team.map((member, index) => (
              <div key={member.id} className="flex-shrink-0 px-4" style={{ width: `${100 / visibleCards}%` }}>
                <motion.div
                  className="actividad-card bg-[#1C182A] rounded-2xl overflow-hidden border border-[#3C384B] h-full shadow-lg"
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(132, 94, 247, 0.2)" }}
                >
                  <div className="h-72 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="actividad-header mb-4">
                      <h3 className="actividad-title text-2xl font-bold text-[#845ef7]">
                        {member.name}
                      </h3>
                    </div>
                    <p className="text-[#A29EAB] font-semibold text-sm uppercase tracking-wider mb-4">{member.title}</p>
                    <p className="actividad-desc text-[#D8D4E2] leading-relaxed text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Botones de navegación - solo se muestran si hay más cards de las visibles */}
          {team.length > visibleCards && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#845ef7]/80 hover:bg-[#845ef7] text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#845ef7]/80 hover:bg-[#845ef7] text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Indicadores - solo se muestran si hay más cards de las visibles */}
        {team.length > visibleCards && (
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from({ length: team.length - visibleCards + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#845ef7] scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Staf;