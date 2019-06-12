import React, { Component } from 'react';
import { Form, Button, FormControl, Table } from 'react-bootstrap';
import MyNavbar from '../Navbar';
import axios from 'axios';
import {config as dotenvConfig} from 'dotenv'

dotenvConfig()
const api_url = process.env.REACT_APP_API_URL

class Instrutor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      CPF: '',
      email: '',
      horas_de_voo: undefined,
      breve: '',
      certificado_instrutor: undefined,
      buscaFeita: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.get = this.get.bind(this);
  }

  get(breve) {
    return axios.get('/instrutor/' + breve, {baseURL: api_url})
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    console.log('A form was submitted: ');
    // let response;
    // try{
    //   let response = await this.get(this.state.breve);
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }

    // axios.get('/instrutor/' + this.state.breve, {baseURL: api_url})
    // .then(function(response) {
    //   console.log(JSON.stringify(response.data));
    // })
    // .then(function(error) {
    //   console.log(error);
    // });

    axios.get('/instrutor/' + this.state.breve, {baseURL: api_url})
    .then(response =>  {
      console.log(JSON.stringify(response.data));
      this.setState({
        nome: response.data.nome,
        CPF: response.data.CPF,
        email: response.data.email,
        horas_de_voo: response.data.horas_de_voo,
        breve: response.data.breve,
        certificado_instrutor: response.data.certificado_instrutor,
        buscaFeita: true,
      });
    })
    .then(function(error) {
      console.log(error);
    });

    // let instrutor = response.data
    // this.setState({
    //   nome: instrutor.nome,
    //   CPF: instrutor.CPF,
    //   email: instrutor.email,
    //   horas_de_voo: instrutor.horas_de_voo,
    //   breve: instrutor.breve,
    //   certificado_instrutor: instrutor.certificado_instrutor,
    //   buscaFeita: true,
    // });
    event.preventDefault();
  }

  render() {
    let tabela;
    if(this.state.buscaFeita) {
      tabela = <Table striped bordered hover style={{"marginTop": '1vw'}}>
                <tbody>
                  <tr>
                    <td>Nome</td>
                    <td>{this.state.nome}</td>
                  </tr>
                  <tr>
                    <td>CPF</td>
                    <td>{this.state.CPF}</td>
                  </tr>
                  <tr>
                    <td>E-mail</td>
                    <td>{this.state.email}</td>
                  </tr>
                  <tr>
                    <td>Horas de voo</td>
                    <td>{this.state.horas_de_voo}</td>
                  </tr>
                  <tr>
                    <td>Breve</td>
                    <td>{this.state.breve}</td>
                  </tr>
                  <tr>
                    <td>Certificado de instrutor</td>
                    <td>{this.state.certificado_instrutor}</td>
                  </tr>
                </tbody>
              </Table>;
    } else {
      tabela = '';
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
          <Form inline>
            <FormControl type="text" placeholder="Breve" className="mr-sm-2" name="breve" value={this.state.breve} onChange={this.handleChange}/>
            <Button type='submit' variant="outline-success" onClick={this.handleSubmit}>Buscar</Button>
          </Form>
        </div>
        {tabela}
      </div>
    );
  }
}

export default Instrutor;