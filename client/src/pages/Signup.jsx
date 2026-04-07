import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setError('');
            setLoading(true);
            await signup(data.name, data.email, data.password);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={s.page}>
            <div style={s.left}>
                <div style={s.brand}>
                    <div style={s.logo}>⚡</div>
                    <h1 style={s.brandName}>AuthSystem</h1>
                </div>
                <h2 style={s.tagline}>Secure auth,<br />built for developers.</h2>
                <p style={s.sub}>JWT tokens, bcrypt hashing, protected routes — all wired up and ready.</p>
                <div style={s.pills}>
                    <span style={s.pill}>🔐 JWT Tokens</span>
                    <span style={s.pill}>🛡️ bcrypt</span>
                    <span style={s.pill}>🔄 Refresh Tokens</span>
                </div>
            </div>

            <div style={s.right}>
                <div style={s.card}>
                    <div style={s.cardHeader}>
                        <div style={s.logo2}>⚡</div>
                        <h2 style={s.cardTitle}>Create account</h2>
                        <p style={s.cardSub}>Start your journey today</p>
                    </div>

                    {error && (
                        <div style={s.errorBox}>
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} style={s.form}>
                        <div style={s.field}>
                            <label style={s.label}>Full Name</label>
                            <input
                                style={s.input}
                                placeholder="John Doe"
                                {...register('name', { required: 'Name is required' })}
                            />
                            {errors.name && <p style={s.ferr}>{errors.name.message}</p>}
                        </div>

                        <div style={s.field}>
                            <label style={s.label}>Email Address</label>
                            <input
                                style={s.input}
                                placeholder="john@example.com"
                                {...register('email', { required: 'Email is required' })}
                            />
                            {errors.email && <p style={s.ferr}>{errors.email.message}</p>}
                        </div>

                        <div style={s.field}>
                            <label style={s.label}>Password</label>
                            <input
                                type="password"
                                style={s.input}
                                placeholder="Min 6 characters"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Min 6 characters' },
                                })}
                            />
                            {errors.password && <p style={s.ferr}>{errors.password.message}</p>}
                        </div>

                        <button type="submit" style={s.btn} disabled={loading}>
                            {loading ? (
                                <span style={s.btnInner}>
                                    <span style={s.spinner} /> Creating account...
                                </span>
                            ) : (
                                'Create Account →'
                            )}
                        </button>
                    </form>

                    <p style={s.switchText}>
                        Already have an account?{' '}
                        <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const s = {
    page: {
        minHeight: '100vh',
        display: 'flex',
    },
    left: {
        flex: 1,
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem',
        gap: '1.5rem',
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '1rem',
    },
    logo: {
        fontSize: '28px',
        background: 'rgba(108,99,255,0.2)',
        padding: '8px',
        borderRadius: '10px',
    },
    logo2: {
        fontSize: '24px',
        background: 'rgba(108,99,255,0.15)',
        padding: '6px 10px',
        borderRadius: '8px',
        marginBottom: '0.5rem',
    },
    brandName: {
        fontSize: '22px',
        fontWeight: '700',
        color: '#fff',
    },
    tagline: {
        fontSize: '42px',
        fontWeight: '800',
        lineHeight: '1.2',
        color: '#fff',
    },
    sub: {
        fontSize: '16px',
        color: 'rgba(255,255,255,0.6)',
        lineHeight: '1.7',
        maxWidth: '380px',
    },
    pills: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        marginTop: '0.5rem',
    },
    pill: {
        background: 'rgba(108,99,255,0.2)',
        border: '1px solid rgba(108,99,255,0.4)',
        color: '#a89cff',
        padding: '6px 14px',
        borderRadius: '999px',
        fontSize: '13px',
        fontWeight: '500',
    },
    right: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f0f1a',
        padding: '2rem',
    },
    card: {
        width: '100%',
        maxWidth: '420px',
        background: '#1a1a2e',
        borderRadius: '20px',
        padding: '2.5rem',
        border: '1px solid rgba(255,255,255,0.08)',
    },
    cardHeader: {
        marginBottom: '2rem',
    },
    cardTitle: {
        fontSize: '26px',
        fontWeight: '700',
        color: '#fff',
        marginBottom: '6px',
    },
    cardSub: {
        fontSize: '14px',
        color: 'rgba(255,255,255,0.5)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '13px',
        fontWeight: '500',
        color: 'rgba(255,255,255,0.7)',
    },
    input: {
        padding: '12px 14px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '10px',
        fontSize: '14px',
        color: '#fff',
        transition: 'all 0.2s',
    },
    btn: {
        padding: '13px',
        background: 'linear-gradient(135deg, #6c63ff, #5a52d5)',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '0.5rem',
        letterSpacing: '0.3px',
    },
    btnInner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
    },
    spinner: {
        width: '14px',
        height: '14px',
        border: '2px solid rgba(255,255,255,0.3)',
        borderTop: '2px solid #fff',
        borderRadius: '50%',
        display: 'inline-block',
        animation: 'spin 0.8s linear infinite',
    },
    errorBox: {
        background: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.3)',
        color: '#f87171',
        padding: '12px',
        borderRadius: '10px',
        fontSize: '14px',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    ferr: {
        color: '#f87171',
        fontSize: '12px',
    },
    switchText: {
        textAlign: 'center',
        marginTop: '1.5rem',
        fontSize: '14px',
        color: 'rgba(255,255,255,0.5)',
    },
};

export default Signup;