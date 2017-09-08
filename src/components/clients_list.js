import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClients } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';

export default class ClientsIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            filtedBy: ''
        }
    }

    renderH(e) {
        if (!e) {
            return <div className="table-cell">Не указан</div>;
        } else {
            return <div className="table-cell">{e}</div>;
        }
    }

    renderClients() {
        if (!Object.keys(this.props.clients).length) return "Данные загружаются...";
        let preFilteredClients = _.filter(this.props.clients, item => {
            return item.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) != -1;
        });
        let newCL = preFilteredClients.filter(item => {
            if (this.state.filtedBy) return item.gender == this.state.filtedBy;
            else return item;
        });
        let filteredClients = _.mapKeys(newCL, 'id');

        console.log()
        return _.map(filteredClients, client => {
            return (
                <Link to={`/client/${client.id}`} className="table-row" key={client.id}>
                    {this.renderH(client.name)}
                    {this.renderH(client.phone)}
                    {this.renderH(client.email)}
                    {this.renderH(client.birthYear)}
                    {this.renderH(client.address)}
                </Link>
            )
        })
    }

    renderTop() {
        return (
            <div>
                <div className="searchBar">
                    <label>Поиск</label>
                    <input className="form-control" value={this.state.searchValue} onChange={(e) => this.setState({ searchValue: e.target.value })} />
                </div>
                <div>
                    <Link to="/client/new" className="btn btn-info new-client">Создать нового клиента</Link>
                </div>
                <div className="sort-label">Сортировка по полу:</div>

                <div className="filter-buttons">
                    <div className="btn btn-info" data-value="male" onClick={this.handleClick.bind(this)}>Мужчины</div>
                    <div className="btn btn-success" data-value="female" onClick={this.handleClick.bind(this)}>Женщины</div>
                    <div className="btn btn-danger " data-value="" onClick={this.handleClick.bind(this)}>Не важно</div>
                </div>
            </div>
        )
    }

    renderTableHeader() {
        return (
            <div className="table-row">
                {this.renderH("Имя")}
                {this.renderH("Телефон")}
                {this.renderH("Email")}
                {this.renderH("Год рождения")}
                {this.renderH("Адрес")}
            </div>
        )
    }

    removeClass() {
        const w = document.querySelectorAll("div .btn");
        let q = _.map(w, item => {
            return item.classList.remove("ac");
        })

    }

    handleClick(event) {
        this.setState({ filtedBy: event.target.dataset.value });
        this.removeClass();
        event.target.classList.add("ac");
    }



    render() {
        return (
            <div>
                {this.renderTop()}
                <div className="pseudo-table">
                    {this.renderTableHeader()}
                    {this.renderClients()}
                </div>
            </div>
        )
    }
}