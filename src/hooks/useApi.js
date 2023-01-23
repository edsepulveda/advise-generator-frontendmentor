const baseURL = 'https://api.adviceslip.com/advice'

export const getAdvice = async() => {
  const res = await fetch(baseURL)
  const data = await res.json()
  const object = data.slip
  return object
}