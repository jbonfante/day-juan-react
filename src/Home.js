import React from 'react';
import { Link } from 'react-router';
import {
    Jumbotron,
    Button,
    Container,
    Col,
    Row
} from 'reactstrap';
import './Home.scss'

require ('jquery');

class CanvasComponent extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 100, 100);
    }
    render() {
        return (
            <canvas ref="canvas" width={300} height={300}/>
        );
    }
}


const Home = ({title, gh}) => {

    return (
        <div id="home" className="Home bg-inverse">

            <Jumbotron tag="section" className="jumbotron-header text-xs-center m-y-3">
                <Container fluid>
                    <Row>
                        <Col>
                            <h1 className="display-4">{title}</h1>
                            <p className="lead m-y-2">
                                Still in the works
                            </p>
                            <p>
                                <Button
                                    outline
                                    color="danger"
                                    href={`https://github.com/${gh}`}>
                                    View on Github
                                </Button>
                                <Button
                                    tag={Link}
                                    color="danger"
                                    to="/documentation">
                                    Documentation
                                </Button>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>

            <Jumbotron className="AppSection" tag="section">
                <div className="shape"></div>
                <Row>
                    <Col>
                        <h1 className="jumbotron-header display-4">
                            UI
                        </h1>
                    </Col>
                </Row>

            </Jumbotron>

            <Jumbotron className="AppSection" tag="section">
                <div className="shape"></div>
                <Row>
                    <Col>
                        <h1 className="jumbotron-header display-4">
                            BACK-END
                        </h1>
                    </Col>
                </Row>

            </Jumbotron>

            <Jumbotron className="AppSection" tag="section">
                <div className="shape"></div>
                <Row>
                    <Col>
                        <h1 className="jumbotron-header display-4">
                            PRESENTATIONS
                        </h1>
                    </Col>
                </Row>

            </Jumbotron>


            <Jumbotron className="AppSection" tag="section">
                <div className="shape"></div>
                <Row>
                    <Col>
                        <h1 className="jumbotron-header display-4">
                            EXAMPLES
                        </h1>
                    </Col>
                </Row>

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
};

export default Home;