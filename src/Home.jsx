import React from "react";
import "./styles/Home.css";

const Home = () => {
  return (
    <main className="home-root">
      <section className="home-hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Next Favorite Book</h1>
          <p className="hero-sub">Browse, manage, and enjoy an ever-growing library — beautifully organized.</p>
        </div>
      </section>

      <section className="home-features">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <h3>Curated Collections</h3>
              <p>Hand-picked sets for every mood and topic.</p>
            </div>
            <div className="feature">
              <h3>Easy Management</h3>
              <p>Add, edit, and track books with a simple admin UI.</p>
            </div>
            <div className="feature">
              <h3>Responsive Design</h3>
              <p>Looks great on phones, tablets, and desktops.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
