import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Form, Button, Col, Row } from "react-bootstrap";
import SegnalazioneModel from "../models/SegnalazioneModel";
import SegnalazioniService from "../services/SegnalazioneService";
import './HomePage.css';
import CheckDelete from "./CheckDelete";

const HomePage = () => {
  const [segnalazioniList, setSegnalazioniList] = useState<SegnalazioneModel[]>([]);
  const { register, handleSubmit } = useForm<SegnalazioneModel>();

  const filterBy: SubmitHandler<SegnalazioneModel> = async (data) => {
    const filtered = await SegnalazioniService.filteredSegnalazioneBy(data.cliente.cognome, data.data_ora);
    setSegnalazioniList(filtered.data);
  };

  useEffect(() => {
    const getAllSegnalazioni = async () => {
      const filtered = await SegnalazioniService.filteredSegnalazioneBy("", null);
      setSegnalazioniList(filtered.data);
    };
    getAllSegnalazioni();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit(filterBy)}>
          <Row className="mb-3">
            <Col>
              <Form.Label>Filtered By:</Form.Label>
            </Col>
            <Col>
              <Form.Control type="date" placeholder="Seleziona Data e Ora" {...register('data_ora')} />
            </Col>
            <Col>
              <Form.Control type="text" placeholder="Inserisci il cognome del cliente" maxLength={30} {...register('cliente.cognome')} />
            </Col>
            <Col className="align-self-end">
              <Button variant="outline-success" type="submit">Filtra</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="containerCardSegnalazioni">
        {segnalazioniList.map((segnalazione: SegnalazioneModel) => (
          <Card style={{ width: '18rem', margin: '1em' }} key={segnalazione.id_segnalazione}>
            <Card.Body>
              <Card.Title>Segnalazione</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Data creazione: {segnalazione.data_ora.toString().substring(0, 16).replace("T", " ")}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Text>Cliente: {segnalazione.cliente.nome} {segnalazione.cliente.cognome}</Card.Text>
              <Card.Text>Email: {segnalazione.cliente.email}</Card.Text>
              <Card.Text>Telefono: {segnalazione.cliente.telefono}</Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Text>Tecnico: {segnalazione.tecnico.nome} {segnalazione.tecnico.cognome}</Card.Text>
              <Card.Text>Email: {segnalazione.tecnico.email}</Card.Text>
              <Card.Text>Telefono: {segnalazione.tecnico.telefono}</Card.Text>
              <Card.Text>Specializzazione: {segnalazione.tecnico.specializzazione}</Card.Text>
              <Card.Text>Assunzione: {segnalazione.tecnico.data_assunzione.toString()}</Card.Text>
            </Card.Body>
            <Card.Body className="d-flex justify-content-center">
              <CheckDelete deleteId={segnalazione.id_segnalazione!}/>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
