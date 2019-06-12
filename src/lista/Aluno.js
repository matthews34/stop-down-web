import React, { Component } from 'react';
import { Form, Button, FormControl, Table } from 'react-bootstrap';
import MyNavbar from '../Navbar';
import axios from 'axios';
import {config as dotenvConfig} from 'dotenv'
import { jsonToString } from 'webpack/lib/Stats';

dotenvConfig()
const api_url = process.env.REACT_APP_API_URL

class Aluno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // nome: '',
      // CPF: '',
      // matricula: '',
      // email: '',
      // horas_de_voo: undefined,
      alunos: [],
    };

    this.getData = this.getData.bind(this);
  }

  async getData(callback) {
    // console.log('A form was submitted: ');

    await axios.get('/aluno/', {baseURL: api_url})
    .then(response =>  {
      // console.log("peguei");
      console.log(JSON.stringify(response.data));
      this.setState({
        alunos: response.data,
        // nome: response.data.nome,
        // CPF: response.data.CPF,
        // matricula: response.data.matricula,
        // email: response.data.email,
        // horas_de_voo: response.data.horas_de_voo,
        buscaFeita: true
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
      tabela.push(<tr>
                    <td>{element.matricula}</td>
                    <td>{element.nome}</td>
                    <td>{element.CPF}</td>
                    <td>{element.email}</td>
                  </tr>);
    });
    return tabela
  }

  componentDidMount() {
    this.getData(() => {});
  }
  
  render() {
    // this.getData(() => {
    //   this.state.alunos.forEach(element => {
    //     alunos += element.name;
    //   })
    // });
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
          <div>
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
                {this.createTable()}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default Aluno;