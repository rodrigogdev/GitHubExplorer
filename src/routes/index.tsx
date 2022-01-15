import React from "react";
import { Routes as Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Repository from "../pages/Repository";

function Routes() {
	return (
		<Switch>
			<Route path="/" element={<Dashboard />} />
			<Route path="/repositories/:owner/:repo" element={<Repository />} />
		</Switch>
	);
}

export default Routes;
