import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Cadastro_instrutor from './cadastro/Instrutor';
import Cadastro_voo from './cadastro/Voo';
import Cadastro_piloto from './cadastro/Piloto';
import Cadastro_voo_supervisionado from './cadastro/Voo_supervisionado';
import Cadastro_aluno from './cadastro/Aluno';
import Busca_instrutor from './busca/Instrutor';
import Busca_aluno from './busca/Aluno';
import Lista_aluno from './lista/Aluno';
import * as serviceWorker from './serviceWorker';
import Home from './Home';

const routing = (
	<Router>
		<div>
			<Route exact path="/" component={Home} />
			<Route exact path="/cadastro/instrutor" component={Cadastro_instrutor} />
			<Route exact path="/cadastro/voo" component={Cadastro_voo} />
			<Route exact path="/cadastro/piloto" component={Cadastro_piloto} />
			<Route exact path="/cadastro/voo_supervisionado" component={Cadastro_voo_supervisionado} />
			<Route exact path="/cadastro/aluno" component={Cadastro_aluno} />
      <Route exact path="/busca/instrutor" component={Busca_instrutor} />
      <Route exact path="/busca/aluno" component={Busca_aluno}/>
      <Route exact path="/lista/aluno" component={Lista_aluno}/>
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
