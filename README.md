
## Fonctionnalités:

- Chargement des données
- Filtrage par nom / genre / date / position
- Affichage des entrées courantes dans un tableur
- Affichage des entrées courantes sur une carte leaflet
  * Chargement des markers morcelé (chunkProgress) pour ne pas bloquer la vue
  * Utilisation de cluster pour les performances et la visiblité
- Détails de l'entrée au clic sur une ligne du tableau ou un marker de la carte
- Filtrage automatique à partir d'une entrée (date et position)

## Demo:

Par défaut, l'application charge 102k points.
Il est possible de tester avec 32k points: [http://bertrandg.github.io/testMap/dist/#/map?tab=32k](http://bertrandg.github.io/testMap/dist/#/map?tab=32k)
Il est possible de tester avec 64k points: [http://bertrandg.github.io/testMap/dist/#/map?tab=64k](http://bertrandg.github.io/testMap/dist/#/map?tab=64k)

## Pour installer l'application:

- `git clone https://github.com/bertrandg/testMap.git`
- `cd testMap`
- `npm install`
- `bower install`

## Pour utiliser l'application:

- `gulp serve` <- lance un serveur en local pour développer (DEV)
  * [http://localhost:3000/](http://localhost:3000/) <- application
  * [http://localhost:3001/](http://localhost:3001/) <- paramétrage browsersync
- `gulp build` <- génére l'application dans le dossier dist (PROD)

### Utilisation du générateur Yeoman pour créer le projet:
[https://github.com/Swiip/generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular)
