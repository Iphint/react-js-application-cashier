import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import "../css/totalbayar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constans";
export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };
    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("/sukses");
    });
  };
  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <div className="fixed-bottom">
        <Row>
          <Col
            md={{ span: 3, offset: 9 }}
            className="total-bayar p-3 text-white"
            style={{ borderRadius: 9 }}
          >
            <h5>
              Total bayar :{" "}
              <b className="bayar">Rp. {numberWithCommas(totalBayar)}</b>
            </h5>
            <Button onClick={() => this.submitTotalBayar(totalBayar)}>
              <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
              <strong> Bayar</strong>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
