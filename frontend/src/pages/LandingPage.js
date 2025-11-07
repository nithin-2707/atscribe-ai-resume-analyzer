import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { setUserRole } = useApp();

  const handleRoleSelection = (role) => {
    setUserRole(role);
    if (role === 'recruiter') {
      navigate('/recruiter-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <nav className="hero-nav">
          <div className="logo-container">
            <img src="/logo.png" alt="ATSCRIBE" className="logo" />
          </div>
          <motion.button
            className="get-started-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('role-selection').scrollIntoView({ behavior: 'smooth' })}
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
                <img src="/images/hero-globe.png" alt="AI Platform" className="globe-image" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Role Selection Section */}
      <motion.div
        id="role-selection"
        className="landing-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="welcome-section" variants={itemVariants}>
          <h2 className="welcome-title">How Would You Like to Continue?</h2>
        </motion.div>

        <motion.div className="role-cards" variants={itemVariants}>
          <motion.div
            className="role-card student-card"
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleRoleSelection('student')}
          >
            <h3 className="card-title">I am a Student</h3>
            <div className="card-image">
              <img 
                src="/images/student-image.png" 
                alt="Student"
              />
            </div>
            <motion.button
              className="card-button student-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          </motion.div>

          <motion.div
            className="role-card recruiter-card"
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleRoleSelection('recruiter')}
          >
            <h3 className="card-title">I am a Recruiter</h3>
            <div className="card-image">
              <img 
                src="/images/recruiter-image.png" 
                alt="Recruiter"
              />
            </div>
            <motion.button
              className="card-button recruiter-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
