import { Html } from 'drei';
import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';
import Model from './Model';
import { Section } from './section';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const Content = ({
  domContent,
  children,
  bgColor,
  modelPath,
  groupPositionY,
  meshPosition,
  description,
  activeService,
  status,
}) => {
  const {  animations } = useLoader(
    GLTFLoader,
    modelPath
  );
  const [mixer] = useState(() => new THREE.AnimationMixer());
  const ref = useRef();
  const group = useRef();

  useFrame((scene, delta) => {
    mixer.update(delta);
    group.current.rotation.y += 0.01;
  });

  useEffect(() => {
    console.log(status);
    document.body.style.background = bgColor;
    if (status === 0) {
      ref.current = { idle: mixer.clipAction(animations[0], group.current) };
      ref.current.idle.play();
    }
  }, [bgColor, description,animations,mixer,status]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, groupPositionY, 0]}>
        <mesh
          ref={group}
          position={[meshPosition[0], meshPosition[1], meshPosition[2]]}
        >
          <Model url={modelPath} activeService={activeService} />
        </mesh>

        <Html fullscreen portal={domContent}>
          <div className="container">
            <div id="services" className="title">
              <div className="services-list">{children}</div>
              <div className="description-div">
                <blockquote
                  id="summary"
                  className={`description-text ${activeService}`}
                >
                  {description}
                </blockquote>
              </div>
            </div>
          </div>
        </Html>
      </group>
    </Section>
  );
};
export default Content;
