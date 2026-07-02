import { Link } from 'react-router-dom';
import slide101 from '../assets/images/BEAN LIGHT_101.JPG';
import slide47 from '../assets/images/BEAN LIGHT_47.JPG';
import slide55 from '../assets/images/BEAN LIGHT_55.JPG';
import slide95 from '../assets/images/BEAN LIGHT_95.JPG';
import slide115 from '../assets/images/BEAN LIGHT_115.JPG';
import logoImg from '../assets/images/logo.png';
import beamlightSchoolImg from '../assets/images/IMG_4342.PNG';
import SiteSeo from '../components/SiteSeo';
import AnimateOnScroll from '../components/AnimateOnScroll';
import SiteHeader from '../components/SiteHeader';
import './programs.css';
import './home.css';

const Logo = ({ size = 'md' }) => (
  <img
    src={logoImg}
    alt="Let me Smile"
    className={`home-logo__img home-logo__img--${size}`}
  />
);

const programs = [
  {
    id: 'classes',
    title: 'Our Classes',
    tagline: 'Beamlight School',
    description:
      'As of 2026, Beamlight School offers the following educational programs:',
    details: [
      'Kinder Class – for children aged 3 to 4 years',
      'Pre-Unit Class – for children aged 4 to 6 years',
      'Grade One – for learners aged 6 to 7 years',
      'Grade Two – for learners aged 7 to 8 years',
      'Special Education Needs (SEN) Class – designed to support learners with severe neurological and developmental challenges through specialized care and individualized learning approaches.',
    ],
    image: slide101,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M6 14l18-8 18 8-18 8-18-8z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M12 20v10l12 6 12-6V20" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'growth',
    title: 'Our Growth',
    tagline: 'Beamlight School',
    description:
      'Beamlight School currently serves 91 students and is working toward enrolling 100 students by the end of 2026. With a vision for sustainable growth and educational excellence, the school aims to expand its capacity to 350 students while maintaining a single-stream class structure and ensuring personalized attention for every learner.',
    details: [],
    image: slide55,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M8 36V20M20 36V14M32 36V24M44 36V8"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'sen',
    title: 'Special Education Needs (SEN) Program',
    tagline: 'Beamlight School',
    description: [
      'At Beamlight School, we are committed to providing inclusive education that recognizes and supports the unique needs of every learner. Our Special Education Needs (SEN) Program is specifically designed for children with severe neurological and developmental challenges who require specialized educational support.',
      'The program offers a safe, nurturing, and structured learning environment where each learner receives individualized attention tailored to their abilities, strengths, and developmental needs. Through personalized learning plans, specialized teaching strategies, therapeutic activities, and close collaboration with families, we strive to help every child achieve meaningful growth and independence.',
      'Our dedicated SEN educators focus on developing communication, social, cognitive, emotional, and life skills while fostering confidence, dignity, and a sense of belonging. We believe that every child deserves the opportunity to learn, participate, and thrive regardless of their challenges.',
      'At Beamlight School, inclusion is more than a practice it is a commitment to ensuring that every learner is valued, respected, and empowered to reach their fullest potential.',
    ],
    details: [],
    image: slide47,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3" />
        <path
          d="M16 24c0-4 3.5-8 8-8s8 4 8 8-3.5 10-8 14c-4.5-4-8-10-8-14z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

/** Pin from https://share.google/FselOoHYj8sOuaZEz */
const LET_ME_SMILE_MAP = {
  name: 'Let Me Smile',
  lat: -6.7731456,
  lng: 39.2101888,
  region: 'Tanzania',
  featureId: '0x0:0xa244a49574927d05',
  shareUrl: 'https://share.google/FselOoHYj8sOuaZEz',
};

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=' +
  '!1m18!1m12!1m3!1d600!2d39.2101888!3d-6.7731456' +
  '!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1' +
  '!3m3!1m2!1s0x0%3A0xa244a49574927d05!2sLet%20Me%20Smile!5e0!3m2!1sen!2stz!4v1';

const MAP_VIEW_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${LET_ME_SMILE_MAP.name}@${LET_ME_SMILE_MAP.lat},${LET_ME_SMILE_MAP.lng}`
)}`;

const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${LET_ME_SMILE_MAP.lat},${LET_ME_SMILE_MAP.lng}`;

const approachSteps = [
  {
    step: '01',
    title: 'Listen to communities',
    text: 'We begin by meeting families, teachers, and local leaders to understand real needs.',
  },
  {
    step: '02',
    title: 'Design together',
    text: 'Programs are planned with community input—not imposed from outside.',
  },
  {
    step: '03',
    title: 'Deliver with care',
    text: 'Trained staff and volunteers provide safe, child-centered support every day.',
  },
  {
    step: '04',
    title: 'Measure impact',
    text: 'We track progress and adapt so every child has a path toward a brighter future.',
  },
];

function Programs() {
  return (
    <div className="programs">
      <SiteSeo
        title="Programs"
        description="Let Me Smile programs — Beamlight School classes, SEN education, and growth initiatives in Arusha, Tanzania."
        path="/programs"
      />
      <SiteHeader />

      <main id="top">
        <section className="programs-hero">
          <img src={slide55} alt="" className="programs-hero__img" />
          <div className="programs-hero__overlay" aria-hidden="true" />
          <div className="programs-hero__content">
            <span className="programs-hero__item programs-label">What we do</span>
            <h1 className="programs-hero__item">Our programs</h1>
            <p className="programs-hero__item programs-hero__lead">
              Inclusive education, outreach, and family support—designed for children
              and youth in Arusha who need a second chance to learn and belong.
            </p>
          </div>
        </section>

        <section className="programs-section">
          <div className="programs-section__inner">
            <AnimateOnScroll variant="up" className="programs-section__intro">
              <div className="programs-section__logo">
                <img
                  src={beamlightSchoolImg}
                  alt="Beamlight School — Learn Grow Achieve"
                />
              </div>
              <div className="programs-section__header">
                <span className="programs-label">Core initiatives</span>
                <h2>Beam Light School</h2>
                <p>
                  The School is Located in Arusha Region, 2.5KM from Arusha - Moshi Road
                </p>
                <p>
                At <b>Beamlight School</b>, we are committed to providing a nurturing, inclusive, 
                and high-quality learning environment that supports every child's academic, 
                social, and personal development.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="programs-list">
              {programs.map((program, index) => (
                <AnimateOnScroll
                  key={program.id}
                  variant={index % 2 === 0 ? 'left' : 'right'}
                  delay={index * 80}
                >
                  <article id={program.id} className="programs-card">
                    <div className="programs-card__media">
                      <img src={slide115} alt={program.title} />
                    </div>
                    <div className="programs-card__body">
                      <div className="programs-card__icon">{program.icon}</div>
                      <span className="programs-card__tagline">{program.tagline}</span>
                      <h3>{program.title}</h3>
                      {(Array.isArray(program.description)
                        ? program.description
                        : [program.description]
                      ).map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {program.details.length > 0 && (
                        <ul className="programs-card__details">
                          {program.details.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="programs-section programs-section--warm" id="how-we-work">
          <div className="programs-section__inner">
            <AnimateOnScroll variant="up" className="programs-map">
              <article className="programs-map__card" aria-labelledby="programs-map-title">
                <header className="programs-map__header">
                  <span className="programs-label">Find us</span>
                  <h2 id="programs-map-title" className="programs-map__title">
                    {LET_ME_SMILE_MAP.name}
                  </h2>
                  <p className="programs-map__region">{LET_ME_SMILE_MAP.region}</p>
                </header>

                <div className="programs-map__frame">
                  <iframe
                    title={`${LET_ME_SMILE_MAP.name} — map and directions`}
                    src={MAP_EMBED_URL}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <footer className="programs-map__footer">
                  <p className="programs-map__hint">
                    Use the map to zoom in, or open Google Maps for turn-by-turn directions.
                  </p>
                  <div className="programs-map__actions">
                    <a
                      href={MAP_DIRECTIONS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="home-btn home-btn--primary"
                    >
                      Get directions
                    </a>
                    <a
                      href={MAP_VIEW_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="home-btn home-btn--outline programs-map__view-btn"
                    >
                      Open in Google Maps
                    </a>
                    <a
                      href={LET_ME_SMILE_MAP.shareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="programs-map__share-link"
                    >
                      Shared map link
                    </a>
                  </div>
                </footer>
              </article>
            </AnimateOnScroll>

            <AnimateOnScroll variant="up" className="programs-section__header">
              <span className="programs-label">Our approach</span>
              <h2>How we work</h2>
              <p>
                Every program follows the same principle: partner with communities,
                center the child, and build solutions that last.
              </p>
            </AnimateOnScroll>
            <div className="programs-steps">
              {approachSteps.map((item, index) => (
                <AnimateOnScroll key={item.step} variant="scale" delay={index * 100}>
                  <article className="programs-step">
                    <span className="programs-step__num">{item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="programs-section programs-section--white">
          <div className="programs-section__inner programs-highlight">
            <AnimateOnScroll variant="left" className="programs-highlight__media">
              <img src={slide95} alt="Children playing at a Let Me Smile program" />
            </AnimateOnScroll>
            <AnimateOnScroll variant="right" delay={120} className="programs-highlight__content">
              <span className="programs-label">Inclusive by design</span>
              <h2>Every child belongs</h2>
              <p>
                Whether in the classroom, on outreach, or at home with family, we
                believe every child deserves dignity, patience, and the chance to
                smile. Our programs are built for inclusion—not as an afterthought.
              </p>
              <ul className="programs-highlight__list">
                <li>Adapted teaching for diverse learning needs</li>
                <li>Wheelchair-accessible activities and spaces</li>
                <li>Trained staff in child safeguarding practices</li>
              </ul>
            </AnimateOnScroll>
          </div>
        </section>

        <section className="programs-section programs-section--cta">
          <div className="programs-section__inner">
            <AnimateOnScroll variant="scale">
              <div className="programs-cta">
                <h2>Help us expand these programs</h2>
                <p>
                  Your support brings classrooms, outreach visits, and family care to
                  more children across Arusha.
                </p>
                <div className="programs-cta__actions">
                  <Link to="/donation#donate-form" className="home-btn home-btn--primary">
                    Support a program
                  </Link>
                  <Link to="/about" className="home-btn home-btn--outline programs-cta__outline">
                    Learn about us
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
                  <Link to="/donation">Donate</Link>
                </li>
                <li>
                  <Link to="/about">Volunteer</Link>
                </li>
                <li>
                  <a href="mailto:letmesmilebms@gmail.com">Partner with us</a>
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

export default Programs;
