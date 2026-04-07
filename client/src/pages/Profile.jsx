import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await logout();
        navigate('/login');
    };

    const initial = user?.name?.charAt(0).toUpperCase();
    const joinDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
        })
        : 'N/A';

    return (
        <div style={s.page}>

            {/* Sidebar */}
            <div style={s.sidebar}>
                <div style={s.sidebarTop}>
                    <div style={s.brand}>
                        <span style={s.logoIcon}>⚡</span>
                        <span style={s.brandName}>AuthSystem</span>
                    </div>
                    <nav style={s.nav}>
                        <div style={s.navItem}>
                            <span>👤</span> Profile
                        </div>
                        <div style={{ ...s.navItem, opacity: 0.4 }}>
                            <span>⚙️</span> Settings
                        </div>
                        <div style={{ ...s.navItem, opacity: 0.4 }}>
                            <span>🔔</span> Notifications
                        </div>
                    </nav>
                </div>
                <button onClick={handleLogout} style={s.logoutBtn} disabled={loading}>
                    {loading ? '...' : '🚪 Logout'}
                </button>
            </div>

            {/* Main content */}
            <div style={s.main}>

                {/* Top bar */}
                <div style={s.topbar}>
                    <div>
                        <h1 style={s.pageTitle}>My Profile</h1>
                        <p style={s.pageSubtitle}>Manage your account details</p>
                    </div>
                    <div style={s.topbarAvatar}>{initial}</div>
                </div>

                {/* Profile hero card */}
                <div style={s.heroCard}>
                    <div style={s.heroLeft}>
                        <div style={s.bigAvatar}>{initial}</div>
                        <div>
                            <h2 style={s.heroName}>{user?.name}</h2>
                            <p style={s.heroEmail}>{user?.email}</p>
                            <span style={s.badge}>✅ Verified Account</span>
                        </div>
                    </div>
                </div>

                {/* Stats row */}
                <div style={s.statsRow}>
                    <div style={s.statCard}>
                        <p style={s.statLabel}>Status</p>
                        <p style={s.statValue}>🟢 Active</p>
                    </div>
                    <div style={s.statCard}>
                        <p style={s.statLabel}>Role</p>
                        <p style={s.statValue}>👤 User</p>
                    </div>
                    <div style={s.statCard}>
                        <p style={s.statLabel}>Member Since</p>
                        <p style={s.statValue}>{joinDate}</p>
                    </div>
                    <div style={s.statCard}>
                        <p style={s.statLabel}>Auth Method</p>
                        <p style={s.statValue}>🔐 JWT</p>
                    </div>
                </div>

                {/* Info card */}
                <div style={s.infoCard}>
                    <h3 style={s.infoTitle}>Account Information</h3>
                    <div style={s.infoGrid}>
                        <div style={s.infoItem}>
                            <p style={s.infoLabel}>Full Name</p>
                            <p style={s.infoValue}>{user?.name}</p>
                        </div>
                        <div style={s.infoItem}>
                            <p style={s.infoLabel}>Email Address</p>
                            <p style={s.infoValue}>{user?.email}</p>
                        </div>
                        <div style={s.infoItem}>
                            <p style={s.infoLabel}>Account ID</p>
                            <p style={{ ...s.infoValue, fontSize: '12px', opacity: 0.6 }}>{user?.id}</p>
                        </div>
                        <div style={s.infoItem}>
                            <p style={s.infoLabel}>Password</p>
                            <p style={s.infoValue}>••••••••</p>
                        </div>
                    </div>
                </div>

                {/* Security card */}
                <div style={s.secCard}>
                    <h3 style={s.infoTitle}>Security Overview</h3>
                    <div style={s.secList}>
                        <div style={s.secItem}>
                            <div style={s.secLeft}>
                                <span style={s.secIcon}>🔑</span>
                                <div>
                                    <p style={s.secName}>Password</p>
                                    <p style={s.secDesc}>Hashed with bcrypt (salt rounds: 10)</p>
                                </div>
                            </div>
                            <span style={s.secBadge}>Protected</span>
                        </div>
                        <div style={s.secItem}>
                            <div style={s.secLeft}>
                                <span style={s.secIcon}>🎟️</span>
                                <div>
                                    <p style={s.secName}>Access Token</p>
                                    <p style={s.secDesc}>JWT · Expires in 15 minutes</p>
                                </div>
                            </div>
                            <span style={s.secBadge}>Active</span>
                        </div>
                        <div style={s.secItem}>
                            <div style={s.secLeft}>
                                <span style={s.secIcon}>🔄</span>
                                <div>
                                    <p style={s.secName}>Refresh Token</p>
                                    <p style={s.secDesc}>Stored in httpOnly cookie · 7 days</p>
                                </div>
                            </div>
                            <span style={s.secBadge}>Active</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const s = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        background: '#0f0f1a',
    },
    sidebar: {
        width: '240px',
        background: '#1a1a2e',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem 1rem',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
    },
    sidebarTop: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    brand: { display: 'flex', alignItems: 'center', gap: '10px', padding: '0 0.5rem' },
    logoIcon: {
        fontSize: '20px',
        background: 'rgba(108,99,255,0.2)',
        padding: '6px',
        borderRadius: '8px',
    },
    brandName: { fontSize: '17px', fontWeight: '700', color: '#fff' },
    nav: { display: 'flex', flexDirection: 'column', gap: '4px' },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 12px',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#fff',
        background: 'rgba(108,99,255,0.15)',
        cursor: 'pointer',
    },
    logoutBtn: {
        padding: '11px',
        background: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.25)',
        color: '#f87171',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        width: '100%',
    },
    main: {
        marginLeft: '240px',
        flex: 1,
        padding: '2rem 2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    topbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pageTitle: { fontSize: '24px', fontWeight: '700', color: '#fff' },
    pageSubtitle: { fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' },
    topbarAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #6c63ff, #5a52d5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        fontWeight: '700',
        color: '#fff',
    },
    heroCard: {
        background: 'linear-gradient(135deg, #1e1b4b, #1a1a2e)',
        border: '1px solid rgba(108,99,255,0.2)',
        borderRadius: '16px',
        padding: '2rem',
    },
    heroLeft: { display: 'flex', alignItems: 'center', gap: '1.5rem' },
    bigAvatar: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #6c63ff, #5a52d5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        fontWeight: '800',
        color: '#fff',
        flexShrink: 0,
    },
    heroName: { fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '4px' },
    heroEmail: { fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' },
    badge: {
        background: 'rgba(34,197,94,0.1)',
        border: '1px solid rgba(34,197,94,0.3)',
        color: '#4ade80',
        padding: '4px 12px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: '500',
    },
    statsRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
    },
    statCard: {
        background: '#1a1a2e',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '1.2rem',
    },
    statLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' },
    statValue: { fontSize: '15px', fontWeight: '600', color: '#fff' },
    infoCard: {
        background: '#1a1a2e',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        padding: '1.5rem 2rem',
    },
    infoTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#fff',
        marginBottom: '1.2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.2rem',
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    infoLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.4)' },
    infoValue: { fontSize: '14px', fontWeight: '500', color: '#fff' },
    secCard: {
        background: '#1a1a2e',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        padding: '1.5rem 2rem',
    },
    secList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    secItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.05)',
    },
    secLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    secIcon: { fontSize: '20px' },
    secName: { fontSize: '14px', fontWeight: '500', color: '#fff', marginBottom: '2px' },
    secDesc: { fontSize: '12px', color: 'rgba(255,255,255,0.4)' },
    secBadge: {
        background: 'rgba(34,197,94,0.1)',
        border: '1px solid rgba(34,197,94,0.25)',
        color: '#4ade80',
        padding: '4px 12px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: '500',
    },
};

export default Profile;