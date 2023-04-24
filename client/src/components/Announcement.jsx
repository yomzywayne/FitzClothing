import React, { useState, useEffect } from 'react';

const Announcement = () => {
  const [isFirstText, setIsFirstText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFirstText((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: '30px',
        backgroundColor: '#ADD8E6',
        color: 'white',
        fontSize: '14px',
        fontWeight: 500,
      }}
    >
      {isFirstText
        ? 'Super Deal! Free Shipping on Orders Over £50'
        : '10% Discount On Your First Order'}
    </div>
  );
};

export default Announcement;
