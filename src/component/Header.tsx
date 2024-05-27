import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ModalCreateSegnalazione from './ModalCreateSegnalazione';

const Header = () => {

    return (
        <Navbar>
            <Container>
                <Navbar.Brand>Report Center</Navbar.Brand>
                <ModalCreateSegnalazione />
            </Container>
        </Navbar>
    );
};

export default Header;
