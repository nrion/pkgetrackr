function doAjax(url, command) {
  const xhr = new XMLHttpRequest(); 
  
  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      command(JSON.parse(xhr.responseText));
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
}