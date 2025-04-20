# Bootcamp de Deploy com Lovable

## 🧰 Ambiente: Setup Inicial (Windows - Máquina Corporativa)

Este guia documenta os passos realizados para configurar o ambiente de desenvolvimento em uma máquina com restrições administrativas, visando rodar projetos Node.js e utilizar o Git para deploy de aplicações Lovable.

---

## 📦 1. Instalação do Node.js (Versão Portátil)

1. **Baixe o Node.js versão portátil:**
   - Acesse: https://nodejs.org/en/download
   - Versão utilizada: `node-v22.14.0-win-x64.zip`
   - Extraia o conteúdo para: `C:\Node`

2. **Configure o ambiente no PowerShell:**
   ```powershell
   $env:Path += ";$PWD;$PWD\node_modules\npm\bin;$PWD\bin"
   ```

3. **Verifique a instalação:**
   ```powershell
   node -v
   npm -v
   ```

> ⚠️ Caso apareça erro de política de execução (ExecutionPolicy), execute:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

---

## 🧪 2. Testando Execução do Projeto com Node.js

1. **Navegue até a pasta do projeto:**
   ```powershell
   cd C:\Caminho\Do\Projeto
   ```

2. **Inicie o servidor:**
   ```powershell
   node index.js
   ```

---

## 🔧 3. Instalação do Git Portátil

1. **Baixe o Git portátil:**
   - Link utilizado: https://github.com/git-for-windows/git/releases
   - Versão utilizada: `PortableGit-2.45.1-64-bit.7z.exe`
   - Extraia para: `C:\Git`

2. **Configure o Path temporariamente no PowerShell:**
   ```powershell
   $env:Path += ";C:\Git\cmd"
   ```

3. **Verifique a instalação:**
   ```powershell
   git --version
   ```

---

## ✅ Conclusão

Com esse setup:
- É possível rodar aplicações Node.js sem instalação convencional.
- O Git funciona sem precisar de permissões administrativas.
- Você pode clonar repositórios, rodar scripts e fazer deploys mesmo em máquinas restritas.

> Próximo passo: Configurar e publicar o projeto Lovable no GitHub Pages ou Vercel. ✅