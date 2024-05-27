import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SegnalazioniService from '../services/SegnalazioneService';

interface iProps {
  deleteId: number;
  onDelete: (id : number) => void;
}

const CheckDelete = (props:iProps) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {deleteId, onDelete }= props
  
    const handleDelete = async () => {
      await SegnalazioniService.deleteSegnalazione(deleteId);
      console.log("Segnalazione eliminata con successo, ID: " + deleteId);
      onDelete(deleteId)
      handleClose();
    };
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Elimina
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Conferma eliminazione</Modal.Title>
          </Modal.Header>
          <Modal.Body>Sei sicuro di voler eliminare questa segnalazione? {deleteId}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annulla
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Elimina
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

export default CheckDelete;