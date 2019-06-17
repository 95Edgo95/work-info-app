import {attemptSignOut} from "store/user/UserActionCreators";
import {mapDispatchToProps} from "helpers/ReduxHelper";
import Button from "components/Button";
import {connect} from "react-redux";
import * as React from 'react';

import * as styles from "assets/css/header.css";
import {Link} from "react-router-dom";

interface IHeaderProps {
  attemptSignOut: () => void;
}

function Header({ attemptSignOut }: IHeaderProps) {
  return (
    <div className={styles.header}>
      <Link to="/">
        Home
      </Link>
      <Button secondary onClick={attemptSignOut}>
        Exit
      </Button>
    </div>
  );
}

const actions = {
  attemptSignOut
};

export default connect<{}, IHeaderProps>(null, mapDispatchToProps(actions))(Header);
