import { Suspense } from "react";
import { Scene, Model } from "react-babylonjs";
import "@babylonjs/loaders"; // NOTE: loads all model types.
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

import { useExampleStore } from "./store";

const MyScene = () => {
  const { currentModel, setModelLoading } = useExampleStore();

  // const engine = useEngine();
  // useEffect(() => {
  //   if (engine === null) {
  //     console.error("engine not available");
  //     return;
  //   }
  //   const loadingScreen = new CustomLoadingScreen(exampleStore);
  //   engine.loadingScreen = loadingScreen;
  // }, [engine, exampleStore]);

  return (
    <Scene>
      <arcRotateCamera
        name="arc"
        target={new Vector3(0, 1, 0)}
        alpha={Math.PI / 2}
        beta={0.5 + Math.PI / 4}
        radius={5}
        minZ={0.001}
        wheelPrecision={50}
        lowerRadiusLimit={8}
        upperRadiusLimit={20}
        upperBetaLimit={Math.PI / 2}
      />
      <hemisphericLight
        name="hemi"
        direction={new Vector3(0, -1, 0)}
        intensity={0.8}
      />
      <directionalLight
        name="shadow-light"
        setDirectionToTarget={[Vector3.Zero()]}
        direction={Vector3.Zero()}
        position={new Vector3(-40, 30, -40)}
        intensity={0.4}
        shadowMinZ={1}
        shadowMaxZ={2500}
      >
        <shadowGenerator
          mapSize={1024}
          useBlurExponentialShadowMap
          blurKernel={32}
          shadowCastChildren
        >
          {currentModel && (
            <Suspense
              key={`${currentModel.sceneFilename}`}
              fallback={<box name="test" position={new Vector3(0, 2, 0)} />}
            >
              <Model
                name="example"
                sceneFilename={currentModel.sceneFilename}
                rootUrl={currentModel.rootUrl}
                position={new Vector3(0, 3, 0)}
                rotation={currentModel.rotation}
                scaleToDimension={4}
                onModelLoaded={() => setModelLoading(false)}
              />
            </Suspense>
          )}
        </shadowGenerator>
      </directionalLight>

      <ground
        name="ground1"
        width={10}
        height={10}
        subdivisions={2}
        receiveShadows={true}
      />
    </Scene>
  );
};

export default MyScene;
