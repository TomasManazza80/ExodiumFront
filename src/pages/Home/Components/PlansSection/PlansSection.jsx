import React from 'react';
import { motion } from 'framer-motion';
import PlanCard from './PlanCard';

// Datos de los planes con la información proporcionada
const PlansData = [
  {
    id: 1,
    title: 'PASE LIBRE MENSUAL',
    price: '$29.000',
    description: 'Acceso ilimitado a todas las instalaciones y clases grupales.',
    features: [
      'Cuota única',
      'Pase libre',
      'Pago en efectivo',
      'Acceso a todas las actividades'
    ],
    buttonText: '¡Paga en efectivo!',
    isFeatured: false,
  },
  {
    id: 2,
    title: 'PASE LIBRE MENSUAL',
    price: '$32.000',
    description: 'Acceso ilimitado a todas las instalaciones y clases grupales.',
    features: [
      'Cuota única',
      'Pase libre',
      'Pago con transferencia',
      'Acceso a todas las actividades'
    ],
    buttonText: '¡Paga con transferencia!',
    isFeatured: true,
  },
  {
    id: 3,
    title: 'PASE TRIMESTRAL',
    price: '$81.600',
    description: 'Disfruta de un descuento al contratar el plan por 3 meses.',
    features: [
      'Pase libre por 3 meses',
      'Descuento aplicado',
      'Acceso a todas las actividades',
      'Asesoramiento continuo'
    ],
    buttonText: '¡Consigue el descuento!',
    isFeatured: false,
  },
];

function PlansSection() {
  return (
    <motion.section
      className="py-20 px-5 bg-gradient-to-br from-[#120e18] to-[#1d162a] font-['Poppins'] text-[#e0e0e0] text-center"
      id='plans'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.25, when: "beforeChildren" }
        }
      }}
    >
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 uppercase tracking-wide"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }
          }}
        >
          Nuestros <span className="text-[#8b00ff] drop-shadow-[0_0_10px_rgba(139,0,255,0.5)]">Planes</span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row justify-center gap-8">
          {PlansData.map((item) => (
            <PlanCard
              key={item.id}
              {...item}
            />
          ))}
        </div>
        
        <p className="mt-10 text-xl font-semibold">
          <span className="text-orange-500 drop-shadow-[0_0_8px_orange]">🔥</span> ¡La primer clase es gratis! <span className="text-orange-500 drop-shadow-[0_0_8px_orange]">🔥</span>
        </p>
      </div>
    </motion.section>
  );
}

export default PlansSection;