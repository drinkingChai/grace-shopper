// better queryParser 
export default function (query) { 
  return new Map(
    query.slice(1).split('&').map( 
      item => [item.split('=')[0], item.split('=')[1]])
  )
}
