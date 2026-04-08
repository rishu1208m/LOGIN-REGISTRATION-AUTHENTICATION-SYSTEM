import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [activeNav, setActiveNav] = useState('profile');

    useEffect(() => { setMounted(true); }, []);

    const handleLogout = async () => {
        setLoading(true);
        await logout();
        navigate('/login');
    };

    const initial = user?.name?.charAt(0).toUpperCase() || '?';
    const joinDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Today';

    const navItems = [
        { id: 'profile', icon: '👤', label: 'Profile' },
        { id: 'security', icon: '🛡️', label: 'Security' },
        { id: 'settings', icon: '⚙️', label: 'Settings' },
        { id: 'notifications', icon: '🔔', label: 'Notifications' },
    ];

    return (
        <div style={s.page}>
            {/* Sidebar */}
            <div style={s.sidebar}>
                <div style={s.sidebarTop}>
                    <div style={s.brand}>
                        <div style={s.logoBox}>⚡</div>
                        <span style={s.brandName}>AuthSystem</span>
                    </div>

                    <nav style={s.nav}>
                        {navItems.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    ...s.navItem,
                                    ...(activeNav === item.id ? s.navActive : {}),
                                    ...(item.id !== 'profile' ? { opacity: 0.4 } : {}),
                                }}
                                onClick={() => item.id === 'profile' && setActiveNav(item.id)}
                            >
                                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                                <span>{item.label}</span>
                                {activeNav === item.id && <span style={s.navDot} />}
                            </div>
                        ))}
                    </nav>
                </div>

                <div style={s.sidebarBottom}>
                    <div style={s.sidebarUser}>
                        <div style={s.sidebarAvatar}>{initial}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={s.sidebarName}>{user?.name}</p>
                            <p style={s.sidebarEmail}>{user?.email}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} style={s.logoutBtn} disabled={loading}>
                        {loading ? '...' : '🚪 Sign out'}
                    </button>
                </div>
            </div>

            {/* Main */}
            <div style={{ ...s.main, opacity: mounted ? 1 : 0, transition: 'opacity 0.5s' }}>

                {/* Topbar */}
                <div style={s.topbar}>
                    <div>
                        <h1 style={s.pageTitle}>My Profile</h1>
                        <p style={s.pageSub}>Manage your personal information</p>
                    </div>
                    <div style={s.topRight}>
                        <div style={s.onlineDot} />
                        <span style={s.onlineText}>Online</span>
                    </div>
                </div>

                {/* Hero card */}
                <div style={s.heroCard}>
                    <div style={s.heroBg} />
                    <div style={s.heroContent}>
                        <div style={s.heroLeft}>
                            <div style={s.bigAvatar}>{initial}</div>
                            <div>
                                <h2 style={s.heroName}>{user?.name}</h2>
                                <p style={s.heroEmail}>{user?.email}</p>
                                <div style={s.heroBadges}>
                                    <span style={s.badgeGreen}>✅ Verified</span>
                                    <span style={s.badgePurple}>👤 User</span>
                                </div>
                            </div>
                        </div>
                        <div style={s.heroRight}>
                            <p style={s.joinLabel}>Member since</p>
                            <p style={s.joinDate}>{joinDate}</p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div style={s.statsRow}>
                    {[
                        { label: 'Account status', value: '🟢 Active', color: '#4ade80' },
                        { label: 'Auth method', value: '🔐 JWT', color: '#a78bfa' },
                        { label: 'Token expires', value: '⏱ 15 min', color: '#93c5fd' },
                        { label: 'Session type', value: '🍪 httpOnly', color: '#f9a8d4' },
                    ].map((stat, i) => (
                        <div key={i} style={s.statCard}>
                            <p style={s.statLabel}>{stat.label}</p>
                            <p style={{ ...s.statValue, color: stat.color }}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Two columns */}
                <div style={s.twoCol}>
                    {/* Account info */}
                    <div style={s.infoCard}>
                        <div style={s.cardHeader}>
                            <h3 style={s.cardTitle}>Account information</h3>
                            <span style={s.editBtn}>Edit</span>
                        </div>
                        <div style={s.infoGrid}>
                            {[
                                { label: 'Full name', value: user?.name },
                                { label: 'Email address', value: user?.email },
                                { label: 'Account ID', value: user?.id, mono: true },
                                { label: 'Password', value: '••••••••' },
                            ].map((item, i) => (
                                <div key={i} style={s.infoItem}>
                                    <p style={s.infoLabel}>{item.label}</p>
                                    <p style={{ ...s.infoValue, ...(item.mono ? { fontSize: '11px', opacity: 0.5, letterSpacing: '0.5px' } : {}) }}>
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security */}
                    <div style={s.infoCard}>
                        <div style={s.cardHeader}>
                            <h3 style={s.cardTitle}>Security overview</h3>
                            <span style={s.allGoodBadge}>All good</span>
                        </div>
                        <div style={s.secList}>
                            {[
                                { icon: '🔑', title: 'Password hashing', desc: 'bcrypt · salt rounds 10', status: 'Protected', color: '#4ade80' },
                                { icon: '🎟️', title: 'Access token', desc: 'JWT · expires in 15 minutes', status: 'Active', color: '#a78bfa' },
                                { icon: '🔄', title: 'Refresh token', desc: 'httpOnly cookie · 7 days', status: 'Active', color: '#93c5fd' },
                                { icon: '🚦', title: 'Protected routes', desc: 'Middleware-verified access', status: 'Enabled', color: '#fbbf24' },
                            ].map((item, i) => (
                                <div key={i} style={s.secItem}>
                                    <div style={s.secLeft}>
                                        <span style={s.secIcon}>{item.icon}</span>
                                        <div>
                                            <p style={s.secName}>{item.title}</p>
                                            <p style={s.secDesc}>{item.desc}</p>
                                        </div>
                                    </div>
                                    <span style={{ ...s.secBadge, color: item.color, borderColor: item.color + '40', background: item.color + '15' }}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const s = {
    page: { minHeight: '100vh', display: 'flex', background: '#060612' },
    sidebar: {
        width: '260px', background: '#0d0d1f',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '1.5rem 1rem', position: 'fixed', top: 0, left: 0, bottom: 0,
    },
    sidebarTop: { display: 'flex', flexDirection: 'column', gap: '2.5rem' },
    brand: { display: 'flex', alignItems: 'center', gap: '12px', padding: '0 0.5rem' },
    logoBox: {
        width: '36px', height: '36px',
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        borderRadius: '10px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '16px',
    },
    brandName: { fontSize: '17px', fontWeight: '800', color: '#fff', letterSpacing: '-0.3px' },
    nav: { display: 'flex', flexDirection: 'column', gap: '4px' },
    navItem: {
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '11px 14px', borderRadius: '12px',
        fontSize: '14px', fontWeight: '500', color: 'rgba(255,255,255,0.7)',
        cursor: 'pointer', transition: 'all 0.15s', position: 'relative',
    },
    navActive: { background: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.25)' },
    navDot: {
        position: 'absolute', right: '12px', width: '6px', height: '6px',
        background: '#7c3aed', borderRadius: '50%',
    },
    sidebarBottom: { display: 'flex', flexDirection: 'column', gap: '10px' },
    sidebarUser: {
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '12px', background: 'rgba(255,255,255,0.03)',
        borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)',
    },
    sidebarAvatar: {
        width: '34px', height: '34px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '14px', fontWeight: '700', color: '#fff', flexShrink: 0,
    },
    sidebarName: { fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    sidebarEmail: { fontSize: '11px', color: 'rgba(255,255,255,0.35)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    logoutBtn: {
        padding: '10px', background: 'rgba(239,68,68,0.08)',
        border: '1px solid rgba(239,68,68,0.2)', color: '#f87171',
        borderRadius: '12px', fontSize: '13px', fontWeight: '600',
        cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
    },
    main: { marginLeft: '260px', flex: 1, padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    topbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    pageTitle: { fontSize: '22px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px' },
    pageSub: { fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' },
    topRight: { display: 'flex', alignItems: 'center', gap: '8px' },
    onlineDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.6)' },
    onlineText: { fontSize: '13px', color: '#4ade80', fontWeight: '600' },
    heroCard: {
        borderRadius: '20px', padding: '2rem',
        background: '#13132a', border: '1px solid rgba(124,58,237,0.2)',
        position: 'relative', overflow: 'hidden',
    },
    heroBg: {
        position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(59,130,246,0.05))',
        pointerEvents: 'none',
    },
    heroContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 },
    heroLeft: { display: 'flex', alignItems: 'center', gap: '1.5rem' },
    bigAvatar: {
        width: '72px', height: '72px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '28px', fontWeight: '800', color: '#fff', flexShrink: 0,
        boxShadow: '0 0 30px rgba(124,58,237,0.4)',
    },
    heroName: { fontSize: '20px', fontWeight: '800', color: '#fff', marginBottom: '4px', letterSpacing: '-0.3px' },
    heroEmail: { fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginBottom: '10px' },
    heroBadges: { display: 'flex', gap: '8px' },
    badgeGreen: { background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)', color: '#4ade80', padding: '3px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: '600' },
    badgePurple: { background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', color: '#a78bfa', padding: '3px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: '600' },
    heroRight: { textAlign: 'right' },
    joinLabel: { fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' },
    joinDate: { fontSize: '14px', color: '#fff', fontWeight: '600' },
    statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' },
    statCard: {
        background: '#13132a', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '14px', padding: '1.2rem 1.4rem',
    },
    statLabel: { fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '8px' },
    statValue: { fontSize: '14px', fontWeight: '700' },
    twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' },
    infoCard: { background: '#13132a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '1.5rem 1.8rem' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    cardTitle: { fontSize: '15px', fontWeight: '700', color: '#fff' },
    editBtn: { fontSize: '12px', color: '#a78bfa', fontWeight: '600', cursor: 'pointer' },
    allGoodBadge: { background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)', color: '#4ade80', padding: '3px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: '600' },
    infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' },
    infoItem: { display: 'flex', flexDirection: 'column', gap: '4px' },
    infoLabel: { fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' },
    infoValue: { fontSize: '14px', fontWeight: '500', color: '#fff' },
    secList: { display: 'flex', flexDirection: 'column', gap: '10px' },
    secItem: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 14px', background: 'rgba(255,255,255,0.03)',
        borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)',
    },
    secLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    secIcon: { fontSize: '18px' },
    secName: { fontSize: '13px', fontWeight: '600', color: '#fff', marginBottom: '2px' },
    secDesc: { fontSize: '11px', color: 'rgba(255,255,255,0.35)' },
    secBadge: { padding: '3px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: '700', border: '1px solid', letterSpacing: '0.3px' },
};

export default Profile;