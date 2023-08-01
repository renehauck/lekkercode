# Verwende das offizielle Node.js-Image als Basis
FROM node:16-alpine

# Setze das Arbeitsverzeichnis innerhalb des Containers
WORKDIR /app

# Kopiere die package.json und yarn.lock in das Arbeitsverzeichnis
COPY package.json yarn.lock ./

# Installiere die Abhängigkeiten mit Yarn
RUN yarn install

# Kopiere den gesamten Code in das Arbeitsverzeichnis im Container
COPY . .

# Kompiliere TypeScript zu JavaScript
RUN yarn build

# Setze die Umgebungsvariable für den Port, auf dem der Server laufen soll
ENV PORT 3000

# Exponiere den Port, auf dem der Server laufen soll
EXPOSE 3000

# Starte den Server
CMD ["yarn", "start"]
