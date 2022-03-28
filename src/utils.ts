export function kl2m(k = 0, l = 0, n = 3, nn = n * n) {
  return k * nn + l;
}
export function ij2m(i = 0, j = 0, n = 3, nn = n * n, nnn = nn * n) {
  return nnn * ~~(j / n) + nn * ~~(i / n) + n * (j % n) + (i % n);
}

export function m2kl(m = 0, n = 3, nn = n * n) {
  return [~~(m / nn), m % nn];
}

export function m2ij(m = 0, n = 3, nn = n * n, nnn = nn * n) {
  return [(~~(m / nn) % n) * n + (m % n), ~~(m / nnn) * n + (~~(m / n) % n)];
}

export function range(n = 0) {
  const ret = new Array(n);
  for (; n--; ) ret[n] = n;
  return ret;
}
