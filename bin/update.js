#!/usr/bin/env node

import Cli from "#core/cli";
import externalResources from "#core/external-resources";

if ( process.env.DATASETS_DOWNLOAD === "false" ) process.exit( 0 );

const CLI = {
    "title": "Update resources",
    "options": {
        "force": {
            "description": "Force build",
            "default": false,
            "schema": {
                "type": "boolean",
            },
        },
    },
};

await Cli.parse( CLI );

externalResources.add( "zerocluster/datasets/resources/countries.geo.json", import.meta.url );
externalResources.add( "zerocluster/datasets/resources/datasets", import.meta.url );
externalResources.add( "zerocluster/datasets/resources/geotargets", import.meta.url );

const res = await externalResources.update( {
    "remote": true,
    "force": process.cli.options.force,
    "silent": false,
} );

if ( !res.ok ) process.exit( 1 );
