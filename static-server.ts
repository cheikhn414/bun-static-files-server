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
  ".txt": "text/plain"
};

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || "application/octet-stream";
}

const server = serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
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

console.log(`🚀 Serveur de fichiers statiques démarré sur http://localhost:${PORT}`);
console.log(`📁 Répertoire public : ${PUBLIC_DIR}`);

watch(PUBLIC_DIR, { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(`🔄 Fichier modifié : ${filename}`);
  }
});