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
    this.setState({
      image: this.image
    });
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

    const jsonStage = e.target.getStage();
    const json = jsonStage.toJSON();
    console.log(json);

    const PrevSession = localStorage.MoodBoardStage;
  };

  // var json = (localStorage.MoodBoardStage = json);
  // var stage = Konva.Node.create(json, "container");

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
        draggable
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        shadowColor="black"
        shadowBlur={10}
        shadowOffsetX={0}
        shadowOffsetY={4}
        shadowOpacity={0.6}
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
        <URLImage name="1" src="https://source.unsplash.com/300x400" />
        <URLImage name="2" src="https://source.unsplash.com/400x300" />
        <URLImage name="3" src="https://source.unsplash.com/200x300" />
        <URLImage name="4" src="https://source.unsplash.com/260x300" />
      </Layer>
    </Stage>
  );
}

export default Canvas;
