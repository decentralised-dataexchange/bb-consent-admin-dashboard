<h1 align="center">
    GovStack Consent BB Admin Dashboard
</h1>

<p align="center">
    <a href="/../../commits/" title="Last Commit"><img src="https://img.shields.io/github/last-commit/decentralised-dataexchange/bb-consent-admin-dashboard?style=flat"></a>
    <a href="/../../issues" title="Open Issues"><img src="https://img.shields.io/github/issues/decentralised-dataexchange/bb-consent-admin-dashboard?style=flat"></a>
    <a href="./LICENSE" title="License"><img src="https://img.shields.io/badge/License-Apache%202.0-yellowgreen?style=flat"></a>
</p>

<p align="center">
  <a href="#about">About</a> •
  <a href="#release-status">Release Status</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#licensing">Licensing</a>
</p>

## About

This repository hosts source code for the reference implementation of the GovStack Consent Building Block Administrative Dashboard.

## Release Status

Released. Refer to the [wiki page](https://github.com/decentralised-dataexchange/bb-consent-docs/wiki/wps-and-deliverables) for the latest status of the deliverables.

## Instructions to run

Follow the steps below to get the admin dashboard up and running locally.

1. Clone this repository to your local server using `git clone`.
2. Check out the latest release or any available release you wish to run.
3. Modify the `.env` file in the root folder to point to Consent BB API server instance.
4. Execute `make setup`. This establishes the necessary dependencies and configurations for running the admin dashboard instance.
5. Execute `make build`. The compiles and assembles source code into executable files or libraries, following the instructions specified in the Makefile of the admin dashboard instance.
6. Execute `make run`.  This executes a predefined set of instructions in the  Makefile to launch or run the compiled admin dashboard server instance.

The consent BB admin dashboard can now be accessed at [https://dashboard.bb-consent.dev](https://dashboard.bb-consent.dev) If you have security issues with your browser, you must establish a self-signed certificate.

## Other resources

* Wiki - https://github.com/decentralised-dataexchange/consent-dev-docs/wiki

## Contributing

Feel free to improve the plugin and send us a pull request. If you find any problems, please create an issue in this repo.

## Licensing
Copyright (c) 2023-25 LCubed AB (iGrant.io), Sweden

Licensed under the Apache 2.0 License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the LICENSE for the specific language governing permissions and limitations under the License.
