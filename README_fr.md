# Serveur de Fichiers Statiques Bun

Un serveur de fichiers statiques simple avec fonctionnalité de rechargement automatique (hot reload) construit avec Bun.

## Fonctionnalités

- ✅ Service de fichiers statiques
- 🔥 Rechargement automatique (hot reload)
- 📁 Support de multiples types MIME
- 🔌 Rechargement en temps réel via WebSocket
- 🚀 Haute performance avec Bun
- 💫 Support TypeScript

## Installation

Assurez-vous d'avoir [Bun](https://bun.sh/) installé sur votre système.

```bash
# Cloner ou télécharger le projet
cd bun-static-files-server

# Installer les dépendances
bun install
```

## Utilisation

### Serveur Statique Basique (sans hot reload)

```bash
bun run start
```

### Serveur de Développement avec Hot Reload (recommandé)

```bash
bun run dev
```

Le serveur démarrera sur `http://localhost:3000` par défaut.

## Structure du Projet

```
bun-static-files-server/
├── hot-reload.ts       # Serveur de développement avec hot reload
├── static-server.ts    # Serveur de fichiers statiques basique
├── package.json        # Configuration du projet
├── public/             # Répertoire des fichiers statiques
│   ├── index.html      # Page principale
│   ├── style.css       # Styles CSS
│   └── script.js       # Fonctionnalité JavaScript
└── .gitignore         # Règles d'exclusion Git
```

## Comment ça Fonctionne

### Serveur de Fichiers Statiques (`static-server.ts`)
- Sert les fichiers du répertoire `public/`
- Support des types MIME courants (HTML, CSS, JS, images, etc.)
- Retourne 404 pour les fichiers manquants
- Utilise `Bun.file()` pour une gestion efficace des fichiers

### Serveur Hot Reload (`hot-reload.ts`)
- Étend le serveur statique avec le support WebSocket
- Injecte automatiquement le script de hot reload dans les fichiers HTML
- Surveille les changements de fichiers avec `fs.watch()`
- Envoie des signaux de rechargement aux clients connectés
- Maintient les connexions WebSocket pour les mises à jour en temps réel

## Configuration

### Port
Changez le port en modifiant la constante `PORT` dans les fichiers serveur :

```typescript
const PORT = 3000; // Changez vers votre port préféré
```

### Répertoire Public
Changez le répertoire servi en modifiant la constante `PUBLIC_DIR` :

```typescript
const PUBLIC_DIR = "./public"; // Changez vers votre répertoire préféré
```

## Types de Fichiers Supportés

- HTML (`.html`)
- CSS (`.css`)
- JavaScript (`.js`)
- JSON (`.json`)
- Images (`.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.ico`)
- Fichiers texte (`.txt`)

## Développement

1. Placez vos fichiers statiques dans le répertoire `public/`
2. Exécutez `bun run dev` pour démarrer le serveur de développement
3. Ouvrez `http://localhost:3000` dans votre navigateur
4. Apportez des modifications à n'importe quel fichier dans le répertoire `public/`
5. Observez le rechargement automatique du navigateur

## Licence

Licence MIT

## Contribution

N'hésitez pas à soumettre des issues et des pull requests !