const jsonToQuery = jsonData => {
  let query = ''
  const keys = Object.keys(jsonData)
  for (let i = 0; i < keys.length; i++) {
    query += (i === 0 ? '?' : '&') + keys[i] + '=' + jsonData[keys[i]]
  }
  return query
}

export default jsonToQuery
