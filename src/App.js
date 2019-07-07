import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Switch from 'react-router-dom/es/Switch';
import Topbar from './components/Topbar/Topbar';
import Boards1 from './screens/Boards/Boards1';
import Report from './screens/Report/Report';
import Summary from './screens/Summary/Summary';
import Users from './screens/Users/Users';


export default withRouter(
	class App extends React.PureComponent {
		render() {
			return (
				<div>
					<Topbar />
					<Switch>
						<RouteWithTitle exact title="Tableros" path="/inicio" component={Boards1} />
						<RouteWithTitle exact title="Tablas" path="/reporte" component={Report} />
						<RouteWithTitle exact title="Tablas" path="/resumen" component={Summary} />
						<RouteWithTitle exact title="Usuarios" path="/usuarios" component={Users} />
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