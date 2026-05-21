import { useState } from 'react';
import { getDonationAmount } from './DonationAmountPicker';

const PAYMENT_METHODS = [
  { value: 'mobile', label: 'Mobile money (M-Pesa / Tigo Pesa)' },
  { value: 'bank', label: 'Bank transfer' },
  { value: 'international', label: 'International transfer' },
  { value: 'other', label: 'Other — we will contact you' },
];

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  anonymous: false,
};

function formatAmountLabel(selectedAmount, customAmount) {
  const amount = getDonationAmount(selectedAmount, customAmount);
  return selectedAmount === 0 ? `$${amount} (custom)` : `$${amount}`;
}

function validateForm(form, selectedAmount, customAmount, agreed) {
  const errors = {};
  const amount = getDonationAmount(selectedAmount, customAmount);

  if (!form.firstName.trim()) errors.firstName = 'First name is required';
  if (!form.lastName.trim()) errors.lastName = 'Last name is required';

  const email = form.email.trim();
  if (!email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address';
  }

  if (form.phone.trim() && !/^[\d\s+()-]{7,20}$/.test(form.phone.trim())) {
    errors.phone = 'Enter a valid phone number';
  }

  if (!amount || Number.isNaN(amount) || amount < 1) {
    errors.amount = 'Invalid donation amount';
  }

  if (!agreed) {
    errors.agreed = 'Please confirm before submitting';
  }

  return errors;
}

function buildMailtoLink(form, amount, frequency, paymentMethod) {
  const name = form.anonymous
    ? 'Anonymous donor'
    : `${form.firstName} ${form.lastName}`.trim();
  const paymentLabel =
    PAYMENT_METHODS.find((m) => m.value === paymentMethod)?.label || paymentMethod;

  const body = [
    'New donation pledge — Let Me Smile',
    '',
    `Reference: LMS-${Date.now().toString(36).toUpperCase()}`,
    `Amount: $${amount} USD (${frequency})`,
    `Payment method: ${paymentLabel}`,
    '',
    `Name: ${name}`,
    `Email: ${form.email}`,
    form.phone ? `Phone: ${form.phone}` : null,
    form.message ? `Message: ${form.message}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  return `mailto:hello@letmesmile.org?subject=${encodeURIComponent(
    `Donation pledge — $${amount}`
  )}&body=${encodeURIComponent(body)}`;
}

function DonationForm({ selectedAmount, customAmount, onChangeAmount }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [frequency, setFrequency] = useState('one-time');
  const [paymentMethod, setPaymentMethod] = useState('mobile');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [submittedAmount, setSubmittedAmount] = useState(0);

  const updateField = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(form, selectedAmount, customAmount, agreed);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const amount = getDonationAmount(selectedAmount, customAmount);
    const ref = `LMS-${Date.now().toString(36).toUpperCase()}`;

    setReferenceId(ref);
    setSubmittedAmount(amount);
    setSubmitted(true);
    setErrors({});
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setFrequency('one-time');
    setPaymentMethod('mobile');
    setAgreed(false);
    setSubmitted(false);
    setReferenceId('');
    setSubmittedAmount(0);
    setErrors({});
    onChangeAmount();
  };

  if (submitted) {
    const mailto = buildMailtoLink(
      form,
      submittedAmount,
      frequency,
      paymentMethod
    );

    return (
      <div className="donation-form-success">
        <div className="donation-form-success__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="3" />
            <path
              d="M14 24l7 7 13-14"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3>Thank you for your pledge</h3>
        <p>
          Your donation of <strong>${submittedAmount}</strong> ({frequency}) has been
          recorded. Please complete payment using the instructions below and include
          your reference number.
        </p>
        <p className="donation-form-success__ref">
          Reference: <strong>{referenceId}</strong>
        </p>

        <div className="donation-form-success__instructions">
          <h4>Payment instructions</h4>
          {paymentMethod === 'mobile' && (
            <ul>
              <li>M-Pesa / Tigo Pesa details will be shared by our team.</li>
              <li>Use your reference number in the payment description.</li>
            </ul>
          )}
          {paymentMethod === 'bank' && (
            <ul>
              <li>Bank name: [Your bank name]</li>
              <li>Account name: Let Me Smile</li>
              <li>Account number: [Account number]</li>
              <li>Reference: {referenceId}</li>
            </ul>
          )}
          {paymentMethod === 'international' && (
            <ul>
              <li>We will email you SWIFT/IBAN details for international transfers.</li>
              <li>Reference: {referenceId}</li>
            </ul>
          )}
          {paymentMethod === 'other' && (
            <p>Our team will contact you at {form.email} with payment options.</p>
          )}
        </div>

        <div className="donation-form-success__actions">
          <a href={mailto} className="home-btn home-btn--primary">
            Email pledge details
          </a>
          <button type="button" className="donation-btn--secondary" onClick={resetForm}>
            Make another donation
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="donation-form" onSubmit={handleSubmit} noValidate>
      <div className="donation-form-summary">
        <div className="donation-form-summary__amount">
          <span className="donation-form-summary__label">Your gift</span>
          <strong>{formatAmountLabel(selectedAmount, customAmount)}</strong>
        </div>
        <button
          type="button"
          className="donation-form-summary__change"
          onClick={onChangeAmount}
        >
          Change amount
        </button>
      </div>

      <fieldset className="donation-form__fieldset">
        <legend className="donation-form__legend">Frequency</legend>
        <div className="donation-frequency">
          <label className="donation-radio">
            <input
              type="radio"
              name="frequency"
              value="one-time"
              checked={frequency === 'one-time'}
              onChange={(e) => setFrequency(e.target.value)}
            />
            <span>One-time</span>
          </label>
          <label className="donation-radio">
            <input
              type="radio"
              name="frequency"
              value="monthly"
              checked={frequency === 'monthly'}
              onChange={(e) => setFrequency(e.target.value)}
            />
            <span>Monthly</span>
          </label>
        </div>
      </fieldset>

      <fieldset className="donation-form__fieldset">
        <legend className="donation-form__legend">Your details</legend>
        <div className="donation-form__row">
          <label className="donation-field">
            <span className="donation-field__label">
              First name <span className="donation-required">*</span>
            </span>
            <input
              type="text"
              name="firstName"
              autoComplete="given-name"
              className={`donation-field__input${errors.firstName ? ' donation-field__input--error' : ''}`}
              value={form.firstName}
              onChange={updateField('firstName')}
            />
            {errors.firstName && (
              <span className="donation-field__error" role="alert">
                {errors.firstName}
              </span>
            )}
          </label>
          <label className="donation-field">
            <span className="donation-field__label">
              Last name <span className="donation-required">*</span>
            </span>
            <input
              type="text"
              name="lastName"
              autoComplete="family-name"
              className={`donation-field__input${errors.lastName ? ' donation-field__input--error' : ''}`}
              value={form.lastName}
              onChange={updateField('lastName')}
            />
            {errors.lastName && (
              <span className="donation-field__error" role="alert">
                {errors.lastName}
              </span>
            )}
          </label>
        </div>

        <label className="donation-field">
          <span className="donation-field__label">
            Email <span className="donation-required">*</span>
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            className={`donation-field__input${errors.email ? ' donation-field__input--error' : ''}`}
            value={form.email}
            onChange={updateField('email')}
          />
          {errors.email && (
            <span className="donation-field__error" role="alert">
              {errors.email}
            </span>
          )}
        </label>

        <label className="donation-field">
          <span className="donation-field__label">Phone (optional)</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="+255 ..."
            className={`donation-field__input${errors.phone ? ' donation-field__input--error' : ''}`}
            value={form.phone}
            onChange={updateField('phone')}
          />
          {errors.phone && (
            <span className="donation-field__error" role="alert">
              {errors.phone}
            </span>
          )}
        </label>

        <label className="donation-checkbox">
          <input
            type="checkbox"
            name="anonymous"
            checked={form.anonymous}
            onChange={updateField('anonymous')}
          />
          <span>Give anonymously (we will not display your name publicly)</span>
        </label>
      </fieldset>

      <fieldset className="donation-form__fieldset">
        <legend className="donation-form__legend">Payment & message</legend>
        <label className="donation-field">
          <span className="donation-field__label">
            Preferred payment method <span className="donation-required">*</span>
          </span>
          <select
            name="paymentMethod"
            className="donation-field__input donation-field__select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            {PAYMENT_METHODS.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        </label>

        <label className="donation-field">
          <span className="donation-field__label">
            Message or dedication (optional)
          </span>
          <textarea
            name="message"
            rows={3}
            placeholder="In honor of..., or leave a note for our team"
            className="donation-field__input donation-field__textarea"
            value={form.message}
            onChange={updateField('message')}
          />
        </label>
      </fieldset>

      <label
        className={`donation-checkbox donation-checkbox--agree${
          errors.agreed ? ' donation-checkbox--error' : ''
        }`}
      >
        <input
          type="checkbox"
          name="agreed"
          checked={agreed}
          onChange={(e) => {
            setAgreed(e.target.checked);
            if (errors.agreed) {
              setErrors((prev) => {
                const next = { ...prev };
                delete next.agreed;
                return next;
              });
            }
          }}
        />
        <span>
          I understand this form records my donation pledge and that I will complete
          payment using the instructions provided. Let Me Smile may contact me about
          this gift.
        </span>
      </label>
      {errors.agreed && (
        <p className="donation-field__error" role="alert">
          {errors.agreed}
        </p>
      )}

      <button type="submit" className="home-btn home-btn--primary donation-form__submit">
        Submit donation
      </button>
    </form>
  );
}

export default DonationForm;
