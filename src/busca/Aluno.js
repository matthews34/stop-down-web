import React, { Component } from 'react';
import { Form, Button, FormControl, Table } from 'react-bootstrap';
import MyNavbar from '../Navbar';
import axios from 'axios';
import './Aluno.css'
import {config as dotenvConfig} from 'dotenv'

dotenvConfig()
const api_url = process.env.REACT_APP_API_URL

class Aluno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      CPF: '',
      matricula: '',
      email: '',
      horas_de_voo: undefined,
      alunos: [],
      buscaFeita: false,
      busca: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      busca: value,
    });
  }

  async handleSubmit(event) {
    console.log('A form was submitted: ');
    console.log(this.state.matricula);

    axios.get('/aluno/' + this.state.busca, {baseURL: api_url})
    .then(response =>  {
      console.log(JSON.stringify(response.data));
      this.setState({
        nome: response.data.nome,
        CPF: response.data.CPF,
        matricula: response.data.matricula,
        email: response.data.email,
        horas_de_voo: response.data.horas_de_voo,
        buscaFeita: true,
      });
    })
    .then(function(error) {
      console.log(error);
    });

    if(this.state.busca == '') {
      this.setState({
        buscaFeita: false,
      })
    }
    
    event.preventDefault();
  }

  async getData(callback) {
    // console.log('A form was submitted: ');

    await axios.get('/aluno/', {baseURL: api_url})
    .then(response =>  {
      // console.log("peguei");
      console.log(JSON.stringify(response.data));
      this.setState({
        alunos: response.data,
      });
    })
    .then(function(error) {
      console.log(error);
    });

    callback();
  }

  createTable = () => {
    let tabela = []

    this.state.alunos.forEach(element => {
      let url = "/detalhes/aluno/" + element.matricula
      tabela.push(
        <tr>
          <td>{element.matricula}</td>
          <td><a href={url}>{element.nome}</a></td>
          <td>{element.CPF}</td>
          <td>{element.email}</td>
        </tr>
      );
    });
    return tabela
  }

  componentDidMount() {
    this.getData(() => {});
  }
  
  render() {
    let tabela;
    console.log(this.state.buscaFeita)
    if(this.state.buscaFeita) {
      let url = "/detalhes/aluno/" + this.state.matricula;
      tabela =  <tr>
                  <td>{this.state.matricula}</td>
                  <td><a href={url}>{this.state.nome}</a></td>
                  <td>{this.state.CPF}</td>
                  <td>{this.state.email}</td>
                </tr>
    } else {
      tabela = this.createTable();
    }
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <MyNavbar/>
        <div style={{'marginTop': '1vw', 'align': 'center'}}>
          <Form inline className="busca">
            <FormControl type="text" placeholder="Matrícula" className="mr-sm-2 caixa_busca" name="busca" value={this.state.busca} onChange={this.handleChange}/>
            <Button type='submit' variant="outline-success" onClick={this.handleSubmit}>Buscar</Button>
          </Form>
        </div>
        <div className="tabela">
          <Table striped bordered hover style={{"marginTop": '1vw'}}>
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
              </tr>
            </thead>
            <tbody>
              {tabela}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Aluno;