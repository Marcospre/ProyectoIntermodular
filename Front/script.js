// import Chart from 'chart.js/auto'

window.onload = () => {
            if(sessionStorage.token != undefined){
                document.getElementById("myModal").style.display = 'none';
            }else{
                document.getElementById("myModal").style.display = 'block';
            }
            if(localStorage.seleccionadas != undefined){
                document.getElementById("wrap").style.display = 'none';
                document.getElementById("wrap2").style.display = 'block';
                aEmpresas = JSON.parse(localStorage.seleccionadas);
                consultarEmpresas(aEmpresas,true);
            
            }else{
                document.getElementById('wrap').style.display = 'block';
                document.getElementById("wrap2").style.display = 'none';
            }
            
        }
    

        const companies = [
            "BBVA",
            "Caixabank",
            "Cellnex",
            "Ferrovial",
            "Iberdrola",
            "Inditex",
            "Naturgy",
            "Repsol",
            "Santander",
            "Telefonica",
            
        ];
// const data = null;

// const xhr = new XMLHttpRequest();
// xhr.withCredentials = false;

function consultarEmpresas(empresas,local){

    const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer '+sessionStorage.token
        }
      }; 
    
      if(!local){
        fetch('http://localhost:80/api/empresas', options)
            .then(response => response.json())
            .then(response => prueba(response,empresas))
            .catch(err => console.error(err));
      }else{
        
        fetch('http://localhost:80/api/empresas', options)
            .then(response => response.json())
            .then(response => pruebaLocal(response))
            .catch(err => console.error(err));
      }
     
   
}

function cerrarGrafico(){
    document.getElementById("myModal").style.display = "none";
}

function grafico(data){
    const fechas = data.map(item => item.fecha);
    const valores = data.map(item => item.valor);
    document.getElementById("myModal").style.display = "block";
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("historial").style.display = "block";
    // document.getElementById("content").innerHTML += 
    // `<div id="grafico">
    //     <canvas id="historial"></canvas>
    //     <button onclick="cerrarGrafico()">Salir</button>
    // </div>`;
  
    var ctx = document.getElementById('historial');
    var myChart = new Chart(
        ctx,
        {
            type:'line',
            data: {
                labels: fechas,
                datasets: [{
                    label: 'Valor',
                    data: valores,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options:{
                scales:{
                    xAxes:[
                        {
                            type: "time",
                            time: {
                                parser: "YYYY-DD-MM h:m:s",
                                unit: "day",
                                displayFormats:{
                                    day: "MMM DD"
                                }
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }



        }
    )
}

function mostrarGrafico(id){
    const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer '+sessionStorage.token
        }
      }; 

    fetch(`http://localhost:80/api/empresas/${id}`, options)
      .then(response => response.json())
      .then(response => grafico(response))
      .catch(err => console.error(err));


}

function pruebaLocal(obj){
    let guardar = new Array();
    let i = 1;
    let sel = JSON.parse(localStorage.getItem('seleccionadas'))

    sel.forEach(selec=>{
        
        obj.forEach(res=>{
            
            if(selec.split("/")[0].replace("im","") == res.id){
                id = selec.split("/")[0];
                alt = companies[res.id-1];
                guardar.push(id+"/"+alt);
                document.getElementById("resul").innerHTML += `<div class="card" id="empre${i}" style="width: 18rem;">
                                                                <img src="Imagenes/${"im"+res.id}.png" id="imcard" class="card-img-top" alt="...">
                                                                <div class="card-body">
                                                                    <h5 class="card-title">${alt}</h5>
                                                                    <p class="card-text" id="valor${res.id}">${res.datos}</p>
                                                                    <a href="#" class="btn btn-primary" onclick="mostrarGrafico(${res.id})">Grafico</a>
                                                                </div>
                                                                </div>`;
                i++;
            }
        })
    })
    if(localStorage.seleccionadas != undefined){
        localStorage.removeItem('seleccionadas')
        localStorage.setItem('seleccionadas',JSON.stringify(guardar));
        document.getElementById("wrap2").style.display = 'block';

    }else{
        localStorage.setItem('seleccionadas',JSON.stringify(guardar));
        document.getElementById("wrap2").style.display = 'block';
    }
}
function prueba(obj,empresas){
    let guardar = new Array();
    let i = 1;
    
    empresas.forEach(selec=>{
        // console.log(selec.getAttribute("id").replace("im",""))
        obj.forEach(res=>{
            if(selec.getAttribute("id").replace("im","") == res.id){
                id = selec.getAttribute("id");
                alt = companies[res.id-1];
                guardar.push(id+"/"+alt);
                document.getElementById("resul").innerHTML += `<div class="card" id="empre${i}" style="width: 18rem;">
                                                                <img src="Imagenes/${"im"+res.id}.png" id="imcard" class="card-img-top" alt="...">
                                                                <div class="card-body">
                                                                    <h5 class="card-title">${alt}</h5>
                                                                    <p class="card-text" id="valor${res.id}">${res.datos}</p>
                                                                    <a href="#" class="btn btn-primary" onclick="mostrarGrafico(${res.id})">Grafico</a>
                                                                </div>
                                                                </div>`;
                i++;
            }
            
        })
        
    })
    if(localStorage.seleccionadas != undefined){
        localStorage.removeItem('seleccionadas')
        localStorage.setItem('seleccionadas',JSON.stringify(guardar));
        document.getElementById("wrap2").style.display = 'block';

    }else{
        localStorage.setItem('seleccionadas',JSON.stringify(guardar));
        document.getElementById("wrap2").style.display = 'block';
    }

}

function actualizarCard(obj){
    let i = 1;
    let sel = JSON.parse(localStorage.getItem('seleccionadas'));
    console.log("estoy dentro")
    sel.forEach(selec=>{
        obj.forEach(res=>{
            if(selec.split("/")[0].replace("im","") == res.id){
                id = selec.split("/")[0];
               
                alt = companies[res.id-1];
                let anterior = document.getElementById(`${"valor"+res.id}`).innerHTML;
                console.log(anterior)
                console.log(res.datos)
                if(res.datos >= anterior){
                    document.getElementById(`${"valor"+res.id}`).innerHTML = res.datos;
                    document.getElementById(`${"valor"+res.id}`).style = 'color:green';
                }else{
                    document.getElementById(`${"valor"+res.id}`).innerHTML = res.datos;
                    document.getElementById(`${"valor"+res.id}`).style = 'color:red';
                }
                i++;
            }
        })
    })
}

function refrescarDatos(){
    const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer '+sessionStorage.token
        }
      }; 
      fetch('http://localhost:80/api/empresas', options)
            .then(response => response.json())
            .then(response => actualizarCard(response))
            .catch(err => console.error(err));
}
var cicloConsulta;
function cambiarPagina(){
    document.getElementById("wrap").style.display = "none";
    document.getElementById("wrap2").style.display = "block";
    let seleccionados = document.querySelectorAll('#selectContent>img');
    consultarEmpresas(seleccionados,false)
    cicloConsulta = setInterval(refrescarDatos,60000);
     
}
// let consultar = document.getElementById('guardar');
//         consultar.addEventListener("click",function(){
//             document.getElementById("wrap").style.display = "none";
//             document.getElementById("wrap2").style.display = "block";
//             let seleccionados = document.querySelectorAll('#selectContent>img');
            
//             // consultarApi(seleccionados,false);
//             consultarEmpresas(seleccionados,false)
//         })


function atras(){
    clearInterval(cicloConsulta);
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
    if(sessionStorage.token != undefined){
        sessionStorage.setItem('token',token);
    }else{
        sessionStorage.removeItem("token");
        sessionStorage.setItem('token',token);
    }
}

function logout(){
    document.getElementById("myModal").style.display = "block";
    sessionStorage.removeItem('token');
}
async function logearUsuario(){
    const email = document.querySelector("#emailL");
    const password = document.querySelector("#passL");

    try {
        const response = await fetch("http://localhost:80/api/login", {
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
        const response = await fetch("http://localhost:80/api/register?name=", {
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
    }
