import React, { Component } from 'react';
import Input from '../../components/UI/Forms/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/A-index'
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router';
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                ErrMsg: "Please enter a valid E-mail"

            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                ErrMsg: "Please enter a valid Password"

            },
        },
        formIsValid: false,
        isSignUp: false
    }
    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    InputChangeHandler(event, controlName) {
        const upDatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        let formIsValid = true
        for (controlName in upDatedControls) {
            formIsValid = upDatedControls[controlName].valid && formIsValid
        }
        this.setState({ controls: upDatedControls, formIsValid: formIsValid })
    }
    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)

    }
    SwitchSignInUp = () => {
        this.setState(prevState => {
            return ({ isSignUp: !prevState.isSignUp })
        })
    }
    render() {
        const formElemArray = []
        for (let key in this.state.controls) {
            formElemArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = (<div>
            <form onSubmit={this.submitHandler} >
                {formElemArray.map(formElm => {
                    return <Input
                        elementType={formElm.config.elementType}
                        elementConfig={formElm.config.elementConfig}
                        key={formElm.id}
                        value={formElm.config.value}
                        changed={(event) => this.InputChangeHandler(event, formElm.id)}
                        invalid={!formElm.config.valid}
                        touched={formElm.config.touched}
                        errorMessage={formElm.config.ErrMsg}
                    />
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>{this.state.isSignUp ? 'Sign Up' : 'LogIn'}</Button>
            </form>
        </div>
        )
        if (this.props.loading) {
            form = <Spinner />
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        let error = null;
        if (this.props.error) {
            if (this.props.error.message === "Request failed with status code 400") {
                error = <p className={classes.Error}>Please Enter Correct E-mail & Password </p>
            }
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {error}
                <div className={classes.AuthBox}>
                    {form}
                    <Button btnType="Danger" clicked={this.SwitchSignInUp}>Switch to {this.state.isSignUp ? 'LogIn ' : 'Sign Up'}</Button>
                </div>
                <p style={{ fontSize: "10px" }}>( if {!this.state.isSignUp ? 'New User ! Please switch to Sign' : 'Already a user! Please Login '})</p>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.bgr.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.authDispatch(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.authRedirect('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth)