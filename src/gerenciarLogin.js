const usuarios = [
    {
        id: 1,
        nome: "Mariana Lima",
        email: "mariana@email.com",
        senha: "123456",
        expirado: false
    },
    {
        id: 2,
        nome: "Carlos Silva",
        email: "carlos@email.com",
        senha: "abcdef",
        expirado: true
    },
    {
        id: 3,
        nome: "Ana Souza",
        email: "ana@email.com",
        senha: "senha123",
        expirado: false
    },
    {
        id: 4,
        nome: "João Pereira",
        email: "joao@email.com",
        senha: "qwerty",
        expirado: false
    }
];



export function validaLogin(emailLogin, senhaLogin) {
    if (!emailLogin || !senhaLogin) {
        throw new Error('Falta informações');
    }

    let usuarioEncontrado = null;

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === emailLogin) {
            usuarioEncontrado = usuarios[i];
            
            break;
        }
    }
    
    if(usuarioEncontrado == null){
            return 'Usuario não encontrado'
    }

    if (usuarioEncontrado.senha !== senhaLogin) {
        return 'Senha incorreta para o usuário encontrado';
    }

    if (usuarioEncontrado.expirado == true) {
        return 'Renove suas credenciais';
    }

    return 'Login realizado com sucesso'
}