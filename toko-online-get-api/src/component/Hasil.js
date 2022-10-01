import React, { Component } from "react";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";
import "../css/hasil.css";
import { ModalKeranjang } from "./ModalKeranjang";
import { API_URL } from "../utils/constans";
import swal from "sweetalert";
import axios from "axios";
export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };
    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((response) => {
        swal({
          title: "Update pesanan",
          text: "pesanan " + data.product.nama + " berhasil diupdate",
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  hapusPesanan = (id) => {
    this.handleClose();
    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((response) => {
        swal({
          title: "Hapus pesanan",
          text:
            "pesanan " +
            this.state.keranjangDetail.product.nama +
            " berhasil dihapus",
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { keranjangs } = this.props;
    return (
      <Col md="3" mt="2">
        <h4 className="text-center">
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {keranjangs.map((menuKeranjang) => (
                <ListGroup.Item key={menuKeranjang.id}>
                  <Row>
                    <Col xs="2">
                      <h4>
                        <Badge pill variant="success">
                          {menuKeranjang.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{menuKeranjang.product.nama}</h5>
                      <p>Rp.{numberWithCommas(menuKeranjang.product.harga)}</p>
                      <Button
                        variant="success"
                        onClick={() => this.handleShow(menuKeranjang)}
                      >
                        detail
                      </Button>
                    </Col>
                    <Col className="harga">
                      <strong>
                        <p>Rp.{numberWithCommas(menuKeranjang.total_harga)}</p>
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ModalKeranjang
                handleClose={this.handleClose}
                tambah={this.tambah}
                kurang={this.kurang}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
                hapusPesanan={this.hapusPesanan}
                {...this.state}
              />
            </ListGroup>
          </Card>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
