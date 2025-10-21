import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('📦 Building for deployment...')

fs.copySync(
  path.join(__dirname, 'src'),
  path.join(__dirname, 'public', 'src'),
  { overwrite: true }
)
console.log('✅ Copied src/ to public/src/')

fs.ensureDirSync(path.join(__dirname, 'public', 'lib'))
fs.copySync(
  path.join(__dirname, 'node_modules', 'visual-schedule'),
  path.join(__dirname, 'public', 'lib', 'visual-schedule'),
  { overwrite: true }
)
console.log('✅ Copied visual-schedule to public/lib/')

console.log('🎉 Build complete!')