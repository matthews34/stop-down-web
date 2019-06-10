import React, { Component } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import './Instrutor.css';
import MyNavbar from '../Navbar';
import axios from 'axios';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();
const api_url = process.env.REACT_APP_API_URL;

class Instrutor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			parecer_nota: undefined,
			parecer_comentario: '',
			data_hora_inicio: undefined,
			data_hora_fim: undefined,
			matricula_aeronave: '',
			origem: undefined,
			destino: undefined,
			matricula_instrutor: undefined,
			matricula_aluno: undefined
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
			.post('/voo_supervisionado/', this.state, { baseURL: api_url })
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
							<Card.Title className="titulo">Cadastrar Voo Supervisionado</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								Página para o cadastro de Voo Supervisionado
							</Card.Subtitle>
							<Form onSubmit={this.handleSubmit}>
								<Form.Group className="campo matricula2">
									<Form.Label>Matrícula do Aluno</Form.Label>
									<Form.Control
										type="number"
										placeholder="Matricula do Aluno"
										name="matricula_aluno"
										value={this.state.matricula_aluno}
										onChange={this.handleChange}
										required
									/>
								</Form.Group>
								<Form.Group className="campo matricula2">
									<Form.Label>Matrícula do Instrutor</Form.Label>
									<Form.Control
										type="number"
										placeholder="Matricula Instrutor"
										name="matricula_instrutor"
										value={this.state.matricula_instrutor}
										onChange={this.handleChange}
										required
									/>
								</Form.Group>
								<Form.Group className="campo matricula_aeronave2">
									<Form.Label>Matrícula da Aeronave</Form.Label>
									<Form.Control
										type="text"
										placeholder="Ex: PP-ABC"
										name="matricula_aeronave"
										value={this.state.matricula_aeronave}
										onChange={this.handleChange}
										required
									/>
								</Form.Group>
								<Form.Group className="campo origem2">
									<Form.Label>Origem</Form.Label>
									<Form.Control
										type="text"
										placeholder="Ex: CGH(sigla do aeroporto"
										name="origem"
										value={this.state.origem}
										onChange={this.handleChange}
										required
									/>
								</Form.Group>
								<Form.Group className="campo destino2">
									<Form.Label>Destino</Form.Label>
									<Form.Control
										type="text"
										placeholder="Ex: SBMT(sigla do aeroporto)"
										name="destino"
										value={this.state.destino}
										onChange={this.handleChange}
										required
									/>
								</Form.Group>
								<Form.Group className="campo data_inicio2">
									<Form.Label>Data de Início</Form.Label>
									<Form.Control
										type="text"
										placeholder="dd/mm/aa"
										name="data_hora_inicio"
										value={this.state.data_hora_inicio}
										onChange={this.handleChange}
										required
									/>
								</Form.Group>
								<Form.Group className="campo data_fim2">
									<Form.Label>Data de Fim</Form.Label>
									<Form.Control
										type="text"
										placeholder="dd/mm/aa"
										name="data_hora_fim"
										value={this.state.data_hora_fim}
										onChange={this.handleChange}
										required
									/>
								</Form.Group>
								<Form.Group className="campo parecer_nota">
									<Form.Label>Parecer</Form.Label>
									<Form.Control
										as="select"
										type="number"
										placeholder="Ex: "
										name="parecer_nota"
										value={this.state.parecer_nota}
										onChange={this.handleChange}
										required
									>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
									</Form.Control>
								</Form.Group>
								<Form.Group className="campo parecer_comentario">
									<Form.Label>Comentários</Form.Label>
									<Form.Control
										as="textarea"
										rows="3"
										placeholder="Digite aqui o seu comentário sobre o voo"
										name="parecer_comentario"
										value={this.state.parecer_comentario}
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
