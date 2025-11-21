import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  color?: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  color = '#2563eb',
  className = '' 
}) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2.5rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(0, 0, 0, 0.03)'
  }} className={className}>
    <div style={{
      width: '56px',
      height: '56px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1.5rem',
      backgroundColor: `${color}10`,
      color: color
    }}>
      {icon}
    </div>
    <h3 style={{
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#111827',
      marginBottom: '1rem'
    }}>{title}</h3>
    <div style={{
      color: '#4b5563',
      lineHeight: '1.7',
      fontSize: '1.0625rem'
    }}>
      {typeof description === 'string' ? (
        <p style={{ margin: 0 }}>{description}</p>
      ) : (
        description
      )}
    </div>
  </div>
);

export const InfoPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      title: "Sicher & Vertraulich",
      description: "Ihre Gesundheitsdaten werden verschlüsselt und niemals ohne Ihre ausdrückliche Zustimmung gespeichert oder weitergegeben.",
      color: "#2563eb"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      ),
      title: "Informierte Entscheidungen",
      description: "Erhalten Sie evidenzbasierte Empfehlungen zur Unterstützung Ihrer Gesundheitsentscheidungen.",
      color: "#10b981"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      title: "Vertrauenswürdige Beratung",
      description: "Unterstützt durch medizinisches Fachwissen und aktuelle Forschungsergebnisse.",
      color: "#8b5cf6"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      color: '#111827'
    }}>
      {/* Navigation */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 50,
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link to="/" style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            background: 'linear-gradient(to right, #2563eb, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none'
          }}>
            Nachsorge-Assist
          </Link>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <Link 
              to="/" 
              style={{
                color: '#4b5563',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.9375rem',
                transition: 'color 0.2s',
                padding: '0.5rem 0',
                borderBottom: '2px solid transparent'
              }}
            >
              Startseite
            </Link>
            <button
              onClick={() => navigate('/')}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.625rem 1.25rem',
                fontSize: '0.9375rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background-color 0.2s, transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              App starten
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        paddingTop: '8rem',
        paddingBottom: '6rem',
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '5rem',
            height: '5rem',
            borderRadius: '1.5rem',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            color: '#2563eb',
            marginBottom: '2rem'
          }}>
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#111827',
            marginBottom: '1.5rem',
            letterSpacing: '-0.025em'
          }}>
            Über <span style={{ color: '#2563eb' }}>Nachsorge-Assist</span>
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#4b5563',
            maxWidth: '42rem',
            margin: '0 auto 3rem',
            lineHeight: 1.6
          }}>
            Ihr vertrauenswürdiger Begleiter für Gesundheit und Wohlbefinden - entwickelt, um Sie auf Ihrem Weg zur Genesung zu unterstützen.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '2.5rem'
          }}>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                backgroundColor: 'white',
                color: '#2563eb',
                border: '1px solid #e5e7eb',
                borderRadius: '9999px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 16 16 12 12 8"></polyline>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              Mehr erfahren
            </button>
            <button
              onClick={() => navigate('/')}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.3)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 99, 235, 0.25)';
              }}
            >
              App starten
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {features.map((feature, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(0, 0, 0, 0.03)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.05)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
              }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                backgroundColor: `${feature.color}10`,
                color: feature.color
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#111827',
                marginBottom: '1rem'
              }}>{feature.title}</h3>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.7',
                fontSize: '1.0625rem',
                margin: 0
              }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What is Nachsorge-Assist? */}
      <section style={{
        padding: '6rem 2rem',
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        <FeatureCard
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          }
          title="Was ist Nachsorge-Assist?"
          description={
            <>
              <p style={{ marginTop: 0, marginBottom: '1.5rem' }}>
                Nachsorge-Assist ist eine innovative webbasierte Plattform, die Ihnen nach der Eingabe von Symptomen oder Diagnosen personalisierte Nachsorge- und Präventionsempfehlungen bietet. Unsere Anwendung unterstützt Sie dabei, Ihre Gesundheit aktiv zu fördern und dient als zuverlässiger Begleiter in Ihrer Gesundheitsvorsorge.
              </p>
              <p style={{ margin: 0 }}>
                Entwickelt mit Fokus auf Benutzerfreundlichkeit und Datenschutz, ermöglicht unsere Plattform einen einfachen Zugang zu wichtigen Gesundheitsinformationen, die auf Ihre individuellen Bedürfnisse zugeschnitten sind.
              </p>
            </>
          }
          color="#2563eb"
          className="mb-12"
        />
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{
        padding: '6rem 2rem',
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        <FeatureCard
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          }
          title="Wie funktioniert es?"
          description={
            <ol style={{
              listStyleType: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gap: '1.5rem'
            }}>
              {[
                "Geben Sie Ihre Symptome oder eine bekannte Diagnose in das Suchfeld ein.",
                "Unser System analysiert Ihre Eingabe auf mögliche Notfallsymptome und Risikofaktoren.",
                "Sie erhalten umgehend personalisierte Empfehlungen zur Nachsorge und Prävention.",
                "Alle Empfehlungen basieren auf aktuellen medizinischen Leitlinien und werden regelmäßig aktualisiert."
              ].map((step, index) => (
                <li key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <span style={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    color: '#2563eb',
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  }}>
                    {index + 1}
                  </span>
                  <span style={{
                    color: '#4b5563',
                    lineHeight: '1.7',
                    paddingTop: '0.25rem'
                  }}>{step}</span>
                </li>
              ))}
            </ol>
          }
          color="#10b981"
          className="mb-12"
        />
      </section>

      {/* Important Notice */}
      <section style={{
        padding: '0 2rem 6rem',
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%)',
          borderLeft: '4px solid #2563eb',
          padding: '2.5rem',
          borderRadius: '0 16px 16px 0',
          transition: 'all 0.3s ease',
          border: '1px solid rgba(37, 99, 235, 0.1)'
        }}
        onMouseOver={e => {
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.1)';
        }}
        onMouseOut={e => {
          e.currentTarget.style.boxShadow = 'none';
        }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1.25rem'
          }}>
            <div style={{
              flexShrink: 0,
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563eb'
            }}>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div>
              <h3 style={{
                fontSize: '1.375rem',
                fontWeight: 600,
                color: '#1e40af',
                marginTop: '0.25rem',
                marginBottom: '1rem'
              }}>Wichtiger Hinweis zur Nutzung</h3>
              <p style={{
                color: '#1e40af',
                lineHeight: '1.7',
                margin: 0,
                opacity: 0.9
              }}>
                Diese Anwendung dient ausschließlich Informationszwecken und ersetzt keine ärztliche Beratung, Diagnose oder Behandlung. 
                Bei akuten gesundheitlichen Beschwerden, Notfällen oder wenn Sie sich unsicher sind, suchen Sie bitte umgehend einen Arzt 
                auf oder rufen Sie den Notruf 112.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'white',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        padding: '4rem 2rem',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem'
        }}>
          <div>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              background: 'linear-gradient(to right, #2563eb, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem',
              display: 'inline-block'
            }}>
              Nachsorge-Assist
            </div>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.7',
              margin: '0.75rem 0 0',
              fontSize: '0.9375rem'
            }}>
              Ihr vertrauenswürdiger Begleiter für Gesundheit und Wohlbefinden.
            </p>
          </div>
          
          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '1.25rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>Links</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gap: '0.75rem'
            }}>
              {[
                { text: 'Startseite', url: '/' },
                { text: 'Über uns', url: '/info' },
                { text: 'Datenschutz', url: '/privacy' },
                { text: 'Nutzungsbedingungen', url: '/terms' }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.url}
                    style={{
                      color: '#4b5563',
                      textDecoration: 'none',
                      fontSize: '0.9375rem',
                      transition: 'color 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.color = '#2563eb'}
                    onMouseOut={e => e.currentTarget.style.color = '#4b5563'}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '1.25rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>Kontakt</h4>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.7',
              margin: '0 0 1rem',
              fontSize: '0.9375rem'
            }}>
              Haben Sie Fragen?<br />
              Wir helfen Ihnen gerne weiter.
            </p>
            <a 
              href="mailto:support@nachsorge-assist.de"
              style={{
                color: '#2563eb',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.9375rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.8'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              support@nachsorge-assist.de
            </a>
          </div>
        </div>
        
        <div style={{
          maxWidth: '1200px',
          margin: '4rem auto 0',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <p style={{
            color: '#9ca3af',
            fontSize: '0.875rem',
            margin: 0
          }}>
            &copy; {new Date().getFullYear()} Nachsorge-Assist. Alle Rechte vorbehalten.
          </p>
          <div style={{
            display: 'flex',
            gap: '1.5rem'
          }}>
            <a 
              href="#" 
              style={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.color = '#4b5563'}
              onMouseOut={e => e.currentTarget.style.color = '#9ca3af'}
            >
              Datenschutz
            </a>
            <a 
              href="#" 
              style={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.color = '#4b5563'}
              onMouseOut={e => e.currentTarget.style.color = '#9ca3af'}
            >
              Nutzungsbedingungen
            </a>
            <a 
              href="#" 
              style={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.color = '#4b5563'}
              onMouseOut={e => e.currentTarget.style.color = '#9ca3af'}
            >
              Impressum
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};