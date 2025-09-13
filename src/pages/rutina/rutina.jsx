import React from 'react';

const Rutina = () => {
  return (
    <section className="bg-[#1e1c2a] text-white min-h-screen py-16 px-4 md:px-24 flex items-center justify-center">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
          Rutina de Entrenamiento 💪
        </h2>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.01]">
            <img
              src="https://cdn.shopify.com/s/files/1/0918/2062/2161/files/Rutina_de_entrenamiento_Weider_5_dias_frecuencia_2_Avanzados.webp?v=1746431088"
              alt="Rutina de entrenamiento Weider de 5 días"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rutina;