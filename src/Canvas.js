import React from "react";
import { Stage, Layer, Image } from "react-konva";

class URLImage extends React.Component {
  state = {
    image: null
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener("load", this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };

  handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 0,
        y: 0
      },
      scaleX: 1.05,
      scaleY: 1.05,
      shadowBlur: 16,
      ShadowOpacity: 0.6
    });
  };

  handleDragEnd = e => {
    this.setState({
      x: e.target.x,
      y: e.target.y
    });

    e.target.to({
      duration: 0.1,
      easing: Konva.Easings.EaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 0,
      shadowOffsetY: 4,
      shadowBlur: 10,
      ShadowOpacity: 0.4
    });
  };

  render() {
    return (
      <Image
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
        x={window.innerWidth / 2}
        y={window.innerHeight / 2}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.4}
        draggable
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
      />
    );
  }
}

function Canvas(props) {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <URLImage src="https://source.unsplash.com/300x400" />
        <URLImage src="https://source.unsplash.com/400x300" />
      </Layer>
    </Stage>
  );
}

export default Canvas;
