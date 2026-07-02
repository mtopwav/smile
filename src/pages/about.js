import { Link } from 'react-router-dom';
import slide47 from '../assets/images/BEAN LIGHT_47.JPG';
import slide55 from '../assets/images/BEAN LIGHT_55.JPG';
import logoImg from '../assets/images/logo.png';
import madamImg from '../assets/images/madam.jpg';
import urioImg from '../assets/images/urio.jpg';
import robisonImg from '../assets/images/robison.jpg';
import sundayImg from '../assets/images/sunday.jpg';
import SiteSeo from '../components/SiteSeo';
import AnimateOnScroll from '../components/AnimateOnScroll';
import SiteHeader from '../components/SiteHeader';
import './about.css';
import './home.css';

const Logo = ({ size = 'md' }) => (
  <img
    src={logoImg}
    alt="Let me Smile"
    className={`home-logo__img home-logo__img--${size}`}
  />
);

const pillars = [
  {
    title: 'Inclusive education',
    description:
      'We open doors for children and youth excluded from traditional schools—adapting teaching to every ability and circumstance.',
  },
  {
    title: 'Community outreach',
    description:
      'Our teams work alongside families, educators, and local leaders in Arusha and surrounding communities.',
  },
  {
    title: 'Life skills & dignity',
    description:
      'Beyond literacy and numeracy, we nurture confidence, practical skills, and a safe space to learn and belong.',
  },
];

const commitments = [
  'Registered non-profit with transparent, accountable operations',
  'Community-led planning in every program we run',
  'Safe, child-centered practices across all initiatives',
  'Focus on children affected by poverty and disability',
];

const teamMembers = [
  {
    name: 'Selina P. Kaaya',
    role: 'Founder',
    image: madamImg,
    featured: true,
    imageWidth: 800,
    imageHeight: 1000,
  },
  {
    name: 'Moses E. Urio',
    role: 'Co-Founder',
    image: urioImg,
  },
  {
    name: 'Robinson Urio',
    role: 'Project Manager',
    image: robisonImg,
  },
  {
    name: 'Sunday Eliwangu',
    role: 'Secretary General',
    image: sundayImg,
  },
];

function About() {
  return (
    <div className="about">
      <SiteSeo
        title="About Us"
        description="About Let Me Smile — an NGO in Arusha, Tanzania providing inclusive education, Beamlight School, and community outreach."
        path="/about"
      />
      <SiteHeader />

      <main id="top">
      <section className="about-hero">
        <img src={slide47} alt="" className="about-hero__img" />
        <div className="about-hero__overlay" aria-hidden="true" />
        <div className="about-hero__content">
          <span className="about-hero__item about-label">About us</span>
          <h1 className="about-hero__item">Let Me Smile</h1>
          <p className="about-hero__item about-hero__lead">
            Inclusive education and community outreach for every child in Arusha,
            Tanzania—especially those left behind by the traditional school system.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__inner about-story">
          <AnimateOnScroll variant="left" className="about-story__media">
            <img src={slide55} alt="Children learning in a Let Me Smile classroom" />
          </AnimateOnScroll>
          <AnimateOnScroll variant="right" delay={120} className="about-story__content">
            <span className="about-label">Who we are</span>
            <h2>A movement built on empathy</h2>
            <p>
              Let Me Smile is a non-governmental organization (NGO) operating in Arusha,
              Tanzania. We provide educational opportunities for children and young people
              who have been marginalized or excluded from the traditional school system.
            </p>
            <p>
              Many of the young people we serve fall outside standard schooling because of
              systemic barriers—extreme poverty, physical disabilities, or intellectual
              challenges. Our programs equip them with basic education, life skills, and a
              supportive environment where they can grow with dignity.
            </p>
            <p>
              Through school outreach and community partnerships, we meet families where
              they are and build programs that reflect real local needs—not one-size-fits-all
              solutions from afar.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="about-section about-section--warm">
        <div className="about-section__inner">
          <AnimateOnScroll variant="up" className="about-section__header">
            <span className="about-label">What drives us</span>
            <h2>Our mission & vision</h2>
            <p>
              Every decision we make starts with the child—and the belief that a single
              smile can signal a life changed.
            </p>
          </AnimateOnScroll>
          <div className="about-mission-grid">
            <AnimateOnScroll variant="scale" delay={0}>
              <article className="about-mission-card">
                <h3>Mission</h3>
                <p>
                  To provide quality education to children by improving learning 
                  condition and promotion of economic empowerment in the community.
                </p>
              </article>
            </AnimateOnScroll>
            <AnimateOnScroll variant="scale" delay={120}>
              <article className="about-mission-card">
                <h3>Vision</h3>
                <p>
                  An Arusha and a World where every child, regardless of ability or background,
                  has access to learning, community, and the chance to thrive.
                </p>
              </article>
            </AnimateOnScroll>
            <AnimateOnScroll variant="scale" delay={240}>
              <article className="about-mission-card about-mission-card--accent">
                <Logo size="lg" />
                <p>
                  Grounded in Arusha, Tanzania · Serving communities with care and
                  accountability
                </p>
              </article>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="about-section about-section--white">
        <div className="about-section__inner">
          <AnimateOnScroll variant="up" className="about-section__header">
            <span className="about-label">Our leadership</span>
            <h2>Meet our team</h2>
            <p>
              The people behind Beamlight School and Let Me Smile—dedicated to inclusive
              education and lasting impact in Arusha.
            </p>
          </AnimateOnScroll>
          <div className="about-team">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className={`about-team-card${member.featured ? ' about-team-card--featured' : ''}`}
              >
                <div className="about-team-card__photo">
                  <img
                    src={member.image}
                    alt={member.name}
                    width={member.imageWidth}
                    height={member.imageHeight}
                    decoding="async"
                    fetchPriority={member.featured ? 'high' : 'auto'}
                  />
                </div>
                <div className="about-team-card__body">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section--white">
        <div className="about-section__inner">
          <AnimateOnScroll variant="up" className="about-section__header">
            <span className="about-label">How we work</span>
            <h2>What we focus on</h2>
          </AnimateOnScroll>
          <div className="about-pillars">
            {pillars.map((item, index) => (
              <AnimateOnScroll key={item.title} variant="up" delay={index * 120}>
                <article className="about-pillar">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__inner about-commit">
          <AnimateOnScroll variant="right" className="about-commit__content">
            <span className="about-label">Our promise</span>
            <h2>How we show up</h2>
            <ul className="about-commit__list">
              {commitments.map((item, index) => (
                <li
                  key={item}
                  className="about-commit__item reveal-stagger-item"
                  style={{ '--item-delay': `${index * 80}ms` }}
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12l5 5L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
          <AnimateOnScroll variant="left" delay={150} className="about-commit__logo">
            <div className="about-commit__logo-wrap">
              <Logo size="xl" />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="about-section about-section--cta">
        <div className="about-section__inner">
          <AnimateOnScroll variant="scale">
            <div className="about-cta">
              <h2>Help us reach more children</h2>
              <p>
                Partner with Let Me Smile through giving, volunteering, or collaboration—and
                be part of the next story of hope from Arusha.
              </p>
              <div className="about-cta__actions">
                <Link to="/#get-involved" className="home-btn home-btn--primary">
                  Support our mission
                </Link>
                <Link to="/" className="home-btn home-btn--outline about-cta__outline">
                  Back to home
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      </main>

      <footer className="home-footer home-footer--animate">
        <div className="home-footer__inner">
          <div className="home-footer__grid">
            <div className="home-footer__brand">
              <Link to="/" className="home-logo">
                <Logo />
                <span className="home-logo__text">
                  Let me <span>Smile</span>
                </span>
              </Link>
              <p>
                Restoring dignity, health, and joy for children and families through
                community-driven humanitarian action.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About us</Link>
                </li>
                <li>
                  <Link to="/programs">Programs</Link>
                </li>
                <li>
                  <Link to="/#stories">Impact stories</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4>Get involved</h4>
              <ul>
                <li>
                  <Link to="/#get-involved">Donate</Link>
                </li>
                <li>
                  <Link to="/#get-involved">Volunteer</Link>
                </li>
                <li>
                  <Link to="/#get-involved">Partner with us</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="mailto:letmesmilebms@gmail.com">letmesmilebms@gmail.com</a>
                </li>
                <li>
                  <a href="tel:+255755033573">+255 755 033 573</a>
                </li>
                <li>
                  <a href="tel:+255755953904">+255 755 953 904</a>
                </li>
                <li>
                  <a href="tel:+255628703904">+255 628 703 904</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="home-footer__bottom">
            <span>&copy; {new Date().getFullYear()} Let me Smile. All rights reserved.</span>
            <span>Registered NGO · Arusha, Tanzania</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;
