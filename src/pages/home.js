import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import slide101 from '../assets/images/BEAN LIGHT_101.JPG';
import slide47 from '../assets/images/BEAN LIGHT_47.JPG';
import slide55 from '../assets/images/BEAN LIGHT_55.JPG';
import slide95 from '../assets/images/BEAN LIGHT_95.JPG';
import logoImg from '../assets/images/logo.png';
import AnimateOnScroll from '../components/AnimateOnScroll';
import SiteHeader from '../components/SiteHeader';
import './home.css';

const HERO_SLIDES = [slide101, slide47, slide55, slide95];
const SLIDE_INTERVAL_MS = 5000;

const Logo = ({ className = '', size = 'md' }) => (
  <img
    src={logoImg}
    alt="Let me Smile"
    className={`home-logo__img home-logo__img--${size} ${className}`.trim()}
  />
);

const programs = [
  {
    title: 'Smile Outreach',
    description:
      'Mobile clinics and community visits that bring essential care and companionship to children and families who need it most.',
    icon: (
      <svg className="home-program__icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M8 24h32M24 8v32"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3" />
      </svg>
    ),
  },
  {
    title: 'Education & Hope',
    description:
      'Scholarships, school supplies, and mentorship programs that help young people build confident, brighter futures.',
    icon: (
      <svg className="home-program__icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M6 14l18-8 18 8-18 8-18-8z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M12 20v10l12 6 12-6V20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Family Support',
    description:
      'Counseling, nutrition assistance, and peer networks that strengthen caregivers and keep households resilient.',
    icon: (
      <svg className="home-program__icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="16" cy="14" r="5" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="32" cy="14" r="5" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M8 38c0-6 5-10 8-10s8 4 8 10M24 38c0-6 5-10 8-10s8 4 8 10"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const stats = [
  { end: 12, suffix: 'K+', label: 'Lives touched' },
  { end: 48, suffix: '', label: 'Communities served' },
  { end: 320, suffix: '+', label: 'Active volunteers' },
  { end: 15, suffix: '', label: 'Years of impact' },
];

const STAT_COUNT_DURATION_MS = 2000;
const STAT_STAGGER_MS = 150;

function formatStatValue(value, suffix) {
  if (suffix === 'K+') return `${value}K+`;
  return `${value}${suffix}`;
}

function CountUpStat({ end, suffix, label, delay }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const [popped, setPopped] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setValue(end);
      setPopped(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          setPopped(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end]);

  useEffect(() => {
    if (!started) return undefined;

    let rafId = 0;
    let startTime = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / STAT_COUNT_DURATION_MS, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * end));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const timeoutId = setTimeout(() => {
      rafId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [started, end, delay]);

  return (
    <div ref={ref} className={`home-stat${popped ? ' home-stat--visible' : ''}`}>
      <span className="home-stat__value">{formatStatValue(value, suffix)}</span>
      <span className="home-stat__label">{label}</span>
    </div>
  );
}

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      <SiteHeader />

      <main id="top">
        <section className="home-hero" aria-labelledby="hero-heading">
          <div className="home-hero__bg" aria-hidden="true">
            {HERO_SLIDES.map((src, index) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`home-hero__slide${index === activeSlide ? ' home-hero__slide--active' : ''}`}
              />
            ))}
          </div>
          <div className="home-hero__inner">
            <div className="home-hero__content">
              <h1 id="hero-heading" className="home-hero__item">
                Every child deserves a reason to <em>smile</em>
              </h1>
              <p className="home-hero__item home-hero__lead">
                Let me Smile partners with communities to deliver care, education, and
                hope—so children and families can thrive with dignity and joy.
              </p>
              <div className="home-hero__item home-hero__actions">
                <a href="#get-involved" className="home-btn home-btn--primary">
                  Support our mission
                </a>
                <a href="#programs" className="home-btn home-btn--outline">
                  See our programs
                </a>
              </div>
            </div>
            <div className="home-hero__visual home-hero__item home-hero__item--card">
              <div className="home-hero__card">
                <Logo size="lg" className="home-hero__card-logo" />
                <h3>Compassion in action</h3>
                <p>
                  From rural outreach to urban youth centers, we show up where smiles
                  matter most—and stay until change takes root.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="home-stats" aria-label="Impact statistics">
          {stats.map((stat, index) => (
            <CountUpStat
              key={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * STAT_STAGGER_MS}
            />
          ))}
        </div>

        <section id="programs" className="home-section">
          <div className="home-section__inner">
            <AnimateOnScroll variant="up" className="home-section__header">
              <span className="home-section__label">What we do</span>
              <h2>Programs that create lasting change</h2>
              <p>
                We listen first, then design initiatives with local leaders—ensuring
                every project reflects real needs and measurable outcomes.
              </p>
            </AnimateOnScroll>
            <div className="home-programs">
              {programs.map((program, index) => (
                <AnimateOnScroll key={program.title} variant="scale" delay={index * 120}>
                  <article className="home-program">
                    {program.icon}
                    <h3>{program.title}</h3>
                    <p>{program.description}</p>
                  </article>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="home-section home-section--warm">
          <div className="home-section__inner home-about">
            <AnimateOnScroll variant="left" className="home-about__image">
              <div className="home-about__logo-wrap">
                <Logo size="xl" />
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll variant="right" delay={120} className="home-about__content">
              <span className="home-section__label">Who we are</span>
              <h2>A movement built on empathy</h2>
              <p>
                Let Me Smile is a non-governmental organization (NGO) operating in
                Arusha, Tanzania, that focuses on inclusive education and community outreach.
                We provide educational opportunities for children and young people who have
                been marginalized or excluded from the traditional school system.
              </p>
              <p>
                The organization helps those who fall outside standard schooling due to
                systemic barriers like extreme poverty or physical/intellectual disabilities.
                Their programs aim to equip these children with basic education, life skills,
                and a supportive learning environment.
              </p>
              <Link to="/about" className="home-btn home-btn--primary home-about__cta">
                Learn more
              </Link>
              <ul className="home-about__list">
                {[
                  'Registered non-profit with audited annual reports',
                  'Community-led planning in every region we serve',
                  'Safe, child-centered practices across all initiatives',
                ].map((item, index) => (
                  <li
                    key={item}
                    className="reveal-stagger-item"
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
          </div>
        </section>

        <section id="stories" className="home-section home-section--white">
          <div className="home-section__inner">
            <AnimateOnScroll variant="up" className="home-section__header">
              <span className="home-section__label">Voices of hope</span>
              <h2>Stories from the field</h2>
              <p>
                Real families, real progress—these moments remind us why we do this
                work every day.
              </p>
            </AnimateOnScroll>
            <div className="home-stories">
              <AnimateOnScroll variant="left" delay={0}>
                <figure className="home-story">
                  <blockquote>
                    &ldquo;When the outreach team visited our village, my daughter received
                    care we could never afford. Today she laughs without holding back.&rdquo;
                  </blockquote>
                  <cite>— Amina, caregiver, Eastern region</cite>
                </figure>
              </AnimateOnScroll>
              <AnimateOnScroll variant="right" delay={120}>
                <figure className="home-story">
                  <blockquote>
                    &ldquo;Volunteering with Let me Smile showed me how small acts—reading,
                    mentoring, listening—can reopen a child&apos;s world.&rdquo;
                  </blockquote>
                  <cite>— James, volunteer since 2019</cite>
                </figure>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section id="get-involved" className="home-section">
          <div className="home-section__inner">
            <AnimateOnScroll variant="scale">
              <div className="home-cta">
                <h2>Be part of the next smile</h2>
                <p>
                  Whether you give once, volunteer monthly, or partner as an organization,
                  your support fuels programs that communities count on.
                </p>
                <Link to="/donation#donate-form" className="home-btn home-btn--primary">
                Donate today
              </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <footer className="home-footer home-footer--animate">
        <div className="home-footer__inner">
          <div className="home-footer__grid">
            <div className="home-footer__brand">
              <a href="#top" className="home-logo">
                <Logo size="md" />
                <span className="home-logo__text">
                  Let me <span>Smile</span>
                </span>
              </a>
              <p>
                Restoring dignity, health, and joy for children and families through
                community-driven humanitarian action.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li>
                  <a href="#about">About us</a>
                </li>
                <li>
                  <a href="#programs">Programs</a>
                </li>
                <li>
                  <a href="#stories">Impact stories</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Get involved</h4>
              <ul>
                <li>
                  <a href="#get-involved">Donate</a>
                </li>
                <li>
                  <a href="#get-involved">Volunteer</a>
                </li>
                <li>
                  <a href="#get-involved">Partner with us</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="mailto:hello@letmesmile.org">hello@letmesmile.org</a>
                </li>
                <li>
                  <a href="tel:+1234567890">+255 7XXXXXXX</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="home-footer__bottom">
            <span>&copy; {new Date().getFullYear()} Let me Smile. All rights reserved.</span>
            <span>Registered NGO · Transparency · Accountability</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
