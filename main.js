import { LoginService } from "./login.js";
import { RidesViewFactory } from "./rides.view.factory.js";
import { RidesDataService } from "./rides.data.js";
import { RidesController } from "./rides.controller.js";

export const Main = (() => {
  console.info("starting Main");
  const config = {
    templateRef: rides, //#rides
    sortOptions: {
      activeFilter: "departure",
      sortDescending: "true"
    }
  };

  //Initialize
  const user = { name: "Fer", permissions: "admin" }; //LoginService()
  const viewPresset =
    user.permissions === "admin"
      ? {
          sliders: true,
          buttons: { buy: false, edit: true, create: true, erase: true }
        } //admin setup
      : {
          sliders: true,
          buttons: { buy: true, edit: false, create: false, erase: false }
        }; //user setup

  const view = RidesViewFactory(viewPresset, config.templateRef);
  const model = new RidesDataService();
  const controller = new RidesController(view, model, config.sortOptions);
  controller.initialize();
})();
