import { Factory } from 'rosie'
import { lorem } from 'faker'
import { defaultFactory, number } from './_commom'

import TrashDto from '../Trash.dto'
import MapCoordsFactory from './MapCoords.factory'

const TrashFactory = Factory.define('Trash', TrashDto)
  .extend(defaultFactory)
  .attr('type', )
  .attr('name', () => lorem.words(2))
  .attr('percent', () => number(1, 100)/100)
  .attr('coords', () => MapCoordsFactory.build())

export default TrashFactory