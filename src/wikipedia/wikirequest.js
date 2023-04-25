document.addEventListener('DOMContentLoaded', () => {
  setFormEvent()
})

const getForm1Element = () => {
  return document.getElementById('form1')
}

const getResultsElement = () => {
  return document.getElementById('results')
}

const getField1Element = () => {
  return document.getElementById('field1')
}

const getNoticeElements = () => {
  return document.querySelectorAll('.notice')
}

const setFormEvent = () => {
  const form1 = getForm1Element()
  form1.addEventListener('submit', (e) => {
    e.preventDefault()
    const field1Value = getField1Element().value
    fetchWikiPediaWithJsonP(field1Value)
  })
}

const getParams = (query) => {
  const pageTitle = query
  const requestData = {
    action: "parse",
    page: pageTitle,
    prop: "text",
    format: "json",
    formatversion: 2,
    disableeditsection: true
  };
  return new URLSearchParams(requestData)
}

const handleResponse = (response) => {
    const html = response.parse.text;
    console.log(html);
    getResultsElement().innerHTML = html
}

const fetchWikiPediaWithJsonP = (query) => {
  const jsonpRequest = document.createElement('script')
  const uri = 'https://ja.wikipedia.org/w/api.php'
  jsonpRequest.src = uri + '?' + getParams(query) + "&callback=handleResponse";
  console.log(jsonpRequest.src)
  document.body.appendChild(jsonpRequest)
}
