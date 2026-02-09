import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', type, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    const togglePassword = () => setShowPassword(!showPassword);

    return (
        <div className={styles.wrapper}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={styles.inputContainer}>
                <input
                    className={`${styles.input} ${error ? styles.errorInput : ''} ${isPassword ? styles.passwordInput : ''} ${className}`}
                    type={isPassword ? (showPassword ? 'text' : 'password') : type}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={togglePassword}
                        className={styles.toggleButton}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};
