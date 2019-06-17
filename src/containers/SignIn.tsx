import {mapDispatchToProps, mapStateToProps} from "helpers/ReduxHelper";
import {attemptSignIn} from "store/user/UserActionCreators";
import {ISelectorVariables} from "services/selector";
import {RouteComponentProps} from "react-router";
import Button from "components/Button";
import Input from "components/Input";
import {connect} from "react-redux";
import * as React from "react";

import * as styles from "assets/css/signIn.css";

interface ISignInState {
  username: string;
  password: string;
  errors: string[];
}

interface ISignInReduxProps {
  isLoggedIn: boolean;
  errorFields: any;
}

interface ISignInDispatchProps {
  attemptSignIn: (username: string, password: string) => void;
}

interface ISignInProps extends ISignInReduxProps, ISignInDispatchProps, RouteComponentProps {}

class SignIn extends React.Component<ISignInProps, ISignInState> {
  state: ISignInState = {
    username: "",
    password: "",
    errors: [],
  };

  handleChange = ({currentTarget: {name, value}}: React.ChangeEvent<HTMLInputElement>) => {
    const newState: ISignInState = {...this.state};
    newState[name] = value;

    this.updateErrors(name, newState);
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const {username, password} = this.state;
    const {attemptSignIn} = this.props;

    attemptSignIn(username, password);
  };

  updateErrors(updatedKey: string, nextState: any): void {
    const {errors} = this.state;

    if (errors.includes(updatedKey)) {
      const nextErrors: string[] = [...errors];
      const index: number = errors.indexOf(updatedKey);
      nextErrors.splice(index, 1);

      this.setState({...nextState, errors: nextErrors});
    } else {
      this.setState(nextState);
    }
  }

  componentDidMount(): void {
    const {isLoggedIn, history} = this.props;

    if (isLoggedIn) {
      history.push("/");
    }
  }

  componentDidUpdate(prevProps: ISignInProps): void {
    const {isLoggedIn, history, errorFields} = this.props;

    if (!prevProps.isLoggedIn && isLoggedIn) {
      history.push("/");
    }

    if (errorFields.size > 0 && prevProps.errorFields.size === 0) {
      this.setState({errors: errorFields.toJS()});
    }
  }

  render(): JSX.Element {
    const {username, password, errors} = this.state;

    return (
      <div className={styles.wrapper}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <Input
              isValid={username.length > 0 && !errors.includes("username")}
              hasError={errors.includes("username")}
              onChange={this.handleChange}
              placeholder="Username"
              value={username}
              name="username"
              type="text"
            />
          </div>
          <div className={styles.inputWrapper}>
            <Input
              isValid={password.length > 0 && !errors.includes("password")}
              hasError={errors.includes("password")}
              onChange={this.handleChange}
              placeholder="Password"
              value={password}
              type="password"
              name="password"
            />
          </div>
          <div className={styles.actionBtnWrapper}>
            <Button type="submit">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const selectorVariables: ISelectorVariables = {
  user: {
    errorFields: true,
    isLoggedIn: true
  }
};

const actions: any = {attemptSignIn};

export default connect<ISignInReduxProps, ISignInDispatchProps, any>(mapStateToProps(selectorVariables), mapDispatchToProps(actions))(SignIn);
