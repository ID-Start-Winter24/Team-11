
# Studini Chatbot 
>Für den Studiengang, der auch montags passt!
***
Studini ist ein Chatbot, der Studieninteressenten dabei unterstützen soll, den passenden Studiengang zu finden. 

## Inhaltsverzeichnis
1. [Allgemeine Informationen](#Allgemeine-Informationen)
2. [Technologien](#Technologien)
3. [Installation](#Installation)
4. [FAQs](#faqs)

### Allgemeine Informationen
***
Studini ist ein Chatbot, der Studieninteressenten dabei unterstützen soll, den passenden Studiengang in München zu finden. Wir beschränken uns zunächst auf die Hochschule München, die Ludwig-Maximilians-Universität München und die Technische Universität München. Studieninteressenten können Fragen zu den Modulhandbüchern, Prüfungsordnungen und Bewerbungsfristen
der jeweiligen Studiengängen stellen. So können sie zielgenau Informationen zu ihrem Wunschstudiengang finden. 

### Technologien
***

### Installation
***
BackEnd:

> 	Folgende Python-Module werden benötigt:
>  - Flask
>  - llama-index
>  - openai
>  - flask-cors
> 
>     `pip install Flask llama-index openai flask-cors`

FrontEnd:

1. Es wird [Node.js](https://nodejs.org/en) benötigt.
2. Installiere nun `npm install axios` mithilfe der Konsole (ggf. mit Adminrechten).
3. Navigiere nun mittels Konsole in das Projekt-Verzeichnis und erstelle eine react App mit `npx create-react-app mein-chatbot`

### Starten des Chatbots
- Starte das Backend in VS-Code `app.py`
- Starte nun das FrontEnd
- Navigiere hierfür in deinen mein-chatbot
`C\Users\Benutzer\Documents\Studium\1.Semester\projektmodul_start\Team-11\mein-chatbot` oder so ähnlich
- Öffne hier die Konsole
`npm start`
- es sollte sich nun der Bot in deinem Browser öffnen. Ansonsten lässt er sich auf [localhost:3000](localhost:3000) finden





### FAQs

VS-Code findet eine Datei nicht?
- Stelle sicher, dass du den ordner `mein-chatbot` in VS-Code geöffnet hast.
VS-Code kann meine Module nicht finden?
- Stelle sicher, dass das korrekte VEnv aktiv ist.
