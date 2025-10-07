export function errorMessageFormatter(errors: string[] | undefined): string {
    if (!errors || errors.length === 0) {
        return "";
    }
    return errors.join(", ") + ".";
}