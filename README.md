# Big Data Project

## Webpage
Das Front- und Backend für das [Big Data Project](https://github.com/mergej/big-data-mtg).
Die vollständige Dokumentation finden Sie dort.

### Setup

Idealerweise wird der [ETL Workflow](https://github.com/mergej/big-data-mtg) vorab ausgeführt, sodass sich Daten in der Datenbank befinden und Karten angezeigt werden können.
Folgende Schritte müssen ausgeführt werden:

  - GitHub [Repository](https://github.com/mergej/mtg-webpage) herunterladen / forken
  - `docker compose build` ausführen
  - `docker compose up` ausführen
  - Warten bis beide Container (backend, frontend) vollständig gebaut sind
  - Frontend erreichbar über `http://localhost:80`
