import React from 'react';
import Konva from 'konva';
import {Layer, Rect, Circle, Shape, Stage, Group, Util} from 'react-konva';

class MyRect extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            color: 'green'
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            color: Konva.Util.getRandomColor()
        });
    }

    render() {
        return (
            <Rect
                x={10} y={10} width={50} height={50}
                fill={this.state.color}
                shadowBlur={10}
                onClick={this.handleClick}
            />
        );
    }
}

function MyShape() {
    return (
        <Shape fill="#00D2FF" draggable
               sceneFunc={function (ctx) {
                   ctx.beginPath();
                   ctx.moveTo(20, 50);
                   ctx.lineTo(220, 80);
                   ctx.quadraticCurveTo(150, 100, 260, 170);
                   ctx.closePath();
                   // Konva specific method
                   ctx.fillStrokeShape(this);
               }}
        />
    );
}

class MyCircle extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {isMouseInside: false};
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter() {
        this.setState({isMouseInside: true});
    }

    handleMouseLeave() {
        this.setState({isMouseInside: false});
    }

    render() {
        return (
            <Circle
                x={100} y={60} radius={50}
                fill="yellow" stroke="black"
                strokeWidth={this.state.isMouseInside ? 5 : 1}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            />
        );
    }
}


const ReactKonva = ({}) => {
    return (
        <Stage width={700} height={700}>
            <Layer>
                <MyRect/>
                <MyCircle/>
                <MyShape/>t
            </Layer>
        </Stage>
    );
};

export default ReactKonva;