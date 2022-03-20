export function kl2m(k = 0, l = 0, n = 3, nn = n * n) {
  return k * nn + l;
}
export function ij2m(i = 0, j = 0, n = 3, nn = n * n, nnn = nn * n) {
  return nnn * ~~(j / 3) + nn * ~~(i / 3) + n * (j % 3) + (i % 3);
}

export function m2kl(m = 0, n = 3, nn = n * n) {
  return [~~(m / nn), m % nn];
}

export function m2ij(m = 0, n = 3, nn = n * n, nnn = nn * n) {
  return [(~~(m / nn) % 3 * n) + (m % n), ~~(m / nnn) * n + ~~(m / 3) % 3];
}
