const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = false;

let consultar = document.getElementById('guardar');
        consultar.addEventListener("click",function(){
            document.getElementById("wrap").style.display = "none";
            let seleccionados = document.querySelectorAll('#selectContent>img');
            
            if(seleccionados.length != 0){
                for(let i = 0; i < seleccionados.length; i++){
                    
                    pedirDato(seleccionados[i].getAttribute("id").replace("im",""));
                    // let mesag = seleccionados[i].getAttribute("src").replace("Imagenes/","").replace(".png","");
                    document.getElementById("resul").innerHTML += `<div class="card" id="empre${i+1}" style="width: 18rem;">
                                                                        <img src="${seleccionados[i].src}" id="imcard" class="card-img-top" alt="...">
                                                                        <div class="card-body">
                                                                            <h5 class="card-title">${seleccionados[i].getAttribute("alt")}</h5>
                                                                            <p class="card-text" id="valor${i+1}"></p>
                                                                            <a href="#" class="btn btn-primary">Go somewhere</a>
                                                                        </div>
                                                                        </div>`;
                    
                    setTimeout("Func1()", 4000);
                }
            }
        })

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        let res = JSON.parse(this.responseText);
                                                            
        document.getElementById(`valor${res['id']}`).innerHTML = res['datos'];
        }
});

function pedirDato(id){
  
    xhr.open("GET", `http://127.0.0.1:8000/api/empresas/${id}`);
    // xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJNYXJjb3MiLCJleHAiOjg4MTYwODE0NzgsInZlcnNpb24iOiIxLjAuMCIsImFkbWluIjoidHJ1ZSIsImlhdCI6MTYxODY3MzQ3OCwiZW1haWwiOiJpa2JzakBwbGFpYXVuZGkubmV0IiwibG9naW5JZCI6Ijk2OTgyZmZlMjgxM2VkNGUwYzQzMTkwZWJjMjZmMzg2OGI1MTBkNmFiYmI1M2Q0YmJlNDhkZjE0MmYzMWRlZjUifQ.i2oXoO5vhhXi8328jbX8mG7t22mVYe0Zg5dPBdfgb_ELmcOTa9wpammypdcP6l6gW6tAbacgOuGGUSUYCkuFmfAgcGneV5wbkxRuH5vQe6eYoYy_IprNKJHcCFbN8pAKIhlhULq61lmxLYmOenwZmfVoFwHWyUq9a3zBL7wkxZyZUXKry0RXVyfZNxF-XcZqqSNT1nR3uNGWvMyJ8-po1hgBcjJmpSo0EBto_QAFg4N9YYtDcZKWcXewVvhI5NGeiX_fRHLfHnbemKS05lCWDrFk4bF_X-hMCdbiL1z8uzIqzKNmtVZ8j03-5fOt3mHZ3ACyTiHDSwRofRKhkn_9-A");
    
    xhr.send(data);
  }