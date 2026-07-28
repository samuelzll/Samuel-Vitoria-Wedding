// =============================
// MÚSICA
// =============================

function toggleMusic(){

    const musica =
    document.getElementById("musica");

    if(!musica) return;


    if(musica.paused){

        musica.play();

    }else{

        musica.pause();

    }

}




// =============================
// LIVRO
// =============================

const pages =
document.querySelectorAll(".page");


let currentPage = 0;



function showPage(index){


    if(!pages.length) return;


    pages.forEach(page=>{

        page.classList.remove("active");

    });



    pages[index].classList.add("active");


}




document.addEventListener("click",(e)=>{


    if(e.target.classList.contains("next-btn")){


        if(currentPage < pages.length - 1){

            currentPage++;

            showPage(currentPage);

        }

    }



    if(e.target.classList.contains("prev-btn")){


        if(currentPage > 0){

            currentPage--;

            showPage(currentPage);

        }

    }



});



showPage(currentPage);





// =============================
// CONTAGEM REGRESSIVA
// =============================


function iniciarContagem(){


const contador =
document.getElementById("countdown");



if(!contador) return;



const casamento =
new Date("2027-01-24T16:00:00");



setInterval(()=>{


const agora =
new Date();



const distancia =
casamento - agora;



if(distancia <= 0){

contador.innerHTML =
"Chegou o grande dia ❤️";

return;

}



const dias =
Math.floor(
distancia /
(1000*60*60*24)
);



const horas =
Math.floor(
(distancia %
(1000*60*60*24))
/
(1000*60*60)
);



const minutos =
Math.floor(
(distancia %
(1000*60*60))
/
(1000*60)
);



const segundos =
Math.floor(
(distancia %
(1000*60))
/
1000
);



contador.innerHTML =

`

${dias} dias<br>

${horas}h :
${minutos}m :
${segundos}s

`;



},1000);



}



iniciarContagem();






// =============================
// CONFIRMAÇÃO DE PRESENÇA
// =============================


function confirmarPresenca(){



const nome =
document.getElementById("nome").value.trim();



const telefone =
document.getElementById("telefone").value.trim();



const confirmado =
document.getElementById("confirmacao").checked;




if(!nome){

alert("Digite seu nome.");

return;

}



if(!telefone){

alert("Digite seu telefone.");

return;

}



if(!confirmado){

alert("Marque a confirmação de presença.");

return;

}





const convidado = {


nome:nome,


telefone:telefone,


data:
new Date().toLocaleDateString("pt-BR")


};





let convidados =

JSON.parse(

localStorage.getItem("convidados")

) || [];






// evita duplicar

const existe =

convidados.some(c=>

c.telefone === telefone

);




if(!existe){


convidados.push(convidado);


localStorage.setItem(

"convidados",

JSON.stringify(convidados)

);


}





localStorage.setItem(

"nomeConvidado",

nome

);



localStorage.setItem(

"telefoneConvidado",

telefone

);



localStorage.setItem(

"confirmado",

"sim"

);





alert(

"Presença confirmada com sucesso ❤️"

);



window.location.href =
"casa.html";



}







// =============================
// BOTÃO CHÁ DE CASA NOVA
// =============================


function abrirCasaNova(){


const confirmado =

localStorage.getItem("confirmado");



if(confirmado !== "sim"){


alert(
"Confirme sua presença primeiro."
);


return;


}



window.location.href =
"casa.html";



}









// =============================
// PIX
// =============================


function copiarPix(){


const chave =

"samuelmoreira0608@gmail.com";



navigator.clipboard.writeText(chave);



alert(
"Chave PIX copiada ❤️"
);



}







// =============================
// PRESENTES
// =============================


function contribuir(item){



const valor =

prompt(

`Qual valor deseja contribuir para ${item}?`

);




if(!valor) return;



const numeroValor =

Number(valor.replace(",","."));




if(isNaN(numeroValor)){


alert(
"Digite um valor válido."
);


return;


}





const nome =

localStorage.getItem(
"nomeConvidado"
);



const telefone =

localStorage.getItem(
"telefoneConvidado"
);






const contribuicao = {


nome:nome,


telefone:telefone,


presente:item,


valor:numeroValor,


data:

new Date()

.toLocaleDateString("pt-BR")


};






let contribuicoes =


JSON.parse(

localStorage.getItem("contribuicoes")

) || [];






contribuicoes.push(contribuicao);






localStorage.setItem(

"contribuicoes",

JSON.stringify(contribuicoes)

);







alert(

`

Obrigado pelo carinho ❤️


Presente:
${item}


Valor:
R$ ${numeroValor.toFixed(2)}


Realize o pagamento pelo PIX.

`

);



}









// =============================
// WHATSAPP
// =============================


function enviarWhatsapp(){



const nome =

localStorage.getItem(
"nomeConvidado"
) || "";



const telefone =

localStorage.getItem(
"telefoneConvidado"
) || "";





let contribuicoes =


JSON.parse(

localStorage.getItem("contribuicoes")

) || [];






const ultima =

contribuicoes
.filter(c=>c.telefone === telefone)
.pop();







const presente =

ultima ?

ultima.presente :

"Não informado";





const valor =

ultima ?

ultima.valor :

"Não informado";







const mensagem =



`Olá Samuel e Anna Vitória! ❤️


Confirmo minha presença no casamento.


Nome:
${nome}


Telefone:
${telefone}


Presente:
${presente}


Valor:
R$ ${valor}



Parabéns pelo casamento! ❤️`;






const url =


"https://wa.me/5585988338580?text="

+

encodeURIComponent(mensagem);





window.open(url,"_blank");



}







// =============================
// PROTEÇÃO CASA NOVA
// =============================


if(

window.location.pathname.includes(
"casa.html"

)

){



const confirmado =

localStorage.getItem(
"confirmado"

);



if(confirmado !== "sim"){


window.location.href =
"index.html";


}



}