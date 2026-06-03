# Green Mobility - Atelier Digitale - Documentazione tecnica
## Cosa installare prima di far partire il progetto
- npm install
- npm install recharts
- npm install @react-google-maps/api

## Come Avviare il progetto
- npm run dev

## Panoramica del Progetto

**Green Mobility** è una piattaforma di gestione flotte per servizi di noleggio veicoli elettrici (bici e auto). L'applicazione permette di monitorare veicoli, gestire manutenzioni, visualizzare statistiche e amministrare utenti 

## Obiettivi Principali

- Monitoraggio della flotta veicoli
- Gestione delle manutenzioni programmate e straordinarie
- Tracciamento delle segnalazioni e problematiche
- Visualizzazione di statistiche 
- Gestione utenti con ruoli differenziati (Ogni utente vede solo le funzionalità del proprio ruolo.)
- Visualizzazione geografica dei veicoli su mappa

## Tecnologie
- React vite
- React Router DOM 
- Lucide React 
- Recharts
- API di Google maps

## Pagine dell'Applicazione

### 1. Login 

Pagina di autenticazione con form email/password.

**Funzionalita:**
- Form di login con validazione

**Ruoli**
- Amministratore → gestione completa del sistema, vede tutto, può fare tutto: CRUD flotta, gestione utenti, tutti i report, configurazione generale.
- Tecnico (Manutentore) → si occupa degli interventi sul campo. Vede i dispositivi assegnati, crea e aggiorna manutenzioni, segnala guasti, vede i propri report. Non tocca la configurazione del sistema.  suddividere la manutenzione ordinaria e straordinaria (data dal supporto) 
- Supporto → figura intermedia di coordinamento/back-office/supporto clienti. Monitora lo stato della flotta, vede tutti gli interventi, smista le segnalazioni, genera report. Non fa CRUD sui dispositivi e non gestisce utenti.  Il supporto riceve il problema o tramite commento/form da parte del cliente o chiamata, gestisce il problema spostando la issue al tecnico, può quindi prenotare una manutenzione.  Il supporto crea un task per la manutenzione, il tecnico poi può creare ulteriori task.

Credenziali:
- Amministartore: nome utente: "mario" ; password: "1234"
- Tecnico: nome utente: "alessandro" ; password: "1234"
- Supporto: nome utente: "chiara" ; password: "1234"

### 2. Dashboard 

Homepage dell'applicazione con panoramica generale. Ogni utente vedrà una dashboard diversa, perchè in base hai privilegi che ha, alcuni componenti sono nascosti.

**Funzionalita:**
- Grafico che rappresenta lo stato dei mezzi (quelli disponibili, in uso, in carica e fuori servizio)
- Widget stato noleggi attivi
- Widget promemoria con le nuove segnalalazioni 
- Grafico che mostra la CO2 risparmiata utilizzando i nostri servizi di trasporto ecologico
- Mappa con lo stato delle stazioni, per avere una panoramica generale ma anche per permettere al supporto di dare eventuali inidcazioni su mezzi disponibili nelle vicinanze
- Grafico andamento noleggi

### 3. Gestione Flotta (privilegi: amministratore, tecnico, supporto)

Gestione completa dei veicoli della flotta.

**Funzionalita:**
- Lista veicoli con possibilità di filtrare per: modello, autonomia, stato 
- Modifica veicolo esistente
- Eliminazione veicolo
- Ricerca per targa/modello
- Filtro per modello (macchina, bici)
- Filtro per autonomia (alta, media, bassa)
- Filtro per stato (attivo, in uso, non disponibile)

### 4. Manutenzioni (privilegi: amministratore, tecnico, supporto)

Gestione delle manutenzioni programmate e straordinarie.

**Funzionalita:**
- Lista manutenzioni con filtri
- Ci sono due tipi di intervento: ordinario (programmato, es. ricarica o pulizia, lo fa il tecnico) e straordinario (urgente, es. batteria rotta o ruota danneggiata, il supporto fa il task).
- Creazione nuovo task (manutenzione ordinaria)
- Al click di una manutenzione, possibilità di aggiornare lo stato e leggere le note aggiuntive
- Filtro per stato (in attesa, in corso, completato)
- Filtro per tipo (ordinaria, straordinaria)
- Filtro per modelli (macchina, bici)
- Filtro per tecnici
- Segnalare un guasto in modo rapido con un pulsante sempre visibile in basso a destra (manutenzione straordinaria)

### 5. Segnalazioni (privilegi: amministrazione, supporto)

Sistema per il supporto per vedere le segnalazioni mandate dai clienti e creare le task per i manutentori.

**Funzionalita:**
- Lista segnalazioni
- Creazione nuova segnalazione se per caso il cliente ha chiamato direttamente l'assistenza
- Modifica stato segnalazione
- Al click di una specifica segnalazione, si legge la nota con una specifica sulla segnalazione, la possibilità di creare il task per il manutentore e la possibilità di chiamare il cliente per eventuale maggiore assstenza

### 6. Statistiche (privilegi: amministratore)

Dashboard analitica con grafici e metriche.

**Funzionalita:**
- KPI principali: quantità CO2 risparmiata, utilizzando i nostri servizi, con andamento rispetto l'anno scorso; la quantità di bici usate nell'anno, con andamento rispetto l'anno scorso; mezzo più usato fino ad ora, con andamento rispetto l'anno scorso.
- Stato guasti: da predere in carico, in corso, risolti oggi. Per avere una panoramica sull'andamento delle manutenzioni.
- Stato flotta: disponibilità in tempo reale dei mezzi. Per avere una panoramica sull'utilizzo in tempo reale dei nostri servizi.
- Grafico andamento noleggi mensile.
- Grafico a torta per mostrare i mezzi più utilizzati.

### 7. Mappa (privilegi: amministratore, tecnico, supporto)

Visualizzazione geografica dei veicoli.

**Funzionalita:**
- Mappa con icona che rappresenta dove si possono trovare le auto/bici (icone diverse per identificarli, verde = stato attivo, rosso = stato non attivo o non disponibile, giallo = in uso).
- L'area azzurra rappresenta l'Area di Copertura del Servizio (o Area Operativa): è l'area in cui gli utenti possono trovare i mezzi parcheggiati e pronti all'uso. Inoltre rappresenta dove si può CHIUDERE il noleggio: Questo è il punto più importante. Un utente può prendere un'auto a San Siro e guidare fino a fuori Milano (quindi può "girare" anche fuori dall'azzurro), ma deve obbligatoriamente rimetterla dentro l'area azzurra per poter terminare il viaggio e interrompere il pagamento. Se la lascia fuori, l'app non gli permette di chiudere il noleggio (o gli fa pagare una penale)
- Alla selezione dell'icona è possibile trovare una panoramica delle informazioni sul mezzo selezionato (ID, stato, batteria, km percorsi) 

### 8. Gestione Utenti (privilegi: amminisratore)

Amministrazione utenti e permessi.

**Funzionalita:**
- Lista utenti registrati
- Creazione nuovo utente
- Modifica utente esistente
- Disattivazione/attivazione utente

#### Sidebar

Menu di navigazione laterale con link alle pagine. Viene aggiornato in base all'autenticazione inziale. Per alcuni profili delle pagine sono nascoste.

**Link navigazione:**
- Dashboard
- Mappa
- Statistiche
- Flotta
- Manutenzione
- Segnalazioni
- Gestione utenti


## Note Finali

### Limitazioni Attuali

- **Persistenza dati**: I dati sono mockati in file users.JSON e nelle rispettive pagine create
- **Real-time**: Nessun aggiornamento in tempo reale dei dati

### Possibili implementazioni future

- Notifiche push per scadenze e alert
- Export report in PDF/Excel
- Nella pagina della mappa, rendere i filtri dinamici
