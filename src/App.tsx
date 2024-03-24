import {
  LayoutImage,
  TimeCom,
  TextCom,
  SwiperCom,
  UserCom,
  MusicCom,
} from "./components";
// 添加注释
function App() {
  return (
    <>
      <LayoutImage>
        <div className="App">
          <div className="app_left">
            <div className="app_left_time_text">
              <TimeCom className={"app_left_width"}></TimeCom>
              <TextCom className={"app_left_width"}></TextCom>
            </div>

            <div className="app_left_bottom">
              <div className="app_left_bottom_title">我的世界</div>
              <div className="app_left_bottom_box">
                <SwiperCom></SwiperCom>
              </div>
            </div>
            <UserCom></UserCom>
          </div>
          <div className="app_right">
            <MusicCom></MusicCom>
          </div>
        </div>
      </LayoutImage>
    </>
  );
}

export default App;
