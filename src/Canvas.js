import React from "react";
import Konva from "konva";
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

    this.setState({
      x: e.target.x,
      y: e.target.y
    });
  };

  render() {
    return (
      <Image
        name={this.props.name}
        id={this.props.id}
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
        x={500}
        y={500}
        shadowColor="black"
        shadowBlur={12}
        shadowOpacity={0.24}
        draggable
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
      />
    );
  }
}

function debounce(fn, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

function Canvas(props) {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  React.useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return _ => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  return (
    <Stage width={dimensions.width} height={dimensions.height}>
      <Layer>
        <URLImage name="1" id="100" src="https://source.unsplash.com/300x400" />
        <URLImage name="2" id="10" src="https://source.unsplash.com/400x300" />
      </Layer>
    </Stage>
  );
}

export default Canvas;
