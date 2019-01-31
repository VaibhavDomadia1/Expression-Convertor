let strlenLastInput = 0;

function convertExp() {
    let table = document.getElementById("display");

    for(let i=0 ; i<strlenLastInput ; i++) {
        table.deleteRow(1);
    }

    var s = document.getElementById("getInput").value;
    var out = document.getElementById("output");
    if(s.length != 0) {
        out.innerHTML = itop(table,s);
    }
    strlenLastInput = s.length;
}



class Stack {
    constructor(N) {
        this.tos = -1;
        this.N = N;
        this.a = new Array(N);
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
        let str = "";
        for(let i=0 ; i<=this.tos ; i++) {
            str += this.a[i];
        }
        return str;
    }
}

let itop = function(table,s) {
    let st = new Stack(s.length);
    let sout = "";

    for(let i=0 ; i<s.length ; i++) {

        let row = table.insertRow(i+1);
        row.insertCell(0).innerHTML = s[i];

        if(isCharOrNum(s[i])) {
            sout += s[i];
        }
        else if(s[i] == '(') {
            st.push(s[i]);
        }
        else if(s[i] == ')') {
            while(st.tos != -1 && st.peek() != '(') {
                sout += st.pop();
            }
            st.pop();
        }
        else {
            while(st.tos != -1 && preference(s[i]) <= preference(st.peek())) {
                if(preference(s[i]) == 3 && preference(st.peek()) == 3) {
                    break;
                }
                sout += st.pop();
            }
            st.push(s[i]);
        }
        
        row.insertCell(1).innerHTML = st.display();
        row.insertCell(2).innerHTML = sout;

    }

    while(st.tos != -1) {
        sout += st.pop();
    }

    return sout;
}

let preference = function(x) {
    switch(x) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
        case '%':
            return 2;
        case '^':
            return 3;
    }
    return 0;
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
