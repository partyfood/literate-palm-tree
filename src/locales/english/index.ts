import cameraSetting from "./cameraSetting.json";
import confirm from "./confirm.json";
import confirmPageIcon from "./confirmPageIcon.json";
import disclaimer from "./disclaimer.json";
import global from "./global.json";
import login from "./login.json";
import mainScreen from "./mainScreen.json";
import qrGenerator from "./qrGenerator.json";
import qrReader from "./qrReader.json";
import tutorial from "./tutorial.json";

const locals = {
  global,
  tutorial,
  main_screen: mainScreen,
  qr_reader: qrReader,
  qr_generator: qrGenerator,
  login,
  disclaimer,
  confirm_page_icon: confirmPageIcon,
  confirm,
  camera_setting: cameraSetting,
};

export default locals;
