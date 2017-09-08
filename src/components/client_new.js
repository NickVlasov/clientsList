import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createClient } from '../actions/index';

class ClientNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedMale: false,
            checkedFemale: false
            // isChecked: true
        };

    }

    toggleMale = () => {
        this.setState({
            checkedMale: true,
            checkedFemale: false,
        })
    }
    toggleFemale = () => {
        this.setState({
            checkedMale: false,
            checkedFemale: true,
        })
    }

    renderField(field) {
        const { meta: { touched, error } } = field; // meta = field.meta;
        const className = `${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type={field.customType || "text"}
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    renderError(field) {
        const { meta: { touched, error } } = field; // meta = field.meta;
        return (
            <div>
                <div className="has-danger">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    convertValues(values) {
        let [birthYear, birthMonth, birthDay] = values.birth.split("-");
        values.birthYear = birthYear;
        values.birthMonth = birthMonth;
        values.birthDay = birthDay;
        delete values.birth;
        var params = new URLSearchParams();
        for(let key in values){
            params.append(key, values[key]);
        }
        return params;
    }

    onSubmit(values) {
        this.props.createClient(this.convertValues(values), this.props.history.push('/'));
    }

    render() {

        const { handleSubmit, reset } = this.props;
        return (
            <div>
                <h3>Создание нового клиента</h3>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form-group">
                    <Field
                        label="Имя"
                        name="name"
                        component={this.renderField}
                    />
                    <Field
                        label="Дата рождения"
                        name="birth"
                        customType="date"
                        component={this.renderField}
                    />
                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                        Пол
                    </div>
                    <label><Field name="gender" component="input" type="radio" value="male" checked={this.state.checkedMale}
                        onChange={this.toggleMale} /> Мужской &nbsp;</label>
                    <label><Field name="gender" component="input" type="radio" value="female" checked={this.state.checkedFemale}
                        onChange={this.toggleFemale} /> Женский </label>
                    <Field name="gender" component={this.renderError} />
                    <Field
                        label="Телефон"
                        name="phone"
                        customType="tel"
                        component={this.renderField}
                    />
                    <Field
                        label="Email"
                        name="email"
                        customType="email"
                        component={this.renderField}
                    />
                    <Field
                        label="Адрес"
                        name="adress"
                        component={this.renderField}
                    />
                    <Field
                        label="Описание"
                        name="description"
                        component={this.renderField}
                    />
                    <button type="submit" className="btn btn-primary newClientButton">Подтвердить</button>
                    <Link to="/" className="btn btn-danger newClientButton">
                        Отмена
                </Link>
                </form>
            </div>


        )
    }
}

function validate(values) {
    const errors = {};

    // validate the input's from 'values'
    if (!values.name) {
        errors.name = "Введите имя клиента";
    }
    if (!values.gender) {
        errors.gender = "Выберите пол";
    }
    if (!values.birth) {
        errors.birth = "Введите дату рождения";
    }
    if (!values.email) {
        errors.email = "Введите Email";
    }
    if (!values.phone) {
        errors.phone = "Введите телефон";
    }
    if (!values.adress) {
        errors.adress = "Введите адрес";
    }
    if (!values.description) {
        errors.description = "Введите описание";
    }
    // if errors is empty, the form is fine to submit
    // if errors has *any* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    form: 'ClientNewForm',
    validate
})(
    connect(null, { createClient })(ClientNew)
    );