import { Engine } from "react-babylonjs";

import { useExampleStore } from "./store";
import MyScene from "./MyScene";
import LoadingDialog from "./LoadingDialog";

import "bootstrap/dist/js/bootstrap.esm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function App() {
  const { models, setCurrentModel, isLoading } = useExampleStore();

  return (
    <div className="App">
      <div>
        <h1>Hello CodeSandbox</h1>
        {models.map((model) => (
          <button
            className="btn btn-primary m-2"
            key={model.sceneFilename}
            onClick={() => setCurrentModel(model)}
          >
            {model.sceneFilename}
          </button>
        ))}
        <button
          className="btn btn-primary m-2"
          onClick={() => setCurrentModel(null)}
        >
          None
        </button>
        <span>Loading: {isLoading ? "yes" : "no"}</span>
      </div>
      <LoadingDialog />
      <Engine
        antialias={true}
        adaptToDeviceRatio={true}
        canvasId="sample-canvas"
      >
        <MyScene />
      </Engine>
    </div>
  );
}
