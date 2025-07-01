## Aplicație pentru Traducerea Limbajului Mimico-Gestual

## DEMO
**link youtube**: https://www.youtube.com/watch?v=v15Gu0xLzLg&t=36s
**link Drive**: https://drive.google.com/file/d/16vo2HBbWeVpQDWL5gzRPBFcVEpaeQPCT/view?usp=sharing

## Prezentare generală
Proiectul reprezintă partea practică a lucrării de dizertatie: O APLICAȚIE MOBILĂ EDUCAȚIONALĂ PENTRU LINGVISTICA SEMNELOR ȘI INTERPRETARE FOLOSIND RECUNOAȘTEREA POZEI MÂINII. Scopul este dezvoltarea unei aplicații care folosește modelul pentru recunoașterea gesturilor mâinii și convertirea acestora în text și voce. De asemenea, include instrumente educaționale pentru învățarea limbajului semnelor.

Codul este disponibil pe [GitHub](https://github.com/laura00200/LauraASLDizertatie).

## Funcționalități

- **Interpretare limbaj mimico-gestual**  
  - Înregistrare videoclipuri cu limbajul semnelor  
  - Recunoaștere gesturi  
  - Conversie gesturi în text  
  - Sinteză vocală din text  

- **Autentificare utilizator**  
  - Înregistrare cont nou (Register)
  - Autentificare (Login) 
  - Vizualizare blog și logout  

- **Instrumente de învățare**  
  - Învățarea alfabetului ASL  
  - Învățarea cuvintelor comune în ASL  
  - Chestionare de verificare a cunoștințelor  

## Instalare

### Prechizite

- **Node.js și npm**: Node.js (versiunea 14.x sau ulterioară), npm (versiunea 6.x sau ulterioară)  
- **Python**: Python 3.9 sau ulterioară  
- **MongoDB**: MongoDB 4.4 sau ulterioară  
- **Expo CLI**: Expo CLI 0.7.3 sau ulterioară  
- **FastAPI**: FastAPI 0.108 sau ulterioară  
- **Conda**: Anaconda sau Miniconda (ultima versiune)  

### Instalare prechizite

1. **Instalează Node.js și npm**:  
   Descarcă de pe [nodejs.org](https://nodejs.org/).  
2. **Instalează MongoDB**:  
   Descarcă de pe [mongodb.com](https://www.mongodb.com/try/download/community).  
3. **Instalează Conda**:  
   Urmează ghidul de pe [docs.conda.io](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html).  
4. **Instalează Expo CLI**:  
   ```sh
   npm install -g expo-cli@latest
   ```

### Configurare proiect

1. Clonează depozitul:  
   ```sh
   git clone https://github.com/laura00200/LauraASLDizertatie.git
   cd LauraASLDizertatie
   ```

#### Backend

1. Accesează directorul backend:  
   ```sh
   cd backend
   ```
2. Creează și activează un mediu Conda:  
   ```sh
   conda create --name sign-language-translation python=3.8
   conda activate sign-language-translation
   ```
3. Instalează dependențele:  
   ```sh
   pip install -r requirements.txt
   ```
4. Pornește serverul MongoDB:  
   ```sh
   mongod
   ```
5. Rulează serverul FastAPI:  
   ```sh
   uvicorn main:app --reload
   ```

#### Frontend

1. Accesează directorul frontend:  
   ```sh
   cd ../frontend
   ```
2. Instalează dependențele:  
   ```sh
   npm install
   ```
3. Pornește serverul Expo:  
   ```sh
   npm start
   ```

## Utilizare

Pentru funcționare, atât backend-ul, cât și frontend-ul trebuie pornite:

1. Verifică că serverul FastAPI rulează:  
   ```sh
   uvicorn main:app --reload
   ```
2. Verifică că serverul Expo rulează:  
   ```sh
   npm start
   ```
3. Lansează aplicația pe dispozitivul mobil folosind Expo Go.  
4. Înregistrează-te sau autentifică-te.  
5. Navighează în aplicație pentru:  
   - **Interpretare**: Înregistrează și traduce gesturile limbajului mimico-gestual.  
   - **Învățare**: Accesează resurse educaționale ASL.

## Structura proiectului
root/
├── Backend/
│   ├── api/
│   ├── asl_model/
│   ├── dal/
│   ├── dataset/
│   ├── dto/
│   ├── models/
│   ├── services/
│   ├── tests/
│   ├── utils/
│   └── server.py
└── frontend/
├── assets/
├── navigation/
├── screens/
├── App.js
└── package.json


## Lucrări viitoare

- Atingerea acurateței de 100% pentru modelul cu o singură mână.  
- Îmbunătățirea acurateței pentru modelul cu două mâini.  
- Adaptarea modelului pentru recunoașterea cuvintelor dinamice.  
- Extinderea suportului pentru limbajul semnelor românesc.  
- Creșterea fiabilității estimării poziției mâinii.  

## Licență

Acest proiect este sub licența MIT. Vezi fișierul [LICENSE](LICENSE) pentru detalii.

## Acknowledgments

Mulțumiri speciale testerilor și utilizatorilor pentru feedback-ul valoros.
