# Bun Static Files Server

A simple static file server with hot reload functionality built with Bun.

## Features

- ✅ Static file serving
- 🔥 Automatic hot reload
- 📁 Multiple MIME type support
- 🔌 Real-time WebSocket reloading
- 🚀 High performance with Bun
- 💫 TypeScript support

## Installation

Make sure you have [Bun](https://bun.sh/) installed on your system.

```bash
# Clone or download the project
cd bun-static-files-server

# Install dependencies
bun install
```

## Usage

### Basic Static Server (without hot reload)

```bash
bun run start
```

### Development Server with Hot Reload (recommended)

```bash
bun run dev
```

The server will start on `http://localhost:3000` by default.

## Project Structure

```
bun-static-files-server/
├── hot-reload.ts       # Development server with hot reload
├── static-server.ts    # Basic static file server
├── package.json        # Project configuration
├── public/             # Static files directory
│   ├── index.html      # Main page
│   ├── style.css       # CSS styles
│   └── script.js       # JavaScript functionality
└── .gitignore         # Git ignore rules
```

## How It Works

### Static File Server (`static-server.ts`)
- Serves files from the `public/` directory
- Supports common MIME types (HTML, CSS, JS, images, etc.)
- Returns 404 for missing files
- Uses `Bun.file()` for efficient file handling

### Hot Reload Server (`hot-reload.ts`)
- Extends the static server with WebSocket support
- Automatically injects hot reload script into HTML files
- Watches for file changes using `fs.watch()`
- Sends reload signals to connected clients
- Maintains WebSocket connections for real-time updates

## Configuration

### Port
Change the port by modifying the `PORT` constant in the server files:

```typescript
const PORT = 3000; // Change to your preferred port
```

### Public Directory
Change the served directory by modifying the `PUBLIC_DIR` constant:

```typescript
const PUBLIC_DIR = "./public"; // Change to your preferred directory
```

## Supported File Types

- HTML (`.html`)
- CSS (`.css`)
- JavaScript (`.js`)
- JSON (`.json`)
- Images (`.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.ico`)
- Text files (`.txt`)
- WebAssembly (`.wasm`)

## Development

1. Place your static files in the `public/` directory
2. Run `bun run dev` to start the development server
3. Open `http://localhost:3000` in your browser
4. Make changes to any file in the `public/` directory
5. Watch the browser automatically reload

## License

MIT License

## Contributing

Feel free to submit issues and pull requests!
