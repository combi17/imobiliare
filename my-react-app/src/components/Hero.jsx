import React from 'react';
import office from '../assets/birou.jpg';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-gray-700 to-blue-300 w-full py-16 overflow-hidden">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center px-6 md:px-10 relative z-20">
        <div className="w-full md:w-2/3 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Proprietăți premium. Pentru oameni, idei și afaceri de viitor.
          </h1>
          <p className="mt-6 text-lg text-gray-200">
            Caută, compară și găsește spațiul perfect — pentru viață sau business.
          </p>
          <button className="mt-8 px-6 py-3 bg-black text-white text-sm uppercase font-semibold rounded hover:bg-gray-800 transition">
            Descoperă proprietățile noastre
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
