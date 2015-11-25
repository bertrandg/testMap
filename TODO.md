## TODOS

✓ map: bug du png marker qui load pas.
X map: passer provider a google map ou autre pour avoir un meilleur zoom.
✓ filter: ajout datepicker (ui-bootstrap).
✓ modal avec details item.
✓ ouverture modal avec details item quand click sur marker.
✓ ouverture modal avec details item quand click sur entrée du tableau.
✓ filter: quand 0 results > retour etat chargement.
✓ style: bootstrapiser tout ça.
✓ style: utiliser SASS mixin & variables.
✓ style: utiliser quelques glyphicons.
✓ supprimer ui-leaflet des dependances.
- loading du json: faire un avancement.
- filter: ajouter validation sur form avec input.ng-invalid.ng-pristine { border-color: red; }
- remonter le tableau en haut quand changement de liste d'items

------------------------

# AMELIORATIONS

- mieux cleaner le clusterGroup lors de la suppression des markers (monte en mémoire lors du 2éme affichage de longue liste 100k > 50k = 500mo++).
- utiliser des vraies dates plutôt que des string.
- conserver les 100k markers sur un clusterGroup à part quand on affiche un tableaux filtré pour réutiliser par la suite.
- trouver moyen de stopper le 'chunkProgress' lors ajout markers pour pouvoir repartir d'un nouveau tableau de data.
- utiliser le systéme de filtrage intégré de ag-Grid.

------------------------

Craft Wilder -> no lat/lng
Chris Kerr -> lat/lng to ''

[
  '{{repeat(1000)}}',
  {
    id: '{{objectId()}}',
    name: '{{firstName()}} {{surname()}}',
    desc: '{{lorem(1, "paragraphs")}}',
    registered: '{{date(new Date(2015, 10, 1), new Date(), "dd/MM/YYYY")}}',
    latitude: '{{floating(45.775776, 45.742722)}}',
    longitude: '{{floating(4.797697, 4.853658)}}',
    gender: '{{gender()}}',
    phone: '+33 {{phone()}}'
  }
]