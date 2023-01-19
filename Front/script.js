window.onload = () => {
           
            if(localStorage.seleccionadas != undefined){
                document.getElementById("wrap").style.display = 'none';
                document.getElementById("wrap2").style.display = 'block';
                aEmpresas = JSON.parse(localStorage.seleccionadas);
                consultarApi(aEmpresas,true);
            }else{
                document.getElementById('wrap').style.display = 'block';
                document.getElementById("wrap2").style.display = 'none';
            }
            
        }
    


// const data = null;

// const xhr = new XMLHttpRequest();
// xhr.withCredentials = false;



function consultarApi(selec,local){
    let fetchs = new Array();
    let guardar = new Array();
    let src;
    let alt;
    let id;

    if(selec.length != 0){

        for(let i = 0; i < selec.length; i++){
            // /api/xxxx?empresas=x,y,z
            if(!local){
                fetchs.push(fetch(`http://127.0.0.1:8000/api/empresas/${selec[i].id.replace("im","")}`));

                
                id = selec[i].getAttribute("id")
                alt = document.getElementById(`${id}`).getAttribute("alt")

                guardar.push(id+"/"+alt)
                
                
            }else{
                let sel = JSON.parse(localStorage.getItem('seleccionadas'))
                let arr = sel[i].split("/");
                id = arr[0];
                alt = arr[1];
                guardar.push(id+"/"+alt)
                fetchs.push(fetch(`http://127.0.0.1:8000/api/empresas/${id.replace("im","")}`));
            }
            
            // pedirDato(seleccionados[i].getAttribute("id").replace("im",""));
            // let mesag = seleccionados[i].getAttribute("src").replace("Imagenes/","").replace(".png","");
            document.getElementById("resul").innerHTML += `<div class="card" id="empre${i+1}" style="width: 18rem;">
                                                                <img src="Imagenes/${id}.png" id="imcard" class="card-img-top" alt="...">
                                                                <div class="card-body">
                                                                    <h5 class="card-title">${alt}</h5>
                                                                    <p class="card-text" id="valor${id}"></p>
                                                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                                                </div>
                                                                </div>`;
            
            // setTimeout("Func1()", 4000);
        }
    }

    if(localStorage.seleccionadas != undefined){
        localStorage.removeItem('seleccionadas')
        localStorage.setItem('seleccionadas',JSON.stringify(guardar));
        document.getElementById("wrap2").style.display = 'block';

    }else{
        localStorage.setItem('seleccionadas',JSON.stringify(guardar));
        document.getElementById("wrap2").style.display = 'block';
    }

    Promise.all(fetchs)
    .then(files =>{
        files.forEach(file=>{
            process(file.json())
        })
    }).catch(err=>{

    });

    const process = (prom) =>{
        prom.then(data=>{
            document.getElementById(`valorim${data.id}`).innerHTML = data.datos;
    
        })
    }
   
}



let consultar = document.getElementById('guardar');
        consultar.addEventListener("click",function(){
            document.getElementById("wrap").style.display = "none";
            
            let seleccionados = document.querySelectorAll('#selectContent>img');
            console.log(seleccionados)
            consultarApi(seleccionados,false);
        })

function atras(){
    document.getElementById('wrap').style.display = 'block';
    document.getElementById('wrap2').style.display = 'none';
    localStorage.removeItem("seleccionadas")
    document.getElementById("resul").innerHTML = ""
}



function cambiarModal(cambio){
    if(cambio){
        document.getElementById("register").style.display = "flex";
        document.getElementById("login").style.display = "none";
    }else{
        document.getElementById("login").style.display = "flex";
        document.getElementById("register").style.display = "none";
    }
}

function setToken(token){
    if(localStorage.token != undefined){
        localStorage.setItem('token',token);
    }else{
        localStorage.removeItem("token");
        localStorage.setItem('token',token);
    }
}

async function logearUsuario(){
    const email = document.querySelector("#emailL");
    const password = document.querySelector("#passL");

    try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
          method: 'POST',
          headers: {},
          body: new URLSearchParams({
            email: email.value,
            password: password.value
          })
        });
      
        if (response.ok) {
          const result = await response.json();
          setToken(result.authorisation.token);
          document.getElementById("myModal").style.display = "none";
         
          console.log(result.authorisation.token);
        }
      } catch (err) {
        console.error(err);
      }

}

async function registrarUsuario(){
    const name = document.querySelector("#nameR");
    const email = document.querySelector("#emailR");
    const password = document.querySelector("#passR");

    try {
        const response = await fetch("http://127.0.0.1:8000/api/register?name=", {
          method: 'POST',
          headers: {},
          body: new URLSearchParams({
            name: name.value,
            email: email.value,
            password: password.value
          })
        });
      
        if (response.ok) {
          const result = await response.json();
          setToken(result.authorisation.token);
          document.getElementById("myModal").style.display = "none";
          console.log(result);
          
        }
      } catch (err) {
        console.error(err);
      }

    // fetch('http://127.0.0.1:8000/api/register', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     peti: {
    //                         name: name.value,
    //                         email: email.value,
    //                         password: password.value
    //                     }
    //                 })
    //             }).then((response) => response.json())
    //             .then((response) => console.log(response))
    //             .catch((err) => console.error(err));

}
// xhr.addEventListener("readystatechange", function () {
//     if (this.readyState === this.DONE) {
//         let res = JSON.parse(this.responseText);
                                                            
//         document.getElementById(`valor${res['id']}`).innerHTML = res['datos'];
//         }
// });

// function pedirDato(id){
//     // fetch(`http://127.0.0.1:8000/api/empresas/${id}`, {
//     //     headers: {
//     //         Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJNYXJjb3MiLCJleHAiOjg4MTYwODE0NzgsInZlcnNpb24iOiIxLjAuMCIsImFkbWluIjoidHJ1ZSIsImlhdCI6MTYxODY3MzQ3OCwiZW1haWwiOiJpa2JzakBwbGFpYXVuZGkubmV0IiwibG9naW5JZCI6Ijk2OTgyZmZlMjgxM2VkNGUwYzQzMTkwZWJjMjZmMzg2OGI1MTBkNmFiYmI1M2Q0YmJlNDhkZjE0MmYzMWRlZjUifQ.i2oXoO5vhhXi8328jbX8mG7t22mVYe0Zg5dPBdfgb_ELmcOTa9wpammypdcP6l6gW6tAbacgOuGGUSUYCkuFmfAgcGneV5wbkxRuH5vQe6eYoYy_IprNKJHcCFbN8pAKIhlhULq61lmxLYmOenwZmfVoFwHWyUq9a3zBL7wkxZyZUXKry0RXVyfZNxF-XcZqqSNT1nR3uNGWvMyJ8-po1hgBcjJmpSo0EBto_QAFg4N9YYtDcZKWcXewVvhI5NGeiX_fRHLfHnbemKS05lCWDrFk4bF_X-hMCdbiL1z8uzIqzKNmtVZ8j03-5fOt3mHZ3ACyTiHDSwRofRKhkn_9-A"
//     //     }
//     // })
//     xhr.open("GET", `http://127.0.0.1:8000/api/empresas/${id}`);
//     // xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJNYXJjb3MiLCJleHAiOjg4MTYwODE0NzgsInZlcnNpb24iOiIxLjAuMCIsImFkbWluIjoidHJ1ZSIsImlhdCI6MTYxODY3MzQ3OCwiZW1haWwiOiJpa2JzakBwbGFpYXVuZGkubmV0IiwibG9naW5JZCI6Ijk2OTgyZmZlMjgxM2VkNGUwYzQzMTkwZWJjMjZmMzg2OGI1MTBkNmFiYmI1M2Q0YmJlNDhkZjE0MmYzMWRlZjUifQ.i2oXoO5vhhXi8328jbX8mG7t22mVYe0Zg5dPBdfgb_ELmcOTa9wpammypdcP6l6gW6tAbacgOuGGUSUYCkuFmfAgcGneV5wbkxRuH5vQe6eYoYy_IprNKJHcCFbN8pAKIhlhULq61lmxLYmOenwZmfVoFwHWyUq9a3zBL7wkxZyZUXKry0RXVyfZNxF-XcZqqSNT1nR3uNGWvMyJ8-po1hgBcjJmpSo0EBto_QAFg4N9YYtDcZKWcXewVvhI5NGeiX_fRHLfHnbemKS05lCWDrFk4bF_X-hMCdbiL1z8uzIqzKNmtVZ8j03-5fOt3mHZ3ACyTiHDSwRofRKhkn_9-A");
    
//     xhr.send(data);
//   }