export default class MapCoordsDto {
  constructor(data = {}) {
    this.x = data.x
    this.y = data.y
    this.width = data.width
    this.height = data.height
    this.rotation = data.rotation
  }
}