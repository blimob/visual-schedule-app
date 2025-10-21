import { createServer } from 'http'
import { readFile } from 'fs/promises'
import { extname, join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import portfinder from 'portfinder'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PORT = 3000

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
}

const server = createServer(async (req, res) => {
  console.log('Request:', req.url)
  
  let filePath
  
  if (req.url === '/') {
    filePath = join(__dirname, 'public', 'index.html')
  }

  else if (req.url.startsWith('/css/') || req.url.startsWith('/assets/')) {
    filePath = join(__dirname, 'public', req.url)
  }

  else if (req.url.startsWith('/src/')) {
    filePath = join(__dirname, req.url.substring(1))
  }

  else if (req.url.startsWith('/node_modules/')) {
    filePath = join(__dirname, req.url.substring(1))
  }

  else {
    filePath = join(__dirname, 'public', req.url)
  }

  const ext = extname(filePath)
  const contentType = mimeTypes[ext] || 'application/octet-stream'

  try {
    const content = await readFile(filePath)
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(content, 'utf-8')
  } catch (error) {
    console.error('Error loading:', filePath, error.message)
    if (error.code === 'ENOENT') {
      res.writeHead(404)
      res.end('File not found: ' + req.url)
    } else {
      res.writeHead(500)
      res.end('Server error: ' + error.code)
    }
  }
})

portfinder.getPort((err, port) => {
  server.listen(port, () => {
    console.log(` Server running at http://localhost:${port}/`)
  })
})