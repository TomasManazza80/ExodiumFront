import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PlanCard from './PlanCard';

function PlansSection() {
  const [plansData, setPlansData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://exodiumbackend.onrender.com/api/activity-prices/prices');
        
        if (!response.ok) {
          throw new Error('Error al obtener los precios');
        }
        
        const priceData = await response.json();
        
        // Transformar los datos de la API al formato requerido por los componentes
        const transformedData = [
          {
            id: 1,
            title: 'TRANSFERENCIA BANCARIA',
            price: `$${parseFloat(priceData.unaActividad).toLocaleString('es-AR')}`,
            description: 'Acceso a una actividad específica de tu elección.',
            features: [
              'Cuota única',
              'Pase libre',
              'Pago con transferencia',
              'Acceso a todas las actividades'
            ],
            buttonText: '¡Paga en efectivo!',
            isFeatured: false,
          },
          {
            id: 2,
            title: 'EFECTIVO',
            price: `$${parseFloat(priceData.paseLibre).toLocaleString('es-AR')}`,
            description: 'Acceso ilimitado a todas las instalaciones y clases grupales.',
            features: [
              'Cuota única',
              'Pase libre',
              'Pago con EFECTIVO',
              'Acceso a todas las actividades'
            ],
            buttonText: '¡Paga con transferencia!',
            isFeatured: true,
          },
          {
            id: 3,
            title: 'PROMO TRISMESTRE',
            price: `$${parseFloat(priceData.estudiante3dias).toLocaleString('es-AR')}`,
            description: 'Plan especial para estudiantes con acceso por 3 días.',
            features: [
              'Pase por 3 MESES',
              'Acceso a todas las actividades',
              'Requiere acreditación'
            ],
            buttonText: '¡Obtener plan estudiante!',
            isFeatured: false,
          }
        ];
        
        setPlansData(transformedData);
        setError(null);
      } catch (err) {
        setError('Error al cargar los precios. Por favor, intenta nuevamente.');
        console.error('Error fetching prices:', err);
        
        // Datos de respaldo en caso de error
        setPlansData([
          {
            id: 1,
            title: 'UNA ACTIVIDAD',
            price: '$25.000',
            description: 'Acceso a una actividad específica de tu elección.',
            features: [
              'Cuota única',
              'Una actividad específica',
              'Pago en efectivo',
              'Acceso limitado a una actividad'
            ],
            buttonText: '¡Paga en efectivo!',
            isFeatured: false,
          },
          {
            id: 2,
            title: 'PASE LIBRE MENSUAL',
            price: '$35.000',
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
            title: 'PASE ESTUDIANTE 3 DÍAS',
            price: '$30.000',
            description: 'Plan especial para estudiantes con acceso por 3 días.',
            features: [
              'Pase por 3 días',
              'Descuento para estudiantes',
              'Acceso a todas las actividades',
              'Requiere acreditación'
            ],
            buttonText: '¡Obtener plan estudiante!',
            isFeatured: false,
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-5 bg-gradient-to-br from-[#120e18] to-[#1d162a] text-center">
        <div className="container mx-auto">
          <div className="text-white">Cargando precios...</div>
        </div>
      </section>
    );
  }

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

        {error && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-500 rounded-md text-red-200">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row justify-center gap-8">
          {plansData.map((item) => (
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