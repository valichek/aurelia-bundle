System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "ignore": [
      "github:*",
      "npm:*"
    ],
    "stage": 0,
    "optional": []
  },
  paths: {
    "github:*": "https://cdn.rawgit.com/valichek/aurelia-bundle/i18n-0.5.2v0.0.4/jspm_packages/github/*",
    "npm:*": "https://cdn.rawgit.com/valichek/aurelia-bundle/i18n-0.5.2v0.0.4/jspm_packages/npm/*",
    "aurelia-bundle": "https://cdn.rawgit.com/valichek/aurelia-bundle/i18n-0.5.2v0.0.4/dist/aurelia-bundle"
  },
  bundles: {
    "aurelia-bundle": [
      "dist/zzzz.js",
      "npm:aurelia-binding@1.0.0-beta.1.3.3",
      "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0",
      "npm:aurelia-fetch-client@1.0.0-beta.1.2.3",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0",
      "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2",
      "npm:aurelia-history-browser@1.0.0-beta.1.2.0",
      "npm:aurelia-http-client@1.0.0-beta.1.2.0",
      "npm:aurelia-framework@1.0.0-beta.1.2.2",
      "npm:aurelia-history@1.0.0-beta.1.2.0",
      "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "npm:aurelia-logging-console@1.0.0-beta.1.2.0",
      "npm:aurelia-loader-default@1.0.0-beta.1.2.1",
      "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "npm:aurelia-path@1.0.0-beta.1.2.1",
      "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0",
      "npm:aurelia-polyfills@1.0.0-beta.1.1.3",
      "npm:aurelia-router@1.0.0-beta.1.2.1",
      "npm:aurelia-task-queue@1.0.0-beta.1.2.0",
      "npm:aurelia-templating@1.0.0-beta.1.2.4",
      "npm:aurelia-templating-binding@1.0.0-beta.1.2.2",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0",
      "npm:aurelia-i18n@0.5.2",
      "npm:i18next-xhr-backend@0.5.3",
      "github:systemjs/plugin-css@0.1.21",
      "github:github/fetch@1.0.0",
      "github:systemjs/plugin-text@0.0.8",
      "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0/aurelia-bootstrapper",
      "npm:aurelia-fetch-client@1.0.0-beta.1.2.3/aurelia-fetch-client",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0/aurelia-event-aggregator",
      "npm:aurelia-http-client@1.0.0-beta.1.2.0/aurelia-http-client",
      "npm:aurelia-history-browser@1.0.0-beta.1.2.0/aurelia-history-browser",
      "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2/aurelia-dependency-injection",
      "npm:aurelia-binding@1.0.0-beta.1.3.3/aurelia-binding",
      "npm:aurelia-framework@1.0.0-beta.1.2.2/aurelia-framework",
      "npm:aurelia-history@1.0.0-beta.1.2.0/aurelia-history",
      "npm:aurelia-logging@1.0.0-beta.1.2.0/aurelia-logging",
      "npm:aurelia-loader@1.0.0-beta.1.2.0/aurelia-loader",
      "npm:aurelia-loader-default@1.0.0-beta.1.2.1/aurelia-loader-default",
      "npm:aurelia-metadata@1.0.0-beta.1.2.0/aurelia-metadata",
      "npm:aurelia-logging-console@1.0.0-beta.1.2.0/aurelia-logging-console",
      "npm:aurelia-path@1.0.0-beta.1.2.1/aurelia-path",
      "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0/aurelia-route-recognizer",
      "npm:aurelia-task-queue@1.0.0-beta.1.2.0/aurelia-task-queue",
      "npm:aurelia-router@1.0.0-beta.1.2.1/aurelia-router",
      "npm:aurelia-polyfills@1.0.0-beta.1.1.3/aurelia-polyfills",
      "npm:aurelia-templating-binding@1.0.0-beta.1.2.2/aurelia-templating-binding",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/aurelia-templating-resources",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0/aurelia-templating-router",
      "npm:aurelia-i18n@0.5.2/aurelia-i18n",
      "npm:aurelia-templating@1.0.0-beta.1.2.4/aurelia-templating",
      "github:systemjs/plugin-css@0.1.21/css",
      "npm:i18next-xhr-backend@0.5.3/index",
      "github:github/fetch@1.0.0/fetch",
      "github:systemjs/plugin-text@0.0.8/text",
      "npm:aurelia-pal@1.0.0-beta.1.2.1",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/compose",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/with",
      "npm:aurelia-pal-browser@1.0.0-beta.1.2.0",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/if",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/repeat",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/show",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/hide",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/sanitize-html",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/replaceable",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/focus",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/compile-spy",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/view-spy",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/css-resource",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/binding-mode-behaviors",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/throttle-binding-behavior",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/html-sanitizer",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/binding-signaler",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/debounce-binding-behavior",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/signal-binding-behavior",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/update-trigger-binding-behavior",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/repeat-strategy-locator",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/null-repeat-strategy",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/abstract-repeater",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/html-resource-plugin",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/set-repeat-strategy",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/map-repeat-strategy",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/array-repeat-strategy",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/number-repeat-strategy",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0/route-loader",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0/route-href",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0/router-view",
      "npm:aurelia-i18n@0.5.2/i18n",
      "npm:aurelia-i18n@0.5.2/relativeTime",
      "npm:aurelia-i18n@0.5.2/rt",
      "npm:aurelia-i18n@0.5.2/df",
      "npm:aurelia-i18n@0.5.2/nf",
      "npm:aurelia-i18n@0.5.2/t",
      "npm:aurelia-i18n@0.5.2/base-i18n",
      "npm:i18next-xhr-backend@0.5.3/dist/commonjs/index",
      "npm:aurelia-pal@1.0.0-beta.1.2.1/aurelia-pal",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/repeat-utilities",
      "npm:aurelia-pal-browser@1.0.0-beta.1.2.0/aurelia-pal-browser",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/analyze-view-factory",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.3/dynamic-element",
      "npm:aurelia-i18n@0.5.2/utils",
      "npm:i18next@2.5.1",
      "npm:aurelia-i18n@0.5.2/defaultTranslations/relative.time",
      "npm:i18next-xhr-backend@0.5.3/dist/commonjs/utils",
      "npm:i18next@2.5.1/index",
      "npm:i18next@2.5.1/dist/commonjs/index",
      "npm:i18next@2.5.1/dist/commonjs/i18next",
      "npm:i18next@2.5.1/dist/commonjs/logger",
      "npm:i18next@2.5.1/dist/commonjs/ResourceStore",
      "npm:i18next@2.5.1/dist/commonjs/EventEmitter",
      "npm:i18next@2.5.1/dist/commonjs/LanguageUtils",
      "npm:i18next@2.5.1/dist/commonjs/PluralResolver",
      "npm:i18next@2.5.1/dist/commonjs/Translator",
      "npm:i18next@2.5.1/dist/commonjs/Interpolator",
      "npm:i18next@2.5.1/dist/commonjs/defaults",
      "npm:i18next@2.5.1/dist/commonjs/BackendConnector",
      "npm:i18next@2.5.1/dist/commonjs/CacheConnector",
      "npm:i18next@2.5.1/dist/commonjs/postProcessor",
      "npm:i18next@2.5.1/dist/commonjs/compatibility/v1",
      "github:jspm/nodelibs-process@0.1.2",
      "npm:i18next@2.5.1/dist/commonjs/utils",
      "github:jspm/nodelibs-process@0.1.2/index",
      "npm:process@0.11.2",
      "npm:process@0.11.2/browser"
    ]
  },

  map: {
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.0-beta.1.2.0",
    "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.3",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0",
    "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2",
    "aurelia-dialog": "npm:aurelia-dialog@0.5.10",
    "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.0.0-beta.1.2.3",
    "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.2.2",
    "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.0",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.1.2.0",
    "aurelia-http-client": "npm:aurelia-http-client@1.0.0-beta.1.2.0",
    "aurelia-i18n": "npm:aurelia-i18n@0.5.2",
    "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.2.1",
    "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.1.2.0",
    "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-beta.1.2.0",
    "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.1",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.1.3",
    "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0",
    "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.1",
    "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0",
    "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.4",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.2.2",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.2.3",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.1.2.0",
    "aurelia-validation": "npm:aurelia-validation@0.8.0",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "core-js": "npm:core-js@1.2.6",
    "css": "github:systemjs/plugin-css@0.1.21",
    "fetch": "github:github/fetch@1.0.0",
    "font-awesome": "npm:font-awesome@4.6.1",
    "i18next-xhr-backend": "npm:i18next-xhr-backend@0.5.3",
    "text": "github:systemjs/plugin-text@0.0.8",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "npm:jquery@2.2.3"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.0-beta.1.2.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.4"
    },
    "npm:aurelia-binding@1.0.0-beta.1.3.3": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0",
      "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.2.2",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.1.2.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.2.1",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-beta.1.2.0",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.1.3",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.4",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.2.2",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.2.3",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-dialog@0.5.10": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.4"
    },
    "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-framework@1.0.0-beta.1.2.2": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.3",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.4"
    },
    "npm:aurelia-history-browser@1.0.0-beta.1.2.0": {
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-http-client@1.0.0-beta.1.2.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-i18n@0.5.2": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.3",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.4",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.2.3",
      "i18next": "npm:i18next@2.5.1",
      "intl": "npm:intl@1.1.0"
    },
    "npm:aurelia-loader-default@1.0.0-beta.1.2.1": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-loader@1.0.0-beta.1.2.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-logging-console@1.0.0-beta.1.2.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-metadata@1.0.0-beta.1.2.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-pal-browser@1.0.0-beta.1.2.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-polyfills@1.0.0-beta.1.1.3": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0": {
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-router@1.0.0-beta.1.2.1": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.1",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-task-queue@1.0.0-beta.1.2.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-templating-binding@1.0.0-beta.1.2.2": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.3",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.4"
    },
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.3": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.3",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.4"
    },
    "npm:aurelia-templating-router@1.0.0-beta.1.2.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.1",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.4"
    },
    "npm:aurelia-templating@1.0.0-beta.1.2.4": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.3",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-validation@0.8.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.3",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.2",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.4"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:font-awesome@4.6.1": {
      "css": "github:systemjs/plugin-css@0.1.21"
    },
    "npm:i18next@2.5.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:intl@1.1.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
