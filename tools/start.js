// select target language
const targetLanguage = process.env.TARGET_LOCALE || 'ja'

const path = require('path')
const fs = require('fs-extra')
const log = require('debug')('Watcher')
const chokidar = require('chokidar')
const rootDir = path.join(__dirname, '../')
const distDir = path.join(rootDir, './dist/')
const srcDir = path.join(rootDir, './src/')
const localeFile = path.join(rootDir, `./locales/${targetLanguage}.json5`)
const json5 = require('json5')
const ESLINT = require('eslint').ESLint
const eslint = new ESLINT()
log.enabled = true;

(async () => {
    formatter = await eslint.loadFormatter('stylish')
})()

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir)

async function copyFiles(file) {
    if (file && file.match('.json5')) {
        var result = formatter.format(await eslint.lintFiles(file))
        console.log(result)
        if (!!result) return false
    }

    fs.copySync(srcDir, distDir)
    fs.writeJSONSync(path.join(distDir, 'translate.json'), json5.parse(fs.readFileSync(localeFile, 'utf-8')))
    return true
}

copyFiles()

const watcher = chokidar.watch([srcDir, localeFile])

watcher.on('ready', () => log('ready'))

watcher.on('change', async (file) => {
    if (await copyFiles(file)) log(`updated: ${file}`)
})