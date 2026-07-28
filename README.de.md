# Memory Game

Ein Memory-Kartenspiel für zwei Spieler im Browser, gebaut mit purem TypeScript, Vite und SCSS — ohne Framework, ohne Runtime-Abhängigkeiten.

🇬🇧 This README in [English](README.md)

## Screenshots

Screenshots von Start-, Settings-, Spiel- und Game-Over-Screen kommen hier hin.

## Features

- **Zwei Themes** — *Code vibes* und *Gaming*, jeweils mit eigenem Kartenset, eigener Farbwelt und eigenem Board-Styling
- **Zwei Spieler** — Blue gegen Orange, mit automatischem Zugwechsel
- **Drei Boardgrößen** — 16, 24 oder 36 Karten (8, 12 oder 18 Paare)
- **Live-Punktestand** je Spieler, dazu ein Game-Over-Screen mit Gewinner oder Unentschieden
- **Mit der Tastatur spielbar** — jede Karte ist ein echter `<button>`; gefundene Paare sind deaktiviert und werden beim Tabben übersprungen
- **Selbst gehostete Schriften** — zur Laufzeit keine externen Requests

## Tech-Stack

| | |
|---|---|
| Sprache | TypeScript 6 (`strict`, `noEmit`) |
| Build-Tool | Vite 8 |
| Styling | SCSS, 7-1-Pattern |
| Runtime-Abhängigkeiten | keine |

## Erste Schritte

### Voraussetzungen

Node.js `^20.19.0` oder `>=22.12.0` (von Vite 8 gefordert) und npm.

Version prüfen:

```bash
node -v
```

### Installieren

```bash
npm install
```

### Dev-Server starten

```bash
npm run dev
```

Vite gibt eine lokale URL aus, meist <http://localhost:5173>.

## Scripts

| Befehl | Wirkung |
|---|---|
| `npm run dev` | Startet den Vite-Dev-Server mit Hot Reload |
| `npm run build` | Prüft die Typen mit `tsc --noEmit` und bundelt nach `dist/` |
| `npm run preview` | Liefert den Production-Build aus `dist/` lokal aus |

## Spielanleitung

1. Auf dem Startbildschirm **Play** drücken.
2. Theme, Startspieler und Boardgröße wählen. Der **Start**-Button bleibt deaktiviert, bis alle drei gesetzt sind.
3. Zwei Karten aufdecken. Ein Paar bringt dem aktuellen Spieler einen Punkt und bleibt offen liegen; bei einem Fehlversuch drehen sich die Karten zurück und der andere Spieler ist dran.
4. Sind alle Paare gefunden, zeigt der Game-Over-Screen den Endstand und den Gewinner.

**Tastatur** — mit `Tab` zwischen den Karten wechseln, mit `Enter` oder `Leertaste` aufdecken.

**Debug** — `Strg` + `P` spielt das gesamte Board automatisch durch, praktisch um schnell zum Game-Over-Screen zu kommen.

## Projektstruktur

```
index.html              Alle vier Screens als statisches Markup
src/
  main.ts               Spielzustand, Logik und DOM-Updates
  innerHTML.ts          HTML-Template-Funktionen für dynamische Teile
  interfaces.ts         TypeScript-Typen
  main.scss             SCSS-Einstiegspunkt, nur @use
  abstracts/            Variablen und Mixins
  base/                 Reset und @font-face
  layout/               Seitenlayout
  components/           Karten, Buttons, Popup, Settings-Menü
  pages/                Home- und Game-Over-Screen
  themes/               Theme-spezifische Overrides
  assets/fonts/         Selbst gehostete woff2
public/assets/img/      Kartenmotive und Icons
```

Es gibt keinen Router. Alle vier Screens stehen in `index.html` und werden über das Setzen bzw. Entfernen der Klasse `.hidden` umgeschaltet.

## Bekannte Probleme

- Das *Gaming*-Theme referenziert drei Kartenbilder, die in `public/assets/img/themes/gaming/` fehlen: `Asset1@2x1.png`, `Asset2@2x1.png` und `Asset7@2x1.png`. Karten, die sie verwenden, bleiben leer. `Asset7` ist bei jeder Boardgröße betroffen.
- Die Radiobuttons im Settings-Screen haben keinen sichtbaren Fokusindikator, die Tastaturnavigation ist dort schlecht nachvollziehbar.
- Das Layout arbeitet mit festen Pixelmaßen und ist nicht responsiv.
- Noch kein Deployment.

## Credits

- Schriften: [Almarai](https://fonts.google.com/specimen/Almarai) und [Red Rose](https://fonts.google.com/specimen/Red+Rose), beide unter der SIL Open Font License, selbst gehostet als woff2
- Kartenmotive und Interface-Icons: projektspezifische Design-Assets

## Lizenz

Privates Lernprojekt. Es wird keine Lizenz zur Weiterverwendung erteilt — Teile der Grafiken stammen aus fremden Quellen.
