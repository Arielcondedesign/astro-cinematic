import { deepl } from 'deepl-node';
import fs from 'fs/promises';
import path from 'path';

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const translator = new deepl.Translator(DEEPL_API_KEY);

const SOURCE_LANG = 'fr';
const TARGET_LANGS = ['es', 'en'];

async function translateJson(sourceJson, targetLang) {
  const result = {};
  
  for (const [key, value] of Object.entries(sourceJson)) {
    if (typeof value === 'object') {
      result[key] = await translateJson(value, targetLang);
    } else {
      const translation = await translator.translateText(
        value,
        SOURCE_LANG,
        targetLang
      );
      result[key] = translation.text;
    }
  }
  
  return result;
}

async function main() {
  const sourcePath = path.join('src', 'i18n', 'translations', 'fr.json');
  const sourceContent = await fs.readFile(sourcePath, 'utf-8');
  const sourceJson = JSON.parse(sourceContent);
  
  for (const lang of TARGET_LANGS) {
    const targetPath = path.join('src', 'i18n', 'translations', `${lang}.json`);
    const translatedJson = await translateJson(sourceJson, lang);
    await fs.writeFile(
      targetPath,
      JSON.stringify(translatedJson, null, 2),
      'utf-8'
    );
    console.log(`✅ Translated to ${lang}`);
  }
}

main().catch(console.error);