import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validadtor/validator';
import { Input, createField, GetStringKeys } from '../common/FormControls/FormControls';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import style from '../common/FormControls/FormControls.module.css'
import { AppStateType } from '../../redux/redux-store';


const Login: React.FC<mapStateToPropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/Profile'} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}

const maxLength50 = maxLengthCreator(50)

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        {createField<LoginFormValuesTypeKeys>('Email', 'email', [required, maxLength50], Input)}
        {createField<LoginFormValuesTypeKeys>('Password', 'password', [required, maxLength50], Input, { type: 'password' })}
        {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, { type: 'checkbox' }, 'remember me')}

        {props.captchaUrl && <img src={props.captchaUrl} alt='captcha' />}
        {props.captchaUrl &&
            createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input, {})
        }

        {props.error && <div className={style.formSummaryError}>
            {props.error}
        </div>}
        <div>
            <button>Log in</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({
    // a unique name for the form
    form: 'login'
})(LoginForm)

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect<mapStateToPropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, { login })(Login)

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

type LoginFormOwnPropsType = {
    captchaUrl: string | null
}

type mapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}