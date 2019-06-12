import React, { Component } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import "./Instrutor.css"
import MyNavbar from '../Navbar';
import axios from 'axios';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();
const api_url = process.env.REACT_APP_API_URL;

class Instrutor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nome: '',
			CPF: undefined,
			matricula: undefined,
			email: '',
			senha: '',
			horas_de_voo: undefined,
			breve: undefined,
			certificado_instrutor: undefined
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		console.log('A form was submitted: ' + JSON.stringify(this.state));

		axios
			.post('/instrutor/', this.state, { baseURL: api_url })
			.then(function(response) {
				console.log(response);
			})
			.then(function(error) {
				console.log(error);
			});

		event.preventDefault();
	}

	render() {
		return (
			<div>
				<link
					rel="stylesheet"
					href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
					integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
					crossOrigin="anonymous"
				/>
				<MyNavbar />
				<Container className="Card">
					{/* Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page */}
					<Card>
						<Card.Body>
							<Card.Title className="titulo">Cadastrar instrutor</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								Página para o cadastro de Instrutor
							</Card.Subtitle>
							<Form onSubmit={this.handleSubmit}>
								<Form.Group className="campo nome">
									<Form.Label>Nome</Form.Label>
									<Form.Control
										type="text"
										placeholder="Nome"
										name="nome"
										value={this.state.nome}
										onChange={this.handleChange}
										required
									/>
								</Form.Group>
								<Form.Group className="campo CPF">
									<Form.Label>CPF</Form.Label>
									<Form.Control
										type="number"
										placeholder="CPF"
										name="CPF"
										value={this.state.CPF}
										onChange={this.handleChange}
										required
									/>
								</Form.Group>
								<Form.Group className="campo matricula">
									<Form.Label>Número de matrícula</Form.Label>
									<Form.Control
										type="number"
										placeholder="Matrícula"
										name="matricula"
										value={this.state.matricula}
										onChange={this.handleChange}
										required
									/>
								</Form.Group>
								<Form.Group className="campo horas">
									<Form.Label>Horas de voo</Form.Label>
									<Form.Control
										type="number"
										placeholder="Horas de voo"
										name="horas_de_voo"
										value={this.state.horas_de_voo}
										onChange={this.handleChange}
										required
									/>
								</Form.Group>
								<Form.Group className="campo breve">
									<Form.Label>Número do breve</Form.Label>
									<Form.Control
										type="number"
										placeholder="Breve"
										name="breve"
										value={this.state.breve}
										onChange={this.handleChange}
										required
									/>
								</Form.Group>
								<Form.Group className="campo certificado_instrutor">
									<Form.Label>Número do certificado de instrutor</Form.Label>
									<Form.Control
										type="number"
										placeholder="Certificado de instrutor"
										name="certificado_instrutor"
										value={this.state.certificado_instrutor}
										onChange={this.handleChange}
										required
									/>
								</Form.Group>
								<Form.Group className="campo email">
									<Form.Label>Endereço de e-mail</Form.Label>
									<Form.Control
										type="email"
										placeholder="Email"
										name="email"
										value={this.state.email}
										onChange={this.handleChange}
										required
									/>
								</Form.Group>
								<Form.Group className="campo senha">
									<Form.Label>Senha</Form.Label>
									<Form.Control
										type="password"
										placeholder="Senha"
										name="senha"
										value={this.state.senha}
										onChange={this.handleChange}
										required
									/>
								</Form.Group>
								<Button className="botao" type="submit">
									Enviar
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Container>
			</div>
		);
	}
}

export default Instrutor;
