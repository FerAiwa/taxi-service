/* 
import { User } from './_models/user.js';
import { LoginService } from './login.js';
import { RideService } from './ride.service.js'; */

import { RidesViewFactory } from "./rides.view.factory.js";
import { RidesDataService } from "./rides.data.js";
import { RidesController } from "./rides.controller.js";

export const Main = (() => {
  console.info("starting Main");
  const config = {
    templateRef: "#rides",
    sortOptions: {
      activeFilter: "departure",
      sortDescending: "true"
    }
  };
  const tableRef = document.querySelector(config.templateRef);

  //Initialize
  const user = "admin";
  const view = RidesViewFactory(user, tableRef);
  const model = new RidesDataService();
  const controller = new RidesController(view, model, config.sortOptions);
  controller.initialize();
})();
