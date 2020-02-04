import arg from 'arg';
import { createProject } from './main';

const parseArguments = (rawArgs) => {
    const args = arg(
        {
            '--create-server': Boolean,
            '--install': Boolean,
            '-c': '--create-server',
            '-i': '--install'
        },
        {
            argv: rawArgs.slice(2)
        }
    );

    return {
        runTemplate: args['--create-server'] || false,
        runInstall: args['--install'] || false
    }
}

export const cli = async args => {
    const options = parseArguments(args);

    if(options.runTemplate) await createProject(options)
    else console.log("Please Enter a Command")
}