BIRKENBIHL-SPRACHENLERN-PWA – VERSION 15

Wichtiger Start-Fix:
- Die leere Flaggenauswahl aus v14 ist behoben.
- Ursache: Beim v14-Umbau wurden Funktionen des Schriftstudios versehentlich
  aus dem JavaScript entfernt. Dadurch brach der Start vor initStartScreen ab.
- Das vollständige Schriftstudio aus v13 ist wiederhergestellt.
- Die Aussprachehilfe in der gewählten Muttersprache aus v14 bleibt erhalten.
- Hanzi Writer, Pinyin und WanaKana blockieren den Start nicht mehr.
- Diese Bibliotheken werden erst bei Bedarf geladen.
- Der Service Worker lädt die Startseite network-first und löscht alte Caches.

Erhalten:
24 Sprachen, 120 Lektionen, Festigungsstudio, Aussprachehilfe,
Strichfolge/Strichnummern, Schreibprüfung und Schreibheft.
