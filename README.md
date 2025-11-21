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
git clone https://github.com/Kuelpi/Mein_Web-App.git
cd nachsorge-assist
```

### 2. Backend einrichten

```bash
# In das Backend-Verzeichnis wechseln
cd backend

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

### 3. Frontend einrichten

```bash
# In das Frontend-Verzeichnis wechseln
cd ../frontend

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm start
```

Die Anwendung ist nun unter `http://localhost:3000` verfügbar.

## 📄 Lizenz

Dieses Projekt ist lizenziert unter der MIT-Lizenz - siehe die [LICENSE](LICENSE) Datei für Details.
