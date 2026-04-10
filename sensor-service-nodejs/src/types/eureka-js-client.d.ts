declare module 'eureka-js-client' {
    export class Eureka {
        constructor(config: any);
        start(cb?: (error: any) => void): void;
        stop(cb?: (error: any) => void): void;
        logger: any;
    }
}
