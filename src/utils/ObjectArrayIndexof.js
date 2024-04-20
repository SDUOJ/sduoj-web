export const indexof = function (array, propName, val) {
  const a = [];
  array.forEach(item => {
    a.push(item[propName])
  })
  return a.indexOf(val)
}
