export const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });



import { notification } from "antd";
const success = (type: any) => {
  notification.success({
    message: type,
    style: {
      top: 200,
    },
    duration: 0.5,
  });
};
const failed = (type: any) => {
  notification.error({
    message: type,
    style: {
      top: 200,
    },
    duration: 0.5,
  });
};
export { success, failed };