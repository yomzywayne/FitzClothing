import loadable from '@loadable/component';
import { Html } from "@react-three/drei";

const DynamicComponentLoader = loadable((props) => import(`./${props.componentName}`), {
  fallback: <Html><div>Loading...</div></Html>,
  cacheKey: (props) => props.componentName
});

export default DynamicComponentLoader;