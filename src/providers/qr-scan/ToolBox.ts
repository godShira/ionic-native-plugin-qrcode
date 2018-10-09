
export class ToolBox{
  static showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  static hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    let content = <HTMLElement>document.getElementsByTagName("body")[0];
    content.style.background = "white !important";
  }

}
