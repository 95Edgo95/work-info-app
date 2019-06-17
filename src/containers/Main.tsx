import {ISelectorVariables} from "services/selector";
import Notifications from "containers/Notifications";
import {mapStateToProps} from "helpers/ReduxHelper";
import {RouteComponentProps} from "react-router";
import Routes from "components/Routes";
import {connect} from "react-redux";
import * as React from "react";

interface IMainProps extends RouteComponentProps {
  signedInCheckCompleted: boolean;
  isLoggedIn: boolean;
}

class Main extends React.Component<IMainProps> {
  componentDidMount(): void {
    const { isLoggedIn, history, signedInCheckCompleted } = this.props;

    if (signedInCheckCompleted && !isLoggedIn && !location.pathname.includes("/sign-in")) {
      history.push("/sign-in");
    }
  }

  componentDidUpdate(prevProps: IMainProps): void {
    const { isLoggedIn, history, signedInCheckCompleted } = this.props;

    if (!location.pathname.includes("/sign-in") && !isLoggedIn) {
      if (prevProps.isLoggedIn || (signedInCheckCompleted && !prevProps.signedInCheckCompleted)) {
        history.push("/sign-in");
      }
    }
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <Notifications />
        <Routes />
      </React.Fragment>
    );
  }
}

const selectorVariables: ISelectorVariables = {
  user: {
    signedInCheckCompleted: true,
    isLoggedIn: true,
  }
};

export default connect<IMainProps>(mapStateToProps(selectorVariables))(Main);
