import Layout from "components/Layout";
import * as React from "react";

export default function withLayout(Component) {
  return props => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
}
