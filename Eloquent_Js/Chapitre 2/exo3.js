function chess(i,j){
    let str="";
    for (let a = 0; a < i; a++) {
        if (a % 2 === 0) {
            str += " #".repeat(j / 2) + "\n";
        } else {
            str += "# ".repeat(j / 2) + "\n";
        }
    }
}
chess(8,8);