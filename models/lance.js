class Lance {
  constructor(id, idLeilao, idUsuario, valor, dataLance) {
    this.id = id;
    this.idLeilao = idLeilao;
    this.idUsuario = idUsuario;
    this.valor = valor;
    this.dataLance = dataLance;
  }

  static build(json) {
    return new Lance(
      json.id,
      json.idLeilao,
      json.idUsuario,
      json.valor,
      json.dataLance
    );
  }
}

export default Lance;
