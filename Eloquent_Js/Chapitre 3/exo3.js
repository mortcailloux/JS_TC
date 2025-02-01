function countChar(string, c) {
    let compte = 0;
    for (let i = 0; i < string.length; i++) {
      if (string[i] == c) {
        compte += 1;
      }
    }
    return counted;
  }
  
  function countBs(string) {
    return countChar(string, "B");
  }
  