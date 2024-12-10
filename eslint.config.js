/* eslint-disable import/no-extraneous-dependencies */
import globals from 'globals';
import js from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';
import importPlugin from 'eslint-plugin-import'; // Import the eslint-plugin-import

// Import specific Airbnb rule files
import bestPracticesRules from 'eslint-config-airbnb-base/rules/best-practices';
import errorsRules from 'eslint-config-airbnb-base/rules/errors';
import nodeRules from 'eslint-config-airbnb-base/rules/node';
import styleRules from 'eslint-config-airbnb-base/rules/style';
import variablesRules from 'eslint-config-airbnb-base/rules/variables';
import es6Rules from 'eslint-config-airbnb-base/rules/es6';
import importsRules from 'eslint-config-airbnb-base/rules/imports';
import strictRules from 'eslint-config-airbnb-base/rules/strict';

export default [
  js.configs.recommended, // Use recommended base rules from ESLint
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        myCustomGlobal: 'readonly',
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
    },
    plugins: {
      jest: jestPlugin,
      import: importPlugin, // Register the eslint-plugin-import
    },
    rules: {
      // Manually spread the rules from each Airbnb section
      ...bestPracticesRules.rules,
      ...errorsRules.rules,
      ...nodeRules.rules,
      ...styleRules.rules,
      ...variablesRules.rules,
      ...es6Rules.rules,
      ...importsRules.rules,
      ...strictRules.rules,
      //     'import/extensions': [
      //   'error',
      //   'always', // or 'never' to disallow extensions
      //   {
      //     js: 'always', // Set to 'always' to allow the use of .js extensions
      //   },
      // ],

      // Your custom rules
      'max-classes-per-file': 'off',
      'no-underscore-dangle': 'off',
      'no-console': 'off',
      'no-shadow': 'off',
      'no-restricted-syntax': [
        'error',
        'LabeledStatement',
        'WithStatement',
      ],
    },
  },
];
