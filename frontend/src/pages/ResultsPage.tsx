// ResultsPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRecommendations } from '../context/RecommendationContext';
import type { Recommendation } from '../context/RecommendationContext';

type Priority = 'high' | 'medium' | 'low';
type Category = 'lifestyle' | 'follow_up' | 'warning' | 'general';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

interface ErrorStateProps {
  error: string | null;
  onRetry: () => void;
}

interface EmergencyBannerProps {
  message: string | null;
  onClose: () => void;
}

const priorityColors: Record<Priority, string> = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
};

const categoryColors: Record<Category, string> = {
  warning: 'bg-red-50 text-red-800',
  follow_up: 'bg-blue-50 text-blue-800',
  lifestyle: 'bg-green-50 text-green-800',
  general: 'bg-gray-50 text-gray-800'
};

const LoadingSpinner: React.FC = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'white'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: 'white'
  }}>
    <div style={{
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      backgroundColor: '#fee2e2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px'
    }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </div>
    <h2 style={{
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.5rem'
    }}>Ein Fehler ist aufgetreten</h2>
    <p style={{
      color: '#6b7280',
      marginBottom: '1.5rem',
      maxWidth: '400px'
    }}>{error || 'Es gab ein Problem beim Laden der Empfehlungen.'}</p>
    <button
      onClick={onRetry}
      style={{
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '0.375rem',
        padding: '0.5rem 1rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
    >
      Erneut versuchen
    </button>
  </div>
);

const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ message, onClose }) => (
  <div style={{
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: '0.75rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: '0',
    zIndex: '50',
    borderBottom: '1px solid #fecaca'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      <span>{message || 'Bitte suchen Sie umgehend einen Arzt auf'}</span>
    </div>
    <button
      onClick={onClose}
      style={{
        background: 'none',
        border: 'none',
        color: 'currentColor',
        cursor: 'pointer',
        padding: '0.25rem',
        borderRadius: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label="Banner schließen"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
);

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    recommendations = [], 
    isLoading = false, 
    error = null, 
    isEmergency = false, 
    emergencyMessage = null 
  } = useRecommendations() || {};
  
  const [showEmergencyBanner, setShowEmergencyBanner] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  
  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);
  
  const handleCloseBanner = useCallback(() => {
    setShowEmergencyBanner(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredRecommendations = (recommendations || []).filter((rec) => {
    const matchesSearch = searchQuery === '' || 
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = priorityFilter === 'all' || rec.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || rec.category === categoryFilter;
    
    return matchesSearch && matchesPriority && matchesCategory;
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRetry} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {isEmergency && showEmergencyBanner && (
        <EmergencyBanner 
          message={emergencyMessage}
          onClose={handleCloseBanner}
        />
      )}

      <header style={{
        position: 'sticky',
        top: '0',
        zIndex: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem',
          height: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link 
            to="/" 
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #2563eb, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#3b82f6' }}>
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2.05 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 2.69v18.31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Nachsorge-Assist
          </Link>
          
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link 
              to="/info" 
              style={{
                color: '#4b5563',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#2563eb')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#4b5563')}
            >
              Über uns
            </Link>
            <button
              onClick={() => navigate('/')}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                border: 'none',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6l3-3m-3 3h18M3 12h18m-9 9l3 3 3-3m-6 0h6" />
              </svg>
              Neue Suche
            </button>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
            Ihre Gesundheitsempfehlungen
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#4b5563', maxWidth: '42rem', margin: '0 auto' }}>
            Basierend auf Ihrer Eingabe haben wir folgende personalisierte Empfehlungen für Sie zusammengestellt
          </p>
        </div>

        <div style={{
          position: 'sticky',
          top: '4rem',
          zIndex: 30,
          backgroundColor: '#f9fafb',
          padding: '1rem 0',
          marginBottom: '2rem',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Empfehlungen durchsuchen..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.5)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                }}
              />
              <div style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredRecommendations.map((recommendation) => (
            <RecommendationCard key={recommendation.id} recommendation={recommendation} />
          ))}
          
          {filteredRecommendations.length === 0 && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '2rem',
              textAlign: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                margin: '0 auto 1rem',
                color: '#9ca3af'
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827', marginBottom: '0.5rem' }}>
                Keine Empfehlungen gefunden
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem', maxWidth: '28rem', marginLeft: 'auto', marginRight: 'auto' }}>
                Es wurden keine Empfehlungen gefunden, die Ihren Suchkriterien entsprechen.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setPriorityFilter('all');
                  setCategoryFilter('all');
                }}
                style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6l3-3m-3 3h18M3 12h18m-9 9l3 3 3-3m-6 0h6" />
                </svg>
                Filter zurücksetzen
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const RecommendationCard: React.FC<{ recommendation: Recommendation }> = ({ recommendation }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityText = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'Hoch';
      case 'medium': return 'Mittel';
      case 'low': return 'Niedrig';
      default: return '';
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      transition: 'box-shadow 0.2s'
    }}
    onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)')}
    onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.05)')}
    >
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{
            padding: '0.75rem',
            borderRadius: '0.5rem',
            display: 'flex',
            flexShrink: 0,
            ...(recommendation.category === 'warning' ? {
              backgroundColor: '#fef2f2',
              color: '#dc2626'
            } : recommendation.category === 'follow_up' ? {
              backgroundColor: '#eff6ff',
              color: '#2563eb'
            } : recommendation.category === 'lifestyle' ? {
              backgroundColor: '#ecfdf5',
              color: '#059669'
            } : {
              backgroundColor: '#f9fafb',
              color: '#6b7280'
            })
          }}>
            {getCategoryIcon(recommendation.category)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {recommendation.title}
              </h3>
              <span style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '500',
                ...(recommendation.priority === 'high' ? {
                  backgroundColor: '#fee2e2',
                  color: '#b91c1c'
                } : recommendation.priority === 'medium' ? {
                  backgroundColor: '#fef3c7',
                  color: '#b45309'
                } : {
                  backgroundColor: '#dcfce7',
                  color: '#166534'
                })
              }}>
                {getPriorityText(recommendation.priority)}
              </span>
            </div>
            <p style={{
              color: '#4b5563',
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: isExpanded ? 'unset' : 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: '1.5'
            }}>
              {recommendation.description}
            </p>
          </div>
          <button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#9ca3af',
              padding: '0.25rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              flexShrink: 0,
              marginLeft: '0.5rem',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)'
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#4b5563')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#9ca3af')}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {(isExpanded || (recommendation.actions && recommendation.actions.length > 0)) && (
          <div style={{
            padding: '0 1.5rem 1.5rem',
            borderTop: '1px solid #f3f4f6',
            marginTop: '0.5rem'
          }}>
            {recommendation.actions && recommendation.actions.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#4b5563',
                  margin: '0 0 0.75rem 0'
                }}>
                  Empfohlene Maßnahmen:
                </h4>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {recommendation.actions.map((action, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
                      <span style={{ color: '#3b82f6', marginRight: '0.5rem', marginTop: '0.25rem' }}>•</span>
                      <span style={{ color: '#374151' }}>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
              fontSize: '0.875rem',
              color: '#6b7280',
              paddingTop: '1rem',
              borderTop: '1px solid #f3f4f6'
            }}>
              <span>Quelle: {recommendation.source}</span>
              <span>Aktualisiert: {new Date(recommendation.lastUpdated).toLocaleDateString('de-DE')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getCategoryIcon = (category: Category) => {
  const baseStyle = {
    width: '24px',
    height: '24px',
    flexShrink: 0
  };
  
  switch (category) {
    case 'warning':
      return (
        <svg style={{ ...baseStyle, color: '#ef4444' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      );
    case 'follow_up':
      return (
        <svg style={{ ...baseStyle, color: '#3b82f6' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <path d="M8 14h.01"></path>
          <path d="M12 14h.01"></path>
          <path d="M16 14h.01"></path>
          <path d="M8 18h.01"></path>
          <path d="M12 18h.01"></path>
        </svg>
      );
    case 'lifestyle':
      return (
        <svg style={{ ...baseStyle, color: '#10b981' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
          <line x1="2.05" y1="12" x2="22" y2="12"></line>
          <path d="M3.5 7.5l4 4"></path>
          <path d="M3.5 16.5l4-4"></path>
          <path d="M20.5 7.5l-4 4"></path>
          <path d="M20.5 16.5l-4-4"></path>
        </svg>
      );
    default:
      return (
        <svg style={{ ...baseStyle, color: '#9ca3af' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      );
  }
}