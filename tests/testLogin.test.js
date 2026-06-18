import { validaLogin } from '../src/gerenciarLogin.js';
import assert from 'node:assert';
import { describe, it } from 'node:test';


describe('Testes da função validaLogin', function () {

    it('1) Deve retornar sucesso quando email e senha estão corretos', function () {
        // Act
        const login = validaLogin('mariana@email.com', '123456');

        // Assert
        assert.equal(login, 'Login realizado com sucesso');
    });

    it('2) Deve informar credencial expirada', function () {
        // Act
        const login = validaLogin('carlos@email.com', 'abcdef');

        // Assert
        assert.equal(login, 'Renove suas credenciais');
    });

    it('3) Deve retornar erro quando usuário não existe', function () {
        // Act
        const login = validaLogin('naoexiste@email.com', '123456');

        // Assert
        assert.equal(login, 'Usuario não encontrado');
    });

    it('4) Deve retornar erro quando senha está incorreta', function () {
        // Act
        const login = validaLogin('mariana@email.com', 'senhaErrada');

        // Assert
        assert.equal(login, 'Senha incorreta para o usuário encontrado');
    });

});