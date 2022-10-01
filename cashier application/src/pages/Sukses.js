import axios from "axios";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Gambar from "../pages/gambar/logo-sukses.png";
import { API_URL } from "../utils/constans";
export default class Sukses extends Component {

  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((response) => {
        const keranjangs = response.data;
        keranjangs.map(function(item) {
          return axios
          .delete(API_URL+"keranjangs/"+item.id)
          .then((res) => console.log(res))
          .catch((error) => console.log(error))
        })
      })
  }

  render() {
    return (
      <div className="mt-4 text-center">
        <img src={Gambar} alt="sukses" width={500} />
        <h2>Sukses pesan</h2>
        <p>Terima kasih sudah memesan di toko kami</p>
        <Link to={"/"}>
          <Button variant="primary">Kembali</Button>
        </Link>
      </div>
    );
  }
}
