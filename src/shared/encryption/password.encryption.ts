interface IPasswordEncryption {
    hash(password: string): Promise<string>;
}

export { IPasswordEncryption }
