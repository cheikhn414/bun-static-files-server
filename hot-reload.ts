import { serve } from "bun";
import { watch } from "fs";
import path from "path";

const PORT = 3000;
const PUBLIC_DIR = "./public";

const mimeTypes: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".wasm": "application/wasm"
};

const clients = new Set<WebSocket>();

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || "application/octet-stream";
}

function injectHotReloadScript(html: string): string {
  const script = `
<script>
(function() {
  const ws = new WebSocket('ws://localhost:${PORT}/ws');
  ws.onmessage = function(event) {
    if (event.data === 'reload') {
      window.location.reload();
    }
  };
  ws.onopen = function() {
    console.log('🔥 Hot reload connecté');
  };
  ws.onclose = function() {
    console.log('❄️ Hot reload déconnecté');
  };
})();
</script>
</body>`;
  return html.replace('</body>', script);
}

const server = serve({
  port: PORT,
  websocket: {
    message: () => {},
    open: (ws) => {
      clients.add(ws);
      console.log(`👤 Client connecté (${clients.size} clients)`);
    },
    close: (ws) => {
      clients.delete(ws);
      console.log(`👤 Client déconnecté (${clients.size} clients)`);
    }
  },
  async fetch(req, server) {
    const url = new URL(req.url);
    
    if (url.pathname === "/ws") {
      if (server.upgrade(req)) {
        return;
      }
      return new Response("Upgrade failed", { status: 500 });
    }
    
    let filePath = url.pathname;
    if (filePath === "/") {
      filePath = "/index.html";
    }
    
    const fullPath = path.join(PUBLIC_DIR, filePath);
    
    try {
      const file = Bun.file(fullPath);
      const exists = await file.exists();
      
      if (!exists) {
        return new Response("404 - File Not Found", { 
          status: 404,
          headers: { "Content-Type": "text/plain" }
        });
      }
      
      const mimeType = getMimeType(fullPath);
      
      if (mimeType === "text/html") {
        const html = await file.text();
        const htmlWithHotReload = injectHotReloadScript(html);
        return new Response(htmlWithHotReload, {
          headers: { 
            "Content-Type": mimeType,
            "Cache-Control": "no-cache"
          }
        });
      }
      
      return new Response(file, {
        headers: { 
          "Content-Type": mimeType,
          "Cache-Control": "no-cache"
        }
      });
    } catch (error) {
      return new Response("500 - Internal Server Error", { 
        status: 500,
        headers: { "Content-Type": "text/plain" }
      });
    }
  }
});

console.log(`🚀 Serveur avec hot reload démarré sur http://localhost:${PORT}`);
console.log(`📁 Répertoire public : ${PUBLIC_DIR}`);
console.log(`🔥 Hot reload activé`);

watch(PUBLIC_DIR, { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(`🔄 Fichier modifié : ${filename} - Rechargement des clients...`);
    clients.forEach(ws => {
      ws.send('reload');
    });
  }
});
