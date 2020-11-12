import MapCoordsDto from './MapCoords.dto'

export default class MapDto {
  static elementsListOnlyCoords (list = []) {
    return list.map(element => {
      return coords = new MapCoordsDto(element.coords)
    })
  }

  constructor (data = {}) {
    this.elements = this.elementsListOnlyCoords(data.elements)
    this.width = data.width
    this.height = data.height
  }
}