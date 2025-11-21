// nachsorge-assist/frontend/src/components/Layout.tsx
import React, { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Info', path: '/info' },
  { name: 'Results', path: '/results' },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const headerStyle = {
    position: 'fixed',
    width: '100%',
    zIndex: 50,
    transition: 'all 0.3s ease',
    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: isScrolled ? 'blur(4px)' : 'none',
    boxShadow: isScrolled ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
  } as React.CSSProperties;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={headerStyle}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            height: '4rem' 
          }}>
            {/* Logo */}
            <Link 
              to="/" 
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#111827',
                textDecoration: 'none',
                opacity: 1,
                transition: 'opacity 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Nachsorge<span style={{ color: '#2563eb' }}>Assist</span>
            </Link>

            {/* Desktop Navigation */}
            <nav style={{ display: 'none' }} className="md:block">
              <ul style={{ display: 'flex', gap: '2rem' }}>
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      style={{
                        position: 'relative',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: location.pathname === item.path ? '#2563eb' : '#6b7280',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseOver={(e) => {
                        if (location.pathname !== item.path) {
                          e.currentTarget.style.color = '#111827';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (location.pathname !== item.path) {
                          e.currentTarget.style.color = '#6b7280';
                        }
                      }}
                    >
                      {item.name}
                      {location.pathname === item.path && (
                        <span 
                          style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            height: '2px',
                            backgroundColor: '#2563eb',
                          }}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              style={{
                padding: '0.5rem',
                color: '#374151',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div style={{
            overflow: 'hidden',
            maxHeight: mobileMenuOpen ? '100vh' : '0',
            transition: 'max-height 0.3s ease',
          }}>
            <div style={{ padding: '0.5rem 1rem 1rem' }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'block',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    backgroundColor: location.pathname === item.path ? '#eff6ff' : 'transparent',
                    color: location.pathname === item.path ? '#2563eb' : '#374151',
                    marginBottom: '0.25rem',
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main content with padding for fixed header */}
      <main style={{ 
        flexGrow: 1, 
        paddingTop: '4rem',
        minHeight: 'calc(100vh - 4rem)'
      }}>
        <div style={{
          opacity: 1,
          transform: 'translateY(0)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#fff',
        borderTop: '1px solid #f3f4f6',
      }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '2rem 1rem',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: 0,
          }}>
            &copy; {new Date().getFullYear()} NachsorgeAssist. All rights reserved.
          </p>
          <p style={{
            fontSize: '0.75rem',
            color: '#9ca3af',
            margin: '0.25rem 0 0',
          }}>
            This application is for informational purposes only and does not replace medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};