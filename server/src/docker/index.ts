import Machine from 'docker-machine';

const machine = new Machine();

const connectToDockerDB = async (next: CallableFunction) => {
    next();
}

interface MyDocker {
    machine: any;
}

class MyDocker {
    constructor(){
        this.machine = new Machine();

        this.machine.isRunning(async (err: Error, running: boolean) => {
            if (err){
                // console.log(err);
                return err;
            }
            if (running === true){
                // console.log("Docker Machine is already running\nStarting Backend Communication Server");
                connectToDockerDB(() => {});
                
            } else {
                // console.log("Docker Machine is not running");
                // console.log("starting Docker-Machine Default");
                await machine.start(async (err) => {
                    if (err){
                        // console.log(err);
                        throw err;
                    }
                    // await console.log("DockerMachine Started\nWaiting 5 seconds before Starting Backend Communication Server");
                    // change num to fit the good time
                    await setTimeout(async () => { await runServer();}, 5000);
                })
            }
        });

    }
}