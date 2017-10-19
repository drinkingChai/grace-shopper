export default function (_date) {
  const date = new Date(_date)
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
}
