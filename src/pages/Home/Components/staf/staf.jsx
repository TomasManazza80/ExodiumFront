import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Datos del equipo - se mantienen inalterados
const team = [
  {
    id: 1,
    name: "JUAN PÉREZ",
    title: "ENTRENADOR DE MUSCULACIÓN",
    bio: "Especializado en hipertrofia y fuerza. Más de 10 años de experiencia ayudando a atletas a alcanzar su máximo potencial.",
    image: 'https://i.postimg.cc/VkzLrw3S/Fit-durch-Sportnahrung-RSG-Group-ESN-helfen-dir-deine-Fitnessziele-zu-erreichen.jpg',
  },
  {
    id: 2,
    name: "LAUTARO GÓMEZ",
    title: "INSTRUCTORA DE RITMOS",
    bio: "Experta en coreografías de alta energía y clases grupales. Transforma el entrenamiento en una experiencia divertida.",
    image: "https://i.postimg.cc/76ZxBNxq/Personal-Trainer-Photo.jpg",
  },
  {
    id: 3,
    name: "CARLOS RAMOS",
    title: "ESPECIALISTA EN CROSS-FUNCIONAL",
    bio: "Certificado en entrenamiento funcional de alta intensidad. Diseña rutinas para mejorar resistencia y condición física general.",
    image: "https://i.postimg.cc/nL0xQQqg/Fit-man-smiling-in-gym-setting-by-Beautiful-things-on-creativemarket.jpg",
  },
  {
    id: 4,
    name: "ANA LÓPEZ",
    title: "NUTRICIONISTA DEPORTIVA",
    bio: "Ayuda a nuestros clientes a optimizar su alimentación para complementar su entrenamiento y lograr resultados sostenibles.",
    image: "https://i.postimg.cc/dtjJKXLJ/download-11.jpg",
  },
];

// Variantes de animación para las tarjetas - se mantienen inalteradas
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

const Staf = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (itemsPerView > 1 && !isHovering) {
      // Ajuste para que el autoplay no intente ir más allá del último slide posible
      const maxIndex = Math.max(0, team.length - itemsPerView);
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (maxIndex + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [itemsPerView, isHovering, team.length]);

  const maxIndex = Math.max(0, team.length - itemsPerView);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (maxIndex + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  // Calcular el valor de `gap` para usarlo en el cálculo del ancho de las tarjetas
  // 'gap-6' es 24px, 'gap-8' es 32px. Usamos el valor md:gap-8 (32px) para escritorio por simplicidad
  const gapSize = itemsPerView > 1 ? 32 : 0; // en píxeles. Ajusta según tus necesidades de Tailwind

  return (
    <section ref={containerRef} className="horarios-section bg-[#100D1B] text-white py-12 md:py-16 px-4 font-sans">
      <div className="container max-w-7xl mx-auto">
        <motion.h2
          className="section-title text-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 md:mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          CONOCE A NUESTROS <span className="text-[#845ef7]">PROFESIONALES</span>
        </motion.h2>

        <div
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {itemsPerView > 1 ? (
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out gap-6 md:gap-8"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              >
                {team.map((member, index) => (
                  <motion.div
                    key={member.id}
                    className="flex-shrink-0"
                    // Ajustamos el ancho para que tome en cuenta el gap
                    style={{ width: `calc((100% / ${itemsPerView}) - ${gapSize * (itemsPerView - 1) / itemsPerView}px)` }}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={cardVariants}
                    transition={{ delay: index * 0.15 }}
                  >
                    <Card member={member} />
                  </motion.div>
                ))}
              </div>
              <CarouselControls goToPrev={goToPrev} goToNext={goToNext} />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {team.map((member) => (
                <motion.div
                  key={member.id}
                  className="w-full"
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                >
                  <Card member={member} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Componente para la tarjeta de miembro del equipo - MODIFICADO para mejorar visibilidad
const Card = ({ member }) => (
  <div
    className="actividad-card bg-[#1C182A] rounded-xl overflow-hidden border border-[#3C384B] h-full shadow-lg transition-all duration-300 hover:shadow-[0_15px_40px_rgba(132,94,247,0.2)] hover:border-[#845ef7] flex flex-col"
  >
    <div className="h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden relative">
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={member.image}
          alt={`Retrato de ${member.name}, ${member.title}`}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          style={{ objectPosition: "center 30%" }} // Ajusta para enfocar en los rostros
        />
      </div>
      {/* Superposición para mejorar contraste y legibilidad */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1C182A] to-transparent"></div>
    </div>
    <div className="p-4 sm:p-5 md:p-6 flex flex-col items-center text-center flex-grow justify-center">
      <h3 className="actividad-title text-xl sm:text-2xl font-bold text-[#845ef7] mb-2">
        {member.name}
      </h3>
      <p className="text-[#A29EAB] font-semibold text-sm uppercase tracking-wider mb-3">{member.title}</p>
      <p className="actividad-desc text-[#D8D4E2] leading-relaxed text-sm sm:text-base">{member.bio}</p>
    </div>
  </div>
);

// Componente para los controles de navegación
const CarouselControls = ({ goToPrev, goToNext }) => (
  <>
    <button
      onClick={goToPrev}
      className="absolute left-0 sm:left-2 top-1/2 transform -translate-y-1/2 bg-[#845ef7]/80 hover:bg-[#845ef7] text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10"
      aria-label="Anterior miembro del equipo"
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      onClick={goToNext}
      className="absolute right-0 sm:right-2 top-1/2 transform -translate-y-1/2 bg-[#845ef7]/80 hover:bg-[#845ef7] text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10"
      aria-label="Siguiente miembro del equipo"
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </>
);

export default Staf;