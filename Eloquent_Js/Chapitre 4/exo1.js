function range(start,end,step){
    let result=[];
    for (let i=start; i<=end; i=i+step){
         result.push(i);
        }
    return result
  }
  function sum(tableau){
    let result=0;
    for (let i=0; i<tableau.length; i++){
      result+=tableau[i];
      }
    return result;
    }
  
  console.log(range(1, 10,1));
  // → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  console.log(sum(range(1, 10,1)));
  // → 55