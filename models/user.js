class User {
  constructor(id, nome, email, senha) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  static build(json) {
    return new User(
      json.id,
      json.nome,
      json.email,
      json.senha
    );
  }
}

export default User;
