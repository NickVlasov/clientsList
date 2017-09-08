import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClient } from '../actions';
import { Link } from 'react-router-dom';

class ClientShow extends Component {
    componentDidMount() {
        if (!this.props.client) {
            const { id } = this.props.match.params;
            this.props.fetchClient(id);
        }
    }

    convertGender(e) {
        if (e == "female" ) return "Женский"
        else if (e == "male") return "Мужской"
        else return <div>Неизвестно</div>
    }

    check(e) {
        if (e&& e<10) {
            return `0${e}`
        } else return e;
    }
    
    birthDate(year, month, day) {
        year = this.check(year);
        month = this.check(month);
        day = this.check(day);
        if( year && month && day) {
            return `${day}.${month}.${year}`;
        } else return "Неизвестно"
        
    }

    render() {
        const { client } = this.props;
        if (!client) {
            return (<div>Loading...</div>)
        }
        const { birthYear, birthMonth, birthDay } = this.props.client;
        console.log(client);
        return (
            <div>
                <h3>Данные про клиента</h3>
                <div>Номер карты: {client.cardNumber}</div>
                <div>Имя: {client.name}</div>
                <div>Пол: {this.convertGender(client.gender)}</div>
                <div>Телефон: {client.phone || "Не указано"}</div>
                <div>Дата рождения: {this.birthDate(birthYear, birthMonth, birthDay)}</div>
                <div>Адрес: {client.adress || "Не указано"}</div>
                <Link to="/" className="btn btn-danger back" >
                    На главную страницу
                </Link>
            </div>
            
        )
    }
}

function mapStateToProps(state, ownProps) {
    return { client: state.clients[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchClient })(ClientShow);