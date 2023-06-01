import { TSDLErrorPackage } from "../../types/common";
import { Source } from "../../types/error";
import { errorCodes } from "./errorCodes";
export declare class TSDLError<TValidationError = unknown> {
    private $code;
    private $message?;
    private $validationError?;
    private $source;
    constructor(code: keyof typeof errorCodes | (typeof errorCodes)[keyof typeof errorCodes], message?: string);
    setSource(source: Source): this;
    setMessage(message?: string): this;
    setValidationError(error?: TValidationError): this;
    get code(): "Bad Request" | "Unauthorized" | "Payment Required" | "Forbidden" | "Not Found" | "Method Not Allowed" | "Not Acceptable" | "Proxy Authentication Required" | "Request Timeout" | "Conflict" | "Gone" | "Length Required" | "Precondition Failed" | "Payload Too Large" | "URI Too Long" | "Unsupported Media Type" | "Range Not Satisfiable" | "Expectation Failed" | "I'm a teapot" | "Misdirected Request" | "Unprocessable Content" | "Locked" | "Failed Dependency" | "Too Early" | "Upgrade Required" | "Precondition Required" | "Too Many Requests" | "Request Header Fields Too Large" | "Unavailable For Legal Reasons" | "Internal Server Error" | "Not Implemented" | "Bad Gateway" | "Service Unavailable" | "Gateway Timeout" | "HTTP Version Not Supported" | "Variant Also Negotiates" | "Insufficient Storage" | "Loop Detected" | "Not Extended" | "Network Authentication Required";
    get numberCode(): 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;
    get message(): string | undefined;
    get validationError(): TValidationError | undefined;
    get semanticErrorMessage(): string;
    package(): TSDLErrorPackage<TValidationError>;
    toString(): string;
    static fromPackage<TValidationError>(pkg: TSDLErrorPackage<TValidationError>): TSDLError<unknown>;
}
