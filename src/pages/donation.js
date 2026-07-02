import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import slide95 from '../assets/images/BEAN LIGHT_95.JPG';
import logoImg from '../assets/images/logo.png';
import SiteSeo from '../components/SiteSeo';
import AnimateOnScroll from '../components/AnimateOnScroll';
import DonationAmountPicker from '../components/DonationAmountPicker';
import DonationForm from '../components/DonationForm';
import SiteHeader from '../components/SiteHeader';
import './donation.css';
import './home.css';

const Logo = ({ size = 'md' }) => (
  <img
    src={logoImg}
    alt="Let me Smile"
    className={`home-logo__img home-logo__img--${size}`}
  />
);

const impactAreas = [
  {
    title: 'Inclusive education',
    description:
      'Books, materials, and adapted learning tools for children outside the traditional school system.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
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
    title: 'Community outreach',
    description:
      'Mobile visits, family support, and programs that meet communities where they are.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
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
  {
    title: 'Safe learning spaces',
    description:
      'Classroom resources, accessibility needs, and environments where every child can thrive.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M24 6L8 14v12c0 10 7 16 16 16s16-6 16-16V14L24 6z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const trustPoints = [
  'Registered NGO with accountable financial practices',
  'Programs led by community needs in Arusha, Tanzania',
  '100% of gifts directed toward children and families we serve',
];

function Donation() {
  const formSectionRef = useRef(null);
  const [formOpen, setFormOpen] = useState(false);
  const [pledgeAmount, setPledgeAmount] = useState({
    selectedAmount: 50,
    customAmount: '',
  });

  const handleDonateNow = ({ selectedAmount, customAmount }) => {
    setPledgeAmount({ selectedAmount, customAmount });
    setFormOpen(true);
    requestAnimationFrame(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleChangeAmount = () => {
    setFormOpen(false);
    requestAnimationFrame(() => {
      document.getElementById('donate-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="donation">
      <SiteSeo
        title="Donate"
        description="Donate to Let Me Smile — support Beamlight School and inclusive education for children in Arusha, Tanzania."
        path="/donation"
      />
      <SiteHeader />

      <main id="top">
        <section className="donation-hero">
          <img src={slide95} alt="" className="donation-hero__img" />
          <div className="donation-hero__overlay" aria-hidden="true" />
          <div className="donation-hero__content">
            <span className="donation-hero__item donation-label">Support us</span>
            <h1 className="donation-hero__item">Give the gift of a smile</h1>
            <p className="donation-hero__item donation-hero__lead">
              Your generosity fuels inclusive education and community outreach for
              children and families in Arusha, Tanzania.
            </p>
          </div>
        </section>

        <section className="donation-section">
          <div className="donation-section__inner">
            <AnimateOnScroll variant="up" className="donation-section__header">
              <span className="donation-label">Your impact</span>
              <h2>Where your donation goes</h2>
              <p>
                Every contribution supports real programs—delivered with transparency
                and care on the ground.
              </p>
            </AnimateOnScroll>
            <div className="donation-impact">
              {impactAreas.map((area, index) => (
                <AnimateOnScroll key={area.title} variant="scale" delay={index * 120}>
                  <article className="donation-impact__card">
                    <div className="donation-impact__icon">{area.icon}</div>
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                  </article>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section id="donate-form" className="donation-section donation-section--warm">
          <div className="donation-section__inner donation-give">
            <AnimateOnScroll variant="right" className="donation-give__intro">
              <span className="donation-label">Make a gift</span>
              <h2>Make a donation</h2>
              <p>
                Step 1: Choose your amount and click <strong>Donate now</strong>.
                Step 2: Complete your details and preferred payment method on the form.
              </p>
              <ul className="donation-trust">
                {trustPoints.map((point, index) => (
                  <li
                    key={point}
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
                    {point}
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>

            <AnimateOnScroll variant="left" delay={120} className="donation-give__picker">
              <DonationAmountPicker onDonateNow={handleDonateNow} />
            </AnimateOnScroll>
          </div>
        </section>

        {formOpen && (
          <section
            ref={formSectionRef}
            id="donation-form-details"
            className="donation-section donation-section--details"
            aria-label="Donation details form"
          >
            <div className="donation-section__inner donation-details-wrap">
              <AnimateOnScroll variant="up">
                <header className="donation-details__header">
                  <span className="donation-label">Step 2</span>
                  <h2>Complete your donation</h2>
                  <p>Fill in your details below to finalize your gift.</p>
                </header>
              </AnimateOnScroll>
              <AnimateOnScroll variant="up" delay={100}>
                <div className="donation-give__form">
                  <DonationForm
                    selectedAmount={pledgeAmount.selectedAmount}
                    customAmount={pledgeAmount.customAmount}
                    onChangeAmount={handleChangeAmount}
                  />
                </div>
              </AnimateOnScroll>
            </div>
          </section>
        )}

        <section className="donation-section donation-section--white">
          <div className="donation-section__inner">
            <AnimateOnScroll variant="up" className="donation-section__header">
              <span className="donation-label">Other ways to help</span>
              <h2>More than money</h2>
            </AnimateOnScroll>
            <div className="donation-ways">
              <AnimateOnScroll variant="up" delay={0}>
                <article className="donation-way">
                  <h3>Volunteer</h3>
                  <p>
                    Share your time mentoring, teaching, or supporting outreach events
                    in Arusha and surrounding communities.
                  </p>
                  <Link to="/about">Learn about us</Link>
                </article>
              </AnimateOnScroll>
              <AnimateOnScroll variant="up" delay={120}>
                <article className="donation-way">
                  <h3>Partner</h3>
                  <p>
                    Schools, businesses, and organizations can collaborate on programs
                    that create lasting local impact.
                  </p>
                  <a href="mailto:hello@letmesmile.org">Get in touch</a>
                </article>
              </AnimateOnScroll>
              <AnimateOnScroll variant="up" delay={240}>
                <article className="donation-way">
                  <h3>Spread the word</h3>
                  <p>
                    Follow our work, share our mission, and help more people discover
                    Let Me Smile.
                  </p>
                  <Link to="/">Share our story</Link>
                </article>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="donation-section donation-section--cta">
          <div className="donation-section__inner">
            <AnimateOnScroll variant="scale">
              <div className="donation-cta">
                <Logo size="lg" />
                <h2>Together, we can reach more children</h2>
                <p>
                  Whether you give once or monthly, your support helps open doors that
                  were once closed—and brings smiles that last.
                </p>
                <div className="donation-cta__actions">
                  <a href="#donate-form" className="home-btn home-btn--primary">
                    Choose amount & donate
                  </a>
                  <Link to="/" className="home-btn home-btn--outline donation-cta__outline">
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

export default Donation;
