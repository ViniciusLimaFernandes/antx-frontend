export default class DefaultProps {
  constructor(data = {}) {
    this.id = data.id
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}

export function fromArray (elements = [], ElementClass, options = {}) {
  return elements.map(function (el) {
    const dto = new ElementClass(el, options)
    return dto
  })
}
