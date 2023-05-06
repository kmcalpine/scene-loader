import { ILoadingScreen } from "@babylonjs/core/Loading/loadingScreen";
import { ExampleState } from "./store";

/**
 * Don't see the point of this:
 * https://doc.babylonjs.com/divingDeeper/scene/customLoadingScreen
 *
 * Looks like you need to call engine.displayLoadingUI()/engine.hideLoadingUI()
 */
export class CustomLoadingScreen implements ILoadingScreen {
  constructor(public store: ExampleState) {}

  public loadingUIBackgroundColor: string = "red";
  public loadingUIText: string = "ignored";

  public displayLoadingUI() {
    console.log("display loading UI called (CustomLoadingScreen)");
    this.store.setModelLoading(true);
  }

  public hideLoadingUI() {
    console.log("hide loading UI called (CustomLoadingScreen)");
    this.store.setModelLoading(false);
  }
}
