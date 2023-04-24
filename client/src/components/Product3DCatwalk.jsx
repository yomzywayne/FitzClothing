import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import DynamicComponentLoader from "./Models/DynamicComponentLoader";
import { connect } from "react-redux";

const mapStateToProps = function (state) {
  return {
    currentProduct: state.selectedProduct.currentProduct
  };
};

const Product3DCatwalk = (props) => {
  console.log("Product3DCatwalk - currentProduct:", props.currentProduct);

  return (
    <Canvas>
      <OrbitControls />
      <directionalLight intensity={0.5} />
      <ambientLight intensity={0.2} />
      <Suspense fallback={null}>
        <DynamicComponentLoader componentName={`DC_${props.currentProduct._id}`} />
      </Suspense>
    </Canvas>
  );
};

export default connect(mapStateToProps)(Product3DCatwalk);