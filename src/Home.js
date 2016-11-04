import React from 'react';
import { Link } from 'react-router';
import {
    Jumbotron,
    Button,
    Container,
    Col,
    Row
} from 'reactstrap';
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
        <div id="home" className="Home">
            <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                        {/*<img src="..." alt="First slide" />*/}
                        <CanvasComponent/>
                    </div>
                    <div className="carousel-item">
                        <img src="..." alt="Second slide" />
                        <CanvasComponent/>
                    </div>
                    <div className="carousel-item">
                        <img src="..." alt="Third slide" />
                        <CanvasComponent/>
                    </div>
                </div>
                <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                    <span className="icon-prev" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                    <span className="icon-next" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>


            <Jumbotron tag="section" className="jumbotron-header text-xs-center m-y-3">
                <Container fluid>
                    <Row>
                        <Col>
                            <h1 className="display-4">{title}</h1>
                            <p className="lead m-y-2">
                                An example reactstrap component built, documented & published with <a href="https://github.com/reactstrap/component-template">Component Template</a>
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