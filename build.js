import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('📦 Building for deployment...')

// Kopiera src/ till public/src/
fs.copySync(
  path.join(__dirname, 'src'),
  path.join(__dirname, 'public', 'src'),
  { overwrite: true }
)
console.log('✅ Copied src/ to public/src/')

// Kopiera node_modules/visual-schedule till public/vendor/
fs.ensureDirSync(path.join(__dirname, 'public', 'vendor'))
fs.copySync(
  path.join(__dirname, 'node_modules', 'visual-schedule'),
  path.join(__dirname, 'public', 'vendor', 'visual-schedule'),
  { overwrite: true }
)
console.log('✅ Copied visual-schedule to public/vendor/')

console.log('🎉 Build complete!')