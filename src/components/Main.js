import React, { Component } from 'react';
import EditProduct from './EditProduct';

class Main extends Component {

  state = {
    isOpen: false,
    product: null
  };

  openModal = () => this.setState({isOpen: true});
  closeModal = () => this.setState({isOpen: false});
  setProduct = (prodcut) => this.setState({product: prodcut})

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
                        className="btn btn-primary"
                        name={product.id}
                        value={product.price}
                        onClick={(event) => {
                          this.props.purchaseProduct(event.target.name, event.target.value)
                        }}
                        >
                          Comprar
                      </button>
                    :
                      <button
                        className="btn btn-secondary"
                        name={product.id}
                        value={product.price}
                        onClick={() => {
                          this.setProduct(product)
                          this.openModal()
                        }}
                        >
                          Editar
                      </button>
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p>
          <a href="https://rinkeby.etherscan.io/address/0xf3aF2F928817B25B0D41D0cc30783bF604690DBE" target="_blank">
            Informação do contrato
          </a>
        </p>

        <EditProduct
          show={this.state.isOpen}
          product={this.state.product}
          hide={this.closeModal}
          submit={this.props.updateProduct}
        />

      </div>
    );
  }
}

export default Main;
