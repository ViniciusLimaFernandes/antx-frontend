import { Factory } from 'rosie'
import { defaultFactory, aroundNumber } from './_commom'

import MapCoordsDto from '../MapCoords.dto'
import { senacLat, senacLong } from 'App/config'

const randomSenacLat = () => aroundNumber(senacLat, 0.001)
const randomSenacLong = () => aroundNumber(senacLong, 0.001)

const MapCoords = Factory.define('MapCoords', MapCoordsDto)
  .extend(defaultFactory)
  .attr('x', () => randomSenacLat())
  .attr('y', () => randomSenacLong())

export default MapCoords