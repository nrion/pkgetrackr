function doAjax(url, method, data, command) {
  const xhr = new XMLHttpRequest(); 
  
  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      command(JSON.parse(xhr.responseText));
    }
  }

  xhr.open(method, url, true);
  xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('theJwt')}`)
  if (method === 'POST') {
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(data))
  }
  else {
    xhr.send();
  }
}