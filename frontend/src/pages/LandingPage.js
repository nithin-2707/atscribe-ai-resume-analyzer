import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  // Preload critical images
  useEffect(() => {
    const imagesToPreload = [
      '/images/Group 5.png',
      '/images/hero-globe.png',
      '/logo.png'
    ];

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          // Background loaded (most critical)
          setBackgroundLoaded(true);
        }
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === 1) {
          setBackgroundLoaded(true);
        }
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });

    // Fallback timeout
    const timeout = setTimeout(() => {
      setBackgroundLoaded(true);
      setImagesLoaded(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="landing-page">
      {/* Loading overlay */}
      {!backgroundLoaded && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading ATScribe...</p>
        </div>
      )}

      {/* Hero Section */}
      <motion.section 
        className={`hero-section ${backgroundLoaded ? 'loaded' : 'loading'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: backgroundLoaded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="hero-nav">
          <div className="logo-container">
            <img src="/logo.png" alt="ATSCRIBE" className="logo" />
          </div>
          <motion.button
            className="get-started-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
          >
            Get Started
          </motion.button>
        </nav>

        <div className="hero-content">
          <div className="hero-center-content">
            <motion.div 
              className="hero-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="hero-badge">
                AI-Driven Talent Screening & Career Growth Platform
              </div>
              <h1 className="hero-title">
                Transforming How Talent<br />
                Is Discovered & Hired
              </h1>
              <p className="hero-subtitle">
                Let AI analyze, filter, and score resumes based on job requirements so you<br />
                only spend time interviewing the most promising talent
              </p>
            </motion.div>

            <motion.div 
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="globe-container">
                <img 
                  src="/images/hero-globe.png" 
                  alt="AI Platform" 
                  className={`globe-image ${imagesLoaded ? 'loaded' : ''}`}
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
