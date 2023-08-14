import { cardapio, extras, formasDePagamento } from './dataBase.js';

class CaixaDaLanchonete {
	constructor() {
		this.cardapio = cardapio;
		this.extras = extras;
		this.formasDePagamento = formasDePagamento;
	}

	calcularValorDaCompra(formaDePagamento, itens) {
		if (itens.length == 0) return 'Não há itens no carrinho de compra!';

		const pagamento = this.formasDePagamento[formaDePagamento];
		if (!pagamento) return 'Forma de pagamento inválida!';

		const itensFormatados = this.formatarItens(itens);
		const itensValidos = this.validarItens(itensFormatados);
		if (!itensValidos) return `Item inválido!`;

		const extrasValidos = this.validarExtras(itensValidos);
		if (extrasValidos) return 'Item extra não pode ser pedido sem o principal';

		const quantidadeTotal = this.calcularQuantidadeTotal(itensValidos);
		if (quantidadeTotal == 0) return 'Quantidade inválida!';

		const total = this.calcularTotal(itensValidos, pagamento);
		return `R$ ${total}`;
	}

	formatarItens(itens) {
		return itens.map((item) => {
			const [codigo, quantidade] = item.split(',');
			return { codigo, quantidade: parseInt(quantidade) };
		});
	}

	validarItens(itens) {
		const itensEncontrados = [];

		for (const item of itens) {
			const encontrado = this.cardapio[item.codigo] || this.extras[item.codigo];
			if (encontrado) {
				const { descricao, valor, codigoPrincipal } = encontrado;
				itensEncontrados.push({
					...item,
					valor: valor,
					subTotal: item.quantidade * valor,
					...(codigoPrincipal && { codigoPrincipal })
				});
			} else {
				return false;
			}
		}

		return itensEncontrados;
	}

	validarExtras(itens) {
		const itensExtras = itens.filter((item) => item.codigoPrincipal);
		let extraValido = 0;
		if (itensExtras.length > 0) {
			for (const extra of itensExtras) {
				if (!itens.some((item) => item.codigo === extra.codigoPrincipal)) {
					extraValido = true;
				}
			}
		}

		return extraValido == true ? true : false;
	}

	calcularQuantidadeTotal(itens) {
		return itens.reduce((total, item) => total + item.quantidade, 0);
	}

	calcularTotal(itens, pagamento) {
		const valorTotal = itens.reduce((total, item) => total + item.subTotal, 0);
		const totalCalculado =
			pagamento.acrescimo > 0
				? valorTotal + valorTotal * pagamento.acrescimo
				: valorTotal - valorTotal * pagamento.desconto;

		return totalCalculado.toFixed(2).replace('.', ',');
	}
}

export { CaixaDaLanchonete };
