import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Signup = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    const { register, handleSubmit, formState: { errors } } = useForm();

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
                <div style={s.orb1} />
                <div style={s.orb2} />
                <div style={{ ...s.leftInner, opacity: mounted ? 1 : 0, transition: 'opacity 0.6s' }}>
                    <div style={s.brand}>
                        <div style={s.logoBox}>⚡</div>
                        <span style={s.brandName}>AuthSystem</span>
                    </div>
                    <h1 style={s.tagline}>
                        Create your<br />
                        <span style={s.gradText}>account.</span>
                    </h1>
                    <p style={s.desc}>
                        Join thousands of developers building secure apps. Get started with enterprise-grade auth in minutes.
                    </p>
                    <div style={s.pills}>
                        <span style={{ ...s.pill, ...s.pillPurple }}>Free forever</span>
                        <span style={{ ...s.pill, ...s.pillBlue }}>No credit card</span>
                        <span style={{ ...s.pill, ...s.pillPink }}>5 min setup</span>
                    </div>
                    <div style={s.testimonial}>
                        <div style={s.stars}>★★★★★</div>
                        <p style={s.quote}>"Best auth boilerplate I've used. Clean, secure, well-structured."</p>
                        <p style={s.quoteName}>— Full-stack developer</p>
                    </div>
                </div>
            </div>

            <div style={s.right}>
                <div style={{ ...s.card, animation: mounted ? 'slideIn 0.5s ease both' : 'none' }}>
                    <div style={s.cardTop}>
                        <div style={s.cardIcon}>⚡</div>
                        <h2 style={s.cardTitle}>Create account</h2>
                        <p style={s.cardSub}>Start your journey today — it's free</p>
                    </div>

                    {error && (
                        <div style={s.errorBox}>
                            <span style={{ fontSize: '16px' }}>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} style={s.form}>
                        <div style={s.field}>
                            <label style={s.label}>Full name</label>
                            <input
                                style={{ ...s.input, ...(errors.name ? s.inputErr : {}) }}
                                placeholder="John Doe"
                                {...register('name', { required: 'Name is required' })}
                            />
                            {errors.name && <p style={s.ferr}>⚡ {errors.name.message}</p>}
                        </div>

                        <div style={s.field}>
                            <label style={s.label}>Email address</label>
                            <input
                                style={{ ...s.input, ...(errors.email ? s.inputErr : {}) }}
                                placeholder="you@example.com"
                                {...register('email', { required: 'Email is required' })}
                            />
                            {errors.email && <p style={s.ferr}>⚡ {errors.email.message}</p>}
                        </div>

                        <div style={s.field}>
                            <label style={s.label}>Password</label>
                            <input
                                type="password"
                                style={{ ...s.input, ...(errors.password ? s.inputErr : {}) }}
                                placeholder="Min 6 characters"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Min 6 characters' },
                                })}
                            />
                            {errors.password && <p style={s.ferr}>⚡ {errors.password.message}</p>}
                        </div>

                        <button type="submit" style={s.btn} disabled={loading}>
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                    <span style={s.spinner} /> Creating account...
                                </span>
                            ) : 'Create Account →'}
                        </button>
                    </form>

                    <p style={s.switchText}>
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>

                    <div style={s.secureNote}>
                        <span style={{ fontSize: '14px' }}>🔒</span>
                        <span style={s.secureText}>Your data is encrypted and never shared</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const s = {
    page: { minHeight: '100vh', display: 'flex', background: '#060612' },
    left: {
        flex: 1, padding: '3rem 4rem',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
    },
    orb1: {
        position: 'absolute', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)',
        borderRadius: '50%', top: '-150px', left: '-150px',
        animation: 'pulse 5s ease-in-out infinite',
    },
    orb2: {
        position: 'absolute', width: '350px', height: '350px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.2), transparent 70%)',
        borderRadius: '50%', bottom: '-80px', right: '-80px',
        animation: 'pulse 6s ease-in-out infinite 1.5s',
    },
    leftInner: { display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', zIndex: 1 },
    brand: { display: 'flex', alignItems: 'center', gap: '12px' },
    logoBox: {
        width: '44px', height: '44px',
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        borderRadius: '12px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '20px', animation: 'glow 3s ease-in-out infinite',
    },
    brandName: { fontSize: '20px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px' },
    tagline: { fontSize: '48px', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-2px', color: '#fff' },
    gradText: {
        background: 'linear-gradient(135deg, #a78bfa, #60a5fa, #f472b6)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        backgroundSize: '200%', animation: 'gradMove 4s ease infinite',
    },
    desc: { fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.75', maxWidth: '380px' },
    pills: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    pill: { padding: '6px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: '600', letterSpacing: '0.3px' },
    pillPurple: { background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)', color: '#a78bfa' },
    pillBlue: { background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.4)', color: '#93c5fd' },
    pillPink: { background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.4)', color: '#f9a8d4' },
    testimonial: {
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px', padding: '1.5rem', maxWidth: '400px',
    },
    stars: { color: '#fbbf24', fontSize: '16px', marginBottom: '8px', letterSpacing: '2px' },
    quote: { fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginBottom: '8px', fontStyle: 'italic' },
    quoteName: { fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontWeight: '600' },
    right: {
        width: '480px', background: '#0d0d1f',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2.5rem', borderLeft: '1px solid rgba(255,255,255,0.06)',
    },
    card: {
        width: '100%', background: '#13132a',
        borderRadius: '24px', padding: '2.5rem',
        border: '1px solid rgba(255,255,255,0.08)',
    },
    cardTop: { marginBottom: '1.8rem' },
    cardIcon: {
        width: '44px', height: '44px',
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        borderRadius: '12px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '20px', marginBottom: '1rem',
    },
    cardTitle: { fontSize: '26px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px', marginBottom: '4px' },
    cardSub: { fontSize: '14px', color: 'rgba(255,255,255,0.4)' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    field: { display: 'flex', flexDirection: 'column', gap: '7px' },
    label: { fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.8px', textTransform: 'uppercase' },
    input: {
        padding: '13px 16px', background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
        fontSize: '14px', color: '#fff', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
    },
    inputErr: { borderColor: 'rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.05)' },
    btn: {
        padding: '14px', marginTop: '0.5rem',
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        color: '#fff', border: 'none', borderRadius: '12px',
        fontSize: '15px', fontWeight: '700', cursor: 'pointer',
        fontFamily: 'Inter, sans-serif', letterSpacing: '0.3px', transition: 'all 0.2s',
    },
    spinner: {
        width: '16px', height: '16px',
        border: '2px solid rgba(255,255,255,0.3)',
        borderTop: '2px solid #fff', borderRadius: '50%',
        display: 'inline-block', animation: 'spin 0.7s linear infinite',
    },
    errorBox: {
        display: 'flex', alignItems: 'center', gap: '10px',
        background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
        color: '#fca5a5', padding: '12px 14px', borderRadius: '12px',
        fontSize: '13px', marginBottom: '1rem',
    },
    ferr: { color: '#f87171', fontSize: '12px', marginTop: '2px' },
    switchText: { textAlign: 'center', marginTop: '1.5rem', fontSize: '13px', color: 'rgba(255,255,255,0.4)' },
    secureNote: {
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        marginTop: '1rem', padding: '10px',
        background: 'rgba(255,255,255,0.03)', borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.05)',
    },
    secureText: { fontSize: '12px', color: 'rgba(255,255,255,0.3)' },
};

export default Signup;