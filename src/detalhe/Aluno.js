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
			matricula: this.props.match.params.matricula,
			email: '',
      senha: '',
      horas_de_voo: undefined,
      parecer_media: undefined,
      voos_supervisionados: [],
		};
	}

	async getData(callback){
		await axios.get('/aluno/' + this.state.matricula, {baseURL: api_url})
		.then(response =>  {
      console.log(JSON.stringify(response.data));
      this.setState({
        nome: response.data.nome,
        CPF: response.data.CPF,
        // matricula: response.data.matricula,
        horas_de_voo: response.data.horas_de_voo,
        email: response.data.email,
      });
		})
		.then(function(error) {
      if(error) console.log(error);
    });
    await axios.get('/voo_supervisionado/' + this.state.matricula, {baseURL: api_url})
    .then(response => {
      console.log(JSON.stringify(response.data));
      let horas_de_voo = this.state.horas_de_voo;
      let soma_parecer = 0;
      response.data.forEach(element => {
        horas_de_voo += element.horas_voadas;
        soma_parecer += element.parecer_nota;
      });
      let parecer = soma_parecer/response.data.length
      this.setState({
        horas_de_voo: horas_de_voo,
        parecer_media: parecer,
        voos_supervisionados: response.data,
      });
    })
    .then(function(error) {
      if(error) console.log(error);
    });

    callback();
  }
  
  createCards = () => {
    let cards = [];
    let i = 0;

    this.state.voos_supervisionados.forEach(element => {
      let data_hora_inicio = new Date(element.data_hora_inicio);
      let data_inicio = ("0" + data_hora_inicio.getDate()).slice(-2)
        + "/" 
        + ("0" + data_hora_inicio.getMonth()).slice(-2) 
        + "/" 
        + data_hora_inicio.getFullYear()

      let data_hora_fim = new Date(element.data_hora_fim);
      let data_fim = ("0" + data_hora_fim.getDate()).slice(-2)
        + "/" 
        + ("0" + data_hora_fim.getMonth()).slice(-2) 
        + "/" 
        + data_hora_fim.getFullYear()
      cards.push(
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={i}>
            {element.origem}-{element.destino}, {data_inicio}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={i}>
            <Card.Body>
            <div>
              <div className="detailsTitle">Matrícula do Instrutor</div>
              <div>{element.matricula_instrutor}</div>	
            </div>
            <div>
              <div className="detailsTitle">Matrícula da Aeronave</div>
              <div>{element.matricula_aeronave}</div>	
            </div>
            <div>
              <div className="detailsTitle">Aeródromo de Origem</div>
              <div>{element.origem}</div>	
            </div>
            <div>
              <div className="detailsTitle">Aeródromo de Destino</div>
              <div>{element.destino}</div>	
            </div>
            <div>
              <div className="detailsTitle">Data e hora de início</div>
              <div>{data_inicio}</div>	
            </div>
            <div>
              <div className="detailsTitle">Data e hora de fim</div>
              <div>{data_fim}</div>	
            </div>
            <div>
              <div className="detailsTitle">Parecer</div>
              <div>{element.parecer_nota}</div>														
            </div>
            <div>
              <div className="detailsTitle">Comentários</div>
              <div>{element.parecer_comentario}</div>	
            </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      );
      i ++;
    });
    return cards;
  }

	componentDidMount(){
    console.log(this.props)
		this.getData( () => {});
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
										{this.state.parecer_media}
										<ProgressBar variant="success" now={(this.state.parecer_media/5)*100}/>
									</div>
								</div>
								<hr/>
								<div className="voos">
									<h2>Voos Supervisionados</h2>
									<Accordion>
										{this.createCards()}
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
