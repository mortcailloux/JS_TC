function isEven(n){
    if (n<0){
      return isEven(-n);
    }
    else if (n==1){
      return false;
    }
    else if (n==0){
      return true;
      }
    else{
      return isEven(n-2);
      }
  }
  
        
  
  console.log(isEven(62));
  // → true
  console.log(isEven(75));
  // → false
  console.log(isEven(-2));
  // → true