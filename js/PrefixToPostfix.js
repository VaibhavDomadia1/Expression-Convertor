let preCount = 0;

function convertPreExpToPost() {
    let table = document.getElementById("display");

    for(let i=0 ; i<preCount ; i++) {
        table.deleteRow(1);
    }

    let s = document.getElementById("getInput").value;
    let out = document.getElementById("output");
    if(s.length != 0) {
        out.innerHTML = ptop(table,s);
    }
    preCount = s.length;
}


class Stack {
    constructor(n) {
        this.tos = -1;
        this.N = n;
        this.a = new Array(n);
    }

    push(val) {
        if(this.tos == this.N-1) {
            console.log("Stack Full");
        }
        else {
            this.a[++this.tos] = val;
        }
    }

    pop() {
        if(this.tos == -1) {
            console.log("Stack Empty");
        }
        else {
            return this.a[this.tos--];
        }
    }

    peek() {
        return this.a[this.tos];
    }

    display() {
        let sdis = "";
        for(let i=0 ; i<=this.tos ; i++) {
            sdis += this.a[i] + "    ";
        }
        return sdis;
    }
}



let ptop = function(table,s) {
    let st = new Stack(s.length);
    for(let i=s.length-1 ; i>=0 ; i--) {
        let row = table.insertRow(s.length-i);

        if(isCharOrNum(s[i])) {
            st.push(s[i]);
        }
        else {
            let x1 = st.pop();
            let x2 = st.pop();
            st.push(x1 + x2 + s[i]);
        }

        row.insertCell(0).innerHTML = s[i];
        row.insertCell(1).innerHTML = st.display();
    }
    return st.pop();
}

let isCharOrNum = function(x) {
    if(x >= 'a' && x <= 'z')
        return true;
    else if(x >= 'A' && x <= 'Z')
        return true;
    else if(x >= '0' && x <= '9')
        return true;
    else
        return false;
}