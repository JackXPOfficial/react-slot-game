import { LowSync } from 'lowdb';
import { LocalStorage } from 'lowdb/browser'

const defaultData = {
    texte: [
      'Hallo, mir geht es gut.',
      'Was machst du heute?',
      'Ich bin Jakob.'
    ]
  };

const adapter = new LocalStorage('db');
export const db = new LowSync(adapter, defaultData);