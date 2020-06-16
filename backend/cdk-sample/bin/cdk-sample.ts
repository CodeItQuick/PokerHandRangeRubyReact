#!/usr/bin/env node

import cdk = require('@aws-cdk/core');
import { CdkSampleInitStack } from '../lib/cdk-sample-init-stack';
import { MyRailsFargateStack } from '../lib/my-rails-fargate-stack';

const app = new cdk.App();
const initStack = new CdkSampleInitStack(app, 'CdkSampleInitStack');

// for service :my_rails
new MyRailsFargateStack(app, 'MyRailsFargateStack', {
    vpc: initStack.vpc,
    cluster: initStack.cluster
});


app.synth();
