import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

import App from "./App.vue";
import "@/assets/tailwind.css";
import router from "./router";

library.add(
  faUsers,
  faSearch,
  faPeopleGroup,
  faHouseUser,
  faCalculator,
  faChartLine
);

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
