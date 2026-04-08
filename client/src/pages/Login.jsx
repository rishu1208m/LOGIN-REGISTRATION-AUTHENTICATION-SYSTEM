import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Login = () => {
    const { login } = useAuth();
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
            await login(data.email, data.password);
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={s.page}>
            {/* Left panel */}
            <div style={s.left}>
                <div style={s.orb1} />
                <div style={s.orb2} />
                <div style={s.orb3} />

                <div style={{ ...s.leftInner, opacity: mounted ? 1 : 0, transition: 'opacity 0.6s' }}>
                    <div style={s.brand}>
                        <div style={s.logoBox}>⚡</div>
                        <span style={s.brandName}>AuthSystem</span>
                    </div>

                    <div style={s.heroText}>
                        <h1 style={s.tagline}>
                            Welcome<br />
                            <span style={s.gradText}>back.</span>
                        </h1>
                        <p style={s.desc}>
                            Your session is secured with industry-standard JWT authentication,
                            bcrypt password hashing, and httpOnly refresh tokens.
                        </p>
                    </div>

                    <div style={s.pills}>
                        <span style={{ ...s.pill, ...s.pillPurple }}>JWT Tokens</span>
                        <span style={{ ...s.pill, ...s.pillBlue }}>bcrypt</span>
                        <span style={{ ...s.pill, ...s.pillPink }}>Refresh rotation</span>
                    </div>

                    <div style={s.featureGrid}>
                        {[
                            { icon: '🔐', title: 'JWT Auth', desc: '15-min access tokens' },
                            { icon: '🛡️', title: 'bcrypt', desc: 'Salt rounds: 10' },
                            { icon: '🍪', title: 'httpOnly cookies', desc: 'XSS-safe storage' },
                            { icon: '🚦', title: 'Protected routes', desc: 'Middleware-gated' },
                        ].map((f, i) => (
                            <div key={i} style={s.featCard}>
                                <span style={{ fontSize: '20px' }}>{f.icon}</span>
                                <div>
                                    <p style={s.featTitle}>{f.title}</p>
                                    <p style={s.featDesc}>{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right panel */}
            <div style={s.right}>
                <div style={{ ...s.card, animation: mounted ? 'slideIn 0.5s ease both' : 'none' }}>

                    <div style={s.cardTop}>
                        <div style={s.cardIcon}>⚡</div>
                        <h2 style={s.cardTitle}>Sign in</h2>
                        <p style={s.cardSub}>Enter your credentials to continue</p>
                    </div>

                    {/* Social buttons */}
                    <div style={s.socialRow}>
                        <button style={s.socialBtn}>
                            <span style={s.socialIcon}>G</span> Google
                        </button>
                        <button style={s.socialBtn}>
                            <span style={s.socialIcon}>⌘</span> GitHub
                        </button>
                    </div>

                    <div style={s.divider}>
                        <span style={s.dividerLine} />
                        <span style={s.dividerText}>or continue with email</span>
                        <span style={s.dividerLine} />
                    </div>

                    {error && (
                        <div style={s.errorBox}>
                            <span style={{ fontSize: '16px' }}>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} style={s.form}>
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={s.label}>Password</label>
                                <span style={s.forgotLink}>Forgot password?</span>
                            </div>
                            <input
                                type="password"
                                style={{ ...s.input, ...(errors.password ? s.inputErr : {}) }}
                                placeholder="Min 6 characters"
                                {...register('password', { required: 'Password is required' })}
                            />
                            {errors.password && <p style={s.ferr}>⚡ {errors.password.message}</p>}
                        </div>

                        <button type="submit" style={s.btn} disabled={loading}>
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                    <span style={s.spinner} /> Signing in...
                                </span>
                            ) : 'Sign In →'}
                        </button>
                    </form>

                    <p style={s.switchText}>
                        No account yet? <Link to="/signup">Create one free</Link>
                    </p>

                    <div style={s.secureNote}>
                        <span style={{ fontSize: '14px' }}>🔒</span>
                        <span style={s.secureText}>Secured with JWT + bcrypt encryption</span>
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
    orb3: {
        position: 'absolute', width: '200px', height: '200px',
        background: 'radial-gradient(circle, rgba(236,72,153,0.15), transparent 70%)',
        borderRadius: '50%', top: '50%', left: '60%',
        animation: 'pulse 7s ease-in-out infinite 3s',
    },
    leftInner: { display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', zIndex: 1 },
    brand: { display: 'flex', alignItems: 'center', gap: '12px' },
    logoBox: {
        width: '44px', height: '44px',
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '20px', animation: 'glow 3s ease-in-out infinite',
    },
    brandName: { fontSize: '20px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px' },
    heroText: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    tagline: { fontSize: '52px', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-2px', color: '#fff' },
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
    featureGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '420px' },
    featCard: {
        display: 'flex', alignItems: 'flex-start', gap: '12px',
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '14px', padding: '14px',
    },
    featTitle: { fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.8)', marginBottom: '2px' },
    featDesc: { fontSize: '11px', color: 'rgba(255,255,255,0.35)' },
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
    socialRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1.2rem' },
    socialBtn: {
        padding: '11px', background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
        color: 'rgba(255,255,255,0.75)', fontSize: '13px', fontWeight: '600',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
    },
    socialIcon: { fontSize: '14px', fontWeight: '700' },
    divider: { display: 'flex', alignItems: 'center', gap: '12px', margin: '0 0 1.2rem' },
    dividerLine: { flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' },
    dividerText: { fontSize: '12px', color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    field: { display: 'flex', flexDirection: 'column', gap: '7px' },
    label: { fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.8px', textTransform: 'uppercase' },
    input: {
        padding: '13px 16px', background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
        fontSize: '14px', color: '#fff', fontFamily: 'Inter, sans-serif',
        transition: 'all 0.2s',
    },
    inputErr: { borderColor: 'rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.05)' },
    btn: {
        padding: '14px', marginTop: '0.5rem',
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        color: '#fff', border: 'none', borderRadius: '12px',
        fontSize: '15px', fontWeight: '700', cursor: 'pointer',
        fontFamily: 'Inter, sans-serif', letterSpacing: '0.3px',
        transition: 'all 0.2s', backgroundSize: '200%',
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
    forgotLink: { fontSize: '12px', color: '#a78bfa', cursor: 'pointer', fontWeight: '600' },
    switchText: { textAlign: 'center', marginTop: '1.5rem', fontSize: '13px', color: 'rgba(255,255,255,0.4)' },
    secureNote: {
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        marginTop: '1rem', padding: '10px',
        background: 'rgba(255,255,255,0.03)', borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.05)',
    },
    secureText: { fontSize: '12px', color: 'rgba(255,255,255,0.3)' },
};

export default Login;