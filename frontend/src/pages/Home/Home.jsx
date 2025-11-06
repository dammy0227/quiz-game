import React, { useState } from "react";
import {
  FaShieldAlt,
  FaGamepad,
  FaTrophy,
  FaQuestionCircle,
  FaLock,
  FaUserShield,
  FaGraduationCap,
  FaCode,
  FaChartLine,
  FaRocket,
  FaUsers,
  FaBook,
  FaFileContract,
  FaEnvelope,
  FaHeart,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaPlay,
  FaDiscord,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { ShieldCheck, Users as LucideUsers, Zap } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ add this import
import "./Home.css";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      {/* ===== HEADER ===== */}
      <header className="header">
        <nav className="nav">
          <div className="nav-left">
            <div className="logo">
              <ShieldCheck />
              CyberSec Game
            </div>

            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>

          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            <li>
              <a href="#about" onClick={() => setMenuOpen(false)}>Home</a>
            </li>
            <li>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero-content">
          <ShieldCheck
            style={{
              width: "5.5rem",
              height: "5.5rem",
              color: "white",
              padding: "20px",
              marginBottom: "1.5rem",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            }}
          />
          <h1>
            Master <span>Cybersecurity</span> Through Gaming
          </h1>
          <p>
            Learn essential cybersecurity skills through interactive games,
            challenges, and real-world scenarios. Protect yourself and your
            organization from cyber threats.
          </p>

          <div className="cta-buttons">
            {/* ✅ Updated Links */}
            <Link to="/Login" className="btn btn-primary">
              <FaPlay style={{ marginRight: "8px" }} />
              Start Learning →
            </Link>

            <Link to="/Login" className="btn btn-secondary">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ACTIVE USERS ===== */}
      <section className="active-user">
        <div className="active-user-container">
          <div className="active-card">
            <div className="active-icon blue">
              <LucideUsers />
            </div>
            <h2>10,000+</h2>
            <p>Active Learners</p>
          </div>

          <div className="active-card">
            <div className="active-icon indigo">
              <ShieldCheck />
            </div>
            <h2>50+</h2>
            <p>Security Levels</p>
          </div>

          <div className="active-card">
            <div className="active-icon cyan">
              <Zap />
            </div>
            <h2>200+</h2>
            <p>Skills Mastered</p>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="features" id="about">
        <div className="features-content">
          <h2>Why Choose CyberSec Game?</h2>
          <p>
            Our platform combines gamification with practical cybersecurity
            education <br /> to make learning engaging and effective.
          </p>

          <div className="feature-grid">
            <div className="feature-card">
              <FaGraduationCap
                className="feature-icon"
                style={{
                  width: "55px",
                  height: "55px",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                }}
              />
              <h3>Learn Security</h3>
              <p>
                Master cybersecurity concepts through interactive lessons and
                real-world scenarios.
              </p>
            </div>

            <div className="feature-card">
              <FaCode
                className="feature-icon"
                style={{
                  width: "55px",
                  height: "55px",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                }}
              />
              <h3>Practice Skills</h3>
              <p>
                Apply your knowledge with hands-on challenges and simulated
                cyber attacks.
              </p>
            </div>

            <div className="feature-card">
              <FaChartLine
                className="feature-icon"
                style={{
                  width: "55px",
                  height: "55px",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                }}
              />
              <h3>Track Progress</h3>
              <p>
                Monitor your advancement through levels and earn achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Cybersecurity Journey?</h2>
          <p>
            Join thousands of learners who are already mastering cybersecurity
            skills through our interactive platform.
          </p>

          {/* ✅ Updated Link */}
          <Link
            to="/Login"
            className="btn btn-primary"
            style={{ background: "white", color: "#3b82f6" }}
          >
            <FaRocket style={{ marginRight: "8px" }} />
            Get Started Free
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>
              <FaShieldAlt style={{ marginRight: "10px" }} />
              CyberSec Game
            </h3>
            <p>
              Learn cybersecurity through interactive games and challenges.
              Master the skills needed to protect yourself and your organization
              from cyber threats.
            </p>
            <div className="social-icons">
              <a href="#twitter" className="social-icon">
                <FaTwitter />
              </a>
              <a href="#linkedin" className="social-icon">
                <FaLinkedin />
              </a>
              <a href="#github" className="social-icon">
                <FaGithub />
              </a>
              <a href="#discord" className="social-icon">
                <FaDiscord />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#levels">Levels</a></li>
              <li><a href="#leaderboard">Leaderboard</a></li>
              <li><a href="#help">Help</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li><a href="#documentation">Documentation</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2025 CyberSec Game. All rights reserved.
            <br />
            <span>
              Made with <FaHeart className="heart" /> for cybersecurity education
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
