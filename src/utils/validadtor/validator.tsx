export type ValidatorType = (value: string) => string | undefined

export const required: ValidatorType = (value) => {
    if (value) return undefined

    return 'Field is required';

}

export const maxLengthCreator = (maxLength: number): ValidatorType => (value) => {
    if (value && value.length > maxLength) return `max length is ${maxLength} symbols`
    return undefined;
}



