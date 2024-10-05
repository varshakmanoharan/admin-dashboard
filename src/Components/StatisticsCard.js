import React from 'react'

const StatisticsCard = ({ title, value }) => {
    return (
      <div className="bg-white p-6 shadow-md rounded-md">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-2xl mt-2">{value}</p>
      </div>
    );
  };
  
  export default StatisticsCard;