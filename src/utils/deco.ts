export const decode64 = (base64: string) => {
  const buff = new Buffer(base64, 'base64')
  const text = buff.toString('ascii')
  return JSON.parse(text)
}
