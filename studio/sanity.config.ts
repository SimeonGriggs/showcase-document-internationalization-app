import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'

import {schemaTypes} from './src/schemas'
import {supportedLanguages} from '../i18n'

export default defineConfig({
  name: 'default',
  title: 'demo-course-platform',

  projectId: '6h1mv88x',
  dataset: 'production-v3',

  plugins: [
    deskTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages,
      schemaTypes: ['lesson'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
