interface RedFlagCheckResult {
  isEmergency: boolean;
  message?: string;
  matchedFlags?: string[];
}

// Liste der roten Flaggen (Notfallsymptome) und entsprechender Nachrichten
const RED_FLAGS: Array<{
  keywords: string[];
  message: string;
  severity: 'high' | 'medium' | 'low';
}> = [
  {
    keywords: [
      'brustschmerz', 'herzschmerz', 'herzstechen', 'herzrasen', 'herzinfarkt',
      'atemnot', 'atem not', 'keine luft', 'luftnot', 'atemstillstand'
    ],
    message: 'Starke Brustschmerzen oder Atemnot können auf einen Herzinfarkt oder eine Lungenembolie hinweisen. Suchen Sie sofort medizinische Hilfe auf oder rufen Sie den Notruf 112 an!',
    severity: 'high'
  },
  {
    keywords: [
      'lähmung', 'taubheitsgefühl', 'sprechstörung', 'sehstörung', 'gesichtslähmung',
      'halbseitenlähmung', 'schlaganfall', 'gehirnschlag', 'hirnschlag'
    ],
    message: 'Plötzlich auftretende Lähmungen, Taubheitsgefühle oder Sprachstörungen können Anzeichen eines Schlaganfalls sein. Rufen Sie sofort den Notruf 112 an!',
    severity: 'high'
  },
  {
    keywords: [
      'bewusstlosigkeit', 'ohnmacht', 'bewusstseinstrübung', 'nicht ansprechbar',
      'krampfanfall', 'epileptischer anfall'
    ],
    message: 'Bewusstlosigkeit oder schwere Bewusstseinsstörungen erfordern sofortige medizinische Hilfe. Rufen Sie den Notruf 112 an!',
    severity: 'high'
  },
  {
    keywords: [
      'starke blutung', 'blutsturz', 'unstillbare blutung', 'blut erbrechen',
      'schwarzer stuhl', 'blutiger stuhl', 'blutiger urin'
    ],
    message: 'Starke oder unstillbare Blutungen erfordern sofortige medizinische Hilfe. Rufen Sie den Notruf 112 an!',
    severity: 'high'
  },
  {
    keywords: [
      'allergische reaktion', 'anaphylaxie', 'anaphylaktischer schock',
      'zungenschwellung', 'gesichtsschwellung', 'kehlkopfschwellung'
    ],
    message: 'Schwere allergische Reaktionen mit Atemnot oder Schwellungen im Gesichts- und Halsbereich können lebensbedrohlich sein. Rufen Sie sofort den Notruf 112 an!',
    severity: 'high'
  },
  {
    keywords: [
      'hohes fieber', 'fieberkrampf', 'fieber über 40', 'fieber mit nackensteife',
      'fieber mit hautausschlag', 'fieber mit verwirrtheit'
    ],
    message: 'Sehr hohes Fieber (über 40°C) oder Fieber mit Nackensteife, Verwirrtheit oder Hautausschlag erfordern umgehende medizinische Abklärung. Suchen Sie bitte sofort einen Arzt auf!',
    severity: 'medium'
  }
];

export const checkForRedFlags = (text: string): RedFlagCheckResult => {
  if (!text || typeof text !== 'string') {
    return { isEmergency: false };
  }

  const lowerText = text.toLowerCase();
  const matchedFlags: string[] = [];

  for (const flag of RED_FLAGS) {
    const hasMatch = flag.keywords.some(keyword => lowerText.includes(keyword));
    if (hasMatch) {
      matchedFlags.push(flag.message);
      
      // Bei hoher Dringlichkeit sofort zurückkehren
      if (flag.severity === 'high') {
        return {
          isEmergency: true,
          message: flag.message,
          matchedFlags: [flag.message]
        };
      }
    }
  }

  if (matchedFlags.length > 0) {
    return {
      isEmergency: true,
      message: matchedFlags[0], // Nimm die erste gefundene Meldung
      matchedFlags
    };
  }

  return { isEmergency: false };
};
