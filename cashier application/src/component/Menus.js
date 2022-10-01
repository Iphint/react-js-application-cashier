import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import "../css/menus.css";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md="4" xs="6">
      <Card className="m-3 text-left card-menu">
        <Card.Img
          variant="top"
          src={
            "images/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body>
          <Card.Title>
            <h6>
              {menu.nama}(<strong>{menu.kode}</strong>)
            </h6>
          </Card.Title>
          <Card.Text>
            <p>Rp : {numberWithCommas(menu.harga)}</p>
          </Card.Text>
          <Card.Text
            style={{ cursor: "pointer" }}
            onClick={() => masukKeranjang(menu)}
          >
            <Button>
              <FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon>
              <span> add to cart</span>
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
