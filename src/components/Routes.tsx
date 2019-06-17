import WorkplacesForm from "containers/WorkplaceForm";
import WorkbookForm from "containers/WorkbookForm";
import { Switch, Route } from "react-router-dom";
import Workplaces from "containers/Workplaces";
import Workbook from "containers/Workbooks";
import withLayout from "../HOCs/withLayout";
import NotFound from "components/NotFound";
import SignIn from "containers/SignIn";
import * as React from "react";

export default function Routes(): JSX.Element {
  return (
    <Switch>
      <Route path="/sign-in" component={SignIn}/>

      <Route path="/" component={withLayout(Workbook)} exact/>
      <Route path="/workbooks" component={withLayout(Workbook)} exact/>
      <Route path="/workbooks/create" component={withLayout(WorkbookForm)} exact/>
      <Route path="/workbooks/:id/edit" component={withLayout(WorkbookForm)} exact/>

      <Route path="/workplaces/:workbookId" component={withLayout(Workplaces)} exact/>
      <Route path="/workplaces/:workbookId/create" component={withLayout(WorkplacesForm)} exact/>
      <Route path="/workplaces/:workbookId/:id/edit" component={withLayout(WorkplacesForm)} exact/>

      <Route component={withLayout(NotFound)}/>
    </Switch>
  );
}
