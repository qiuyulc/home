const imgs_url = ["music-bg.png", "bg.png"];
const imgs = import.meta.glob("../assets/images/*.png");
const imgs_key = Object.keys(imgs);
interface ImageModule {
  default: string;
}
window.onload = function () {
  for (let i = 0; i < imgs_url.length; i++) {
    const name = imgs_key.find((item) => item.includes(imgs_url[i]));
    if (name) {
      const img = new Image();
      // console.log(imgs[name]())
      imgs[name]().then((res) => {
        console.log(res, 1);
        img.src = (res as ImageModule).default;
      });
      // img.src = imgs[name]();
    }
    // console.log(imgs_key.includes(imgs_url[i]),imgs_key,imgs_url[i])
  }
};
