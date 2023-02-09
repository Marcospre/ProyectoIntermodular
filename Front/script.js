// import Chart from 'chart.js/auto'


/*Carga al iniciar la pagina*/

window.onload = () => {
            if(sessionStorage.token != undefined){
                document.getElementById("myModal").style.display = 'none';
                if(localStorage.seleccionadas != undefined){
                    document.getElementById("wrap").style.display = 'none';
                    document.getElementById("wrap2").style.display = 'block';
                    document.getElementById("boton-atras").style.display = "block";
                    aEmpresas = JSON.parse(localStorage.seleccionadas);
                    consultarEmpresas(aEmpresas,true);
                
                }else{
                    document.getElementById('wrap').style.display = 'block';
                    document.getElementById("wrap2").style.display = 'none';
                }
            }else{
                document.getElementById("myModal").style.display = 'block';
                if(localStorage.seleccionadas != undefined){
                    document.getElementById("wrap").style.display = 'none';
                    document.getElementById("wrap2").style.display = 'block';
                    document.getElementById("boton-atras").style.display = "block";
                }else{
                    document.getElementById('wrap').style.display = 'block';
                    document.getElementById("wrap2").style.display = 'none';
                }
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

/* Funcion para hacer llamadas a la api de la empresa*/

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
var myChart 


/* Funcion para cambiar el grafico de la empresa. Tiene un parametro de entrada para indicar 
el tipo de grafico que se quiere mostrar. Mes o 24 horas*/

function cambiarGrafico(opcion){
    let valores = null;
    let fechas = null;

    if(myChart != null){
        myChart.destroy();
    }

    if(opcion == 1){
        const result = dataGuar.filter((obj, index, arr) => {
            const dateObj = new Date(obj.fecha);
            const nextDateObj = new Date(arr[index + 1] ? arr[index + 1].fecha : obj.fecha);
            return dateObj.getDate() !== nextDateObj.getDate() && dateObj.getHours() === 23 && dateObj.getMinutes() === 59;
          });
       
        fechas = Object.values(result).map(item => item.fecha);
        valores = Object.values(result).map(item => item.valor);

        var ctx = document.getElementById('historial');
        myChart = new Chart(
            ctx,
            {
                type:'line',
                data: {
                    labels: fechas,
                    datasets: [{
                        label: 'Valor(€)',
                        data: valores,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options:{
                    scales:{
                        // xAxes:[
                        //     {
                        //         type: "time",
                        //         time: {
                        //             parser: "YYYY-DD-MM h:m:s",
                        //             unit: "day",
                        //             displayFormats:{
                        //                 day: 'MM/DD h:mm A'
                        //             }
                        //         },
                        //         position: 'bottom'
                        //     }
                        // ],
                        // yAxes: [
                        //     {
                        //         ticks: {
                        //             beginAtZero: true
                        //         }
                        //     }
                        // ]
                    }
                }



            }
        )


    }else if(opcion == 0){
        fechas = dataDia.map(item => item.fecha);
        valores = dataDia.map(item => item.valor);

        var ctx = document.getElementById('historial');
        myChart = new Chart(
            ctx,
            {
                type:'line',
                data: {
                    labels: fechas,
                    datasets: [{
                        label: 'Valor(€)',
                        data: valores,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options:{
                    scales:{
                        // xAxes:[
                        //     {
                        //         type: "time",
                        //         time: {
                        //             parser: "YYYY-DD-MM h:m:s",
                        //             unit: "minute",
                        //             displayFormats:{
                        //                 day: 'MM/DD h:mm A'
                        //             }
                        //         },
                        //         position: 'bottom'
                        //     }
                        // ],
                        // yAxes: [
                        //     {
                        //         ticks: {
                        //             beginAtZero: true
                        //         }
                        //     }
                        // ]
                    }
                }



            }
        )
    }

    

    
}

/* Funcion que cierra el grafico destruyendo el chart existente*/

function cerrarGrafico(){
    document.getElementById("myModal").style.display = "none";
    document.getElementById("grafico").style.display = "none";
    document.getElementById("contentModal").style.top = "50%";
    document.getElementById("contentModal").style.left = "50%";
    document.getElementById("login").style.display = "flex";
    myChart.destroy();
}

/* Funcion que devuelve los datos desde el dia anterior hasta esta hora */

function cogerDiaAnterior(data){
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const result = data.filter(item => {
        const itemDate = new Date(item.fecha);
        return itemDate >= yesterday && itemDate <= today;
    });

    return result;
}

/* Funcion que muesrtra el grafico de una empresa cuando se pulsa el boton mostrar grafico.
    Los datos obtenidos en el fetch se guardan en una variable para poder reutilizarlos */

var dataGuar;
function grafico(data){
    
    dataGuar = data;
    dataDia = cogerDiaAnterior(data);
    document.getElementById("myModal").style.display = "block";
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("grafico").style.display = "block";
    document.getElementById("contentModal").style.top = "30%";
    document.getElementById("contentModal").style.left = "30%";
    
    document.getElementById("titulo").src = `Imagenes/im${data[0].id_empresa}.png`;
    
    const fechas = dataDia.map(item => item.fecha);
    const valores = dataDia.map(item => item.valor);
    var ctx = document.getElementById('historial');
    myChart = new Chart(
        ctx,
        {
            type:'line',
            data: {
                labels: fechas,
                datasets: [{
                    label: 'Valor(€)',
                    data: valores,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options:{
                scales:{
                    // xAxes:[
                    //     {
                    //         type: "time",
                    //         time: {
                    //             parser: "YYYY-DD-MM h:m:s",
                    //             unit: "minute",
                    //             displayFormats:{
                    //                 day: 'MM/DD h:mm A'
                    //             }
                    //         },
                    //         position: 'bottom'
                    //     }
                    // ],
                    // yAxes: [
                    //     {
                    //         ticks: {
                    //             beginAtZero: true
                    //         }
                    //     }
                    // ]
                }
            }



        }
    )
}


/* Funcion que antes de llamar a la funcion mostrar grafico,
   realiza un fetch para descargar los datos de la empresa con 
   el id que se le ha pasado */

function mostrarGrafico(id,opcion){
    const options = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer '+sessionStorage.token
        }
      }; 

    fetch(`http://localhost:80/api/empresas/${id}`, options)
      .then(response => response.json())
      .then(response => grafico(response,opcion))
      .catch(err => console.error(err));


}

/* Funcion que muestra los datos actualizados de una empresa a partir de las empresas
    que estan guardadas en el localStorage. Como parametro se pasa las cotizaciones actualizadas de
    las empresas */ 
function pruebaLocal(obj){
    document.getElementById("resul").innerHTML = "";
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

    empezarCiclo();
}

/*Funcion para comenzar el ciclo que refresca los datos cada minuto */
var cicloConsulta;
function empezarCiclo(){
    if(cicloConsulta != null){
        clearInterval(cicloConsulta);
    }
    cicloConsulta = setInterval(refrescarDatos,60000);
}

/* Misma funcion que pruebaLocal pero a esta funcion se la llama cuando se seleccionan las empresas.
   Se pasa como parametor el objeto obj con los datos actualizados de las 10 empresas y las empresas que se han 
   seleciconado */

function prueba(obj,empresas){
    let guardar = new Array();
    let i = 1;
    
    empresas.forEach(selec=>{

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

/* Funcion para actualziar el dato de la empresa cambiando el color 
    dependiendo de si sube o baja el precio. Se pasa como parametro el 
    datos actualizado de la empresa */

function actualizarCard(obj){
    let i = 1;
    let sel = JSON.parse(localStorage.getItem('seleccionadas'));

    sel.forEach(selec=>{
        obj.forEach(res=>{
            if(selec.split("/")[0].replace("im","") == res.id){
                id = selec.split("/")[0];
               
                alt = companies[res.id-1];
                let anterior = document.getElementById(`${"valor"+res.id}`).innerHTML;

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

/* Fetch para descargar los datos actualizados de la empresa */

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


/* Funcion para cambiar los wraps de la pagina SPA*/

function cambiarPagina(){
    document.getElementById("wrap").style.display = "none";
    document.getElementById("wrap2").style.display = "block";
    document.getElementById("boton-atras").style.display = "block";
    let seleccionados = document.querySelectorAll('#selectContent>img');
    consultarEmpresas(seleccionados,false)
    empezarCiclo();
     
}

/*Funcion para retornar a la pagina anterior */

function atras(){
    clearInterval(cicloConsulta);
    document.getElementById('wrap').style.display = 'block';
    document.getElementById('wrap2').style.display = 'none';
    document.getElementById("boton-atras").style.display = "none";
    localStorage.removeItem("seleccionadas")
    document.getElementById("resul").innerHTML = ""
}

/* Funcion para cambiar de modal entre el registro y el login */

function cambiarModal(cambio){
    if(cambio){
        document.getElementById("register").style.display = "flex";
        document.getElementById("login").style.display = "none";
    }else{
        document.getElementById("login").style.display = "flex";
        document.getElementById("register").style.display = "none";
    }
}

/*Funcion pque guarda el token en un sessionStorega */

function setToken(token){
    if(sessionStorage.token != undefined){
        sessionStorage.setItem('token',token);
    }else{
        sessionStorage.removeItem("token");
        sessionStorage.setItem('token',token);
    }
}

/*Funcion para hacer un logout*/

function logout(){
    document.getElementById("myModal").style.display = "block";
    document.getElementById("login").style.display = "flex";
    sessionStorage.removeItem('token');
}

/* Funcion que llama al fetch del login pasandole en el body del fecths los parametors
   de email y password escritos en el input del formulario */

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

      if(localStorage.seleccionadas != undefined){
        
        document.getElementById("wrap").style.display = 'none';
        document.getElementById("wrap2").style.display = 'block';
        
        aEmpresas = JSON.parse(localStorage.seleccionadas);
        consultarEmpresas(aEmpresas,true);
    }

}

/* Funcion que llama al fetch del register pasandole en el body del fecth los parametros
   de nombre, email y password escritos en el input del formulario */

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

          
        }
      } catch (err) {
        console.error(err);
      }
    }
