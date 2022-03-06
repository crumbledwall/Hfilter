export type ResponseData = {
    type: string,
    message: string,
    data?: any
}

export type Rule = {
    domain: string,
    position: string,
    type: string,
    old?: string,
    new?: string,
    key?: string,
    content?: string
}
