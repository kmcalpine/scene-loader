import { Vector3 } from "@babylonjs/core";
import { Nullable } from "@babylonjs/core/types";
import produce from "immer";
import create from "zustand";
import { devtools } from "zustand/middleware";

export type ModelDescription = {
  sceneFilename: string;
  rootUrl: string;
  rotation: Vector3;
};

export type ExampleState = {
  isLoading: boolean;
  currentModel: Nullable<ModelDescription>;
  models: ModelDescription[];
  setCurrentModel: (model: Nullable<ModelDescription>) => void;
  setModelLoading: (isLoading: boolean) => void;
};

const createStore = () =>
  create<ExampleState>()(
    devtools<ExampleState>(
      /*persist(*/ (set, get) => ({
        isLoading: false,
        currentModel: null,
        models: [
          {
            sceneFilename: "Alien.gltf",
            rootUrl: "/alien/",
            rotation: Vector3.Zero() // new Vector3(0, Math.PI /* 180 degrees */, 0)
          },
          {
            sceneFilename: "BoomBox.gltf",
            rootUrl: "/boombox/",
            rotation: Vector3.Zero()
          } //
        ],
        setModelLoading: (isLoading: boolean) => {
          set(
            produce((state: ExampleState) => {
              state.isLoading = isLoading;
            })
          );
        },
        setCurrentModel: (model: Nullable<ModelDescription>): void => {
          set(
            produce((state: ExampleState) => {
              state.isLoading = model !== null;
              state.currentModel = model;
            })
          );
        }
      }) /*)*/,
      {
        name: "example-store"
      }
    )
  );

export const useExampleStore = createStore();
