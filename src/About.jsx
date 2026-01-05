import React from "react";
import "./styles/About.css";

const About = () => {
  return (
    <main className="about-root">
      <section className="about-hero">
        <div className="about-inner">
          <h1 className="about-title">About Our Library</h1>
          <p className="about-lead">We bring readers and books together — a simple, modern system to manage collections and share discoveries.</p>
        </div>
      </section>

      <section className="about-content container">
        <div className="split">
          <div className="text">
            <h2>Our Mission</h2>
            <p>To make book management delightful for librarians, admins, and readers. We focus on clean UX, responsive design, and features that make it fast to organize and find great books.</p>

            <h2>What We Offer</h2>
            <ul>
              <li>Intuitive admin tools to add and categorize books</li>
              <li>Beautiful listing and detail views for readers</li>
              <li>Responsive layout that works on any device</li>
            </ul>
          </div>

        </div>
      </section>
    </main>
  );
};

export default About;
