import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Adicionar Produto</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          const onSale = this.productOnSale.checked
          this.props.createProduct(name, price, onSale)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Nome do produto"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Preço do produto (em Ether)"
              required />
          </div>
          <div className="form-group form-check mr-sm-2">
            <input
              id="productOnSale"
              type="checkbox"
              ref={(input) => { this.productOnSale = input }}
              className="form-check-input" />
            <label className="form-check-label" for="productOnSale">
              Produto a venda
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Adicionar produto</button>
        </form>
        <p>&nbsp;</p>
        <h2>Comprar produto</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Preço</th>
              <th scope="col">Status</th>
              <th scope="col">Proprietário</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.products.filter(f => f.onSale || this.props.account === f.owner).map((product, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), "ether")} Eth</td>
                  <td>{product.onSale ? 'A venda' : 'Não a venda'}</td>
                  <td>{product.owner}</td>
                  <td>
                    {this.props.account !== product.owner
                    ?
                      <button
                        name={product.id}
                        value={product.price}
                        onClick={(event) => {
                          this.props.purchaseProduct(event.target.name, event.target.value)
                        }}
                        >
                          Comprar
                      </button>
                    :
                      null
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p><a href="https://ropsten.etherscan.io/address/0x781c71bfe45d1c5d81fca75d17bb589cc72d63fc" target="_blank">Informação do contrato</a></p>
      </div>
    );
  }
}

export default Main;
