import MapCoordsDto from './MapCoords.dto'

export default class MapAreaDto {
  constructor(data = {}) {
    this.id = data.id
    this.name = data.name
    this.color = data.color
    this.coords = new MapCoordsDto(data.coords)
  }
}