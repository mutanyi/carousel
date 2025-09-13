import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  // Image paths in public folder - using your specific image names
  const images = [
    process.env.PUBLIC_URL + '/images/air-filter.jpeg',
    process.env.PUBLIC_URL + '/images/cutlery-set.jpeg',
    process.env.PUBLIC_URL + '/images/water-dispenser.jpeg',
    process.env.PUBLIC_URL + '/images/cooking-set.jpeg',
    process.env.PUBLIC_URL + '/images/juice-extractor.jpeg'
  ];

  const productNames = [
    "Premium Air Filter",
    "Luxury Cutlery Set",
    "Modern Water Dispenser",
    "Professional Cooking Set",
    "Advanced Juice Extractor"
  ];

  // Function to get a random direction (including diagonals)
  const getRandomDirection = useCallback(() => {
    const directions = [
      'right', 'left', 'top', 'bottom',
      'top-right', 'top-left', 'bottom-right', 'bottom-left'
    ];
    const availableDirections = directions.filter(dir => dir !== direction);
    return availableDirections[Math.floor(Math.random() * availableDirections.length)];
  }, [direction]);

  // Auto-advance the slider
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      const newDirection = getRandomDirection();
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [getRandomDirection, images.length, isAutoPlay]);

  const goToSlide = (index) => {
    const newDirection = getRandomDirection();
    setDirection(newDirection);
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setIsAutoPlay(false);
    const newDirection = getRandomDirection();
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setIsAutoPlay(false);
    const newDirection = getRandomDirection();
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Kitchen Essentials Showcase</h1>
        <p>Discover our premium kitchen products with dynamic animations</p>
      </div>
      
      <div className="slider-container">
        <div className="product-name">
          {productNames[currentIndex]}
        </div>
        
        <div className="slider">
          <div className={`slide ${direction}`}>
            <img 
              src={images[currentIndex]} 
              alt={productNames[currentIndex]}
              className="slider-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x500/cccccc/969696?text=Image+Not+Found';
              }}
            />
          </div>
        </div>
        
        <div className="slider-controls">
          <button className="control-btn" onClick={goToPrev}>
            Previous
          </button>
          <button className="control-btn" onClick={toggleAutoPlay}>
            {isAutoPlay ? 'Pause' : 'Play'}
          </button>
          <button className="control-btn" onClick={goToNext}>
            Next
          </button>
        </div>
        
        <div className="slider-dots">
          {images.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
      
      <div className="footer">
        <p>Premium Kitchen Products • All Rights Reserved</p>
      </div>
    </div>
  );
}

export default App;
