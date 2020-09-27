/* Desenvolvedores - Carlinhos,Vitor Demboski e Vinícius de Souza Margotti
      
   Desenvolvimento - Projeto consiste em utilizar estruturas de dados para percorrer
        uma lista e realizar operações de Inclusão,Exclusão e busca;*/

angular.module("NotaApp", []).controller("NotasController", function () {
  var vm = this;

  vm.estruturaAtual = 0;

  vm.posicao = 0;

  //Criação da estrutura array dinamico.
  vm.notas = [];

  vm.Normal = {
    estrutura: 0,
    incrementa: (nota) => {
      //Inserir elemento
      vm.notas[vm.notas.length] = nota;

      //Ordena a lista
      vm.ordenar();
    },
    remover: (elemento) => {
      //Busca a posição do elemento para remove-lo do array
      posicao = vm.buscar(elemento);

      //Remove o elemento na posição correta
      vm.notas.splice(posicao, 1);
      vm.ordenar();
    },
  };

  vm.Fila = {
    estrutura: 1,
    incrementa: (nota) => {
      // Insere a nota no final
      vm.notas[vm.notas.length] = nota;
    },
    remover: () => {
      // Remove o primeiro elemento
      vm.notas.splice(0, 1);
    },
  };

  vm.Pilha = {
    topo: -1,
    estrutura: 2,
    incrementa: (nota) => {
      vm.notas[vm.Pilha.topo + 1] = nota;
      vm.Pilha.topo++;
    },
    remover: () => {
      vm.notas.splice(vm.Pilha.topo, 1);
      vm.Pilha.topo--;
    },
  };
  // Método responsável pela troca de estrutura utilizada pelo sistema
  vm.trocaEstrutura = function trocaEstrutura(estrutura) {
    if (estrutura === vm.estruturaAtual) return false;

    // Limpar os dados da tela
    vm.notas = [];
    vm.estruturaAtual = estrutura;
    vm.Pilha.topo = -1;
  };

  //Método responsável pela inserção
  vm.inserir = function inserir(nota) {
    // Verifica a estrutura e incrementa
    if (vm.estruturaAtual === vm.Normal.estrutura) vm.Normal.incrementa(nota);
    if (vm.estruturaAtual === vm.Fila.estrutura) vm.Fila.incrementa(nota);
    if (vm.estruturaAtual === vm.Pilha.estrutura) vm.Pilha.incrementa(nota);
  };

  //Busca o elemento é mostra uma mensagem ao usuário informando a posição que foi encontrado aquele elemento
  vm.buscarElemento = function buscar(filtro) {
    //Busca a posição do elemento para ver se ele existe dentro da estrutura
    var posicao = vm.buscar(filtro);

    if (posicao != null) {
      alert(
        "Elemento " +
          vm.notas[posicao] +
          " encontrado no array na posição: " +
          posicao
      );
    } else {
      alert("Elemento não encontrado!");
    }
  };

  //Busca o elemento dentro do array realizando comparações
  vm.buscar = function buscar(filtro) {
    //estrutura de repetição que busca o elemento
    for (var i = 0; i < vm.notas.length; i++) {
      if (vm.notas[i] === filtro) {
        return i;
      }
    }
  };

  //Método responsável pela inserção de um elemento ao final da estrutura de dados
  vm.remover = function remover(elemento) {
    if (vm.estruturaAtual === vm.Normal.estrutura) vm.Normal.remover(elemento);
    if (vm.estruturaAtual === vm.Fila.estrutura) vm.Fila.remover();
    if (vm.estruturaAtual === vm.Pilha.estrutura) vm.Pilha.remover();
  };

  //Método responsável pela ordenação crescente das notas
  vm.ordenar = function ordenar() {
    //Váriavel auxiliar para troca dos elementos
    var aux;

    for (var a = 1; a < vm.notas.length; a++) {
      for (var b = 0; b < vm.notas.length; b++) {
        if (vm.notas[a] < vm.notas[b]) {
          aux = vm.notas[a];
          vm.notas[a] = vm.notas[b];
          vm.notas[b] = aux;
        }
      }
    }
  };
});
