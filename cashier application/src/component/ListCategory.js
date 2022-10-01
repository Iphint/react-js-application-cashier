import axios from "axios";
import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { API_URL } from "../utils/constans";
import "../css/list-category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="" />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-4" />;

  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

export default class ListCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }
  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { categories } = this.state;
    const { changeCategory, categoryYangDipilih } = this.props;
    return (
      <Col md="2" mt="2">
        <h4 className="text-center">
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={
                  categoryYangDipilih === category.nama && "category-active"
                }
                style={{ cursor: "pointer" }}
              >
                <center>
                  <b>
                    <p>
                      <Icon nama={category.nama} /> {category.nama}
                    </p>
                  </b>
                </center>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
