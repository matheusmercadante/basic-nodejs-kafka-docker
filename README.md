[![npm version](https://img.shields.io/npm/v/kafkajs?color=%2344cc11&label=stable)](https://www.npmjs.com/package/kafkajs) [![npm pre-release version](https://img.shields.io/npm/v/kafkajs/beta?label=pre-release)](https://www.npmjs.com/package/kafkajs) [![Build Status](https://dev.azure.com/tulios/kafkajs/_apis/build/status/tulios.kafkajs?branchName=master)](https://dev.azure.com/tulios/kafkajs/_build/latest?definitionId=2&branchName=master) [![Slack Channel](https://kafkajs-slackin.herokuapp.com/badge.svg)](https://kafkajs-slackin.herokuapp.com/)
<br />

<p align="center">
  <a href="https://kafka.js.org">
      <img src="https://raw.githubusercontent.com/tulios/kafkajs/master/logo/v2/kafkajs_circle.svg" alt="Logo" width="125" height="125">
  </a>

  <h3 align="center">CONNECT API</h3>

  <p align="center">
    A modern configuration for connect api's
    <br />
    <a href=""><strong>Production</strong></a>
    <br />
  </p>
</p>

## <a name="about"></a> About the Project

KafkaJS is a modern [Apache Kafka](https://kafka.apache.org/) client for Node.js. It is compatible with Kafka 0.10+ and offers native support for 0.11 features.

<small>KAFKA is a registered trademark of The Apache Software Foundation and
has been licensed for use by KafkaJS. KafkaJS has no
affiliation with and is not endorsed by The Apache Software Foundation.</small>

### <a name="features"></a> Tools

- NodeJS
- ExpressJS
- Docker
- KafkaJS
- API Gateway

### <a name="getting-started"></a> Getting Started

```sh
npm run start-docker
# for create container and set up kafka image
```

#### <a name="usage"></a> Services

```sh
# up api gateway
cd api && npm install && npm run dev

# up pipedrive service
cd pipedrive && npm install && npm run dev

# up bling service
cd bling && npm install && npm run dev

# up mongodb service
cd mongo && npm install && npm run dev
```
