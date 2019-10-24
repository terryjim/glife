import Toast from 'react-native-root-toast';
/**
 * 提示与加载工具类
 */
export default class Tips {
  static isLoading = false

  /**
   * 信息提示
   */
  static toast(title: string, onHide?: () => void) {
    Toast.show(title, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onHide:onHide
    });
    // 隐藏结束回调
    // if (onHide) {
    //   setTimeout(() => {
    //     onHide();
    //   }, 500);
    // }
  }
}
  
