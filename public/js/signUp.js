// ============================================================
//  AutoPrime — Cadastro de Usuários
//  Salva no localStorage como array JSON
// ============================================================

function cadastrar() {
  const usuario        = document.getElementById("usuario").value.trim();
  const email          = document.getElementById("email").value.trim();
  const senha          = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const erroEl         = document.getElementById("erro");
  const sucessoEl      = document.getElementById("sucesso");

  erroEl.textContent   = "";
  sucessoEl.textContent = "";

  // Validações
  if (!usuario || !email || !senha || !confirmarSenha) {
    erroEl.textContent = "Preencha todos os campos.";
    return;
  }

  if (senha !== confirmarSenha) {
    erroEl.textContent = "As senhas não coincidem.";
    return;
  }

  if (senha.length < 4) {
    erroEl.textContent = "A senha deve ter pelo menos 4 caracteres.";
    return;
  }

  // Carrega lista atual do localStorage
  const usuarios = JSON.parse(localStorage.getItem("autoprime_usuarios") || "[]");

  // Verifica se usuário ou e-mail já existe
  const jaExiste = usuarios.find(
    u => u.usuario.toLowerCase() === usuario.toLowerCase() || u.email.toLowerCase() === email.toLowerCase()
  );

  if (jaExiste) {
    erroEl.textContent = "Usuário ou e-mail já cadastrado.";
    return;
  }

  // Adiciona novo usuário
  usuarios.push({
    usuario,
    email,
    senha,
    perfil: "cliente"
  });

  localStorage.setItem("autoprime_usuarios", JSON.stringify(usuarios));

  // Feedback e redireciona
  sucessoEl.textContent = "Conta criada com sucesso! Redirecionando...";
  setTimeout(() => {
    window.location.href = "../pages/login.html";

  }, 1500);
}

// Enter para cadastrar
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("confirmarSenha").addEventListener("keydown", e => {
    if (e.key === "Enter") cadastrar();
  });
});