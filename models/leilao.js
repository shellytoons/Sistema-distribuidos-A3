class Leilao {
    constructor(id, titulo, descricao, lanceInicial, dataTermino, idCriador,dataCriacao) {
        this.id = id; 
        this.titulo = titulo; 
        this.descricao = descricao;
        this.lanceInicial = lanceInicial; 
        this.dataTermino = dataTermino; 
        this.idCriador = idCriador; 
        this.dataCriacao = dataCriacao;
    }
    static build(json) {
        return new Leilao(
            json.id,
            json.titulo,
            json.descricao,
            json.lanceInicial,
            json.dataTermino,
            json.idCriador,
            json.dataCriacao
        );
    }
    isLeilaoAtivo() {
        const dataAtual = new Date();
        const dataTerminoLeilao = new Date(this.dataTermino);
        return dataTerminoLeilao > dataAtual;
    }
}

export default Leilao;