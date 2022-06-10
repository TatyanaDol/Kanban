import { useEffect, useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { useLocalStorage } from "../../hooks/useLocalStorage";


function UserNameModal(): JSX.Element {
    const [show, setShow] = useState(false);
    const [name, setName] = useLocalStorage('name', '')

    useEffect(() => {
        if (!name) {
            setShow(true)
        }
    }, [name])

    const handleClose = () => {
        if (name) {
            setShow(false)
        }
    };

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Enter your name to proceed</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">Your name: </InputGroup.Text>
                    <FormControl
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={(evt) => { setName(evt.target.value) }}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose} disabled={!name}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserNameModal;