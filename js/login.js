function logar(){

  let usuario = document.getElementById("usuario").value;
  let senha = document.getElementById("senha").value;

  if(usuario === "admin" && senha === "123"){

    sessionStorage.setItem("logado", "true");

    window.location.href = "home.html";

  }else{
    document.getElementById("erro").innerHTML = "Usuário ou senha inválidos";
  }
}