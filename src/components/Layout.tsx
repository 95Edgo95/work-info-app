import Header from "components/Header";
import * as React from "react";

interface ILayoutProps {
  children: any;
}

export default function Layout({ children }: ILayoutProps): JSX.Element {
    return (
      <div>
        <Header />
        {children}
      </div>
    );
}
