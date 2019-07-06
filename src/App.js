import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Switch from 'react-router-dom/es/Switch';
import Topbar from './components/Topbar/Topbar';
import Reports from './screens/Reports/Reports';
import Summary from './screens/Summary/Summary';
import Tables from './screens/Tables/Tables';
import Boards1 from './screens/Boards/Boards1';

export default withRouter(
	class App extends React.PureComponent {
		render() {
			return (
				<div>
					<Topbar />
					<Switch>
						<RouteWithTitle exact title="Tableros" path="/inicio" component={Boards1} />
						<RouteWithTitle exact title="Tablas" path="/tablas" component={Tables} />
						<RouteWithTitle exact title="Resumen" path="/resumen" component={Summary} />
						<RouteWithTitle exact title="Reportes" path="/reportes" component={Reports} />
						<Redirect to={'/inicio'} />
					</Switch>
				</div>
			);
		}
	}
);

export const RouteWithTitle = ({ title, render, component: Comp, ...props }) => (
	<Route {...props} render={(p) => <DocumentTitle title={title}>{render ? render(p) : <Comp {...p} />}</DocumentTitle>} />
);