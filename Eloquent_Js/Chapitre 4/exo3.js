function arrayToList(tableau) {
    let list = null;
    for (let i = tableau.length - 1; i >= 0; i--) {
      list = {value: tableau[i], rest: list};
    }
    return list;
  }
  
  function listToArray(liste) {
    let array = [];
    for (let node = liste; node; node = node.rest) {
      array.push(node.value);
    }
    return array;
  }
  
  function prepend(value, liste) {
    return {value, rest: liste};
  }
  
  function nth(liste, n) {
    if (!liste) return undefined;
    else if (n == 0) return liste.value;
    else return nth(liste.rest, n - 1);
  }