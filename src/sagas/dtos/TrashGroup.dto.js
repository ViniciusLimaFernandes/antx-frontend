import MapAreaDto from './MapArea.dto'
import MapCoordsDto from './MapCoords.dto'
import TrashDto from './Trash.dto'

export default class TrashGroupDto {
  static trashesIdList (list = []) {
    return list.map(trash => {
      let dto = new TrashDto(trash)
      return dto.id
    })
  }

  constructor (data = {}) {
    this.id = data.id
    this.list = this.trashesIdList(data.list)
    this.coords = new MapCoordsDto(data.coords)
    this.area = new MapAreaDto(data.area)
  }
}