import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/FormGroup';

class EditProduct extends Component {

  render() {

    return (

      <Modal show={this.props.show} onHide={this.props.hide}>
        <form onSubmit={(event) => {
          event.preventDefault()
          const id = this.props.product ? this.props.product.id : null
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          const onSale = this.productOnSale.checked
          this.props.submit(id, price, onSale)
        }}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.product ? this.props.product.name : null}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="form-group mr-sm-2">
              <input
                id="productPrice"
                type="text"
                ref={(input) => { this.productPrice = input }}
                defaultValue={this.props.product ? window.web3.utils.fromWei(this.props.product.price.toString(), 'Ether') : null}
                className="form-control"
                placeholder="Preço do produto (em Ether)"
                required />
            </div>
            <div className="form-group form-check mr-sm-2">
              <input
                id="productOnSale"
                type="checkbox"
                ref={(input) => { this.productOnSale = input }}
                defaultChecked={this.props.product ? this.props.product.onSale : false}
                className="form-check-input" />
              <label className="form-check-label" for="productOnSale">
                Produto a venda
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.hide}>
              Cancelar
            </Button>
            <button className="btn btn-primary" type="submit">
              Atualizar produto
            </button>
          </Modal.Footer>
        </form>
      </Modal>

    );
  }
}

export default EditProduct;
