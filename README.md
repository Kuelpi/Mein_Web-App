# Nachsorge-Assist

Eine webbasierte Anwendung zur Unterstützung der Nachsorge und Prävention von Erkrankungen. Die Anwendung ermöglicht es Nutzern, Symptome einzugeben und erhält darauf basierend personalisierte Nachsorge- und Präventionsempfehlungen.

## 📋 Features

- **Symptom- und Diagnoseeingabe**
- **Notfallerkennung** mit roten Flaggen für dringende Fälle
- **Personalisierte Empfehlungen** basierend auf eingegebenen Symptomen
- **Responsive Design** für optimale Darstellung auf allen Geräten
- **Barrierefreie Benutzeroberfläche** nach WCAG-Richtlinien
- **Dunkelmodus** für bessere Lesbarkeit bei geringer Beleuchtung
- **Mehrsprachige Unterstützung** (Deutsch/Englisch)

## 🛠 Technologien

- **Frontend**: 
  - React 18 mit TypeScript
  - TailwindCSS für Styling
  - React Router für Navigation
  - Axios für API-Kommunikation
  - React Hook Form für Formularverwaltung

- **Backend**:
  - Node.js mit Express
  - TypeScript
  - RESTful API
  - CORS für sichere Kommunikation
  - Jest für Tests

## 🚀 Installation

### Voraussetzungen

- Node.js (v18 oder höher)
- npm (mit Node.js installiert) oder Yarn
- Git (optional, aber empfohlen)

### 1. Repository klonen

```bash
git clone [Repository-URL]
cd nachsorge-assist
```

### 2. Backend einrichten

```bash
# In das Backend-Verzeichnis wechseln
cd backend

# Umgebungsvariablen einrichten
cp .env.example .env
# Bearbeiten Sie die .env-Datei mit Ihren Einstellungen

# Abhängigkeiten installieren
npm install

# Datenbank initialisieren (falls zutreffend)
npm run migrate

# Entwicklungsserver starten
npm run dev
```

### 3. Frontend einrichten

```bash
# In das Frontend-Verzeichnis wechseln
cd ../frontend

# Umgebungsvariablen einrichten
cp .env.example .env.local
# Bearbeiten Sie die .env.local-Datei mit Ihrer API-URL

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm start
```

Die Anwendung ist nun unter `http://localhost:3000` verfügbar.

## 🔧 Konfiguration

### Backend Umgebungsvariablen

Erstellen Sie eine `.env` Datei im `backend` Verzeichnis mit folgenden Variablen:

```
PORT=5000
NODE_ENV=development
# Fügen Sie hier Ihre spezifischen Umgebungsvariablen hinzu
```

### Frontend Konfiguration

Die Frontend-Konfiguration erfolgt über die `.env.local` Datei im `frontend` Verzeichnis:

```
REACT_APP_API_URL=http://localhost:5000/api
# Weitere Frontend-spezifische Umgebungsvariablen
```

## 🧪 Tests ausführen

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 🚀 Produktions-Build

### Frontend Build

```bash
cd frontend
npm run build
```

### Backend Starten (Produktion)

```bash
cd backend
npm run build
npm start
```

## 📄 Lizenz

Dieses Projekt ist lizenziert unter der MIT-Lizenz - siehe die [LICENSE](LICENSE) Datei für Details.

## 🤝 Mitwirken

Beiträge sind willkommen! Bitte lesen Sie unsere [CONTRIBUTING](CONTRIBUTING.md) Richtlinien für Details zu unserem Verhaltenskodex und dem Prozess für das Einreichen von Pull-Requests.

## 📧 Kontakt

Bei Fragen oder Anregungen wenden Sie sich bitte an [Ihre E-Mail-Adresse].