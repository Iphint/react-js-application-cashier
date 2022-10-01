import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ListCategory, Hasil, Menus } from "../component";
import { API_URL } from "../utils/constans";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoryYangDipilih: "Makanan",
      keranjangs: [],
    };
  }
  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryYangDipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      axios
        .get(API_URL + "keranjangs")
        .then((response) => {
          const keranjangs = response.data;
          this.setState({ keranjangs });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  changeCategory = (value) => {
    this.setState({
      categoryYangDipilih: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((response) => {
        const menus = response.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((response) => {
        if (response.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((response) => {
              swal({
                title: "Sukses masuk keranjang",
                text: "pesanan " + keranjang.product.nama + " berhasil dipesan",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: response.data[0].jumlah + 1,
            total_harga: response.data[0].total_harga + value.harga,
            product: value,
          };
          axios
            .put(API_URL + "keranjangs/" + response.data[0].id, keranjang)
            .then((response) => {
              swal({
                title: "Sukses masuk keranjang",
                text: "pesanan " + keranjang.product.nama + " berhasil dipesan",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, categoryYangDipilih, keranjangs } = this.state;
    return (
      <nav className="mt-3">
        <Container fluid>
          <Row>
            <ListCategory
              changeCategory={this.changeCategory}
              categoryYangDipilih={categoryYangDipilih}
            />
            <Col>
              <h4>
                <center>
                  <strong>Daftar Menu</strong>
                </center>
                <hr />
              </h4>
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} {...this.props} />
          </Row>
        </Container>
      </nav>
    );
  }
}
