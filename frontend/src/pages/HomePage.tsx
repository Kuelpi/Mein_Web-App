// HomePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecommendations } from '../context/RecommendationContext';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}> = ({ icon, title, description, color }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '1px solid rgba(0, 0, 0, 0.03)'
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '14px',
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
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#111827',
      marginBottom: '0.75rem'
    }}>{title}</h3>
    <p style={{
      color: '#6b7280',
      lineHeight: '1.6',
      fontSize: '0.9375rem'
    }}>{description}</p>
  </div>
);

export const HomePage: React.FC = () => {
  const [symptom, setSymptom] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const { searchRecommendations, isLoading } = useRecommendations();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptom && !diagnosis) return;
    
    await searchRecommendations(symptom, diagnosis);
    navigate('/results');
  };

  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      title: "Secure & Private",
      description: "Your health data is encrypted and never stored without your explicit consent.",
      color: "#2563eb"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      ),
      title: "Informed Decisions",
      description: "Get evidence-based recommendations to help guide your healthcare journey.",
      color: "#10b981"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      title: "Trusted Guidance",
      description: "Backed by medical professionals and the latest healthcare research.",
      color: "#8b5cf6"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        paddingTop: '6rem',
        paddingBottom: '8rem',
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#111827',
            marginBottom: '1.5rem',
            letterSpacing: '-0.025em'
          }}>
            Your Health, <span style={{ color: '#2563eb' }}>Simplified</span>
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#4b5563',
            maxWidth: '42rem',
            margin: '0 auto 3rem',
            lineHeight: 1.6
          }}>
            Get personalized healthcare recommendations based on your symptoms or diagnosis, 
            all while maintaining complete privacy and security.
          </p>

          <form onSubmit={handleSubmit} style={{
            maxWidth: '36rem',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  fontSize: '1rem',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  outline: 'none',
                  transition: 'all 0.2s',
                  paddingRight: '3rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                }}
                placeholder="Describe your symptoms..."
              />
              <div style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9ca3af',
              fontSize: '0.875rem',
              margin: '0.5rem 0'
            }}>
              <span style={{ padding: '0 1rem', backgroundColor: '#f9fafb' }}>or</span>
            </div>
            
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  fontSize: '1rem',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  outline: 'none',
                  transition: 'all 0.2s',
                  paddingRight: '3rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                }}
                placeholder="Enter a known diagnosis..."
              />
              <div style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 8 9 8 13"></polyline>
                </svg>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading || (!symptom && !diagnosis)}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginTop: '1rem',
                opacity: (isLoading || (!symptom && !diagnosis)) ? '0.6' : '1',
                pointerEvents: (isLoading || (!symptom && !diagnosis)) ? 'none' : 'auto'
              }}
              onMouseOver={(e) => {
                if (!isLoading && (symptom || diagnosis)) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isLoading ? 'Analyzing...' : 'Get Recommendations'}
            </button>
            
            <p style={{
              fontSize: '0.75rem',
              color: '#9ca3af',
              marginTop: '1rem',
              lineHeight: 1.5
            }}>
              By continuing, you agree to our Terms and Privacy Policy.
              <br />
              Your data is processed securely and never shared without your consent.
            </p>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '6rem 2rem',
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 700,
            color: '#111827',
            marginBottom: '1rem',
            letterSpacing: '-0.025em'
          }}>
            Designed with You in Mind
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#4b5563',
            maxWidth: '48rem',
            margin: '0 auto 4rem',
            lineHeight: 1.6
          }}>
            Our platform combines cutting-edge technology with a human touch to deliver 
            healthcare guidance you can trust.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 2rem',
        textAlign: 'center',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '48rem',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 700,
            color: '#111827',
            marginBottom: '1.5rem',
            letterSpacing: '-0.025em'
          }}>
            Ready to take control of your health?
          </h2>
          
          <p style={{
            fontSize: '1.125rem',
            color: '#4b5563',
            marginBottom: '2.5rem',
            lineHeight: 1.6
          }}>
            Join thousands of users who have already discovered a better way to manage 
            their healthcare journey with confidence.
          </p>
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              backgroundColor: 'white',
              color: '#2563eb',
              border: '1px solid #2563eb',
              padding: '0.75rem 2rem',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              margin: '0 0.5rem 1rem 0'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};