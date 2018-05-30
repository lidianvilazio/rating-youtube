import React from 'react'
import vision from "react-cloud-vision-api";

vision.init({ auth: 'AIzaSyCx5aggUv-Mt_SZu4DWv9SkiZtuTDNitNs'})

class Vision extends React.Component {

  state = {
    req: null,
    imageSrc: null
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.imageSrc !== this.props.imageSrc) {
      return true
    } else {
      return false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.imageSrc !== prevProps.imageSrc) {
      this.setState({req: new vision.Request({
        image: new vision.Image({
        base64: prevProps.imageSrc,
      }),
      features: [
        new vision.Feature('FACE_DETECTION', 4),
        new vision.Feature('LABEL_DETECTION', 10),
      ]
    }),
      imageSrc: this.props.imageSrc
    })
    }
  }


  render() {
    // console.log(vision);

    vision.annotate(this.state.req).then((res) => {
      console.log(res.responses[0].faceAnnotations[0].joyLikelihood);
      // console.log(res.responses);
      if(res.responses[0].faceAnnotations[0].joyLikelihood === "VERY_LIKELY") {
        console.log(':)');
      }
      //joyLikelihood "VERY_UNLIKELY", "POSSIBLE", "VERY_LIKELY" joy happy
      // surpriseLikelihood surprise
      // angerLikelihood anger
      // sorrowLikelihood
      // console.log(res[0]);
      // console.log(JSON.stringify(res.responses))
      }, (e) => {
        console.log('Error: ', e)
      })

    return (
      <div>hello</div>
    )
  }
}

export default Vision
