import React, { Component } from 'react';
import { Card, Form, Button, Container, Accordion, ProgressBar } from 'react-bootstrap';
import './Detalhe.css';
import MyNavbar from '../Navbar';
import axios from 'axios';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();
const api_url = process.env.REACT_APP_API_URL;

class Aluno extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nome: '',
			CPF: undefined,
			matricula: 1212,
			email: '',
			senha: '',
			horas_de_voo: undefined
		};
	}

	async getData(callback){
		axios.get('/aluno/' + this.state.matricula, {baseURL: api_url})
		.then(response =>  {
		console.log(JSON.stringify(response.data));
		this.setState({
			nome: response.data.nome,
			CPF: response.data.CPF,
			matricula: response.data.matricula,
			horas_de_voo: response.data.horas_de_voo,
			email: response.data.email,
		});
		})
		.then(function(error) {
		console.log(error);
		});
	}

	componentDidMount(){
		this.getData();
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
								<div className="parte1 nome">
									<h1>{this.state.nome}</h1>
								</div>
								<div className="parte1 CPF">
                                    <div className="detailsTitle"> CPF </div>
                                    <div>{this.state.CPF}</div>
								</div>
								<div className="parte2">
									<div className="detailsTitle"> Número de Matrícula </div>
                                    <div>{this.state.matricula}</div>
								</div>
								<div className="parte2 email">
									<div className="detailsTitle">Endereço de E-mail </div>
                                    <div>{this.state.email}</div>
								</div>
								<div className="parte3">
									<div className="detailsTitle">Horas de Voo</div>
									<div className="progress_bar">
										{this.state.horas_de_voo}
										<ProgressBar animated now={(this.state.horas_de_voo/150)*100}/>
									</div>
									<br/>
									<div className="detailsTitle">Média do Parecer</div>
									<div className="progress_bar">
										3.6
										<ProgressBar variant="success" now={(3.6/5)*100}/>
									</div>
								</div>
								<hr/>
								<div className="voos">
									<h2>Voos Supervisionados</h2>
									<Accordion>
										<Card>
											<Accordion.Toggle as={Card.Header} eventKey="0">
												GRU-CGH, 02/03/1997
											</Accordion.Toggle>
											<Accordion.Collapse eventKey="0">
											<Card.Body>
												<div>
													<div className="detailsTitle">Matrícula do Instrutor</div>
													<div>1212</div>	
												</div>
												<div>
													<div className="detailsTitle">Nome do Instrutor</div>
													<div>Luca Roja</div>	
												</div>
												<div>
													<div className="detailsTitle">Matrícula da Aeronave</div>
													<div>PP-ABC</div>	
												</div>
												<div>
													<div className="detailsTitle">Aeródromo de Origem</div>
													<div>GRU</div>	
												</div>
												<div>
													<div className="detailsTitle">Aeródromo de Destino</div>
													<div>CGH</div>	
												</div>
												<div>
													<div className="detailsTitle">Data e hora de início</div>
													<div>02/03/1997, 8h52</div>	
												</div>
												<div>
													<div className="detailsTitle">Data e hora de fim</div>
													<div>05/08/2018, 13h42</div>	
												</div>
												<div>
													<div className="detailsTitle">Parecer</div>
													<div>4</div>														
												</div>
												<div>
													<div className="detailsTitle">Comentários</div>
													<div>Voo excelente! Foram ótimos 21 anos da minha vida :)</div>	
												</div>

											</Card.Body>
											</Accordion.Collapse>
										</Card>
										<Card>
											<Accordion.Toggle as={Card.Header} eventKey="1">
												SBMT-SBMT, 28/02/2019
											</Accordion.Toggle>
											<Accordion.Collapse eventKey="1">
											<Card.Body>
												<div>
													<div className="detailsTitle">Matrícula do Instrutor</div>
													<div>1212</div>	
												</div>
												<div>
													<div className="detailsTitle">Nome do Instrutor</div>
													<div>Luca Roja</div>	
												</div>
												<div>
													<div className="detailsTitle">Matrícula da Aeronave</div>
													<div>PP-ABC</div>	
												</div>
												<div>
													<div className="detailsTitle">Aeródromo de Origem</div>
													<div>SBMT</div>	
												</div>
												<div>
													<div className="detailsTitle">Aeródromo de Destino</div>
													<div>SBMT</div>	
												</div>
												<div>
													<div className="detailsTitle">Data e hora de início</div>
													<div>28/02/2019, 8h52</div>	
												</div>
												<div>
													<div className="detailsTitle">Data e hora de fim</div>
													<div>28/02/2019, 8h57</div>	
												</div>
												<div>
													<div className="detailsTitle">Parecer</div>
													<div>1</div>														
												</div>
												<div>
													<div className="detailsTitle">Comentários</div>
													<div>
														Tivemos que fazer um pouso de emergência pois o aluno 
														perdeu o controle.
													</div>	
												</div>
											</Card.Body>
											</Accordion.Collapse>
										</Card>
									</Accordion>
								</div>
						</Card.Body>
					</Card>
				</Container>
			</div>
		);
	}
}

export default Aluno;
