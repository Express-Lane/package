import arg from 'arg';
import { createProject } from './main';

const parseArguments = (rawArgs) => {
    const args = arg(
        {
            '--create-server': Boolean,
            '--auth': Boolean,
            '-c': '--create-server',
            '-a': '--auth'
        },
        {
            argv: rawArgs.slice(2)
        }
    );

    return {
        runTemplate: args['--create-server'] || false,
        runAuth: args['--auth'] || false
    }
}

export const cli = async args => {
    const options =parseArguments(args);

    try {
        if(options.runTemplate) await createProject(options)
        else console.log('Please Enter Command...')
    } catch(err) {
        console.log(err)
    }
}