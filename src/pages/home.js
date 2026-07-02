import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import slide101 from '../assets/images/BEAN LIGHT_101.JPG';
import slide47 from '../assets/images/BEAN LIGHT_47.JPG';
import slide55 from '../assets/images/BEAN LIGHT_55.JPG';
import slide95 from '../assets/images/BEAN LIGHT_95.JPG';
import logoImg from '../assets/images/logo.png';
import madamImg from '../assets/images/madam.jpg';
import SiteSeo from '../components/SiteSeo';
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
      <SiteSeo
        description="Let Me Smile — NGO in Arusha, Tanzania. Inclusive education, Beamlight School, and community outreach so every child can learn and thrive."
        path="/"
      />
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
              <p className="home-hero__item home-hero__brand">Let Me Smile</p>
              <h1 id="hero-heading" className="home-hero__item">
                Every child deserves a reason to <em>smile</em>
              </h1>
              <p className="home-hero__item home-hero__lead">
                Let Me Smile partners with communities to deliver care, education, and
                hope—so children and families in Arusha, Tanzania can thrive with dignity and joy.
              </p>
              <div className="home-hero__item home-hero__actions">
                <a href="#get-involved" className="home-btn home-btn--primary">
                  Support our mission
                </a>
                <Link to="/programs" className="home-btn home-btn--outline">
                  See our programs
                </Link>
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
            <div className="home-about__image">
              <div className="home-about__portrait">
                <img
                  src={madamImg}
                  alt="Let Me Smile founder"
                  className="home-about__portrait-img"
                  width={800}
                  height={1000}
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="home-about__portrait-badge">
                  <Logo size="sm" />
                  <div>
                    <p className="home-about__portrait-name">Selina P. Kaaya</p>
                    <p className="home-about__portrait-role">Founder, Let Me Smile</p>
                  </div>
                </div>
              </div>
            </div>
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
                    &ldquo;I have met Selena through her school in arusha. 
                    She has the greatest passion I have ever seen toward the kids 
                    and specially the ones with neurological difficulties. 
                    She puts her heart into teaching and helping those kids and 
                    it was very inspiring to witness that and to actually see the 
                    result with those kids becoming better and getting the care they 
                    need and deserve!&rdquo;
                  </blockquote>
                  <cite>— Nardeencoaching</cite>
                </figure>
              </AnimateOnScroll>
              <AnimateOnScroll variant="right" delay={120}>
                <figure className="home-story">
                  <blockquote>
                    &ldquo;What a wonderful school this is. So much love for the students, 
                    and it is absolutely fantastic that they are an inclusion school. 
                    Tailored support is provided for children with disabilities. 
                    Some students with disabilities attend mainstream education or participate 
                    in parts of regular primary education, while others are in a class with only 
                    Students with disabilities. There are sufficient teachers and support staff 
                    present in every class. Every student is offered both breakfast and lunch. 
                    Currently, hard work is being done on a vegetable garden with trees full of fruit. 
                    The mango and avocado trees are already fully grown. The owner is full of dreams 
                    about everything she wants to achieve at the school; this school offers your 
                    child truly amazing opportunities. They have recently started offering lesson 
                    programs on a tablet. English and math can be learned on this. I was able to 
                    experience this up close by being present as a volunteer for three weeks. 
                    This school is in my heart! <br /> God bless you all!&rdquo;
                  </blockquote>
                  <cite>— Gerjanne Bosman</cite>
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
                  <Link to="/programs">Programs</Link>
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
            <span>Registered NGO · Transparency · Accountability</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
