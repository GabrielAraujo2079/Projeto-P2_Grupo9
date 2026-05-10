// ============================================================
//  AutoPrime — Login
//  Busca usuários do localStorage + admins fixos no código
// ============================================================

// Admins fixos (não precisam se cadastrar)
const admins = [
  { nomeCompleto: "Administrador", usuario: "admin", senha: "123",    perfil: "administrador" },
  { nomeCompleto: "João Vendedor", usuario: "joao",  senha: "joao123", perfil: "vendedor"     }
];

function logar() {
  const usuarioDigitado = document.getElementById("usuario").value.trim();
  const senhaDigitada   = document.getElementById("senha").value;
  const erroEl          = document.getElementById("erro");

  if (!usuarioDigitado || !senhaDigitada) {
    erroEl.textContent = "Preencha o usuário e a senha.";
    return;
  }

  // Junta admins fixos + usuários cadastrados no localStorage
  const cadastrados = JSON.parse(localStorage.getItem("autoprime_usuarios") || "[]");
  const todos = [...admins, ...cadastrados];

  const encontrado = todos.find(
    u => u.usuario.toLowerCase() === usuarioDigitado.toLowerCase() && u.senha === senhaDigitada
  );

  if (encontrado) {
    erroEl.textContent = "";

    // Salva sessão no localStorage (persiste entre páginas e ao fechar o navegador)
    localStorage.setItem("logado", "true");
    localStorage.setItem("usuarioLogin", encontrado.usuario);
    localStorage.setItem("usuarioPerfil", encontrado.perfil);

    window.location.href = "../index.html";
  } else {
    erroEl.textContent = "Usuário ou senha inválidos.";
    document.getElementById("senha").value = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ["usuario", "senha"].forEach(id => {
    document.getElementById(id).addEventListener("keydown", e => {
      if (e.key === "Enter") logar();
    });
  });

  if (localStorage.getItem("logado") === "true") {
    window.location.href = "../index.html";
  }
});