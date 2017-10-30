function doAjax(url, command, method, extraMethods) {
  const xhr = new XMLHttpRequest(); 
  
  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      command(JSON.parse(xhr.responseText));
    }
  }

  xhr.open(method, url, true);
  if (extraMethods) { extraMethods(xhr); }
  // xhr.send();
}