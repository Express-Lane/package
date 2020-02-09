import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import { userTable } from './UserTableFile';

const access = promisify( fs.access );
const copy = promisify( ncp );

const copyTemplateFIles = options => {
    return copy( options.templateDirectory, options.targetDirectory, {
        clobber: false
    } );
}

const writeAuth = options => {
    const base = process.cwd() + '/data/migrations/'
    const file = fs.readdirSync(base)[0];
   
    fs.writeFile(`${base}/${file}`, userTable, function(err) {
        if(err) {
            return console.log(err);
        }
        return;
    }); 

}

const installDeps = async options => {
    const result = await execa('npm', ['install'], { cwd: options.targetDirectory });

    if(result.failed) {
        return Promise.reject(new Error('Install Failed'))
    } else {
        return;
    }
}

const makeTable = async options => {
    const result = await execa('npx', ['knex', 'migrate:make', 'users'], { cwd: options.targetDirectory });

    if(result.failed) {
        return Promise.reject(new Error('Table Creation Failed'))
    } else {
        return;
    }
}

const writeTable = options => {
    const base = process.cwd() + '/data/migrations/'
    const file = fs.readdirSync(base)[0];
   
    fs.writeFile(`${base}/${file}`, userTable, function(err) {
        if(err) {
            return console.log(err);
        }
        return;
    }); 
}

const runMigrations = async options => {
    const result = await execa('npx', ['knex', 'migrate:latest'], { cwd: options.targetDirectory });

    if(result.failed) {
        return Promise.reject(new Error('Migrations Failed'))
    } else {
        return;
    }
}

const runSeeds = async options => {
    const result = await execa('npx', ['knex', 'seed:run'], { cwd: options.targetDirectory });

    if(result.failed) {
        return Promise.reject(new Error('Migrations Failed'))
    } else {
        return;
    }
}

const gitInit = async options => {
    const result = await execa('git', ['init'], { cwd: options.targetDirectory });

    if(result.failed) {
        return Promise.reject(new Error('Install Failed'))
    } else {
        return;
    }
}

export const createProject = async options => {
    options = {
        ...options,
        targetDirectory: process.cwd()
    };
   
    const currentFileUrl = import.meta.url;
    
    const templateDir = path.resolve(
        new URL(currentFileUrl.substring(8)).pathname,
        '../../template',
    );
    
    options.templateDirectory = templateDir;

    try {
        await access( templateDir, fs.constants.R_OK )
    } catch (err) {
        console.log('Invalid Template Name::', err, '\nDirectory::', templateDir);
        process.exit(1);
    }

    const tasks = new Listr([
        {
            title: 'Generating Boilerplate...',
            task: () => copyTemplateFIles(options)
        },
        {
            title: 'Installing Dependecies...',
            task: () => installDeps(options)
        },
        {
            title: 'Creating Table...',
            task: () => makeTable(options)
        },
        {
            title: 'Writing Table...',
            task: () => writeTable(options)
        },
        {
            title: 'Running Migrations...',
            task: () => runMigrations(options)
        },
        {
            title: 'Running Seeds...',
            task: () => runSeeds(options)
        },
        {
            title: 'Initializing Git...',
            task: () => gitInit(options)
        },
        // {
        //     title: 'Starting Development...',
        //     task: () => activateServer(options)
        // },
    ])
    console.log('\n%s\n', chalk.red.bold('BUILDING:'))
    await tasks.run();

    console.log('\n%s', chalk.green.bold('COMPLETE'));
    console.log('\nBegin by running one of the scripts below:')
    console.log('\n\tnpm run server ---> Development Mode')
    console.log('\tnpm run start ---> Production Mode')
    return true;
}