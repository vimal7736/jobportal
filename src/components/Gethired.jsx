import React from 'react';

const GetHiredCard = () => {
  return (
    <section className="flex justify-center items-center ">
      <div className="bg-gradient-to-br from-cyan-900 via-gray-900 to-white;rounded-lg p-6 shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl  sm:w-full   text-center text-white">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Get Hired</h2>
          <p className="text-sm mt-2">Kickstart Your Career</p>
        </div>
        <div className="mb-6">
          <p>Discover opportunities and connect with top companies to land your dream job.</p>
        </div>
        <div>
          <button className="bg-white text-cyan-800 py-2 px-4 rounded-full font-bold transition transform hover:bg-gradient-to-br from-cyan-900 via-gray-900 to-white; hover:text-white hover:scale-105">
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetHiredCard;
