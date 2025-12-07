import { useAlert } from "../context/AlertContext";

let _show: ReturnType<typeof useAlert>['show'] = () => { };

export const Alert = {

  init: (showFunction: typeof _show) => {
    _show = showFunction;
  },

  show: (type: Parameters<typeof _show>[0], title: string, message: string, duration?: number) => {
    _show(type, title, message, duration);
  },

  info: (title: string, message: string, duration?: number) =>
    _show('info', title, message, duration),
  warn: (title: string, message: string, duration?: number) =>
    _show('warn', title, message, duration),
  error: (title: string, message: string, duration?: number) =>
    _show('error', title, message, duration),
  success: (title: string, message: string, duration?: number) =>
    _show('success', title, message, duration),
}