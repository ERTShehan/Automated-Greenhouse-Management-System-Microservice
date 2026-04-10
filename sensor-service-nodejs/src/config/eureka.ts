import { Eureka } from 'eureka-js-client';

export const registerWithEureka = (): void => {
    const port: number = parseInt(process.env.PORT || '8082', 10);

    const client = new Eureka({
        instance: {
            app: 'sensor-service',
            instanceId: `sensor-service:${port}`,
            hostName: 'localhost',
            ipAddr: '127.0.0.1',
            port: {
                '$': port,
                '@enabled': true,
            },
            vipAddress: 'sensor-service',
            dataCenterInfo: {
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                name: 'MyOwn',
            },
        },
        eureka: {
            host: process.env.EUREKA_HOST || 'localhost',
            port: parseInt(process.env.EUREKA_PORT || '8761', 10),
            servicePath: '/eureka/apps/',
            maxRetries: 10,
            requestRetryDelay: 2000,
        },
    });

    client.logger.level('warn');

    client.start((error: any) => {
        if (error) {
            console.error('Failed to register with Eureka', error.message);
        } else {
            console.log('Successfully registered with Eureka');
        }
    });

    process.on('SIGINT', () => {
        client.stop((error: any) => {
            console.log('Deregistered from Eureka');
            process.exit();
        });
    });
};
