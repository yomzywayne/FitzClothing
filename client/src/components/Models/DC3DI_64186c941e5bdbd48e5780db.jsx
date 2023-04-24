/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 woman-dress-01.glb
*/

import React, { useRef, useEffect } from 'react'
import { Center, useGLTF } from '@react-three/drei';

const glbfilename = '/64186c941e5bdbd48e5780db/64186c941e5bdbd48e5780db.glb';
const DC3DI_64186c941e5bdbd48e5780db = (props) => {
  
  const group = useRef();
  const { nodes, materials } = useGLTF(glbfilename)

  useEffect(() => {
    if (group) {
    }
  });

  return (
    <Center>
      <group {...props} ref={group} dispose={null}>
        <group name="Scene">      
          <group scale={0.05}>
            <mesh geometry={nodes.Mesh006.geometry} material={materials.FABRIC_2_FRONT_4773} />
            <mesh geometry={nodes.Mesh006_1.geometry} material={materials.FABRIC_1_FRONT_4768} />
          </group>
        </group>
      </group>    
    </Center>
  )
}

useGLTF.preload(glbfilename)
export default DC3DI_64186c941e5bdbd48e5780db;