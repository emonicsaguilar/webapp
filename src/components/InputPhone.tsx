import { useState } from 'react';
import errorStyles from '../styles/Error.module.css';

interface Prop {
  label?: string;
  controlId?: string;
  value: string;
  onChange: (value: string) => void;
}

export const InputPhone = (prop: Prop): JSX.Element => {
  const { value, onChange, label = 'Teléfono', controlId = 'phone' } = prop;
  const [error, setError] = useState<string | null>('');
  const [showError, setShowError] = useState<boolean>(false);
  function onPhoneChanged(phone: string) {
    onChange(phone);
    if (phone.length >= 10) {
      setError(null);
    } else {
      setError(`El ${label.toLowerCase()} no es válido`);
    }
  }
  function validate(e: any) {
    const theEvent = e;
    let key = '';
    // Handle paste
    if (theEvent.type === 'paste') {
      key = e.clipboardData.getData('text/plain');
    } else {
    // Handle key press
      key = String.fromCharCode(theEvent.keyCode || theEvent.which);
    }
    const regex = /[0-9]|\./;
    if (!regex.test(key) || theEvent.target.value.length > 13) {
      theEvent.returnValue = false;
      theEvent.preventDefault && theEvent.preventDefault();
    }
  }
  return (
    <div>
      <span>{label}</span>
      <input
        type="text"
        id="phone"
        name="phone"
        className={`shadow appearance-none border ${showError && error && 'border-red-500'} rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        value={value}
        onKeyPress={(e) => validate(e)}
        onChange={(e) => onPhoneChanged(e.target.value)}
        onBlur={() => setShowError(true)}
      />
      {
        showError && error && (
          <p className="text-xs italic text-red-500">
            {error}
          </p>
        )
      }

    </div>
  );
};

export default InputPhone;
