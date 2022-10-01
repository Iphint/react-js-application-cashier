import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

export function ModalKeranjang({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  tambah,
  kurang,
  changeHandler,
  handleSubmit,
  totalHarga,
  hapusPesanan,
}) {
  if (keranjangDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangDetail.product.nama}
            <br />
            <strong>
              Rp.{numberWithCommas(keranjangDetail.product.harga)}
            </strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Total harga: </Form.Label>
              <p>
                <b>Rp.{numberWithCommas(totalHarga)}</b>
              </p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jumlah pesanan: </Form.Label>
              <br />
              <Button variant="primary" size="sm" onClick={() => kurang()}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <span className="m-2">{jumlah}</span>
              <Button variant="primary" size="sm" onClick={() => tambah()}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                name="keterangan"
                placeholder="Contoh : pedas, nasi setengah, sambah matah"
                value={keterangan}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => hapusPesanan(keranjangDetail.id)}
          >
            <FontAwesomeIcon icon={faTrash} /> Hapus pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kosong</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
