Event Collector
===

Application to collect events and allow to participate in specific events for registered users.

**Framework**

Application is built with Symfony Framework 6.2

**Extra Packages**

Api Platform is used to simplify creating and managing rest endpoints.

**Virtualization**

Application is virtualized with docker compose

**Before start project configuration**

Before you start the project you need to add `127.0.0.1 authapi.local` to your `/etc/hosts` file

**Running up project**

In order to start the project you need to run command:
```shell
make up
```
In order to install dependencies run command:
```shell
make install
```
In order to stop application run command:
```shell
make down
```

**Interactive swagger documentation**

Interactive documentation for API is available on url `authapi.local/api/docs`
