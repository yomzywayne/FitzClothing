import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {  OrbitControls } from "@react-three/drei";
import DynamicComponentLoader from "./Models/DynamicComponentLoader";
import { connect } from "react-redux";

const mapStateToProps = function (state) {
  return {
    currentProduct: state.selectedProduct.currentProduct,
  };
};

const Product3DImage = (props) => {
  return (
    <>
      <h3><center>{props.currentProduct.title}</center></h3>
      <Canvas style={{background: '#000000'}}>
        <OrbitControls
            enableZoom={true}
            enableRotate={true}
            rotateSpeed={5}
            autoRotate={true}
            autoRotateSpeed={5}
          />
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.3} />
        <Suspense fallback={null}>
          <DynamicComponentLoader componentName={`DC3DI_${props.currentProduct._id}`} />
        </Suspense>
      </Canvas></>
  );
};

export default connect(mapStateToProps)(Product3DImage);
