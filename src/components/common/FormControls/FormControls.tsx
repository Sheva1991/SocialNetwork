import React from 'react'
import styles from './FormControls.module.css'
import { ValidatorType } from '../../../utils/validadtor/validator';
import { Field, WrappedFieldProps, WrappedFieldMetaProps } from 'redux-form';

type FormControlParamsType = {
    meta: WrappedFieldMetaProps,
    children: React.ReactNode
}
const FormControl: React.FC<FormControlParamsType> = ({ meta, children }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}  >
            <div>
                {children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div >
    )
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // const { input, meta, child, ...restProps } = props
    const { input, meta, ...restProps } = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props: any) => {
    const { input, meta, ...restProps } = props
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}


export function createField<FormsKeysType extends string>(placeholder: string | undefined,
    name: FormsKeysType,
    validadtors: Array<ValidatorType>,
    component: React.FC<WrappedFieldProps>,
    props = {}, text = '') {
    return (
        <div>
            <Field placeholder={placeholder} name={name}
                validate={validadtors}
                component={component}
                {...props} />
        </div>
    )
}

export type GetStringKeys<T> = Extract<keyof T, string>