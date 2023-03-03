

// function PegarValorBotao(){
//     for()
// }
let display = document.querySelector('#display')
//display.innerHTML ='0'

let valor2 = []


let digito = document.querySelectorAll(".digito")
//console.log(digito[1].innerHTML)

for(i=0;i<digito.length;i++){
    digito[i].addEventListener('click',adicionarValor)
}

// digito.addEventListener("click", adicionarValor)

function adicionarValor(e){
    //display.innerHTML =''
    let valor = e.target.innerHTML
     valor2.push(valor);
     valor3 = valor2.toString()
     let v4 = valor3.replace(/,/gm, "");
     
     console.log(v4)
    

     //valor2.push(valor)  
    
    let p = document.querySelector('p')
    p.innerHTML = `${v4}`
    inserirValorDisplay(p)
}

function inserirValorDisplay(tag){
    
    display.appendChild(tag)
}

function mascara(){

}

function limparDisplay(){
  display.innerHTML =''
}
