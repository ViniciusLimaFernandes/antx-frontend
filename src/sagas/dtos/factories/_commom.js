import { Factory } from 'rosie'
import { date } from 'faker'

export const defaultFactory = Factory.define('default')
  .sequence('id')
  .attr('createdAt', date.past())
  .attr('updatedAt', date.past())

export function withoutOption (condition, defaultReturn, callbackReturn) {
  if (condition) return defaultReturn
  return callbackReturn()
}

export function exactNumber (min, max) {
  return (Math.random() * Math.abs(max - min) + min)
}

export function aroundNumber (center, distance) {
  return exactNumber(center - distance, center + distance)
}

export function number (min, max) {
  return Math.floor(exactNumber(min, max))
}

export function id () {
  return number(1, 100)
}

export function array (size, element) {
  const arr = new Array(size)
  arr.fill(element)

  return arr
}
