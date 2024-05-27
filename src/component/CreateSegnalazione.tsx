import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';
import SegnalazioneModel from '../models/SegnalazioneModel';
import SegnalazioniService from '../services/SegnalazioneService';

const CreateSegnalazione = () => {
    const { register, handleSubmit: handleSubmitForm } = useForm<SegnalazioneModel>()

    const handleSubmit: SubmitHandler<SegnalazioneModel> = async (data) => {
        await SegnalazioniService.createSegnalazioni(data);
    };

    return (
        <Form onSubmit={handleSubmitForm(handleSubmit)}>
            <Row>
                <Form.Label>Cliente</Form.Label>
                <Col>
                    <Form.Text>Nome Cliente</Form.Text>
                    <Form.Control type="text" placeholder="Nome Cliente" maxLength={30} {...register('cliente.nome')} />
                    <Form.Text>Cognome Cliente</Form.Text>
                    <Form.Control type="text" placeholder="Cognome Cliente" maxLength={30} {...register('cliente.cognome')} />
                </Col>
                <Col>
                    <Form.Text>email Cliente</Form.Text>
                    <Form.Control type="email" placeholder="email Cliente" maxLength={50} {...register('cliente.email')} />
                    <Form.Text>Telefono Cliente</Form.Text>
                    <Form.Control type="number" placeholder="Telefono Cliente" maxLength={15} {...register('cliente.telefono')} />
                </Col>
            </Row>
            <Row>
                <Form.Label>Tecnico</Form.Label>
                <Col>
                    <Form.Text>Nome Tecnico</Form.Text>
                    <Form.Control type="text" placeholder="Nome Tecnico" maxLength={30} {...register('tecnico.nome')} />
                    <Form.Text>Cognome Tecnico</Form.Text>
                    <Form.Control type="text" placeholder="Cognome Tecnico" maxLength={30} {...register('tecnico.cognome')} />
                    <Form.Text>Email Tecnico</Form.Text>
                    <Form.Control type="email" placeholder="tecnico surname" maxLength={50} {...register('tecnico.email')} />
                </Col>
                <Col>
                    <Form.Text>Telefono Tecnico</Form.Text>
                    <Form.Control type="number" placeholder="Telefono Tecnico" maxLength={15} {...register('tecnico.telefono')} />
                    <Form.Text>Specializzazione Tecnico</Form.Text>
                    <Form.Control type="text" placeholder="Specializzazione Tecnico" maxLength={15} {...register('tecnico.specializzazione')} />
                    <Form.Text>Assunzione Tecnico</Form.Text>
                    <Form.Control type="date" placeholder="Assunzione Tecnico" {...register('tecnico.data_assunzione')} />
                </Col>
            </Row>
            <Button variant="outline-success" type="submit">Success</Button>
        </Form>
    );
};

export default CreateSegnalazione;