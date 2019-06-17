import {removeNotification} from "store/notification/NotificationActionCreators";
import {mapDispatchToProps, mapStateToProps} from "helpers/ReduxHelper";
import { ToastContainer, toast } from "react-toastify";
import {ISelectorVariables} from "services/selector";
import {connect} from "react-redux";
import * as React from "react";

import "react-toastify/dist/ReactToastify.css";

interface INotificationsProps {
  removeNotification: (id: number) => void;
  notifications: any;
}

class Notifications extends React.Component<INotificationsProps, undefined> {
  ids: number[] = [];

  componentDidMount(): void {
    const {notifications} = this.props;

    if (notifications.size > 0) {
      this.addNotifications();
    }
  }

  componentDidUpdate(prevProps: any): void {
    const {notifications} = this.props;

    if (!notifications.equals(prevProps.notifications)) {
      this.addNotifications();
    }
  }

  addNotifications() {
    const {notifications} = this.props;

    notifications.forEach(notification => {
      if (this.ids.includes(notification.get("id"))) {
        return;
      }

      switch (notification.get("type")) {
        case "success":
          toast.success(notification.get("message"), {
            onClose: this.onClose(notification.get("id")),
            hideProgressBar: true,
            position: "top-right",
            closeOnClick: true,
            pauseOnHover: true,
          });
          break;

        case "error":
          toast.error(notification.get("message"), {
            onClose: this.onClose(notification.get("id")),
            hideProgressBar: true,
            position: "top-right",
            closeOnClick: true,
            pauseOnHover: true,
          });
          break;

        default:
          toast(notification.get("message"), {
            onClose: this.onClose(notification.get("id")),
            hideProgressBar: true,
            position: "top-right",
            closeOnClick: true,
            pauseOnHover: true,
          });
          break;
      }

      this.ids.push(notification.get("id"));
    });
  }

  onClose = (id: number) => () => {
    const {removeNotification} = this.props;

    const indexOf: number = this.ids.indexOf(id);
    this.ids.splice(indexOf, 1);

    removeNotification(id);
  };

  render(): JSX.Element {
    return (
      <ToastContainer
        hideProgressBar={true}
        position="top-right"
        autoClose={2000}
        pauseOnHover
        closeOnClick
        newestOnTop
      />
    );
  }
}

const selectorVariables: ISelectorVariables = {
  notification: {
    notifications: true,
  }
};

const actions: any = {removeNotification};

export default connect<undefined, INotificationsProps>(mapStateToProps(selectorVariables), mapDispatchToProps(actions))(Notifications);
