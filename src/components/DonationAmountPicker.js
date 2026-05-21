import { useState } from 'react';

export const DONATION_AMOUNTS = [
  { value: 25, label: '$25', desc: 'School supplies for one child' },
  { value: 50, label: '$50', desc: 'A week of outreach support' },
  { value: 100, label: '$100', desc: 'Materials for a small group' },
  { value: 0, label: 'Custom', desc: 'Enter your own amount' },
];

export function getDonationAmount(selectedAmount, customAmount) {
  if (selectedAmount === 0) {
    return Number(customAmount);
  }
  return selectedAmount;
}

export function validateDonationAmount(selectedAmount, customAmount) {
  const amount = getDonationAmount(selectedAmount, customAmount);
  if (!amount || Number.isNaN(amount) || amount < 1) {
    return 'Please select or enter a donation amount (minimum $1)';
  }
  return null;
}

function DonationAmountPicker({ onDonateNow }) {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    const amountError = validateDonationAmount(selectedAmount, customAmount);
    if (amountError) {
      setError(amountError);
      return;
    }
    setError('');
    onDonateNow({ selectedAmount, customAmount });
  };

  return (
    <div className="donation-form-step donation-form-step--amount">
      <h3 className="donation-form-step__title">Choose your amount</h3>
      <p className="donation-form-step__hint">
        Select a gift level, then click Donate now to complete your details.
      </p>
      <div
        className={`donation-amounts${error ? ' donation-amounts--error' : ''}`}
        role="group"
        aria-label="Donation amount"
      >
        {DONATION_AMOUNTS.map((tier) => (
          <button
            key={tier.label}
            type="button"
            className={`donation-amount${
              selectedAmount === tier.value ? ' donation-amount--active' : ''
            }`}
            onClick={() => {
              setSelectedAmount(tier.value);
              if (error) setError('');
            }}
            aria-pressed={selectedAmount === tier.value}
          >
            <span className="donation-amount__value">{tier.label}</span>
            <span className="donation-amount__desc">{tier.desc}</span>
          </button>
        ))}
      </div>
      {selectedAmount === 0 && (
        <label className="donation-field">
          <span className="donation-field__label">
            Custom amount (USD) <span className="donation-required">*</span>
          </span>
          <input
            type="number"
            min="1"
            step="1"
            placeholder="e.g. 200"
            className={`donation-field__input${error ? ' donation-field__input--error' : ''}`}
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              if (error) setError('');
            }}
          />
        </label>
      )}
      {error && (
        <p className="donation-field__error" role="alert">
          {error}
        </p>
      )}
      <button
        type="button"
        className="home-btn home-btn--primary donation-form__donate-now"
        onClick={handleClick}
      >
        Donate now
      </button>
    </div>
  );
}

export default DonationAmountPicker;
