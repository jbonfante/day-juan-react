import React from 'react';
import { Link } from 'react-router';
import {
    Jumbotron,
    Button,
    Container,
    Col,
    Row
} from 'reactstrap';



const Home = ({title, gh}) => {
    return (
        <div>
            <Jumbotron tag="section" className="jumbotron-header text-xs-center m-y-3">
                <Container fluid>
                    <Row>
                        <Col>
                            <h1 className="display-4">{title}</h1>
                            <p className="lead m-y-2">
                                An example reactstrap component built, documented & published with <a href="https://github.com/reactstrap/component-template">Component Template</a>
                            </p>
                            <p>
                                <Button outline color="danger" href={`https://github.com/${gh}`}>View on Github</Button>
                                <Button tag={Link} color="danger" to="/documentation">Documentation</Button>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Container fluid>
                <Row>
                    <Col sm={{ size: 8, offset: 2 }}>
                        <h2>Getting Started</h2>
                        <hr/>
                        <p>
                            Install and save the component to your project
                        </p>

                        <p>
                            ES6 - import the component you need
                        </p>
                        <div className="docs-example">
                           <div>Nothing to see here</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;