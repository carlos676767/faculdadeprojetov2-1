const produtosLista = [
  { nome: 'Cerveja Skol Pilsen 350ml', imagem: '/imagens/imagem-cerveja-skol.jpg', categoria: 'CERVEJAS', precoFormatado: 'R$ 4,50', status: 'Disponível' },
  { nome: 'Cerveja Brahma Chopp 350ml', imagem: '/imagens/cerveja-brahma.jpg', categoria: 'CERVEJAS', precoFormatado: 'R$ 4,80', status: 'Disponível' },
  { nome: 'Cerveja Antarctica Pilsen 350ml', imagem: '/imagens/antartica-cerveja1.jpg', categoria: 'CERVEJAS', precoFormatado: 'R$ 4,50', status: 'Esgotado' },
  { nome: 'Cerveja Heineken Long Neck 330ml', imagem: '/imagens/heineken.jpg', categoria: 'CERVEJAS', precoFormatado: 'R$ 8,50', status: 'Disponível' },
  { nome: 'Cerveja Skol Lata 269ml', imagem: '/imagens/skoll-duzentos-e-sessenta-e-nove.png', categoria: 'CERVEJAS', precoFormatado: 'R$ 3,20', status: 'Disponível' },
  { nome: 'Coca-Cola Original 1L', imagem: '/imagens/coca-cola-umlitro.png', categoria: 'REFRIGERANTES', precoFormatado: 'R$ 6,50', status: 'Disponível' },
  { nome: 'Coca-Cola Original Lata 350ml', imagem: '/imagens/coca-cola.png', categoria: 'REFRIGERANTES', precoFormatado: 'R$ 4,00', status: 'Disponível' },
  { nome: 'Fanta Laranja Lata 350ml', imagem: '/imagens/fanta.png', categoria: 'REFRIGERANTES', precoFormatado: 'R$ 3,80', status: 'Disponível' },
  { nome: 'Água Mineral Crystal Sem Gás 500ml', imagem: '/imagens/agua-cristal-quinhetasml.jpg', categoria: 'ÁGUAS', precoFormatado: 'R$ 3,00', status: 'Disponível' },
  { nome: 'Água Mineral Crystal Com Gás 500ml', imagem: '/imagens/imagem-agua-cristal-com-gas.png', categoria: 'ÁGUAS', precoFormatado: 'R$ 3,50', status: 'Disponível' },
  { nome: 'Gatorade Limão 500ml', imagem: '/imagens/gatorade-limao.png', categoria: 'ISOTÔNICOS', precoFormatado: 'R$ 6,00', status: 'Disponível' },
  { nome: 'Gatorade Frutas Cítricas 500ml', imagem: '/imagens/gatorade.jpg', categoria: 'ISOTÔNICOS', precoFormatado: 'R$ 6,00', status: 'Esgotado' },
  { nome: 'Monster Energy Drink 473ml', imagem: '/imagens/imagem-energetico-monster.jpg', categoria: 'ENERGÉTICOS', precoFormatado: 'R$ 10,99', status: 'Disponível' },
  { nome: 'Macarrão Galo Espaguete 500g', imagem: '/imagens/macarrao-galo.jpg', categoria: 'MERCEARIA', precoFormatado: 'R$ 5,50', status: 'Disponível' },
  { nome: 'Nissin Miojo Lámen Galinha Caipira', imagem: '/imagens/miojo.jpeg', categoria: 'MERCEARIA', precoFormatado: 'R$ 2,50', status: 'Disponível' },
  { nome: 'Achocolatado Nescau 400g', imagem: '/imagens/nescau-imagem.jpg', categoria: 'MERCEARIA', precoFormatado: 'R$ 9,80', status: 'Disponível' },
  { nome: 'Detergente Ypê Neutro 500ml', imagem: '/imagens/detergente-ype.jpeg', categoria: 'LIMPEZA', precoFormatado: 'R$ 2,20', status: 'Esgotado' }
];

class ProductService {
  getAllProdutos() {
    return produtosLista;
  }

  getProdutosDisponiveis() {
    return produtosLista.filter(p => p.status === 'Disponível');
  }
}

module.exports = new ProductService();
