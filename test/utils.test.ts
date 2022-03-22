import { m2kl, kl2m, ij2m, m2ij } from '../src/hooks/utils'

describe('utils', () => {
  let _m = [
    [ 0,  1,  2,  9, 10, 11, 18, 19, 20],
    [ 3,  4,  5, 12, 13, 14, 21, 22, 23],
    [ 6,  7,  8, 15, 16, 17, 24, 25, 26],
    [27, 28, 29, 36, 37, 38, 45, 46, 47],
    [30, 31, 32, 39, 40, 41, 48, 49, 50],
    [33, 34, 35, 42, 43, 44, 51, 52, 53],
    [54, 55, 56, 63, 64, 65, 72, 73, 74],
    [57, 58, 59, 66, 67, 68, 75, 76, 77],
    [60, 61, 62, 69, 70, 71, 78, 79, 80],
  ]
  it.each`
      i |  j |  k |  l
    ${1}|${2}|${0}|${7}
    ${3}|${4}|${4}|${3}
    ${5}|${6}|${7}|${2}
  `('m2kl and kl2m i: $i j: $j k: $k l: $l', ({i, j, k, l}) => {
    expect(kl2m(k, l, 3, 9)).toBe(_m[j][i])
    expect(ij2m(i, j, 3, 9, 27)).toBe(_m[j][i])
    expect(m2kl(_m[j][i], 3, 9)).toEqual([k, l])
    expect(m2ij(_m[j][i], 3, 9, 27)).toEqual([i, j])
  })
})