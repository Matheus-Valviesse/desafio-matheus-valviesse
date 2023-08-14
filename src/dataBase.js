const cardapio = {
	cafe: { descricao: 'Café', valor: 3.0 },
	suco: { descricao: 'Suco Natural', valor: 6.2 },
	sanduiche: { descricao: 'Sanduíche', valor: 6.5 },
	salgado: { descricao: 'Salgado', valor: 7.25 },
	combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.5 },
	combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.5 }
};

const extras = {
	chantily: {
		codigoPrincipal: 'cafe',
		descricao: 'Chantily',
		valor: 1.5
	},
	queijo: {
		codigoPrincipal: 'sanduiche',
		descricao: 'Queijo',
		valor: 2.0
	}
};

const formasDePagamento = {
	dinheiro: { desconto: 0.05, acrescimo: 0 },
	credito: { desconto: 0, acrescimo: 0.03 },
	debito: { desconto: 0, acrescimo: 0 }
};

export { cardapio, extras, formasDePagamento };
